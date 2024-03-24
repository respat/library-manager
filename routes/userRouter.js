import { Router } from "express";
const router = Router();

import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { validateUserIdParam } from "../middleware/validationMiddleware.js";

router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(validateUserIdParam, getUser)
  .delete(validateUserIdParam, deleteUser);

export default router;
