import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MaineLayout from "../layouts/MaineLayout";
import Card from "../components/Card";
import Spinner from "../components/Spinner";

const API_BASE = import.meta.env.VITE_MEALDB_API;

export default function SearchResults() {
  const { query } = useParams<{ query: string }>();
  const [meals, setMeals] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`)
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
  }, [query]);

  return (
    <MaineLayout>
      <h2 className="text-2xl text-white text-center py-4">
        {query ? `${query} meals` : "Search Results"}
      </h2>
      {loading && <Spinner />}
      {error && !loading && (
        <div className="text-center text-red-400 text-lg py-8">{error}</div>
      )}
      {!loading && !error && meals && meals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {meals.map((meal: any, idx: number) => (
            <Card key={idx} meal={meal} />
          ))}
        </div>
      )}
      {!loading && !error && meals && meals.length === 0 && (
        <div className="text-center text-gray-300 py-8">
          No meals found for your search.
        </div>
      )}
    </MaineLayout>
  );
}
