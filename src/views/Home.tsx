import { useState, useEffect } from "react";

import Card from "./../components/Card";
import MaineLayout from "./../layouts/MaineLayout";
import Spinner from "./../components/Spinner";
import { useLocation } from "react-router-dom";
const API_BASE = import.meta.env.VITE_MEALDB_API;

export default function Home() {
  const currentUrl = useLocation().pathname;
  console.log("Current URL:", currentUrl);
  // Separate API function
  async function fetchRandomMeals(count = 6) {
    try {
      const requests = Array.from({ length: count }).map(() =>
        fetch(`${API_BASE}/random.php`).then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
      );
      const results = await Promise.all(requests);

      return results.map((r) => r.meals && r.meals[0]).filter(Boolean); // Remove null values
    } catch (error) {
      console.error("Failed to fetch random meals:", error);
      throw error; // <--- re-throw the error so useEffect can catch it
    }
  }
  const [meals, setMeals] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [heading, setHeading] = useState<string>("Random Meals");
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load meals on mount
  useEffect(() => {
    setLoading(true);
    fetchRandomMeals()
      .then((data) => {
        setHeading("Random Meals");
        setMeals(data);
        setError(null);
        setLastQuery(null);
      })
      .catch(() => {
        setMeals(null);
        setError("Failed to load random meals. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Search handler
  const handleSearchResult = (result: any[] | null, query?: string) => {
    setLoading(true);
    setMeals(result);
    setError(null);
    if (!result) {
      setError("No meals found for your search.");
    }
    if (query && query.trim() !== "") {
      setHeading(`${query.trim()} meals`);
      setLastQuery(query);
    } else {
      setHeading("Random Meals");
      setLastQuery(null);
    }
    setLoading(false);
  };
  return (
    <MaineLayout onSearchResult={handleSearchResult} setLoading={setLoading}>
      <div className="flex justify-center items-center min-h-screen bg-gray-900 w-full">
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-2xl text-white text-center py-4">{heading}</h2>
          {loading && <Spinner />}
          {error && !loading && (
            <div className="text-center text-red-400 text-lg py-8">{error}</div>
          )}
          {!error && !loading && meals && meals.length > 0 && (
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
