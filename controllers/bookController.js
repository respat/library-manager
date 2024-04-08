import { StatusCodes } from "http-status-codes";
import Book from "../models/BookModel.js";

export const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  res.status(StatusCodes.OK).json({ books });
};

export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(StatusCodes.CREATED).json({ book });
};

export const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(StatusCodes.OK).json({ book });
};
export const updateBook = async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "book updated", book: updatedBook });
};

export const deleteBook = async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "book deleted", book: deletedBook });
};
