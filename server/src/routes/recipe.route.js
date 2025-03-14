import { Router } from "express";
import {
  getAllRecipes,
  createRecipe,
  savedRecipe,
  getSavedRecipe,
  getIdsOfSavedRecipes,
  getUserRecipes,
  deleteUserRecipes,
  updateUserRecipe,
  removeSaveRecipe,
  getRecipeById,
  getRecipesByCategory,
  getRandomRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();

router.route("/").get(getAllRecipes);
router.route("/create").post(createRecipe);
router.route("/save").put(savedRecipe);
router.route("/random").get(getRandomRecipe);
router.route("/savedRecipes/ids/:userId").get(getIdsOfSavedRecipes);
router.route("/savedRecipes/:userId").get(getSavedRecipe);
router.route("/userRecipes/:userId").get(getUserRecipes);
router.route("/:id").get(getRecipeById);
router.route("/delete/:recipeId").delete(deleteUserRecipes);
router.route("/update/:recipeId").put(updateUserRecipe);
router.route("/removeSaved/:recipeId/:userId").put(removeSaveRecipe);
router.route("/category/:categoryId").get(getRecipesByCategory);

export default router;
