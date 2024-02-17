import { db } from "../config/database/database.config";
import { NewRecipe, RecipeUpdate } from "../config/database/database.types";

export async function createRecipe(recipe: NewRecipe) {
  return await db
    .insertInto("recipe")
    .values(recipe)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function findRecipes() {
  const recipes = await db.selectFrom("recipe").selectAll().execute();

  for (const recipe of recipes) {
    recipe.ingredients = await db
      .selectFrom("ingredient")
      .where("recipe_id", "=", recipe.id)
      .selectAll()
      .execute();
    recipe.instructions = await db
      .selectFrom("instruction")
      .where("recipe_id", "=", recipe.id)
      .selectAll()
      .execute();
  }

  return recipes;
}

export async function findRecipeById(id: number) {
  const recipe = await db
    .selectFrom("recipe")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();

  if (recipe) {
    recipe.ingredients = await db
      .selectFrom("ingredient")
      .where("recipe_id", "=", recipe.id)
      .selectAll()
      .execute();

    recipe.instructions = await db
      .selectFrom("instruction")
      .where("recipe_id", "=", recipe.id)
      .selectAll()
      .execute();
  }

  return recipe;
}

export async function updateRecipe(id: number, updatedRecipe: RecipeUpdate) {
  await db
    .updateTable("recipe")
    .set(updatedRecipe)
    .where("id", "=", id)
    .execute();
}

export async function deleteRecipe(id: number) {
  return await db
    .deleteFrom("recipe")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
