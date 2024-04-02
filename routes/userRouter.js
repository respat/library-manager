import { Router } from "express";
const router = Router();

import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  getAppStats,
} from "../controllers/userController.js";
import {
  validateAdmin,
  validateUpdateUserInput,
  validateUserIdParam,
} from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

router.route("/").get(authorizePermissions("admin"), getAllUsers);
router.get("/current-user", getCurrentUser);
router.get("/app-stats", [authorizePermissions("admin"), getAppStats]);
router.patch("/update-user", validateUpdateUserInput, updateUser);
// router.patch("/borrow-book", [authorizePermissions("admin"), addBorrowedBook]);
router
  .route("/:id")
  .get(validateUserIdParam, getUser)
  .delete(validateUserIdParam, deleteUser);

export default router;
