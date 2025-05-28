import React from 'react'
import { adminSidebarTabs } from '../../../components/Sidebar/SideBarItems'
const BookPage = () => {
  return (
    <Sidebar action={"bookPage"} tabs={adminSidebarTabs}/>
  )
}

export default BookPage