import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import { useState } from "react";
import Dropdown from "./Dropdown";

const TopBar = ({ user }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="w-full flex h-16 shadow-sm">
      <div className="flex w-full justify-end items-center mx-6 ">
        <div className="relative flex items-center py-1 px-2 border rounded-lg">
          <img
            src={`https://ui-avatars.com/api/?name=${user}&rounded=true&background=0D8ABC`}
            className="rounded-full w-8 h-8 mr-2"
            alt=""
          />
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              <h4 className="font-semibold ">{user}</h4>
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-2 rounded-lg "
              >
                {expanded ? (
                  <MdOutlineArrowDropUp size={20} className="opacity-80" />
                ) : (
                  <MdOutlineArrowDropDown size={20} className="opacity-80" />
                )}
              </button>
            </div>
          </div>
          {expanded ? (
            <Dropdown
              style={` transition ease-in-out delay-700 duration-300`}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  user: PropTypes.any,
};

export default TopBar;
