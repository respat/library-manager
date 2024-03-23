import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";

import { FiMenu } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";
import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

const Sidebar = ({ children }) => {
  const data = useDashboardContext();
  console.log(data);
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="h-screen">
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Logo
            style={`overflow-hidden transition-all duration-100 opacity-80 ${
              expanded ? " h-7" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <BsArrowLeft size={20} className=" text-3xl" />
            ) : (
              <FiMenu className=" text-3xl " />
            )}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </div>
  );
};
Sidebar.propTypes = {
  children: PropTypes.any,
};
export const useSidebarContext = () => useContext(SidebarContext);
export default Sidebar;
