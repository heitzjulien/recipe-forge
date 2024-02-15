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
    const ingredients = await db
      .selectFrom("ingredient")
      .where("recipe_id", "=", recipe.id)
      .selectAll()
      .execute();
    const instructions = await db
      .selectFrom("instruction")
      .where("recipe_id", "=", recipe.id)
      .selectAll()
      .execute();

    // TODO: Ajouter au type Recipe, Ingredients & Instructions
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
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
    const ingredients = await db
      .selectFrom("ingredient")
      .where("recipe_id", "=", recipe.id)
      .selectAll()
      .execute();

    const instructions = await db
      .selectFrom("instruction")
      .where("recipe_id", "=", recipe.id)
      .selectAll()
      .execute();

    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
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
