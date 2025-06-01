import { UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { handleLogout } from "../../services/ApiServices";

export const adminSidebarTabs = [
  { label: "Dashboard", route: "/dashboard", action: "dashboard", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Library", route: "/library", action: "libraryPage", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Staff", route: "/staff", action: "staffPage", icon: <Cog6ToothIcon className="h-5 w-5" /> },
  {
    label: "Log Out",
    action: "logout",
    icon: <PowerIcon className="h-5 w-5" />,
    onClick: handleLogout
  }
];

export const staffSidebarTabs = [
  { label: "Dashboard", route: "/dashboard", action: "dashboard", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Book", route: "/bookManagement", action: "bookManagement", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Borrow Books", route: "/borrowerBookPage", action: "borrowManagement", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Borrower Management", route: "/studentManagement", action: "studentManagement", icon: <UserCircleIcon className="h-5 w-5" /> },
  {
    label: "Log Out",
    action: "logout",
    icon: <PowerIcon className="h-5 w-5" />,
    onClick: (navigate) => {
      // clear localStorage or other logout logic
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect to login page
      navigate("/");
    },
  },
];

export const BorrowerSidebarTabs = [
  { label: "Dashboard", route: "/dashboard", action: "dashboard", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Book", route: "/bookList", action: "bookList", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Borrowed Books", route: "/borrowedBooks", action: "borrowedBooks", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Profile", route: "/profile", action: "borrowerProfile", icon: <UserCircleIcon className="h-5 w-5" /> },
  {
    label: "Log Out",
    action: "logout",
    icon: <PowerIcon className="h-5 w-5" />,
    onClick: (navigate) => {
      // clear localStorage or other logout logic
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect to login page
      navigate("/");
    },
  },
]