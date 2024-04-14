import { useState, useEffect } from "react";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import PropTypes from "prop-types";
import BorrowedBook from "./BorrowedBook";

const User = ({ _id, name, lastName, omId, email, borrowedBooks, role }) => {
  const [expanded, setExpanded] = useState(() => {
    const saved = localStorage.getItem("expanded");
    return saved === "true" ? true : false;
  });
  useEffect(() => {
    localStorage.setItem("expanded", expanded);
  }, [expanded]);
  return (
    <div
      className={`flex h-48  ${
        expanded ? "h-min" : "h-48"
      } p-4 m-4 border rounded-md w-full bg-white shadow-sm `}
    >
      <div className="flex flex-col  ">
        <div className=" gap-5 h-40 p-4 flex items-center">
          <div
            className={`w-40 h-32 flex justify-center items-center bg-emerald-400 rounded-md `}
          >
            <h1 className=" font-bold text-3xl text-white opacity-80">
              {lastName.charAt(0) + name.charAt(0)}
            </h1>
          </div>
          <div className="flex h-full p-2 w-full justify-between ">
            <div className="flex flex-col w-full justify-between">
              <div className="flex-col flex">
                <h1 className="font-semibold text-xl opacity-95 w-10/12">
                  {lastName + " " + name}
                </h1>
                <p className=" font-medium text-sm opacity-70">{omId}</p>
              </div>
              <p className=" font-medium text-sm opacity-70">{email}</p>
              <p className=" font-medium text-sm opacity-70">{}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-9 h-9 border hover:bg-yellow-200 hover:border-yellow-300 hover:shadow-yellow-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm"
              >
                <RiArrowDropDownLine className="opacity-80" />
              </button>
              <button className="w-9 h-9 border hover:bg-red-300 hover:border-red-400 hover:shadow-red-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm">
                <RiDeleteBin6Line className="opacity-80" />
              </button>
            </div>
          </div>
        </div>
        <div className={`flex flex-col ${expanded ? "flex" : "hidden"}`}>
          {borrowedBooks.length > 0 ? (
            borrowedBooks.map((book) => (
              <BorrowedBook
                key={book.bookId}
                bookId={book.bookId}
                title={book.title}
                userId={_id}
                borrowDate={book.borrowDate}
                dueDate={book.dueDate}
                isExpired={book.isExpired}
                expanded={expanded}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center my-2">
              No borrowed books
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
