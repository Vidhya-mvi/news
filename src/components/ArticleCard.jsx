import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function ArticleCard({ article }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.url === article.url));
  }, [article.url]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.url !== article.url);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(article);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  }; 

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:scale-105 transition relative"
    >

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}


      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-xl text-gray-300 hover:scale-110 transition"
      >
        {isFavorite ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
      </button>


      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="font-semibold text-lg mb-2 line-clamp-2">
            {article.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {article.description || "No description available."}
          </p>
        </div>


        <div className="mt-3 flex justify-between items-center">
          <p className="text-xs text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <span className="text-blue-500 text-sm hover:underline">
            Read More →
          </span>
        </div>
      </div>
    </a>
  );
}
