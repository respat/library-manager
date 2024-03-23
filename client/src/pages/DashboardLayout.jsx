import { Outlet } from "react-router-dom";
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
const DashboardContext = createContext();

const DashboardLayout = () => {
  const user = { name: "john" };
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
      value={{ user, showSidebar, toggleSidebar, logoutUser }}
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
