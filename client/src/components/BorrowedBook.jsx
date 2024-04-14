import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const BorrowedBook = ({ borrowDate, dueDate, bookId, userId }) => {
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
  const handleReturnBook = async () => {
    try {
      await customFetch.patch("/users/return-book", {
        userId: userId,
        bookId: bookId,
      });
      toast.success("Book successfully returned");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to return book");
    }
  };
  return (
    <div className="border p-2 m-2 rounded-md bg-gray-100 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">Borrow date: {formatDate(borrowDate)}</p>
      <p className="text-sm">Due date: {formatDate(dueDate)}</p>
      <button
        onClick={handleReturnBook}
        className="mt-2 p-2 bg-emerald-400 text-white rounded-md"
      >
        Return Book
      </button>
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
