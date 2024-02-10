import express from "express";
import {
  createIngredientController,
  findIngredientByIdController,
  updateIngredientController,
  deleteIngredientController,
} from "../controllers/ingredientController";

const router = express.Router();

router.get("/api/ingredients", findIngredientByIdController);

router.post("/api/create/ingredient", createIngredientController);

router.put("/api/update/ingredient/:id", updateIngredientController);

router.delete("/api/delete/ingredient/:id", deleteIngredientController);

export default router;
