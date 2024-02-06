import { Request, Response } from "express";
import {
  getInstructions,
  getInstructionById,
  getInstructionsByRecipeId,
  createInstruction,
  updateInstruction,
  deleteInstruction,
} from "../models/instructionModel";

export const getInstructionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const instructions = await getInstructions();
    res.json(instructions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getInstructionByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const instruction = await getInstructionById(Number(id));
    res.json(instruction);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getInstructionByRecipeId = async (req: Request, res: Response) => {
  try {
    const { recipe_id } = req.params;
    const instructions = await getInstructionsByRecipeId(Number(recipe_id));
    res.json(instructions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createInstructionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { recipe_id, step_number, description } = req.body;
    const newInstruction = await createInstruction(
      recipe_id,
      step_number,
      description
    );
    res.json(newInstruction);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateInstructionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { recipe_id, step_number, description } = req.body;
    let id = parseInt(req.params.id, 10);
    if (!recipe_id || !step_number || !description || !id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const updatedInstruction = await updateInstruction(
      recipe_id,
      step_number,
      description,
      id
    );
    res.json(updatedInstruction);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteInstructionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, recipe_id } = req.params;
    const instruction = await deleteInstruction(Number(id), Number(recipe_id));
    res.json(instruction);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
