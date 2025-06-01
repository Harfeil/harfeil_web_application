import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  BookOpenIcon,
  UsersIcon,
  BuildingLibraryIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  HomeIcon
} from "@heroicons/react/24/solid";
import { handleLogout } from "../../services/ApiServices";

// 🔐 Admin Tabs
export const adminSidebarTabs = [
  {
    label: "Staff",
    route: "/staff",
    action: "staffPage",
    icon: <UsersIcon className="h-5 w-5" />
  },
  {
    label: "Library",
    route: "/library",
    action: "libraryPage",
    icon: <BuildingLibraryIcon className="h-5 w-5" />
  },
  {
    label: "Log Out",
    action: "logout",
    icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
    onClick: handleLogout
  }
];

// 👩‍💼 Staff Tabs
export const staffSidebarTabs = [
  {
    label: "Book",
    route: "/bookManagement",
    action: "bookManagement",
    icon: <BookOpenIcon className="h-5 w-5" />
  },
  {
    label: "Borrow Books",
    route: "/borrowerBookPage",
    action: "borrowManagement",
    icon: <ClipboardDocumentListIcon className="h-5 w-5" />
  },
  {
    label: "Borrower Management",
    route: "/studentManagement",
    action: "studentManagement",
    icon: <UsersIcon className="h-5 w-5" />
  },
  {
    label: "Log Out",
    action: "logout",
    icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
    onClick: (navigate) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    },
  },
];

// 👤 Borrower Tabs
export const BorrowerSidebarTabs = [
  {
    label: "Book",
    route: "/bookList",
    action: "bookList",
    icon: <BookOpenIcon className="h-5 w-5" />
  },
  {
    label: "Borrowed Books",
    route: "/borrowedBooks",
    action: "borrowedBooks",
    icon: <ClipboardDocumentListIcon className="h-5 w-5" />
  },
  {
    label: "Profile",
    route: "/profile",
    action: "borrowerProfile",
    icon: <UserIcon className="h-5 w-5" />
  },
  {
    label: "Log Out",
    action: "logout",
    icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
    onClick: (navigate) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    },
  },
];
