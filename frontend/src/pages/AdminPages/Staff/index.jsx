import React from 'react'
import Sidebar from '../../../components/Sidebar'
import { adminSidebarTabs } from '../../../components/Sidebar/SideBarItems'

const Staff = () => {
  return (
    <Sidebar action={"staffPage"} tabs={adminSidebarTabs}/>
  )
}

export default Staff