"use client";

import { useEffect, useState } from "react";
import { ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogRedirect() {
  const [shouldRedirect, setShouldRedirect] = useState(true);

  useEffect(() => {
    // Check if user came from Hashnode (using back button)
    const referrer = document.referrer;
    if (referrer.includes("hashnode.dev")) {
      setShouldRedirect(false);
      return;
    }

    // Redirect after 3 seconds only if not coming from Hashnode
    const timer = setTimeout(() => {
      window.location.href = "https://marufrayhan.hashnode.dev/";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = () => {
    window.location.href = "https://marufrayhan.hashnode.dev/";
  };

  if (!shouldRedirect) {
    return (
      <div className="min-h-screen bg-[#121212] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="space-y-4 mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white">Blog</h1>
            <p className="text-xl text-gray-400">
              Read my latest articles and thoughts
            </p>
          </div>

          {/* Blog Link Card */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">
                Visit My Hashnode Blog
              </h2>
              <p className="text-gray-400">
                I write about web development, programming, and technology on
                Hashnode.
              </p>
            </div>

            <button
              onClick={handleRedirect}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Visit Blog
              <ExternalLink className="w-5 h-5" />
            </button>

            <div className="pt-4 border-t border-gray-800">
              <a
                href="https://marufrayhan.hashnode.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline text-sm transition-colors duration-200"
              >
                marufrayhan.hashnode.dev
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">Blog</h1>
          <p className="text-xl text-gray-400">
            Redirecting you to my Hashnode blog...
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>

        {/* Manual Redirect Button */}
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            Not redirecting automatically?
          </p>
          <button
            onClick={handleRedirect}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Visit Blog
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Link */}
        <div className="pt-8">
          <a
            href="https://marufrayhan.hashnode.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline text-sm transition-colors duration-200"
          >
            marufrayhan.hashnode.dev
          </a>
        </div>
      </div>
    </div>
  );
}
