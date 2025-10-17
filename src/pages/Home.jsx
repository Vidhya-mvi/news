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
    <div className="p-6 w-screen min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">
       Global News
      </h2>

      {allArticles.length === 0 && loading && (
        <p className="text-center text-gray-500">Loading news...</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allArticles.length ? (
          allArticles.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))
        ) : (
          !loading && (
            <p className="text-center col-span-full text-gray-500">
              No results found.
            </p>
          )
        )}
      </div>

      {!loading && allArticles.length >= 21 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Show More
          </button>
        </div>
      )}

      {loading && (
        <p className="text-center text-gray-500 mt-4">Loading more news...</p>
      )}
    </div>
  );
}
