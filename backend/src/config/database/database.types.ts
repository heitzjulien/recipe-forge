import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  recipe: RecipeTable;
  instruction: InstructionTable;
  ingredient: IngredientTable;
}

export interface RecipeTable {
  id: Generated<number>;
  title: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  ingredients?: Ingredient[];
  instructions?: Instruction[];
}

export type Recipe = Selectable<RecipeTable>;
export type NewRecipe = Insertable<RecipeTable>;
export type RecipeUpdate = Updateable<RecipeTable>;

export interface InstructionTable {
  id: Generated<number>;
  recipe_id: number;
  step_number: number;
  description: string;
}

export type Instruction = Selectable<InstructionTable>;
export type NewInstruction = Insertable<InstructionTable>;
export type InstructionUpdate = Updateable<InstructionTable>;

export interface IngredientTable {
  id: Generated<number>;
  recipe_id: number;
  name: string;
  quantity: number;
  unit: string;
}

export type Ingredient = Selectable<IngredientTable>;
export type NewIngredient = Insertable<IngredientTable>;
export type IngredientUpdate = Updateable<IngredientTable>;
