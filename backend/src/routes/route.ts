import express from "express";

const router = express.Router();

router.get("/api", async (req, res) => {
  res.json({ message: "Welcome to Recipe Forge" });
});

export default router;
