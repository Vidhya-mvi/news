import { useState, useEffect } from "react";
import { API } from "../api/newsApi";
import ArticleCard from "../components/ArticleCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(query);
      setPage(1);
      setAllArticles([]);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  const { data: articles, loading } = API("everything", {
    q: searchTerm,
    language: "en",
    page,
    pageSize: 21,
  });

  useEffect(() => {
    if (articles?.length) {
      setAllArticles((prev) => [...prev, ...articles]);
    }
  }, [articles]);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

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
          textAlign: "center",
          marginBottom: "16px",
          color: "#222",
        }}
      >
        Search News
      </h2>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news as you type..."
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            width: "320px",
            fontSize: "16px",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #2563eb")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />
      </div>

      {loading && page === 1 && searchTerm ? (
        <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {allArticles.length ? (
              allArticles.map((article, i) => <ArticleCard key={i} article={article} />)
            ) : searchTerm ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  gridColumn: "1 / -1",
                  fontSize: "16px",
                }}
              >
                No results found for “{searchTerm}”.
              </p>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  gridColumn: "1 / -1",
                  fontSize: "16px",
                }}
              >
                Search any country, topic, or keyword (e.g., India, technology, sports...).
              </p>
            )}
          </div>

          {articles?.length === 21 && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
              <button
                onClick={showMore}
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
        </>
      )}
    </div>
  );
}
