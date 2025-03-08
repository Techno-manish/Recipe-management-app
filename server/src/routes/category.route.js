import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

// Get all categories
router.route("/").get(getCategories);

// Create a new category
router.route("/create").post(createCategory);

// Get a single category by ID
router.route("/:id").get(getCategoryById);

// Update a category
router.route("/update/:id").put(updateCategory);

// Delete a category
router.route("/delete/:id").delete(deleteCategory);

export default router;
