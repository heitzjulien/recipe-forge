import { Request, Response } from "express";
import {
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../models/ingredientModel";

export const getIngredientsController = async (req: Request, res: Response) => {
  try {
    const ingredients = await getIngredients();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getIngredientByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const ingredient = await getIngredientById(Number(id));
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createIngredientController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body;
    const newIngredient = await createIngredient(name);
    res.json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateIngredientController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, id } = req.body;
    const updatedIngredient = await updateIngredient(name, id);
    res.json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteIngredientController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteIngredient(Number(id));
    res.json({ message: "Ingredient deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
