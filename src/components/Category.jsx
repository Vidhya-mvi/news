const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export default function Category({ onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className="px-3 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition text-sm capitalize"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
