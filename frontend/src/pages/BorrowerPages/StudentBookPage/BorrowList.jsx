import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar'
import { BorrowerSidebarTabs } from '../../../components/Sidebar/SideBarItems'
import BookCard from '../../../components/ModalForm/BookCard'
import { getData, updateData } from '../../../services/ApiServices'

const BorrowList = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setRole(user.role);
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    getData(`/borrowed-books/user/${userId}`)
      .then((borrowRecords) => {
        setBookData(borrowRecords);
        console.log("Fetched borrowed book records:", borrowRecords);
      })
      .catch((err) => {
        console.error("Failed to fetch borrowed book records:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const handleReturn = async (book) => {
    if (!userId) return alert("User not identified.");

    console.log("Returning book:", book);
    try {
      // Assuming borrow_id is part of book or nested borrow info
      if (!book.borrow_id) {
        return alert("Borrow record not found for this book.");
      }

      const payload = { status: 'returned' };
      await updateData('/borrowed-books', book.borrow_id, payload);
      await updateData('/books', book.book_id, { status: 'Available' });

      alert(`You have returned "${book.title}" successfully.`);

      const updatedData = await getData(`/borrowed-books/user/${userId}`);
      setBookData(updatedData);
    } catch (err) {
      const msg = err.response?.data || err.message;
      console.error('Return error:', msg);
      alert('Failed to return book: ' + JSON.stringify(msg));
    }
  };

  return (
    <div className='dashboard-container'>
      <Sidebar action="borrowedBooks" tabs={BorrowerSidebarTabs} />

      <div className="pl-20 pt-5 w-full">
        <h1 className='text-4xl font-bold mb-4'>Borrowed Books List</h1>
        <p className='text-lg mb-4'>Here you can see your borrowed books.</p>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className='overflow-y-auto h-[calc(100vh-200px)]'>
            <BookCard
              data={bookData}
              role={role}
              isBorrowed={true}
              onReturn={handleReturn}    // This is for returning books
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowList;
