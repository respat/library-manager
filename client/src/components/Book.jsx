import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import { BsArchive } from "react-icons/bs";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from "prop-types";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import BookInfo from "./BookInfo";
day.extend(advancedFormat);
export const Book = ({
  _id,
  title,
  author,
  year,
  publisher,
  ISBN,
  quantity,
  category,
}) => {
  let color = "";
  if (category == "Mathematics") {
    color = " bg-red-500";
  }
  return (
    <div className="flex-col">
      <div className="flex gap-5 m-4 p-4 border shadow-sm rounded-md ">
        <div
          className={`w-24 h-28 rounded shadow-sm bg-emerald-400 flex justify-center items-center ${color} `}
        >
          <h1 className=" font-bold text-3xl text-white opacity-80">
            {title.charAt(0)}
          </h1>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <h1 className="font-semibold text-xl opacity-95 w-10/12">
              {title} ({year})
            </h1>
            <p className=" font-medium text-sm opacity-70">{author}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex gap-3">
              <button className="w-9 h-9 border hover:bg-yellow-200 hover:border-yellow-300 hover:shadow-yellow-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm">
                <RiEditLine className="opacity-80" />
              </button>
              <button className="w-9 h-9 border hover:bg-red-300 hover:border-red-400 hover:shadow-red-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm">
                <RiDeleteBin6Line className="opacity-80" />
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

Book.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.object,
  author: PropTypes.string,
  ISBN: PropTypes.number,
  year: PropTypes.number,
  quantity: PropTypes.number,
  publisher: PropTypes.string,
  category: PropTypes.string,
};
export default Book;
