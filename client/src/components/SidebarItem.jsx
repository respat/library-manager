import PropTypes from "prop-types";
import { useSidebarContext } from "./Sidebar";
import { Link } from "react-router-dom";
const SidebarItem = ({ icon, text, active, alert, link }) => {
  const { expanded } = useSidebarContext();
  return (
    <Link to={link}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors
      ${
        active
          ? " bg-gradient-to-tr from-emerald-300 to-emerald-200"
          : "hover:bg-emerald-300 text-black/80"
      }`}
      >
        {icon}
        <span
          className={`overflow-hidden trasition-all duration-100 ${
            expanded ? "w-52 ml-2" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div className="relative flex h-2 w-2">
            <div
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-orange-400 ${
                expanded ? "" : "right-2 top-[-5px]"
              }`}
            ></div>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 bg-orange-500 ${
                expanded ? "" : "right-2 top-[-5px]"
              }`}
            ></span>
          </div>
        )}
      </li>
    </Link>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  alert: PropTypes.bool,
  active: PropTypes.any,
  link: PropTypes.string,
};

export default SidebarItem;
