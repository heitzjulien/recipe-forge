import express from "express";
import {
  getRecipesController,
  getRecipeByIdController,
  createRecipeController,
} from "../controllers/recipeController";

const router = express.Router();

router.get("/api/recipes", getRecipesController);

router.get("/api/recipes/:id", getRecipeByIdController);

router.post("/api/recipes", createRecipeController);

export default router;
