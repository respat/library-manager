import { StatusCodes } from "http-status-codes";
import Book from "../models/BookModel.js";

export const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  res.status(200).json({ books });
};

export const createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ book });
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ msg: `no book with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ book });
};
export const updateBook = async (req, res) => {
  const { id } = req.params;
  const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedBook) {
    return res.status(404).json({ msg: `no book with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ msg: "book updated", book: updatedBook });
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    return res.status(404).json({ msg: `no book with id ${id}` });
  }
  res.status(200).json({ msg: "book deleted", book: deletedBook });
};
