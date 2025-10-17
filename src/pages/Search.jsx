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
    <div className="p-6 w-screen min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">Search News</h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news as you type..."
          className="border rounded-lg p-2 w-80"
        />
      </div>

      {loading && page === 1 && searchTerm ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allArticles.length ? (
              allArticles.map((article, i) => (
                <ArticleCard key={i} article={article} />
              ))
            ) : searchTerm ? (
              <p className="text-center text-gray-500 col-span-full">
                No results found for “{searchTerm}”.
              </p>
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                Search any country, topic, or keyword (e.g., India, technology, sports...).
              </p>
            )}
          </div>

          {articles?.length === 21 && (
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
      )}
    </div>
  );
}
