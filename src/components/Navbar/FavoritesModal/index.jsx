import { useState } from "react";
import useHeroes from "../../../store/useHeroes";

export function FavoritesModal({ isOpen, onClose, likedHeroes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { toggleLike } = useHeroes();
  const heroesPerPage = 9;

  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = likedHeroes.slice(indexOfFirstHero, indexOfLastHero);
  const totalPages = Math.ceil(likedHeroes.length / heroesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full mx-4 min-h-[300px] sm:min-h-[500px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-bold">Favorite Heroes</h2>
          <button
            data-testid="close-btn"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-grow auto-rows-[100px]">
          {currentHeroes && currentHeroes.length > 0 ? (
            currentHeroes.map((hero) => (
              <div
                key={hero.id}
                className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 h-[100px] relative group"
              >
                <button
                  onClick={() => toggleLike(hero)}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center 
                          bg-red-500 hover:bg-red-600 text-white rounded-full
                            transform hover:scale-110"
                  title="Remove from favorites"
                >
                  ✕
                </button>
                <img
                  src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                  alt={hero.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span className="text-white">{hero.name}</span>
              </div>
            ))
          ) : (
            <p className="text-white col-span-3 text-center">
              No favorite heroes yet
            </p>
          )}
        </div>

        {likedHeroes.length > heroesPerPage && (
          <div className="flex justify-center mt-auto pt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
