import { useState } from "react";
import SearchForm from "./SearchForm";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (!query) return;
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <header>
      <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between relative">
        <Link to="/" className="text-white text-2xl font-bold">
          Maine Cuisine
        </Link>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/ingredients"
              className="text-gray-300 hover:text-white transition"
            >
              Ingredients
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="text-gray-300 hover:text-white transition"
            >
              Signup
            </Link>
          </li>
        </ul>

        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 z-20 transition-opacity duration-300 ${
            menuOpen ? "block md:hidden" : "hidden"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <ul
          className={`absolute top-full left-0 w-full bg-gray-800 flex flex-col items-center md:hidden z-30 transition-all duration-300 ${
            menuOpen
              ? "max-h-96 py-4 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <li className="w-full">
            <Link
              to="/"
              className="block px-4 py-3 text-gray-300 hover:text-white transition w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="w-full">
            <Link
              to="/ingredients"
              className="block px-4 py-3 text-gray-300 hover:text-white transition w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Ingredients
            </Link>
          </li>
          <li className="w-full">
            <Link
              to="/signup"
              className="block px-4 py-3 text-gray-300 hover:text-white transition w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Signup
            </Link>
          </li>
        </ul>
      </nav>

      <h1 className="text-4xl font-bold text-center text-white py-8">
        Welcome to Maine Cuisine
      </h1>
      <div className="p-4">
        <SearchForm onSearch={handleSearch} />
      </div>
    </header>
  );
}
