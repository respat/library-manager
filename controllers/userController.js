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
