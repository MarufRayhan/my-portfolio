"use client";
import { useState, useEffect } from "react";
import { BlogHeader } from "./blogComponents/BlogHeader";
import { BlogGrid } from "./blogComponents/BlogGrid";
import { BlogTags } from "./blogComponents/BlogTags";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog");
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);

          const tags = [
            ...new Set((data.posts || []).flatMap((post) => post.tags || [])),
          ];
          setAllTags(tags);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Filter posts by tag if one is selected
  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags && post.tags.includes(activeTag))
    : posts;

  return (
    <div className="min-h-screen bg-[#121212] py-20">
      <div className="container mx-auto px-4">
        <BlogHeader />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {allTags.length > 0 && (
              <BlogTags
                tags={allTags}
                activeTag={activeTag}
                setActiveTag={setActiveTag}
              />
            )}

            {filteredPosts.length > 0 ? (
              <BlogGrid posts={filteredPosts} />
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl text-gray-400">
                  {activeTag
                    ? `No posts found with tag "${activeTag}"`
                    : "No blog posts found!"}
                </h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
