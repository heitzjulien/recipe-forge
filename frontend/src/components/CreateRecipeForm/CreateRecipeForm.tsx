import { useState } from "preact/hooks";
import "./CreateRecipeForm.scss";

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface Instruction {
  step_number: number;
  description: string;
}

export default function CreateRecipeForm() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleInstructionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInstruction(event.target.value);
  };

  const handleAddInstruction = () => {
    setInstructions([
      ...instructions,
      { step_number: instructions.length + 1, description: instruction },
    ]);
    setInstruction("");
  };

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredientName(event.target.value);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUnit(event.target.value);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: ingredientName, quantity, unit }]);
    setIngredientName("");
    setQuantity("");
    setUnit("");
  };

  const postRecipe = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      title: title,
      image_url: imageUrl,
      ingredients: ingredients,
      instructions: instructions,
    };
    fetch(import.meta.env.PUBLIC_API_URL + "/recipe", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="CreateRecipeFrom">
      <div className="container">
        <h2>Créée une nouvelle recette</h2>
        <form onSubmit={postRecipe}>
          <label htmlFor="title">Titre de la recette</label>
          <input
            type="text"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <label htmlFor="image_url">Url de l'image</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setImageUrl(e.target.value)
            }
          />
          <h3>Liste des ingredients</h3>
          <ul>
            {ingredients?.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              </li>
            ))}
          </ul>
          <label htmlFor="name-ingredient">Ingrédient</label>
          <input
            type="text"
            name="name-ingredient"
            value={ingredientName}
            onInput={handleIngredientChange}
          />
          <label htmlFor="quantity">Quantité</label>
          <input
            type="number"
            step="0.5"
            name="quantity"
            value={quantity}
            onInput={handleQuantityChange}
          />
          <label htmlFor="unit">Unité</label>
          <select name="unit" id="unit" value={unit} onInput={handleUnitChange}>
            <option value="kg">Kilogramme</option>
            <option value="g">Gramme</option>
            <option value="mg">Milligramme</option>
            <option value="l">Litre</option>
            <option value="cl">Centilitre</option>
            <option value="ml">Millilitre</option>
            <option value="cuillère à soupe">Cuillère à soupe</option>
            <option value="cuillère à café">Cuillère à café</option>
            <option value="pincée">Pincée</option>
          </select>
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>

          <h3>Les étapes de préparation</h3>

          {instructions?.map((instruction, index) => (
            <div key={index}>
              {instruction.step_number}: {instruction.description}
            </div>
          ))}
          <label htmlFor="instruction">Instruction</label>
          <textarea
            id="instruction"
            name="instruction"
            onInput={handleInstructionChange}
            required
          />
          <button type="button" onClick={handleAddInstruction}>
            Add Step
          </button>
          <button className="btn-submit" type="submit">
            Créer la recette
          </button>
        </form>
      </div>
    </div>
  );
}
