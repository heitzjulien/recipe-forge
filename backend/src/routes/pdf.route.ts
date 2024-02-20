import express from "express";
import { getPdfController } from "../controllers/pdf.controller";

const router = express.Router();

router.get("/api/pdf/:id", getPdfController);

export default router;
