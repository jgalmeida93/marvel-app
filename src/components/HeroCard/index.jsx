import useHeroes from "../../store/useHeroes";

export function HeroCard({ hero }) {
  const { toggleLike, isHeroLiked } = useHeroes();
  const liked = isHeroLiked(hero.id);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img
        src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
        alt={hero.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-white">{hero.name}</h3>
          <button
            onClick={() => toggleLike(hero)}
            className={`p-2 rounded-full transition-all hover:bg-white/20 hover:scale-110 ${
              liked ? "text-red-500" : "text-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={liked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-400 text-sm line-clamp-3">
          {hero.description || "No description available"}
        </p>
      </div>
    </div>
  );
}
