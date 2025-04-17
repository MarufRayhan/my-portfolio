"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogPost({ slug }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        console.log(`Fetching post with slug: ${slug}`);
        const response = await fetch(`/api/blog/${slug}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched post data:", data);
        setPost(data.post);
      } catch (error) {
        console.error(`Error fetching blog post:`, error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col justify-center items-center py-20 px-4">
        <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
        <p className="text-gray-300 mb-8">
          The blog post you're looking for doesn't exist.
        </p>
        <Link
          href="/blog"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  // Estimate reading time (rough calculation)
  const readingTime = post.content
    ? Math.ceil(post.content.split(/\s+/).length / 200)
    : 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <Link
          href="/blog"
          className="fixed top-6 left-6 z-50 inline-flex items-center px-3 py-2 bg-[#1E1E1E]/80 backdrop-blur-sm text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium rounded-lg shadow-lg border border-purple-900/30"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <article className="max-w-3xl mx-auto bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-xl">
          {/* {post.coverImage && (
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] opacity-70"></div>
            </div>
          )} */}

          <div className="p-6 md:p-10">
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags &&
                  post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-purple-900/40 text-purple-200 border border-purple-700/30"
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center text-gray-300 space-x-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-400" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-200 prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-blockquote:border-purple-500 prose-pre:bg-[#2a2a2a] prose-code:bg-[#2a2a2a] prose-code:text-purple-300 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-white text-3xl font-bold mt-8 mb-4"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-white text-2xl font-bold mt-8 mb-4"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-white text-xl font-bold mt-6 mb-3"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-gray-200 mb-6 leading-relaxed"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-purple-400 hover:text-purple-300 underline"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="text-gray-200 list-disc pl-6 mb-6"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="text-gray-200 list-decimal pl-6 mb-6"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-2" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-purple-500 pl-4 italic text-gray-300 my-6"
                      {...props}
                    />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      className="bg-[#2a2a2a] text-purple-300 px-1 py-0.5 rounded"
                      {...props}
                    />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre
                      className="bg-[#2a2a2a] p-4 rounded-lg overflow-x-auto my-6"
                      {...props}
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
