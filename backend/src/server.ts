import express, { Application, NextFunction } from "express";
import cors from "cors";
import recipeRoute from "./routes/recipeRoute";
import instructionRoute from "./routes/instructionRoute";
import ingredientRoute from "./routes/ingredientRoute";
import { envConfig } from "./config/envConfig";
import route from "./routes/route";
import { errorHandler, notFoundHandler } from "./handlers/httpErrorHandlers";

envConfig();

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use(route);

// Routes for recipes
app.use(recipeRoute);
app.use(instructionRoute);
app.use(ingredientRoute);

// Http error handlers
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
