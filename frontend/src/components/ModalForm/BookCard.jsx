import React, { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

// Responsive card grid for an array of book objects
const BookCard = ({ data, onEdit, onDelete, onBorrow, role, isBorrowed, onReturn }) => {
  const [menuOpen, setMenuOpen] = useState(null);

  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-gray-500">No books available.</div>;
  }

  const handleMenuToggle = (idx) => {
    setMenuOpen(menuOpen === idx ? null : idx);
  };

  const handleEdit = (book) => {
    setMenuOpen(null);
    if (onEdit) onEdit(book);
  };

  const handleDelete = (book) => {
    setMenuOpen(null);
    if (onDelete) onDelete(book);
  };

  const handleBorrow = (book) => {
    if (onBorrow) onBorrow(book);
  };

  const handleReturn = (book) => {
    if (onReturn) onReturn(book);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((book, idx) => {
        // Determine if this particular book is borrowed:
        // If `isBorrowed` is global boolean, it applies to all, otherwise
        // you might want to pass a property like `book.isBorrowed`.
        const borrowed = typeof isBorrowed === 'function' ? isBorrowed(book) : isBorrowed;

        return (
          <div
            key={book.id || idx}
            className="bg-white rounded shadow p-4 flex flex-col relative"
          >
            {/* Staff: show 3 dots menu */}
            {role === 'staff' && (
              <div className="absolute top-2 right-2">
                <button
                  className="p-1 rounded-full hover:bg-gray-200"
                  onClick={() => handleMenuToggle(idx)}
                >
                  <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                </button>
                {menuOpen === idx && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                      onClick={() => handleDelete(book)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}

            <h2 className="text-base font-bold mb-2">{book.title || 'Untitled'}</h2>

            <p className="text-xs text-gray-700 mb-1">
              <span className="font-semibold">Author:</span> {book.author || 'Unknown'}
            </p>

            {book.isbn ? (
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
            ) : (
              <p className="text-xs text-gray-400 mb-1 italic">ISBN: Not available</p>
            )}

            {book.year_published ? (
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Year:</span> {book.year_published}
              </p>
            ) : (
              <p className="text-xs text-gray-400 mb-1 italic">Year: Not available</p>
            )}

            {book.status ? (
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Status:</span> {book.status}
              </p>
            ) : (
              <p className="text-xs text-gray-400 mb-1 italic">Status: Not Available</p>
            )}

            {borrowed && (
              book.borrow_status ? (
                <p className="text-xs text-gray-600 mb-1">
                  <span className="font-semibold">Borrow Status:</span> {book.borrow_status}
                </p>
              ) : (
                <p className="text-xs text-gray-400 mb-1 italic">Borrow Status: Not Available</p>
              )
            )}

            {book.library_name && (
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Library Location:</span> {book.library_name}
              </p>
            )}

            {/* Student or Teacher: show Borrow or Return button */}
            {(role === 'student' || role === 'teacher') && (
              <button
                className={`mt-3 px-4 py-2 rounded transition ${
                  borrowed
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                onClick={() => (borrowed ? handleReturn(book) : handleBorrow(book))}
              >
                {borrowed ? 'Return' : 'Borrow'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookCard;
