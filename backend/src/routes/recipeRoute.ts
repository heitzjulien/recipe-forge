import express from "express";
import {
  findRecipeByIdController,
  findRecipeController,
  updateRecipeController,
  createRecipeController,
  deleteRecipeController,
} from "../controllers/recipeController";

const router = express.Router();

router.get("/api/recipes", findRecipeController);

router.get("/api/recipe/:id", findRecipeByIdController);

router.post("/api/create/recipe", createRecipeController);

router.put("/api/update/recipe/:id", updateRecipeController);

router.delete("/api/delete/recipe/:id", deleteRecipeController);

export default router;
