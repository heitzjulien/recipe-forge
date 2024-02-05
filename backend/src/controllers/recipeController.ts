import { Request, Response } from "express";
import { getRecipes } from "../models/recipeModel";

export const getRecipesController = async (req: Request, res: Response) => {
  try {
    const recipes = await getRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
