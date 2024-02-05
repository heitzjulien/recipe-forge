import express from "express";
import { getRecipesController } from "../controllers/recipeController";

const router = express.Router();

router.get("/api/recipes", getRecipesController);

export default router;
