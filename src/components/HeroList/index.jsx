import useHeroes from "../../store/useHeroes";
import { useInView } from "react-intersection-observer";

import { HeroCard } from "../HeroCard";
import { useEffect } from "react";
import Loading from "../Loading";

export function HeroList() {
  const { loading, hasMore, loadMore, searchTerm, searchResults, heroes } =
    useHeroes();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasMore && !searchTerm) {
      loadMore();
    }
  }, [inView, hasMore, searchTerm]);

  const heroesToRender = searchTerm ? searchResults : heroes;

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {heroesToRender.map((hero) => (
          <HeroCard key={`${hero.id}-${Math.random()}`} hero={hero} />
        ))}

        {!searchTerm && hasMore && <div ref={ref} />}
      </div>

      {searchTerm && !loading && searchResults.length === 0 && (
        <p className="text-center text-gray-400">
          No heroes found for {`"{searchTerm}"`}
        </p>
      )}
    </div>
  );
}
