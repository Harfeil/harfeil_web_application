import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { adminSidebarTabs, staffSidebarTabs, BorrowerSidebarTabs } from "./SideBarItems";
import { handleLogout } from "../../services/ApiServices";

// Accept a 'tabs' prop for dynamic sidebar items
function Sidebar({ action, tabs = [] }) {
  const navigate = useNavigate();
  // Remove sidebarContent state and logic that sets state during render
  const [role, setRole] = useState('')
      
      useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userRole = user?.role;
        setRole(userRole);
      }, []);

  // Determine which tabs to use based on role
  let sideBarTitle ="";
  let sidebarTabs = [];
  switch (role) {
    case 'admin':
      sidebarTabs = adminSidebarTabs;
      sideBarTitle = "Admin Dashboard";
      break;
    case 'staff':
      sidebarTabs = staffSidebarTabs;
      sideBarTitle = "Staff Dashboard";
      break;
    case 'student':
      sidebarTabs = BorrowerSidebarTabs;
      sideBarTitle = "Student Dashboard";
      break;
    case 'teacher':
      sidebarTabs = BorrowerSidebarTabs;
      sideBarTitle = "Teacher Dashboard";
      break;
    default:
      sidebarTabs = [];
      break;
  }

  console.log("Sidebar Tabs:", sideBarTitle);
  console.log(localStorage.getItem("role"));
  const [open, setOpen] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  // Hamburger button for mobile
  const Hamburger = (
    <button
      className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white shadow"
      onClick={() => setShowSidebar(true)}
      aria-label="Open sidebar"
    >
      <Bars3Icon className="h-7 w-7 text-gray-700" />
    </button>
  );

  // Overlay and sidebar for mobile
  const MobileSidebar = showSidebar && (
    <div className="fixed inset-0 z-40 flex">
      <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowSidebar(false)}></div>
      <Card className="relative h-full w-64 max-w-[80vw] p-6 shadow-xl shadow-blue-gray-900/5 bg-white">
        <button
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
          onClick={() => setShowSidebar(false)}
          aria-label="Close sidebar"
        >
          <XMarkIcon className="h-6 w-6 text-gray-700" />
        </button>
        <div className="mb-6 p-2">
          <Typography variant="h5" color="blue-gray">
           {sideBarTitle}
          </Typography>
        </div>
        <List className="space-y-1">
          {sidebarTabs.map((tab) => (
            <ListItem
              key={tab.key || tab.action}
              className={`text-xl ${action === tab.action ? 'font-bold bg-indigo-100' : ''}`}
              onClick={() => { setShowSidebar(false); navigate(tab.route); }}
              style={{ backgroundColor: action === tab.action ? '#D3D3D3' : 'transparent' }}
            >
              <ListItemPrefix>
                {tab.icon}
              </ListItemPrefix>
              {tab.label}
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );

  return (
    <>
      {Hamburger}
      {MobileSidebar}
      <Card className="hidden sm:block h-[985px] w-100 max-w-[20rem] p-6 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-6 p-2">
          <Typography variant="h5" color="blue-gray">
            {sideBarTitle}
          </Typography>
        </div>
        <List className="space-y-1">
          {sidebarTabs.map((tab) => (
            <ListItem
              key={tab.key || tab.action}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
                transition-colors duration-200
                ${action === tab.action
                  ? "bg-indigo-100 text-indigo-700 font-bold shadow"
                  : "hover:bg-gray-100 text-gray-700"
                }
              `}
              onClick={() => {
                if (tab.action === "logout") {
                  handleLogout(navigate);
                } else {
                  navigate(tab.route);
                }
              }}
              style={{ backgroundColor: action === tab.action ? "#E0E7FF" : "transparent" }}
            >
              <ListItemPrefix>{tab.icon}</ListItemPrefix>
              <span className="truncate">{tab.label}</span>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}

export default Sidebar;