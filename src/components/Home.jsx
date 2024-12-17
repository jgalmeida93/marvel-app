import { HeroList } from "./HeroList";
import { Navbar } from "./Navbar";

export function Home() {
  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar onSearch={handleSearch} />
      <HeroList />
      <main className="pt-16 px-4 sm:px-6 lg:px-8"></main>
    </div>
  );
}
