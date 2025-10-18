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
      style={{
        display: "block",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        transform: "scale(1)",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
          }}
        />
      )}

      {/* ⭐ Favorite Button */}
      <button
        onClick={toggleFavorite}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "none",
          border: "none",
          fontSize: "22px",
          cursor: "pointer",
          color: isFavorite ? "#facc15" : "#ccc",
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isFavorite ? <FaStar /> : <FaRegStar />}
      </button>

      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: "600",
              fontSize: "1.1rem",
              marginBottom: "8px",
              lineHeight: "1.3",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.title}
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#555",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {article.description || "No description available."}
          </p>
        </div>

        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "#888",
            }}
          >
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <span
            style={{
              color: "#2563eb",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            Read More →
          </span>
        </div>
      </div>
    </a>
  );
}
