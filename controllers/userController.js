import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Book from "../models/BookModel.js";

export const getAppStats = async (req, res) => {
  const users = await User.countDocuments();
  const books = await Book.countDocuments();
  res.status(StatusCodes.OK).json({ users, books });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(StatusCodes.OK).json({ user });
};
export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  console.log(obj);
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};

export const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "user deleted", user: deletedUser });
};

export const addBorrowedBook = async (req, res) => {
  const { userId, bookId, borrowDate, dueDate } = req.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User or book not found" });
    }

    const isBookAlreadyBorrowed = user.borrowedBooks.some(
      (borrowedBook) => borrowedBook.bookId.toString() === bookId
    );

    if (isBookAlreadyBorrowed) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Book is already borrowed by this user" });
    }

    // Hozzáadás a kölcsönzött könyvekhez
    const borrowedBook = {
      bookId,
      borrowDate: new Date(borrowDate),
      dueDate: new Date(dueDate),
    };
    user.borrowedBooks.push(borrowedBook);

    await user.save();
    res
      .status(StatusCodes.OK)
      .json({ message: "Book added to borrowed books", user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error adding book to borrowed books",
      error: error.message,
    });
  }
};

export const returnBooks = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    const bookIndex = user.borrowedBooks.findIndex(
      (borrowedBook) => borrowedBook.bookId.toString() === bookId
    );

    if (bookIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Book not found in the user's borrowed books" });
    }
    user.borrowedBooks.splice(bookIndex, 1);

    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "Book returned successfully", user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error returning the book",
      error: error.message,
    });
  }
};
