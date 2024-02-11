import { NextFunction, Request, Response } from "express";
import {
  findRecipeById,
  findRecipe,
  updateRecipe,
  createRecipe,
  deleteRecipe,
} from "../models/recipeModel";
import { createIngredient } from "../models/ingredientModel";
import { createInstruction } from "../models/instructionModel";
import {
  NewIngredient,
  NewInstruction,
} from "../config/database/database.types";
import { findIngredientById } from "../models/ingredientModel";
import { findInstructionByRecipeId } from "../models/instructionModel";

export async function createRecipeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, image_url, ingredients, instructions } = req.body;
    const newRecipe = await createRecipe({
      title: title,
      image_url: image_url,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const newIngredients = await Promise.all(
      ingredients.map(async (ingredient: NewIngredient) => {
        return await createIngredient({
          ...ingredient,
          recipe_id: newRecipe.id,
        });
      })
    );

    const newInstructions = await Promise.all(
      instructions.map(async (instruction: NewInstruction) => {
        return await createInstruction({
          ...instruction,
          recipe_id: newRecipe.id,
        });
      })
    );
    res.json({
      recipe: newRecipe,
      ingredients: newIngredients,
      instructions: newInstructions,
    });
  } catch (error) {
    next(error);
  }
}

export const findRecipeByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const recipe = await findRecipeById(Number(id));
    const ingredients = await findIngredientById({ recipe_id: Number(id) });
    const instructions = await findInstructionByRecipeId(Number(id));
    res.json({ recipe, ingredients, instructions });
  } catch (error) {
    next(error);
  }
};

export async function findRecipeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipe = await findRecipe();
    res.json(recipe);
  } catch (error) {
    next(error);
  }
}

export async function updateRecipeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, title, image_url } = req.body;
    const id_params = Number(req.params.id);

    if (!id || !title || !image_url) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (id !== id_params) {
      return res
        .status(400)
        .json({ message: "You cannot perform this action" });
    }

    const updatedRecipe = await updateRecipe(id_params, {
      id: id,
      title: title,
      image_url: image_url,
      updated_at: new Date(),
    });

    res.json(updatedRecipe);
  } catch (error) {
    next(error);
  }
}

export async function deleteRecipeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const deletedRecipe = await deleteRecipe(id);
    res.json(deletedRecipe);
  } catch (error) {
    next(error);
  }
}
