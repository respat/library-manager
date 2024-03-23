import { Router } from "express";
const router = Router();

import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);

export default router;
