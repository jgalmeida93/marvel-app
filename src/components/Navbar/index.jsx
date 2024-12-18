import { useCallback, useState } from "react";
import { logout } from "../../services/auth";
import useHeroes from "../../store/useHeroes";
import { FavoritesModal } from "./FavoritesModal";

export default function Navbar() {
  const { searchHeroes, likedHeroes } = useHeroes();
  const [showFavorites, setShowFavorites] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value.trim();
      const timeoutId = setTimeout(() => {
        searchHeroes(value);
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [searchHeroes]
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-red-600 font-bold text-2xl">
                Marvel App
              </span>
            </div>

            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search heroes..."
                  onChange={handleSearch}
                  className="w-full bg-gray-800 text-white rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-shrink-0">
              <button
                data-testid="favorites-button"
                onClick={() => setShowFavorites(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition duration-300 mx-4"
              >
                Favorites
              </button>
              <button
                onClick={() => logout()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <button
                data-testid="favorites-button"
                onClick={() => {
                  setShowFavorites(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition duration-300 mb-2"
              >
                Favorites
              </button>
              <button
                onClick={() => logout()}
                className="block w-full text-left bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        likedHeroes={likedHeroes}
      />
    </>
  );
}
