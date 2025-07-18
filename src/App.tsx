import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Ingredients from "./views/Ingredients";
import MealsByIngredient from "./views/MealsByIngredient";
import MealDetails from "./views/MealDetails";
import SearchResults from "./views/SearchResults";
import ProtectedContent from "./components/ProtectedContent";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/ingredient/:name" element={<MealsByIngredient />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/protected" element={<ProtectedContent />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
