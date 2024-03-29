import express from "express";
import {
  createRecipeController,
  deleteRecipeController,
  findRecipeByIdController,
  findRecipesController,
  updateRecipeController,
} from "../controllers/recipe.controller";

const router = express.Router();

router.post("/api/recipe", createRecipeController);

router.get("/api/recipes", findRecipesController);

router.get("/api/recipe/:id", findRecipeByIdController);

router.put("/api/recipe", updateRecipeController);

router.delete("/api/recipe/:id", deleteRecipeController);

export default router;
