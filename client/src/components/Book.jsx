import { useState, useEffect } from "react";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { EditBook, FormRowSelectUser } from ".";
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
  role,
}) => {
  let color = "";
  if (category == "Mathematics") {
    color = " bg-red-500";
  }
  const [expanded, setExpanded] = useState(false);
  const [book, setBook] = useState(false);
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [dueDate, setDueDate] = useState("");
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
  const handleBorrowBook = async (dueDate) => {
    try {
      await customFetch.patch("/users/borrow-book", {
        bookId: _id,
        userId: selectedUserId,
        dueDate: dueDate,
      });
      toast.success("Book successfully borrowed");
    } catch (error) {
      toast.error("Failed to borrow book");
    }
  };
  const getCurrentUser = async () => {
    try {
      const response = await customFetch.get(`users/current-user`);
      const { data } = response;
      if (data) {
        const role = data.user.role;
        setUserRole(role);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customFetch.get(`users`);
        const { data } = response;
        if (data && data.users.length > 0) {
          const users = data.users.map((user) => ({
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            omId: user.omId,
          }));
          setUsers(users);
          setSelectedUserId(users[0].id);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (userRole === "admin") {
      const today = new Date();
      const nextMonth = new Date(today.setMonth(today.getMonth() + 1))
        .toISOString()
        .split("T")[0];
      setDueDate(nextMonth);
      fetchUsers();
    }
  }, [userRole]);
  const handleUserChange = (e) => {
    setSelectedUserId(e.target.value);
  };
  return (
    <div
      className={`flex h-48  ${
        expanded || book ? "h-min" : "h-48"
      } p-4 m-4 border rounded-md w-max-full bg-white shadow-sm `}
    >
      <div className="flex flex-col  ">
        <div className=" gap-5 h-40 p-2 flex items-center">
          <div
            className={`w-24 h-28 md:w-28 md:h-32 flex justify-center items-center bg-emerald-400 rounded-md ${color}`}
          >
            <h1 className=" font-bold text-3xl text-white opacity-80">
              {title.charAt(0)}
            </h1>
          </div>
          <div className="flex h-full w-full ">
            <div className="flex flex-col">
              <h1 className="font-semibold md:text-xl opacity-95 w-10/12">
                {title} ({year})
              </h1>
              <p className=" font-medium text-sm opacity-70">{author}</p>
              <p className=" font-medium text-sm opacity-70">{ISBN}</p>
              <p className=" font-medium text-sm opacity-70">{publisher}</p>
            </div>{" "}
            {userRole === "admin" && (
              <div className="flex flex-col lg:flex-row gap-3">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="w-9 h-9 border hover:bg-yellow-200 hover:border-yellow-300 hover:shadow-yellow-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm"
                >
                  <RiEditLine className="opacity-80" />
                </button>

                <button
                  onClick={() => setBook(!book)}
                  className="w-9 h-9 border font-semibold text-xl hover:bg-yellow-200 hover:border-yellow-300 hover:shadow-yellow-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm"
                >
                  +
                </button>
                <button
                  onClick={handleDelete}
                  className="w-9 h-9 border hover:bg-red-300 hover:border-red-400 hover:shadow-red-300 hover:shadow-md rounded-md flex justify-center items-center shadow-sm"
                >
                  <RiDeleteBin6Line className="opacity-80" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`flex flex-col p-8 ${book ? "flex w-full" : "hidden"}`}>
          <FormRowSelectUser
            name="selectedUser"
            labelText={"Select User"}
            className="w-full"
            list={users}
            defaultValue={selectedUserId}
            onChange={handleUserChange}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className=" mt-4 p-2 border rounded"
            required
            defaultValue={dueDate}
          />
          <button
            onClick={() => handleBorrowBook(new Date().toISOString())}
            className="mt-4 p-2 bg-emerald-400 text-white rounded"
          >
            Borrow Book
          </button>
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
  category: PropTypes.string,
  quantity: PropTypes.number,
  ISBN: PropTypes.number,
};
export default Book;
