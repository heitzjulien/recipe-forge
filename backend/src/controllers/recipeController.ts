import { Request, Response } from "express";
import { getRecipes, getRecipeById, createRecipe } from "../models/recipeModel";

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
