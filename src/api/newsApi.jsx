import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export function API(endpoint = "top-headlines", params = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const url = new URL(`${BASE_URL}/${endpoint}`);
        url.searchParams.append("apiKey", API_KEY);

        if (params.country && endpoint === "top-headlines")
          url.searchParams.append("country", params.country);

        if (params.category) url.searchParams.append("category", params.category);
        if (params.q) url.searchParams.append("q", params.q);
        if (params.language) url.searchParams.append("language", params.language);

        url.searchParams.append("pageSize", params.pageSize || 21);
        url.searchParams.append("page", params.page || 1); 

        const res = await fetch(url);
        const json = await res.json();
        setData(json.articles || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]); 
  return { data, loading };
}
