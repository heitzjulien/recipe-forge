import { NextFunction, Request, Response } from "express";
import {
  createInstruction,
  findInstructionByRecipeId,
  updateInstruction,
  deleteInstruction,
} from "../models/instructionModel";

export async function createInstructionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { recipe_id, step_number, description } = req.body;
    const newInstruction = await createInstruction({
      recipe_id: recipe_id,
      step_number: step_number,
      description: description,
    });
    res.json(newInstruction);
  } catch (error) {
    next(error);
  }
}

export async function findInstructionByRecipeIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipe_id = Number(req.params.recipe_id);
    const instruction = await findInstructionByRecipeId(recipe_id);
    res.json(instruction);
  } catch (error) {
    next(error);
  }
}

export async function updateInstructionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, recipe_id, step_number, description } = req.body;
    const id_params = Number(req.params.id);

    if (!id || !recipe_id || !step_number || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (id !== id_params) {
      return res
        .status(400)
        .json({ message: "You cannot perform this action" });
    }

    const updatedInstruction = await updateInstruction(id_params, {
      id: id,
      recipe_id: recipe_id,
      step_number: step_number,
      description: description,
    });
    res.json(updatedInstruction);
  } catch (error) {
    next(error);
  }
}

export async function deleteInstructionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const deletedInstruction = await deleteInstruction(id);
    res.json(deletedInstruction);
  } catch (error) {
    next(error);
  }
}
