import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [visibleCount, setVisibleCount] = useState(21); 

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
    setVisibleCount(21);
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 21); 
  };

  return (
    <div className="w-screen min-h-screen p-6 md:p-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Favorite Articles</h2>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.slice(0, visibleCount).map((article, i) => (
              <ArticleCard key={i} article={article} />
            ))}
          </div>

          {visibleCount < favorites.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={showMore}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Show More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No favorites yet. Try adding some from the Home or Search page!
        </p>
      )}
    </div>
  );
}
