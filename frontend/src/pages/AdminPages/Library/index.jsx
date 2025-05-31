import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { adminSidebarTabs } from '../../../components/Sidebar/SideBarItems'
import { LibraryTableHeaders } from '../../../components/Table/TableHeaderItems'
import Table from '../../../components/Table'
import axios from 'axios'
import Button from '../../../components/Button'
import Card from '../../../components/ModalForm/Card'
import { AddLibraryFields } from '../../../components/ModalForm/ModalFormFields'
import { getData, createData, updateData, deleteData } from '../../../services/ApiServices'

const Library = () => {
  const [libraryData, setLibraryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [staffOptions, setStaffOptions] = useState([])
  const [editRow, setEditRow] = useState(null)
  const [editOpen, setEditOpen] = useState(false)

  // Fetch library data
  useEffect(() => {
    setLoading(true);
    getData('/library')
      .then(data => setLibraryData(data))
      .catch(err => console.error('Failed to fetch library data:', err))
      .finally(() => setLoading(false));
  }, []);

  console.log("Library Data:", libraryData);
  // Fetch staff options
  useEffect(() => {
    getData('/users/staff')
      .then(data =>
        setStaffOptions(
          data.map(staff => ({
            value: staff.id,
            label: staff.name
          }))
        )
      )
      .catch(err => console.error('Failed to fetch staff:', err));
  }, []);

  // Add Library
  const handleAddLibrary = async (formData) => {
    if (formData.assigned_staff) {
      formData.assigned_staff = Number(formData.assigned_staff);
    }
    try {
      const newLibrary = await createData('/library', formData);
      setLibraryData(prev => [...prev, newLibrary]);
    } catch (err) {
      console.error('Failed to add library:', err);
    }
  };

  // Edit Library
  const handleEdit = (row) => {
    const initialValues = { ...row };
    if (typeof initialValues.assigned_staff === 'object') {
      initialValues.assigned_staff = initialValues.assigned_staff.id;
    }
    setEditRow(initialValues);
    setEditOpen(true);
  };

  const handleEditSubmit = async (formData) => {
    if (formData.assigned_staff) {
      formData.assigned_staff = Number(formData.assigned_staff);
    }
    try {
      const updated = await updateData('/library', editRow.id, formData);
      setLibraryData(prev =>
        prev.map(item => (item.id === editRow.id ? updated : item))
      );
    } catch (err) {
      console.error('Failed to edit library:', err);
    } finally {
      setEditOpen(false);
      setEditRow(null);
    }
  };

  const handleDelete = async (row) => {
    if (window.confirm('Are you sure you want to delete this library?')) {
      try {
        await deleteData('/library', row.id);
        setLibraryData(prev => prev.filter(item => item.id !== row.id));
      } catch (err) {
        console.error('Failed to delete library:', err);
      }
    }
  };

  // Inject staff options into AddLibraryFields
  const modalFields = AddLibraryFields.map(field =>
    field.key === "assigned_staff"
      ? { ...field, options: staffOptions }
      : field
  )

  return (
    <div className='flex'>
      <div>
        <Sidebar action={"libraryPage"} />
      </div>
      <div className='library-content pl-20 pt-5 w-full'>
        <div className="flex items-center justify-between mb-4">
          <h1 className='text-4xl font-bold'>Library Management</h1>
          <Card buttonName={"Add Library"} fields={modalFields} onSubmit={handleAddLibrary}/>
        </div>
        <p className='text-lg'>Here you can manage the library resources, including books, journals, and other materials.</p>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <Table headers={LibraryTableHeaders} data={libraryData} onEdit={handleEdit} onDelete={handleDelete}/>
        )}
        {editOpen && (
          <Card
            buttonName="Edit Library"
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

export default Library