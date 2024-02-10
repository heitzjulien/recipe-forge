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

router.get("/api/recipes/:id", findRecipeByIdController);

router.post("/api/recipes", createRecipeController);

router.put("/api/recipes/:id", updateRecipeController);

router.delete("/api/recipes/:id", deleteRecipeController);

export default router;
