"use client";
import Link from "next/link";
import { Home } from "lucide-react";
import React, { useState } from "react";
import ChatModal from "../ChatModal";

export function BlogHeader() {
  const [chatModalOpen, setChatModalOpen] = useState(false);

  return (
    <div className="relative mb-12 text-center">
      {/* Home and Chat buttons side by side */}
      <div className="flex justify-center gap-4 mb-6">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors duration-300 shadow-lg"
        >
          <Home className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <button
          onClick={() => setChatModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
          Chat with Assistant
        </button>
      </div>

      {/* Title and description */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        My Blog
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Thoughts, ideas, and experiences from my journey as a Software developer
        and AI Researcher.
      </p>

      {/* Chat Modal */}
      <ChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
      />
    </div>
  );
}
