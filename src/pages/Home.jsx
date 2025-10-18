import { useState, useEffect } from "react";
import { API } from "../api/newsApi";
import ArticleCard from "../components/ArticleCard";

export default function Home({ query, category }) {
  const [page, setPage] = useState(1);
  const [allArticles, setAllArticles] = useState([]);

  const { data: articles, loading } = API("everything", {
    language: "en",
    q: query || category || "latest",
    page,
    pageSize: 21,
  });

  useEffect(() => {
    setAllArticles([]);
    setPage(1);
  }, [query, category]);

  useEffect(() => {
    if (articles?.length) {
      setAllArticles((prev) => [...prev, ...articles]);
    }
  }, [articles]);

  return (
    <div
      style={{
        padding: "24px",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "24px",
          textAlign: "center",
          color: "#222",
        }}
      >
        Global News
      </h2>

      {allArticles.length === 0 && loading && (
        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: "16px",
          }}
        >
          Loading news...
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {allArticles.length ? (
          allArticles.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))
        ) : (
          !loading && (
            <p
              style={{
                textAlign: "center",
                color: "#666",
                gridColumn: "1 / -1",
                fontSize: "16px",
              }}
            >
              No results found.
            </p>
          )
        )}
      </div>

      {!loading && allArticles.length >= 21 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            style={{
              backgroundColor: "#1d4ed8",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
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

      {loading && (
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginTop: "16px",
            fontSize: "16px",
          }}
        >
          Loading more news...
        </p>
      )}
    </div>
  );
}
