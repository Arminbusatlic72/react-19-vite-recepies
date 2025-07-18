import { useEffect, useState } from "react";
import MaineLayout from "../layouts/MaineLayout";
import IngredientsCard from "./../components/IngredientsCard";
import Spinner from "../components/Spinner";

type Ingredient = {
  strIngredient: string;
};

const API_BASE = import.meta.env.VITE_MEALDB_API;

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/list.php?i=list`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch ingredients");
        return res.json();
      })
      .then((data) => {
        setIngredients(data.meals || []);
        setError(null);
      })
      .catch(() => setError("Failed to load ingredients."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MaineLayout>
      <h2 className="text-2xl text-white text-center py-4">Ingredients</h2>
      {loading && <Spinner />}
      {error && !loading && (
        <div className="text-center text-red-400 text-lg py-8">{error}</div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {ingredients.map((ingredient, idx) => (
            <IngredientsCard key={idx} name={ingredient.strIngredient} />
          ))}
        </div>
      )}
    </MaineLayout>
  );
}
