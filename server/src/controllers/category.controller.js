import { Category } from "../models/category.model.js"; // Ensure the correct import path
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Create a new category
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name, order } = req.body;

  if (!name || order === undefined) {
    throw new ApiError(400, "Category name and order are required");
  }

  const existingCategory = await Category.findOne({ order });
  if (existingCategory) {
    throw new ApiError(400, "Category order must be unique");
  }

  const category = await Category.create({ name, order });

  res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

/**
 * Get all categories
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ order: 1 });

  res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

/**
 * Get a single category by ID
 */
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully"));
});

/**
 * Update a category
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, order } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { name, order },
    { new: true, runValidators: true }
  );

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully"));
});

/**
 * Delete a category
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully"));
});

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
