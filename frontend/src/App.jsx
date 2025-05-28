import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/AdminPages/LandingPage';
import Dashboard from './pages/AdminPages/Dashboard';
import BookPage from './pages/AdminPages/BookPage';
import LibraryPage from './pages/AdminPages/Library';
import Staff from './pages/AdminPages/Staff';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
