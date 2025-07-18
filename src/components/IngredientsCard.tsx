import { Link } from "react-router-dom";

type Props = {
  name: string;
};

export default function IngredientsCard({ name }: Props) {
  return (
    <Link to={`/ingredient/${encodeURIComponent(name)}`}>
      <div className="bg-gray-800 rounded-lg shadow-lg flex items-center justify-center h-32 cursor-pointer hover:bg-indigo-700 transition">
        <span className="text-white text-lg font-semibold">{name}</span>
      </div>
    </Link>
  );
}
