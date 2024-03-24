import { StatusCodes } from "http-status-codes";
import Book from "../models/BookModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  res.status(StatusCodes.OK).json({ books });
};

export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(StatusCodes.CREATED).json({ book });
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) throw new NotFoundError(`no book with id ${id}`);
  res.status(StatusCodes.OK).json({ book });
};
export const updateBook = async (req, res) => {
  const { id } = req.params;
  const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedBook) throw new NotFoundError(`no book with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "book updated", book: updatedBook });
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) throw new NotFoundError(`no book with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "book deleted", book: deletedBook });
};
