import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { staffSidebarTabs } from '../../../components/Sidebar/SideBarItems'
import BookCard from '../../../components/ModalForm/BookCard'
import { getData, createData, updateData, deleteData } from '../../../services/ApiServices'
import { AddBookFields } from '../../../components/ModalForm/ModalFormFields'
import Card from '../../../components/ModalForm/Card'
const StaffBookPage = () => {
  const [bookData, setBookData] = useState([])
  const [loading, setLoading] = useState(true)
  const [editRow, setEditRow] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const [libraryOption, setLibraryOption] = useState([])
  const user = JSON.parse(localStorage.getItem('user'));
  const [user_id, set_user_id] = useState(user?.id)
  const [role, setRole] = useState(user?.role)
    
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;
      if (userId) set_user_id(userId);
      setRole(user?.role);
    } catch (e) {
      console.error("Failed to parse user:", e);
    }
  }, []);


  useEffect(() => {
    if (!user_id) return;

    getData(`/library/staff/${user_id}`)
      .then(data => {
        console.log("API response:", data);
        const options = [{
          value: data.id,
          label: data.library_name
        }];
        setLibraryOption(options);
      })
      .catch(err => console.error('Failed to fetch staff libraries:', err));
  }, [user_id]);
  
  useEffect(() => {
    console.log("Library options:", libraryOption);
  }, [libraryOption]);
  // Fetch book data
  useEffect(() => {
    setLoading(true);
    getData(`/books/staff-books/${user_id}`)
      .then(data => setBookData(data))
      .catch(err => console.error('Failed to fetch book data:', err))
      .finally(() => setLoading(false));
  }, []);

  // Add Book
  const handleAddBook = async (formData) => {
    console.log("Form data to submit:", formData); // 👈 Add this
    try {
      const newBook = await createData('/books', formData);
      setBookData(prev => [...prev, newBook]);
    } catch (err) {
      console.error('Failed to add book:', err);
    }
  };
  // Edit Book
  const handleEdit = (row) => {
    setEditRow({ ...row });
    setEditOpen(true);
  };

  const handleEditSubmit = async (formData) => {
    try {
      const updated = await updateData('/books', editRow.id, formData);
      setBookData(prev =>
        prev.map(item => (item.id === editRow.id ? updated : item))
      );
    } catch (err) {
      console.error('Failed to edit book:', err);
    } finally {
      setEditOpen(false);
      setEditRow(null);
    }
  };

  const handleDelete = async (row) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteData('/books', row.id);
        setBookData(prev => prev.filter(item => item.id !== row.id));
      } catch (err) {
        console.error('Failed to delete book:', err);
      }
    }
  };

  // Prepare modal fields for Add Book, injecting library options into the correct field
  const modalFields = AddBookFields.map(field =>
    field.key === "library_id"
      ? { ...field, options: libraryOption }
      : field
  )

  return (
    <div className='dashboard-container'>
      <div>
        <Sidebar action={"bookManagement"} tabs={staffSidebarTabs}/>
      </div>
      <div className="pl-20 pt-5 w-full">
        <h1 className='text-4xl font-bold mb-4'>Book Management</h1>
        <Card
          buttonName={"Add Book"}
          fields={modalFields}
          onSubmit={handleAddBook}
        />
        <p className='text-lg mb-4'>Here you can manage your books.</p>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className='overflow-y-auto h-[calc(100vh-200px)]'>
            <BookCard
              data={bookData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              role={role}
            />
          </div>
        )}
        {editOpen && (
          <Card
            buttonName="Edit Book"
            fields={modalFields}
            onSubmit={handleEditSubmit}
            initialValues={editRow}
            open={editOpen}
            setOpen={setEditOpen}
          />
        )}
      </div>
    </div>
  )
}

export default StaffBookPage