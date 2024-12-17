export function HeroCard({ hero }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img
        src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
        alt={hero.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{hero.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-3">
          {hero.description || "No description available"}
        </p>
      </div>
    </div>
  );
}
