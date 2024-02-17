import express from "express";
import {
  createRecipeController,
  deleteRecipeController,
  findRecipeByIdController,
  findRecipesController,
  updateRecipeController,
} from "../controllers/recipe.controller";

const router = express.Router();

router.post("/api/create/recipe", createRecipeController);

router.get("/api/recipes", findRecipesController);

router.get("/api/recipe/:id", findRecipeByIdController);

router.put("/api/update/recipe", updateRecipeController);

router.delete("/api/delete/recipe", deleteRecipeController);

export default router;
