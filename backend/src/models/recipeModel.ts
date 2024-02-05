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

export function createRecipe(title: string) {
  return client.query<Recipe>(
    "INSERT INTO recipe (title) VALUES ($1) RETURNING *",
    [title]
  );
}

export async function updateRecipe(title: string, id: number) {
  return client.query<Recipe>(
    "UPDATE recipe SET title = $1 WHERE id = $2 RETURNING *",
    [title, id]
  );
}

export async function deleteRecipe(id: number) {
  return client.query<Recipe>("DELETE FROM recipe WHERE id = $1", [id]);
}
