import express from "express";
import {
  createInstructionController,
  findInstructionByRecipeIdController,
  updateInstructionController,
  deleteInstructionController,
} from "../controllers/instructionController";

const router = express.Router();

router.get("/api/instructions/:recipe_id", findInstructionByRecipeIdController);

router.post("/api/create/instruction", createInstructionController);

router.put("/api/update/instruction/:id", updateInstructionController);

router.delete("/api/delete/instruction/:id", deleteInstructionController);

export default router;
