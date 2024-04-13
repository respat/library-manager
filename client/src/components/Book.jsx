import { useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { EditBook } from ".";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const Book = ({
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
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await customFetch.delete(`books/${_id}`);
      toast.success("Book deleted successfully");
      navigate("/dashboard/all-books");
    } catch (error) {
      toast.error(error?.response.data);
    }
  };
  return (
    <div
      className={`flex h-48  ${
        expanded ? "h-min" : "h-48"
      } p-4 m-4 border rounded-md w-full bg-white shadow-sm `}
    >
      <div className="flex flex-col  ">
        <div className=" gap-5 h-40 p-4 flex items-center">
          <div
            className={`w-28 h-32 flex justify-center items-center bg-emerald-400 rounded-md ${color}`}
          >
            <h1 className=" font-bold text-3xl text-white opacity-80">
              {title.charAt(0)}
            </h1>
          </div>
          <div className="flex h-full p-2 w-full ">
            <div className="flex flex-col">
              <h1 className="font-semibold text-xl opacity-95 w-10/12">
                {title} ({year})
              </h1>
              <p className=" font-medium text-sm opacity-70">{author}</p>
              <p className=" font-medium text-sm opacity-70">{ISBN}</p>
              <p className=" font-medium text-sm opacity-70">{publisher}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-9 h-9 border hover:bg-yellow-200 hover:border-yellow-300 hover:shadow-yellow-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm"
              >
                <RiEditLine className="opacity-80" />
              </button>
              <button
                onClick={handleDelete}
                className="w-9 h-9 border hover:bg-red-300 hover:border-red-400 hover:shadow-red-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm"
              >
                <RiDeleteBin6Line className="opacity-80" />
              </button>
            </div>
          </div>
        </div>
        <div className={`flex  ${expanded ? "flex" : "hidden"}`}>
          <EditBook
            id={_id}
            title={title}
            author={author}
            year={year}
            ISBN={ISBN}
            publisher={publisher}
            category={category}
            quantity={quantity}
          />
        </div>
      </div>
    </div>
  );
};
Book.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  year: PropTypes.number,
  publisher: PropTypes.string,
  category: PropTypes.array,
  quantity: PropTypes.number,
  ISBN: PropTypes.number,
};
export default Book;
