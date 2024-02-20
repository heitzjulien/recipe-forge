import { useState } from "preact/hooks";
import "./ContainerButtons.scss";

export type Props = {
  id: number;
};

export default function ButtonPdf({ id }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    fetch(import.meta.env.PUBLIC_API_URL + "/recipe/" + id)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "file.pdf";
        a.click();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
        setIsLoading(false);
      });
  };

  const handleDeleteButtonClick = () => {
    fetch(import.meta.env.PUBLIC_API_URL + "/recipe/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting recipe");
        }
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleBackButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="btn-container">
      <button onClick={handleBackButtonClick} className="btn-back">
        Retours
      </button>
      <button
        onClick={handleButtonClick}
        disabled={isLoading}
        className="btn-download"
      >
        {isLoading ? "Téléchargement..." : "Télécharger le PDF"}
      </button>
      <button onClick={handleDeleteButtonClick} className="btn-delete">
        Supprimer
      </button>
    </div>
  );
}
