import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Ingredients from "./views/Ingredients";
import MealsByIngredient from "./views/MealsByIngredient";
import MealDetails from "./views/MealDetails";
import SearchResults from "./views/SearchResults";
import Signup from "./views/Signup";

import ProtectedContent from "./components/ProtectedContent";
import { AuthProvider } from "./context/AuthContext";
import { MealProvider } from "./context/MealContext";

function App() {
  return (
    <AuthProvider>
      <MealProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/ingredient/:name" element={<MealsByIngredient />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/protected" element={<ProtectedContent />} />
        </Routes>
      </MealProvider>
    </AuthProvider>
  );
}

export default App;
