import { Request, Response } from "express";
import {
  findRecipeById,
  findRecipe,
  updateRecipe,
  createRecipe,
  deleteRecipe,
} from "../models/recipeModel";

export async function createRecipeController(req: Request, res: Response) {
  try {
    const { title, image_url } = req.body;
    const newRecipe = await createRecipe({
      title: title,
      image_url: image_url,
      created_at: new Date(),
      updated_at: new Date(),
    });
    res.json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const findRecipeByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const recipe = await findRecipeById(Number(id));
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export async function findRecipeController(req: Request, res: Response) {
  try {
    const recipe = await findRecipe();
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateRecipeController(req: Request, res: Response) {
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
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteRecipeController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const deletedRecipe = await deleteRecipe(id);
    res.json(deletedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
