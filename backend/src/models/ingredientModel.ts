import { client } from "../config/dbConfig";

export type Ingredient = {
  id: number;
  name: string;
};

export async function getIngredients() {
  return await client.query<Ingredient>("SELECT * FROM ingredient");
}

export async function getIngredientById(id: number) {
  return await client.query<Ingredient>(
    "SELECT * FROM ingredient WHERE id = $1",
    [id]
  );
}

export function createIngredient(name: string) {
  return client.query<Ingredient>(
    "INSERT INTO ingredient (name) VALUES ($1) RETURNING *",
    [name]
  );
}

export async function updateIngredient(name: string, id: number) {
  return client.query<Ingredient>(
    "UPDATE ingredient SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
}

export async function deleteIngredient(id: number) {
  return client.query<Ingredient>("DELETE FROM ingredient WHERE id = $1", [id]);
}
