import { db } from "../config/database/database";
import {
  InstructionUpdate,
  NewInstruction,
  RecipeUpdate,
} from "../config/database/database.types.js";

export async function createInstruction(instruction: NewInstruction) {
  return await db
    .insertInto("instruction")
    .values(instruction)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function findInstructionByRecipeId(recipe_id: number) {
  return await db
    .selectFrom("instruction")
    .where("recipe_id", "=", recipe_id)
    .selectAll()
    .execute();
}

export async function updateInstruction(
  id: number,
  updateWith: InstructionUpdate
) {
  await db
    .updateTable("instruction")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function deleteInstruction(id: number) {
  return await db
    .deleteFrom("instruction")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
