import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { staffSidebarTabs } from '../../../components/Sidebar/SideBarItems'
import Table from '../../../components/Table'
import Card from '../../../components/ModalForm/Card'
import { AddBorrowerFields } from '../../../components/ModalForm/ModalFormFields'
import { BorrowerTableHeaders } from '../../../components/Table/TableHeaderItems'
import { getData, createData, updateData, deleteData } from '../../../services/ApiServices'

const StudentManagementPage = () => {
  const [borrower, setborrower] = useState([])
  const [loading, setLoading] = useState(true)
  const [editRow, setEditRow] = useState(null)
  const [editOpen, setEditOpen] = useState(false)

  // Fetch staff data
  useEffect(() => {
    setLoading(true);
    getData('/users/borrowers')
      .then(data => setborrower(data))
      .catch(err => console.error('Failed to fetch staff data:', err))
      .finally(() => setLoading(false));
  }, []);

  // Add Borrower
  const handleAddBorrower = async (formData) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }
    formData.user_id = userId;
    formData.password = "borrower123";
    try {
      const newBorrower = await createData('/users', formData);
      setborrower(prev => [...prev, newBorrower]);
    } catch (err) {
      console.error('Failed to add borrower:', err);
    }
  };

  // Edit Borrower
  const handleEdit = (row) => {
    setEditRow({ ...row });
    setEditOpen(true);
  };

  const handleEditSubmit = async (formData) => {
    // Always include the role field from the form
    if (!formData.role && editRow && editRow.role) {
      formData.role = editRow.role;
    }
    try {
      const updated = await updateData('/users', editRow.id, formData);
      setborrower(prev =>
        prev.map(item => (item.id === editRow.id ? updated : item))
      );
    } catch (err) {
      console.error('Failed to edit borrower:', err);
    } finally {
      setEditOpen(false);
      setEditRow(null);
    }
  };

  const handleDelete = async (row) => {
    if (window.confirm('Are you sure you want to delete this borrower?')) {
      try {
        await deleteData('/users', row.id);
        setborrower(prev => prev.filter(item => item.id !== row.id));
      } catch (err) {
        console.error('Failed to delete borrower:', err);
      }
    }
  };

  return (
    <div className='flex'>
      <div>
        <Sidebar action={"studentManagement"}/>
      </div>
      <div className='library-content pl-20 pt-5 w-full'>
        <div className="flex items-center justify-between mb-4">
          <h1 className='text-4xl font-bold'>Borrower Management</h1>
          <Card buttonName={"Add Borrower"} fields={AddBorrowerFields} onSubmit={handleAddBorrower}/>
        </div>
        <p className='text-lg'>Here you can manage the borrowers.</p>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className="">
            <Table headers={BorrowerTableHeaders} data={borrower} onEdit={handleEdit} onDelete={handleDelete}/>
          </div>
        )}
        {editOpen && (
          <Card
            buttonName="Save Changes"
            fields={AddBorrowerFields}
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

export default StudentManagementPage