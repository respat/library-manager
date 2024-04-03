import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { Sidebar, SidebarItem, TopBar } from "../components";
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import {
  BsBookmark,
  BsColumns,
  BsArchive,
  BsBarChart,
  BsInfoLg,
} from "react-icons/bs";
import { GoInbox } from "react-icons/go";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("users/current-user");
    console.log(data);
    return data;
  } catch (error) {
    return redirect("/");
  }
};
const DashboardContext = createContext();

const DashboardLayout = () => {
  // const { user } = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log("Logged out");
  };
  const isActive = (path) => location.pathname === path;

  return (
    <DashboardContext.Provider
      value={{ showSidebar, toggleSidebar, logoutUser }}
    >
      {/* <Navbar /> */}
      <main className="w-full flex">
        <Sidebar>
          <SidebarItem
            icon={<BsColumns size={20} />}
            text="Dashboard"
            active={isActive("/dashboard")}
            link=""
          />
          <SidebarItem
            icon={<BsArchive size={20} />}
            text="Books"
            link="all-books"
            active={isActive("/dashboard/all-books")}
          />
          <SidebarItem
            icon={<BsBarChart size={20} />}
            text="Statistics"
            link="stats"
            active={isActive("/dashboard/stats")}
          />
          <SidebarItem icon={<BsBookmark size={20} />} text="Bookmarks" />
          <SidebarItem icon={<GoInbox size={20} />} text="Inbox" alert={true} />
          <hr className="my-3" />
          <SidebarItem icon={<IoSettingsOutline size={20} />} text="Settings" />
          <SidebarItem icon={<BsInfoLg size={20} />} text="Help" />
        </Sidebar>

        <div className="w-full">
          <TopBar />
          <div className="w-full p-10">
            <Outlet />
          </div>
        </div>
      </main>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
