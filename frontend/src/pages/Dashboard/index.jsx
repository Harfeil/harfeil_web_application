import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { adminSidebarTabs } from '../../components/Sidebar/SideBarItems'
import './index.css' 

const Dashboard = () => {
  useEffect(() => {
    localStorage.setItem('role', 'student');
  }, []);
  return (
    //Main Container
    <div className='dashboard-container'>
        {/* //sidebar Component */}
        <div>
            <Sidebar action={"dashboard"}/>
        </div>
        {/* //Main Content */}
        <div>
            <h1 className='text-4xl font-bold mb-4'>Welcome to the Dashboard</h1>
            <p className='text-lg'>Here you can manage your application settings, view analytics, and more.</p>
        </div>
    </div>
  )
}

export default Dashboard