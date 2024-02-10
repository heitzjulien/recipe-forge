import { db } from "../config/database/database";
import {
  NewRecipe,
  Recipe,
  RecipeUpdate,
} from "../config/database/database.types";

export async function createRecipe(recipe: NewRecipe) {
  return await db
    .insertInto("recipe")
    .values(recipe)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function findRecipeById(id: number) {
  return await db
    .selectFrom("recipe")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findRecipe() {
  return await db.selectFrom("recipe").selectAll().execute();
}

export async function updateRecipe(id: number, updateWith: RecipeUpdate) {
  await db.updateTable("recipe").set(updateWith).where("id", "=", id).execute();
}

export async function deleteRecipe(id: number) {
  return await db
    .deleteFrom("recipe")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
