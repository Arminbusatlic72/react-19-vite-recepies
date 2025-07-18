import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MaineLayout from "../layouts/MaineLayout";
import Card from "../components/Card";
import Spinner from "../components/Spinner";

const API_BASE = import.meta.env.VITE_MEALDB_API;

export default function MealsByIngredient() {
  const { name } = useParams<{ name: string }>();
  const [meals, setMeals] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    fetch(`${API_BASE}/filter.php?i=${encodeURIComponent(name)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch meals");
        return res.json();
      })
      .then((data) => {
        setMeals(data.meals || []);
        setError(null);
      })
      .catch(() => setError("Failed to load meals."))
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <MaineLayout>
      <h2 className="text-2xl text-white text-center py-4">
        Meals with "{name}"
      </h2>
      {loading && <Spinner />}
      {error && !loading && (
        <div className="text-center text-red-400 text-lg py-8">{error}</div>
      )}
      {!loading && !error && meals && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {meals.map((meal, idx) => (
            <Card key={idx} meal={meal} />
          ))}
        </div>
      )}
      {!loading && !error && meals && meals.length === 0 && (
        <div className="text-center text-gray-300 py-8">
          No meals found for this ingredient.
        </div>
      )}
    </MaineLayout>
  );
}
