import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MaineLayout from "../layouts/MaineLayout";
import Spinner from "../components/Spinner";

const API_BASE = import.meta.env.VITE_MEALDB_API;

export default function MealDetails() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_BASE}/lookup.php?i=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch meal details");
        return res.json();
      })
      .then((data) => {
        setMeal(data.meals ? data.meals[0] : null);
        setError(null);
      })
      .catch(() => setError("Failed to load meal details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <MaineLayout>
        <Spinner />
      </MaineLayout>
    );
  }

  if (error) {
    return (
      <MaineLayout>
        <div className="text-center text-red-400 text-lg py-8">{error}</div>
      </MaineLayout>
    );
  }

  if (!meal) {
    return (
      <MaineLayout>
        <div className="text-center text-gray-300 py-8">Meal not found.</div>
      </MaineLayout>
    );
  }

  return (
    <MaineLayout>
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
        <div className="clearfix">
          {" "}
          {/* To contain floated elements */}
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-80 h-64 object-cover rounded-lg float-left mr-6 mb-4"
          />
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {meal.strMeal}
            </h2>
            <div className="mb-4">
              <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-sm mr-2">
                {meal.strCategory}
              </span>
              <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                {meal.strArea}
              </span>
            </div>
            <p className="text-gray-300 mb-4">{meal.strInstructions}</p>
            <h3 className="text-xl text-white font-semibold mb-2">
              Ingredients
            </h3>
            <ul className="list-disc list-inside text-gray-200 mb-4">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                if (ingredient && ingredient.trim()) {
                  return (
                    <li key={i}>
                      {ingredient} {measure && `- ${measure}`}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-indigo-400 hover:underline"
              >
                Watch on YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </MaineLayout>
  );
}
