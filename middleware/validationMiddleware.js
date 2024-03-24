import { body, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
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
