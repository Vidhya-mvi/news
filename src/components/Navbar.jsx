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

  const navStyle = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    backgroundColor: "#2563eb", // Tailwind blue-600
    color: "white",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.2s ease-in-out",
  };

  const linkHover = (e) => {
    e.target.style.color = "black";
  };

  const linkLeave = (e) => {
    e.target.style.color = "white";
  };

  const selectStyle = {
    backgroundColor: "#3b82f6", // Tailwind blue-500
    color: "white",
    border: "1px solid white",
    borderRadius: "6px",
    padding: "4px 8px",
    outline: "none",
    fontSize: "0.9rem",
    cursor: "pointer",
  };

  const rightSection = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  return (
    <nav style={navStyle}>
      {/* Logo / Home Link */}
      <Link
        to="/"
        style={{ ...linkStyle, fontSize: "1.25rem", fontWeight: "bold" }}
        onMouseEnter={linkHover}
        onMouseLeave={linkLeave}
      >
        News Portal
      </Link>

      {/* Right Section */}
      <div style={rightSection}>
        <Link
          to="/search"
          style={linkStyle}
          onMouseEnter={linkHover}
          onMouseLeave={linkLeave}
        >
          Search
        </Link>

        <Link
          to="/favorites"
          style={linkStyle}
          onMouseEnter={linkHover}
          onMouseLeave={linkLeave}
        >
          Favorites
        </Link>

        <select
          style={selectStyle}
          onChange={(e) => onCategoryChange(e.target.value)}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")} // darker on hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} style={{ color: "black" }}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
