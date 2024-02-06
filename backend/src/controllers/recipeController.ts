import { Request, Response } from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../models/recipeModel";

export const getRecipesController = async (req: Request, res: Response) => {
  try {
    const recipes = await getRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRecipeByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(Number(id));
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createRecipeController = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newRecipe = await createRecipe(title);
    res.json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRecipeController = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    let id = parseInt(req.params.id, 10);
    if (!title || !id) {
      return res.status(400).json({ message: "Title and id are required" });
    }
    if (typeof title !== "string" || typeof id !== "number") {
      return res.status(400).json({ message: "Invalid input" });
    }
    const updatedRecipe = await updateRecipe(title, id);
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRecipeController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    if (typeof id !== "number") {
      return res.status(400).json({ message: "Invalid input" });
    }
    const recipe = await deleteRecipe(Number(id));
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
