import { useState } from "react";

type Props = {
  onSearch?: (query: string) => void;
};

export default function SearchForm({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-md mx-auto"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search meals..."
        className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="px-5 py-2 rounded-r-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        Search
      </button>
    </form>
  );
}
