import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { adminSidebarTabs } from '../../../components/Sidebar/SideBarItems'
import { LibraryTableHeaders } from '../../../components/Table/TableHeaderItems'
import Table from '../../../components/Table'
import axios from 'axios'
import Button from '../../../components/Button'


const Library = () => {
  const [libraryData, setLibraryData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Fetch library data from API
    axios.get('http://localhost:8000/api/library')
      .then(res => setLibraryData(res.data))
      .catch(err => console.error('Failed to fetch library data:', err))
      .finally(() => setLoading(false))
  }, []) // Only run once on mount

  return (
    <div className='flex'>
        <div>
            <Sidebar action={"libraryPage"} tabs={adminSidebarTabs}/>
        </div>

        <div className='library-content pl-20 pt-5 w-full'>
            <div className="flex items-center justify-between mb-4">
                <h1 className='text-4xl font-bold'>Library Management</h1>
                <Button color="indigo" >Add Library</Button>
            </div>
            <p className='text-lg'>Here you can manage the library resources, including books, journals, and other materials.</p>
            {/* Additional content for library management can be added here */}
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              <Table headers={LibraryTableHeaders} data={libraryData} />
            )}
        </div>
    </div>
  )
}

export default Library