import React, {
  createContext,
  useContext,
  useState,
  type ReactNode
} from "react";

interface MealContextType {
  meals: any[] | null;
  loading: boolean;
  error: string | null;
  heading: string;
  setMeals: (meals: any[] | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setHeading: (heading: string) => void;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider = ({ children }: { children: ReactNode }) => {
  const [meals, setMeals] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heading, setHeading] = useState("Random Meals");

  return (
    <MealContext.Provider
      value={{
        meals,
        loading,
        error,
        heading,
        setMeals,
        setLoading,
        setError,
        setHeading
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMeals = () => {
  const context = useContext(MealContext);
  if (!context) throw new Error("useMeals must be used within a MealProvider");
  return context;
};
