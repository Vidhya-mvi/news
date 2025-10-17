import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("general");

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar onCategoryChange={setSelectedCategory} />
        <Routes>
          <Route path="/" element={<Home category={selectedCategory} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}
