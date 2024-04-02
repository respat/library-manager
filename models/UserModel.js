import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  omId: Number,
  name: String,
  email: String,
  password: String,
  lastName: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  bookmarkedBooks: {
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  },
  borrowedBooks: {
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
    borrowDate: Date,
    dueDate: Date,
  },
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
