import { Link } from "react-router-dom";

type CardProps = {
  meal: any;
};

function Card({ meal }: CardProps) {
  const image = meal.strMealThumb || meal.image;
  const title = meal.strMeal || meal.title;
  const description = meal.strInstructions?.slice(0, 100) || meal.description;

  // Use meal.idMeal if available for details link
  const mealId = meal.idMeal;

  return (
    <Link
      to={mealId ? `/meal/${mealId}` : "#"}
      className="flex justify-center items-center bg-gray-900"
    >
      <div className="bg-gray-800 rounded-lg shadow-lg max-w-sm w-80 flex flex-col h-[420px] p-6 hover:scale-105 transition-transform">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
        <p className="text-gray-300 flex-1">{description}</p>
      </div>
    </Link>
  );
}

export default Card;
