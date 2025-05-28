import { UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";

export const adminSidebarTabs = [
  { label: "Dashboard", route: "/dashboard", action: "dashboard", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Library", route: "/library", action: "libraryPage", icon: <UserCircleIcon className="h-5 w-5" /> },
  { label: "Staff", route: "/staff", action: "staffPage", icon: <Cog6ToothIcon className="h-5 w-5" /> },
  { label: "Log Out", route: "/", action: "logout", icon: <PowerIcon className="h-5 w-5" /> },
];