import "./CardRecipe.scss";

interface CardRecipeProps {
  id: number;
  title: string;
  image_url: string;
  created_at: string;
}

const CardRecipe = ({ id, title, image_url, created_at }: CardRecipeProps) => {
  const created_at_date = new Date(created_at).toLocaleDateString("FR-fr", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className="cards_item">
      <div className="card">
        <div className="card_image">
          <img src={image_url} alt={title} />
        </div>
        <div className="card_content">
          <h2 className="card_title">{title}</h2>
          <p className="card_text">Conçue le {created_at_date}</p>
          <a href={`/recipe/${id}`} className="card_link">
            En savoir plus
          </a>
        </div>
      </div>
    </li>
  );
};

export default CardRecipe;
