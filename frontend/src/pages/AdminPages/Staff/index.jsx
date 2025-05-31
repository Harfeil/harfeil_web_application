import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { adminSidebarTabs } from '../../../components/Sidebar/SideBarItems'
import { StaffTableHeaders } from '../../../components/Table/TableHeaderItems'
import Table from '../../../components/Table'
import Button from '../../../components/Button'
import Card from '../../../components/ModalForm/Card'
import { AddStaffFields } from '../../../components/ModalForm/ModalFormFields'
import { getData, createData, updateData, deleteData } from '../../../services/ApiServices'

const Staff = () => {
  const [staffData, setStaffData] = useState([])
  const [loading, setLoading] = useState(true)
  const [editRow, setEditRow] = useState(null)
  const [editOpen, setEditOpen] = useState(false)

  // Fetch staff data
  useEffect(() => {
    setLoading(true);
    getData('/users/staff')
      .then(data => setStaffData(data))
      .catch(err => console.error('Failed to fetch staff data:', err))
      .finally(() => setLoading(false));
  }, []);

  // Add Staff
  const handleAddStaff = async (formData) => {
    formData.role = "staff";
    formData.password = "staff123";
    try {
      const newStaff = await createData('/users', formData);
      setStaffData(prev => [...prev, newStaff]);
    } catch (err) {
      console.error('Failed to add staff:', err);
    }
  };

  // Edit Staff
  const handleEdit = (row) => {
    setEditRow({ ...row });
    setEditOpen(true);
  };

  const handleEditSubmit = async (formData) => {
    formData.role = "staff";
    try {
      const updated = await updateData('/users', editRow.id, formData);
      setStaffData(prev =>
        prev.map(item => (item.id === editRow.id ? updated : item))
      );
    } catch (err) {
      console.error('Failed to edit staff:', err);
    } finally {
      setEditOpen(false);
      setEditRow(null);
    }
  };

  const handleDelete = async (row) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await deleteData('/users', row.id);
        setStaffData(prev => prev.filter(item => item.id !== row.id));
      } catch (err) {
        console.error('Failed to delete staff:', err);
      }
    }
  };

  return (
    <div className='flex'>
      <div>
        <Sidebar action={"staffPage"}/>
      </div>
      <div className='library-content pl-20 pt-5 w-full'>
        <div className="flex items-center justify-between mb-4">
          <h1 className='text-4xl font-bold'>Staff Management</h1>
          <Card buttonName={"Add Staff"} fields={AddStaffFields} onSubmit={handleAddStaff}/>
        </div>
        <p className='text-lg'>Here you can manage the staff members of the library.</p>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <Table headers={StaffTableHeaders} data={staffData} onEdit={handleEdit} onDelete={handleDelete}/>
        )}
        {editOpen && (
          <Card
            buttonName="Edit Staff"
            fields={AddStaffFields}
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

export default Staff