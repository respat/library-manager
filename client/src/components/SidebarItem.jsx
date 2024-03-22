import PropTypes from "prop-types";
import { useSidebarContext } from "./Sidebar";
const SidebarItem = ({ icon, text, active, alert }) => {
  const { expanded } = useSidebarContext();
  return (
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
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-300 ${
              expanded ? "" : "right-2 top-[-5px]"
            }`}
          ></div>
          <span
            className={`relative inline-flex rounded-full h-2 w-2 bg-emerald-400 ${
              expanded ? "" : "right-2 top-[-5px]"
            }`}
          ></span>
        </div>
      )}
    </li>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  alert: PropTypes.boolean,
  active: PropTypes.boolean,
};

export default SidebarItem;
