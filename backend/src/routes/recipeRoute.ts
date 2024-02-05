import express from "express";
import {
  getRecipesController,
  getRecipeByIdController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
} from "../controllers/recipeController";

const router = express.Router();

router.get("/api/recipes", getRecipesController);

router.get("/api/recipes/:id", getRecipeByIdController);

router.post("/api/recipes", createRecipeController);

router.put("/api/recipes/:id", updateRecipeController);

router.delete("/api/recipes/:id", deleteRecipeController);

export default router;
