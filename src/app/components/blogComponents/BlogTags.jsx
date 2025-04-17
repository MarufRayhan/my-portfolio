// components/BlogTags.jsx
export function BlogTags({ tags, activeTag, setActiveTag }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => setActiveTag(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
          activeTag === null
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            : "bg-[#1E1E1E] text-gray-300 hover:bg-[#33353F]"
        }`}
      >
        All
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
            activeTag === tag
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              : "bg-[#1E1E1E] text-gray-300 hover:bg-[#33353F]"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
