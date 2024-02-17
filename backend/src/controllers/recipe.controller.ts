import { NextFunction, Request, Response } from "express";
import {
  NewIngredient,
  NewInstruction,
} from "../config/database/database.types";
import {
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from "../models/ingredient.model";
import {
  createInstruction,
  deleteInstruction,
  updateInstruction,
} from "../models/instruction.model";
import {
  createRecipe,
  deleteRecipe,
  findRecipeById,
  findRecipes,
  updateRecipe,
} from "../models/recipe.model";

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

export async function findRecipesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipes = await findRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
}

export async function findRecipeByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const params_id = Number(req.params.id);
    const recipe = await findRecipeById(params_id);

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
    const { id, title, image_url, ingredients, instructions } = req.body;
    const params_id = Number(req.params.id);

    if (id !== params_id) {
      return res
        .status(400)
        .json({ message: "You cannot perform this action" });
    }

    const updatedRecipe = await updateRecipe(params_id, {
      id: id,
      title: title,
      image_url: image_url,
      updated_at: new Date(),
    });

    const updatedIngredients = await Promise.all(
      ingredients.map(async (ingredient: NewIngredient) => {
        return await updateIngredient({
          ...ingredient,
          recipe_id: params_id,
        });
      })
    );

    const updatedInstructions = await Promise.all(
      instructions.map(async (instruction: NewInstruction) => {
        return await updateInstruction({
          ...instruction,
          recipe_id: params_id,
        });
      })
    );

    res.json({
      updatedRecipe,
      updatedIngredients,
      updatedInstructions,
    });
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
    const recipe_id = Number(req.params.id);
    const deletedIngredients = await deleteIngredient(recipe_id);
    const deletedInstruction = await deleteInstruction(recipe_id);
    const deletedRecipe = await deleteRecipe(recipe_id);

    res.json({ deletedIngredients, deletedInstruction, deletedRecipe });
  } catch (error) {
    next(error);
  }
}
