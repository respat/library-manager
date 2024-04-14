import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import customFetch from "../utils/customFetch";

const BorrowedBook = ({ borrowDate, dueDate, bookId }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await customFetch.get(`books/${bookId}`);
        const { data } = response;
        if (data) {
          setTitle(data.book.title);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBook();
  }, [bookId]);

  return (
    <div className="border p-2 m-2 rounded-md bg-gray-100 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">Borrow date: {formatDate(borrowDate)}</p>
      <p className="text-sm">Due date: {formatDate(dueDate)}</p>
    </div>
  );
};

BorrowedBook.propTypes = {
  title: PropTypes.string,
  borrowDate: PropTypes.string,
  dueDate: PropTypes.string,
  isExpired: PropTypes.bool,
};

export default BorrowedBook;
