"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export function BlogCard({ post }) {
  const defaultImage = "/blog-logo.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#33353F] transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden">
        {post.coverImage || defaultImage ? (
          <Image
            src={post.coverImage || defaultImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              console.error(`Failed to load image: ${post.coverImage}`);
              // Fallback to default image
              e.currentTarget.src = defaultImage;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center p-4">
              <ImageOff className="h-8 w-8 text-white/70 mb-2" />
              <h3 className="text-white text-lg font-bold text-center">
                {post.title}
              </h3>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Calendar className="h-3 w-3 mr-2 text-purple-400" />
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 hover:text-purple-400 transition-colors">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors duration-300 self-start mt-auto group"
        >
          Read More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
