import { client } from "../config/dbConfig";

export type Recipe = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

export type RecipeWithIngredient = {
  recipe_id: number;
  ingredient_id: number;
  quantity: number;
  unit: string;
};

export async function getRecipes() {
  const res = await client.query<Recipe>("SELECT * FROM recipe");
  return res.rows;
}

export async function getRecipeById(id: number) {
  const res = await client.query<Recipe>("SELECT * FROM recipe WHERE id = $1", [
    id,
  ]);
  return res.rows[0];
}
