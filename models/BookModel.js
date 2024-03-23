import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    year: Date,
    publisher: String,
    ISBN: Number,
    quantity: Number,
    category: {
      type: String,
      enum: ["Category 1", "Category 2", "Category 2"],
      default: "Category 1",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);
