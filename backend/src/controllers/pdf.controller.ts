import { NextFunction, Request, Response } from "express";
import { findRecipeById } from "../models/recipe.model";
import { generatePdf } from "../services/pdf.service";

export async function getPdfController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.setHeader("Content-Type", "application/pdf");

    const params_id = Number(req.params.id);
    const recipe = await findRecipeById(params_id);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${recipe?.title}.pdf`
    );

    generatePdf(recipe, res);
  } catch (error) {
    next(error);
  }
}
