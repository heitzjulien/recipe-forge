import cors from "cors";
import express, { Application } from "express";
import { envConfig } from "./config/env/env.config";
import { errorHandler, notFoundHandler } from "./handlers/httpError.handler";
import recipeRoute from "./routes/recipe.route";
import route from "./routes/route";

envConfig();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(route);

// Routes for recipes
app.use(recipeRoute);

// Http error handlers
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
