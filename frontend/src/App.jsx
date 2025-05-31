import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/AdminPages/LandingPage';
import Dashboard from './pages/Dashboard';
import BookPage from './pages/AdminPages/BookPage';
import LibraryPage from './pages/AdminPages/Library';
import Staff from './pages/AdminPages/Staff';
import StudentManagementPage from './pages/StaffPages/StudentManagement';
import StaffBookPage from './pages/StaffPages/StaffBookPage';
import StudentBookPage from './pages/BorrowerPages/StudentBookPage';
import BorrowList from './pages/BorrowerPages/StudentBookPage/BorrowList';
import ProfilePage from './pages/BorrowerPages/ProfilePage';
import BorrowBookPage from './pages/StaffPages/StaffBookPage/BorrowBookPage';
function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/studentManagement" element={<StudentManagementPage />} />
        <Route path="/bookManagement" element={<StaffBookPage />} />
        <Route path="/bookList" element={<StudentBookPage />} />
        <Route path="/borrowedBooks" element={<BorrowList />} />
        <Route path="/borrowerBookPage" element={<BorrowBookPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
