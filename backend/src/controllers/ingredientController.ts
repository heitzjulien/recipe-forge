import { Request, Response } from "express";
import {
  createIngredient,
  deleteIngredient,
  findIngredientById,
  updateIngredient,
} from "../models/ingredientModel";

export async function createIngredientController(req: Request, res: Response) {
  try {
    const { recipe_id, name, quantity, unit } = req.body;

    const newIngredient = await createIngredient({
      recipe_id: recipe_id,
      name: name,
      quantity: quantity,
      unit: unit,
    });
    res.json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function findIngredientByIdController(
  req: Request,
  res: Response
) {
  try {
    const recipe_id = Number(req.query.recipe_id);
    const id = Number(req.query.id);
    const ingredient = await findIngredientById({
      id: id,
      recipe_id: recipe_id,
    });
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateIngredientController(req: Request, res: Response) {
  try {
    const { id, recipe_id, name, quantity, unit } = req.body;
    const id_params = Number(req.params.id);
    if (!id || !recipe_id || !name || !quantity || !unit) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (id !== id_params) {
      return res
        .status(400)
        .json({ message: "You cannot perform this action" });
    }
    const updatedIngredient = await updateIngredient(id, {
      id: id,
      recipe_id: recipe_id,
      name: name,
      quantity: quantity,
      unit: unit,
    });
    res.json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteIngredientController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const deletedIngredient = await deleteIngredient(id);
    res.json(deletedIngredient);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
}
