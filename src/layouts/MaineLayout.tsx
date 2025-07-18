import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  children: React.ReactNode;
  onSearchResult?: (meals: any[] | null, query?: string) => void;
  setLoading?: (loading: boolean) => void;
};

export default function MaineLayout({
  children,
  onSearchResult,
  setLoading
}: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearchResult={onSearchResult} setLoading={setLoading} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
