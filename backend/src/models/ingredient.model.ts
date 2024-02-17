import { db } from "../config/database/database.config";
import {
  IngredientUpdate,
  NewIngredient,
} from "../config/database/database.types.js";

export async function createIngredient(ingredient: NewIngredient) {
  return await db
    .insertInto("ingredient")
    .values(ingredient)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function findIngredientByRecipeId(recipe_id: number) {
  return await db
    .selectFrom("ingredient")
    .where("recipe_id", "=", recipe_id)
    .selectAll()
    .execute();
}

export async function updateIngredient(updatedIngredient: IngredientUpdate) {
  await db
    .updateTable("ingredient")
    .set(updatedIngredient)
    .where("recipe_id", "=", Number(updatedIngredient.recipe_id))
    .execute();
}

export async function deleteIngredient(recipe_id: number) {
  return await db
    .deleteFrom("ingredient")
    .where("recipe_id", "=", recipe_id)
    .returningAll()
    .executeTakeFirst();
}
