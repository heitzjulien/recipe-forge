import express from "express";
import {
  getInstructionsController,
  getInstructionByIdController,
  getInstructionByRecipeId,
  createInstructionController,
  updateInstructionController,
  deleteInstructionController,
} from "../controllers/instructionController";

const router = express.Router();

router.get("/api/instructions", getInstructionsController);

router.get("/api/instructions/:id", getInstructionByIdController);

router.get("/api/instructions/recipe/:recipe_id", getInstructionByRecipeId);

router.post("/api/instructions", createInstructionController);

router.put("/api/instructions/:id", updateInstructionController);

router.delete("/api/instructions/:id", deleteInstructionController);

export default router;
