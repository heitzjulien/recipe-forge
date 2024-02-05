import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
