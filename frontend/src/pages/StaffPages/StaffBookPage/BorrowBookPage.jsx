import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { staffSidebarTabs } from '../../../components/Sidebar/SideBarItems';
import BookCard from '../../../components/ModalForm/BookCard';
import { getData, createData, updateData, deleteData } from '../../../services/ApiServices';
import { AddBookFields } from '../../../components/ModalForm/ModalFormFields';
import Card from '../../../components/ModalForm/Card';

const BorrowBookPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [libraryOption, setLibraryOption] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const [user_id, setUserId] = useState(user?.id);
  const [role, setRole] = useState(user?.role);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUserId(storedUser.id);
        setRole(storedUser.role);
      }
    } catch (e) {
      console.error("Failed to parse user:", e);
    }
  }, []);

  // Fetch borrowed books and extract unique libraries
  useEffect(() => {
    if (!user_id) return;

    setLoading(true);
    getData(`borrowed-books/staff/${user_id}`)
      .then(data => {
        setBorrowedBooks(data);

        // Extract unique libraries from borrowed books
        const uniqueLibraries = [];
        data.forEach(borrowedBook => {
          const library = borrowedBook.book?.library;
          if (library && !uniqueLibraries.some(lib => lib.value === library.id)) {
            uniqueLibraries.push({ value: library.id, label: library.name || library.library_name });
          }
        });
        setLibraryOption(uniqueLibraries);
      })
      .catch(err => console.error('Failed to fetch borrowed books:', err))
      .finally(() => setLoading(false));
  }, [user_id]);

  // You may want to edit/delete borrowed books if your API supports that.
  // If not, you can disable or remove those handlers.

  // For demo, let's disable edit/delete for borrowedBooks to avoid confusion:
  const handleEdit = (row) => {
    // You might want to show details or do something else here
    alert("Editing borrowed books is disabled.");
  };

  const handleDelete = (row) => {
    alert("Deleting borrowed books is disabled.");
  };

  // For modal, if editing borrowed book is not applicable, you can omit or disable modal.

  // Prepare modal fields for Add Book, injecting library options
  // You may not need adding books here, so can remove handleAddBook if unused.

  const modalFields = AddBookFields.map(field =>
    field.key === "library_id"
      ? { ...field, options: libraryOption }
      : field
  );

  return (
    <div className='dashboard-container'>
      <div>
        <Sidebar action={"borrowManagement"} tabs={staffSidebarTabs} />
      </div>
      <div className="pl-20 pt-5 w-full">
        <h1 className='text-4xl font-bold mb-4'>Borrow Book Management</h1>
        <p className='text-lg mb-4'>Here you see the books borrowed.</p>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className='overflow-y-auto h-[calc(100vh-200px)]'>
            <BookCard
              data={borrowedBooks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              role={role}
            />
          </div>
        )}
        {/* Remove editing modal since editing borrowed book info likely not allowed */}
      </div>
    </div>
  );
};

export default BorrowBookPage;
