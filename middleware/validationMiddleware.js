import { body, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { BOOK_CATEGORIES } from "../utils/constants.js";
import mongoose from "mongoose";
import { param } from "express-validator";
import Book from "../models/BookModel.js";
import User from "../models/UserModel.js";
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no book")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this page");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateBookInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("author").notEmpty().withMessage("author is required"),
  body("publisher").notEmpty().withMessage("pubisher is required"),
  body("ISBN").notEmpty().withMessage("ISBN is required"),
  body("category")
    .isIn(Object.values(BOOK_CATEGORIES))
    .withMessage("Invalid book category"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const book = await Book.findById(value);
    if (!book) throw new NotFoundError(`no book with id ${id}`);
  }),
]);

export const validateUserIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const user = await User.findById(value);
    if (!user) throw new NotFoundError(`no user with id ${id}`);
    const isAdmin = req.user.role === "admin";
    const isSelf = req.user.userId === value;
    if (!isAdmin && !isSelf)
      throw new UnauthorizedError("not authorized to access this page");
  }),
]);

export const validateAdmin = withValidationErrors([
  param().custom(async (value, { req }) => {
    const isAdmin = req.user.role === "admin";
    const isSelf = req.user.userId === value;
    if (!isAdmin && !isSelf)
      throw new UnauthorizedError("not authorized to access this page");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("omId").notEmpty().withMessage("OM id is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("must be at least 8 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),

  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("omId").notEmpty().withMessage("OM id is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
]);

export const validateBorrowedBookInput = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid User ID format"),
  body("bookId")
    .notEmpty()
    .withMessage("Book ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Book ID format"),
  body("borrowDate")
    .notEmpty()
    .withMessage("Borrow date is required")
    .isISO8601()
    .withMessage("Borrow date must be a valid date in YYYY-MM-DD format"),
  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date in YYYY-MM-DD format")
    .custom((value, { req }) => {
      return new Date(value) > new Date(req.body.borrowDate);
    })
    .withMessage("Due date must be after borrow date"),
];
