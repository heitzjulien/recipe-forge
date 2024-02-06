import { client } from "../config/dbConfig";

export type Instruction = {
  id: number;
  recipe_id: number;
  step_number: number;
  description: string;
};

export async function getInstructions() {
  const res = await client.query<Instruction>("SELECT * FROM instruction");
  return res.rows;
}

export async function getInstructionById(id: number) {
  return await client.query<Instruction>(
    "SELECT * FROM instruction WHERE id = $1",
    [id]
  );
}

export async function getInstructionsByRecipeId(recipe_id: number) {
  return await client.query<Instruction>(
    "SELECT * FROM instruction WHERE recipe_id = $1",
    [recipe_id]
  );
}

export function createInstruction(
  recipe_id: number,
  step_number: number,
  description: string
) {
  return client.query<Instruction>(
    "INSERT INTO instruction (recipe_id, step_number, description) VALUES ($1, $2, $3) RETURNING *",
    [recipe_id, step_number, description]
  );
}

export async function updateInstruction(
  recipe_id: number,
  step_number: number,
  description: string,
  id: number
) {
  return client.query<Instruction>(
    "UPDATE instruction SET recipe_id = $1, step_number = $2, description = $3 WHERE id = $4 RETURNING *",
    [recipe_id, step_number, description, id]
  );
}

export async function deleteInstruction(id: number, recipe_id: number) {
  return client.query<Instruction>(
    "DELETE FROM instruction WHERE id = $1 AND recipe_id = $2",
    [id, recipe_id]
  );
}
