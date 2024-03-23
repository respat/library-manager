import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";

let books = [
  {
    id: nanoid(),
    title: "Cim",
    author: "valami",
  },
  {
    id: nanoid(),
    title: "Cim2",
    author: "valami2",
  },
];

dotenv.config();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working...");
});

//Get all
app.get("/api/books", (req, res) => {
  res.status(200).json({ books });
});
//Create Job
app.post("/api/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ msg: "provide all data" });
  }
  const id = nanoid(10);
  const book = { id, title, author };
  books.push(book);
  res.status(200).json({ books });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}...`);
});
