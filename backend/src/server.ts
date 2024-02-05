import express, { Application } from "express";
import dotenv from "dotenv";
import { getRecipes } from "./models/recipeModel";
import recipeRoute from "./routes/recipeRoute";

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(recipeRoute);

// Routes
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Recipe Forge" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
