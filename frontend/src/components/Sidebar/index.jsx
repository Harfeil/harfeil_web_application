import React, { use, useState } from "react";
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

// Accept a 'tabs' prop for dynamic sidebar items
function Sidebar({ action, tabs = [] }) {
  const navigate = useNavigate();
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
            Admin Dashboard
          </Typography>
        </div>
        <List className="space-y-1">
          {tabs.map((tab) => (
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
      <Card className="hidden sm:block h-[1200px] w-100 max-w-[20rem] p-6 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-6 p-2">
          <Typography variant="h5" color="blue-gray">
            Admin Dashboard
          </Typography>
        </div>
        <List className="space-y-1">
          {tabs.map((tab) => (
            <ListItem
              key={tab.key || tab.action}
              className={`text-xl ${action === tab.action ? 'font-bold bg-indigo-100' : ''}`}
              onClick={() => navigate(tab.route)}
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
    </>
  );
}

export default Sidebar;