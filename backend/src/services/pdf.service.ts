import PDFDocument from "pdfkit-table";
import { Response } from "express";
import {
  Ingredient,
  Instruction,
  RecipeTable,
} from "../config/database/database.types";
import axios from "axios";

export async function generatePdf(recipe: RecipeTable, res: Response) {
  const response = await axios.get(recipe.image_url, {
    responseType: "arraybuffer",
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
  const imageBuffer = Buffer.from(response.data, "binary");
  const created_at = recipe.created_at;

  const document = new PDFDocument();

  document.pipe(res);

  document.fontSize(18).text(recipe.title, 64, 64);

  document.image(imageBuffer, 64, 100, { width: 300, height: 200 });

  document.moveDown(12);

  document.fontSize(14).text("Les ingrédients :");

  document.moveDown();

  recipe.ingredients?.map((ingredient: Ingredient) => {
    document
      .fontSize(12)
      .text(`${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}`);
  });
  document.moveDown();

  document.fontSize(14).text("Les instructions :");

  document.moveDown();
  recipe.instructions?.map((instruction: Instruction) => {
    document
      .fontSize(12)
      .text(`${instruction.step_number}: ${instruction.description}`);
  });
  document.moveDown();

  document.fontSize(10).text(`Crée le ${created_at.toLocaleDateString("fr")}`);

  document.end();
}
