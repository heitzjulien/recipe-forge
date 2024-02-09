import { useState, useEffect } from "preact/hooks";
import CardRecipe from "../CardRecipe/CardRecipe.js";
import "./CardRecipeGrid.scss";

interface Recipe {
  id: number;
  title: string;
  created_at: string;
}

const CardRecipeGrid = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch(import.meta.env.PUBLIC_API_URL + "/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <ul className="cards">
      {recipes.map((recipe) => (
        <CardRecipe
          id={recipe.id}
          title={recipe.title}
          created_at={recipe.created_at}
        />
      ))}
    </ul>
  );
};

export default CardRecipeGrid;
