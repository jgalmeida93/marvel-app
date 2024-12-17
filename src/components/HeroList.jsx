import useHeroes from "../store/useHeroes";
import { HeroCard } from "./HeroCard";

export function HeroList() {
  const { filteredHeroes } = useHeroes();

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredHeroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  );
}
