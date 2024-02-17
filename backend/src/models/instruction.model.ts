import { db } from "../config/database/database.config";
import {
  InstructionUpdate,
  NewInstruction,
} from "../config/database/database.types";

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

export async function updateInstruction(updatedInstruction: InstructionUpdate) {
  await db
    .updateTable("instruction")
    .set(updatedInstruction)
    .where("recipe_id", "=", Number(updatedInstruction.recipe_id))
    .execute();
}

export async function deleteInstruction(recipe_id: number) {
  return await db
    .deleteFrom("instruction")
    .where("recipe_id", "=", recipe_id)
    .returningAll()
    .executeTakeFirst();
}
