import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Sidebar, SidebarItem, TopBar } from "../components";
import { toast } from "react-toastify";
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
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
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logged out.");
  };
  const isActive = (path) => location.pathname === path;

  return (
    <DashboardContext.Provider
      value={{ showSidebar, toggleSidebar, logoutUser }}
    >
      <main className="w-full flex overflow-hidden">
        <Sidebar>
          {/* {user.role === "admin" && (
            <SidebarItem
              icon={<BsColumns size={20} />}
              text="Dashboard"
              active={isActive("/dashboard")}
              link=""
            />
          )} */}

          <SidebarItem
            icon={<BsArchive size={20} />}
            text="Books"
            link="all-books"
            active={isActive("/dashboard/all-books")}
          />
          {user.role === "admin" && (
            <SidebarItem
              icon={<FiUsers size={20} />}
              text="Users"
              link="all-users"
              active={isActive("/dashboard/all-users")}
            />
          )}
        </Sidebar>
        <div className="w-full">
          <TopBar user={user.lastName + " " + user.name} />
          <div className="">
            <Outlet />
          </div>
        </div>
      </main>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
