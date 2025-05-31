import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import { staffSidebarTabs } from '../../../components/Sidebar/SideBarItems';
import BookCard from '../../../components/ModalForm/BookCard';
import { getData, createData } from '../../../services/ApiServices';
import { AddBookFields } from '../../../components/ModalForm/ModalFormFields';

const StudentBookPage = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [libraryOption, setLibraryOption] = useState([]);
  const [role, setRole] = useState('student');
  const [userId, setUserId] = useState(null);

  // Load user info from localStorage once
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserId(user.id);
        setRole(user.role || 'student');
      }
    } catch (e) {
      console.error('Failed to parse user:', e);
    }
  }, []);

  // Fetch books data function
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getData('/books');
      setBookData(data);
    } catch (err) {
      console.error('Failed to fetch book data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Prepare modal fields for Add Book, injecting library options if needed
  const modalFields = AddBookFields.map(field =>
    field.key === 'library_id' ? { ...field, options: libraryOption } : field
  );

  // Handle borrowing a book and refresh book list on success
  const handleBorrow = async (book) => {
    try {
      const now = new Date();
      const borrowedAt = now.toISOString().slice(0, 19).replace('T', ' ');
      const dueDate = new Date(now);
      dueDate.setDate(now.getDate() + 7);
      const dueAt = dueDate.toISOString().slice(0, 19).replace('T', ' ');

      const payload = {
        book_id: book.id,
        user_id: userId,
        year_publication: book.year_published,
        isbn: book.isbn,
        book_name: book.title,
        borrowed_at: borrowedAt,
        due_at: dueAt,
      };

      await createData('/borrowed-books', payload);
      alert(`You have borrowed "${book.title}"`);

      // Refresh book data to reflect updated status without refresh
      fetchBooks();
    } catch (err) {
      if (err.response && err.response.data) {
        console.error('Backend validation error:', err.response.data);
        alert('Failed to borrow book: ' + JSON.stringify(err.response.data));
      } else {
        alert('Failed to borrow book.');
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar action="bookManagement" tabs={staffSidebarTabs} />
      <div className="pl-20 pt-5 w-full">
        <h1 className="text-4xl font-bold mb-4">Book Lists</h1>
        <p className="text-lg mb-4">Here you can borrow books.</p>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-y-auto h-[calc(100vh-200px)]">
            <BookCard
              data={bookData}
              role={role}
              isBorrowed={false}
              onBorrow={role === 'student' ? handleBorrow : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentBookPage;
