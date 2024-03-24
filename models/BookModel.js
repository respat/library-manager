import mongoose from "mongoose";
import { BOOK_CATEGORIES } from "../utils/constants.js";

const BookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    year: Number,
    publisher: String,
    ISBN: Number,
    quantity: Number,
    category: {
      type: String,
      enum: Object.values(BOOK_CATEGORIES),
      default: Object.values(BOOK_CATEGORIES.OTHER),
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);
