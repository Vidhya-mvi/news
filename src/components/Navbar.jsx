import { Link } from "react-router-dom";

export default function Navbar({ onCategoryChange }) {
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-blue-600 text-white">
    
      <Link to="/" className="text-xl font-bold text-white hover:text-black ">
        News Portal
      </Link>

    
      <div className="flex items-center gap-4">
        <Link to="/search" className="text-white hover:text-black ">
          Search
        </Link>
        <Link to="/favorites" className="text-white hover:text-black">
          Favorites
        </Link>

        
        <select
          className="bg-blue-500 text-white border border-white rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
