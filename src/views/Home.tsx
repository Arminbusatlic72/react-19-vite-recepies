import { useState, useEffect } from "react";

import Card from "../components/Card";
import MaineLayout from "../layouts/MaineLayout";
import Spinner from "../components/Spinner";

const API_BASE = import.meta.env.VITE_MEALDB_API;

async function fetchRandomMeals(count = 6) {
  try {
    const requests = Array.from({ length: count }).map(() =>
      fetch(`${API_BASE}/random.php`).then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
    );
    const results = await Promise.all(requests);
    return results.map((r) => r.meals?.[0]).filter(Boolean);
  } catch (error) {
    console.error("Failed to fetch random meals:", error);
    throw error;
  }
}

export default function Home() {
  const [meals, setMeals] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [heading, setHeading] = useState<string>("Random Meals");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchRandomMeals()
      .then((data) => {
        setMeals(data);
        setError(null);
        setHeading("Random Meals");
      })
      .catch(() => {
        setMeals(null);
        setError("Failed to load random meals. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <MaineLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-900 w-full">
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-2xl text-white text-center py-4">{heading}</h2>

          {loading && <Spinner />}

          {!loading && error && (
            <div className="text-center text-red-400 text-lg py-8">{error}</div>
          )}

          {!loading && !error && meals && meals.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {meals.map((meal: any, idx: number) => (
                <Card key={idx} meal={meal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MaineLayout>
  );
}
