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
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: "40px 20px",
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#222" }}>
          Favorite Articles
        </h2>

        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            style={{
              backgroundColor: "#e63946",
              color: "white",
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e63946")}
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length ? (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {favorites.slice(0, visibleCount).map((article, i) => (
              <ArticleCard key={i} article={article} />
            ))}
          </div>

          {visibleCount < favorites.length && (
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <button
                onClick={showMore}
                style={{
                  backgroundColor: "#1d4ed8",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
              >
                Show More
              </button>
            </div>
          )}
        </>
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginTop: "40px",
            fontSize: "16px",
          }}
        >
          No favorites yet. Try adding some from the Home or Search page!
        </p>
      )}
    </div>
  );
}
