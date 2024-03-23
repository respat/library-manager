// import { Outlet } from "react-router-dom";
import { Sidebar, SidebarItem, TopBar } from "../components";
import { createContext, useContext, useState } from "react";

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

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log("Logged out");
  };
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
            active={true}
            link=""
          />
          <SidebarItem
            icon={<BsArchive size={20} />}
            text="Books"
            link="all-books"
          />
          <SidebarItem
            icon={<BsBarChart size={20} />}
            text="Statistics"
            link="stats"
          />
          <SidebarItem icon={<BsBookmark size={20} />} text="Bookmarks" />
          <SidebarItem icon={<GoInbox size={20} />} text="Inbox" alert={true} />
          <hr className="my-3" />
          <SidebarItem icon={<IoSettingsOutline size={20} />} text="Settings" />
          <SidebarItem icon={<BsInfoLg size={20} />} text="Help" />
        </Sidebar>
        <TopBar />
        <div className="">{/* <Outlet /> */}</div>
      </main>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
