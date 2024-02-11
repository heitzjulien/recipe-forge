import { db } from "../config/database/database";
import {
  Ingredient,
  IngredientUpdate,
  NewIngredient,
} from "../config/database/database.types.js";

export async function createIngredient(ingredient: NewIngredient) {
  console.log(ingredient);
  return await db
    .insertInto("ingredient")
    .values(ingredient)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function findIngredientById(criteria: Partial<Ingredient>) {
  let query = db.selectFrom("ingredient");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id);
  }
  if (criteria.recipe_id) {
    query = query.where("recipe_id", "=", criteria.recipe_id);
  }

  return await query.selectAll().execute();
}

export async function updateIngredient(
  id: number,
  updateWith: IngredientUpdate
) {
  await db
    .updateTable("ingredient")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function deleteIngredient(id: number) {
  return await db
    .deleteFrom("ingredient")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
