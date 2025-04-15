"use client";
import React, { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Chat from "./Chat";

const ChatModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-[#121212] rounded-xl w-full max-w-3xl mx-4 h-[90vh] relative overflow-hidden"
      >
        {/* Close button positioned absolutely */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-[#222222] text-gray-400 hover:text-white rounded-full p-1 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Chat component wrapper - use flex and set explicit height */}
        <div className="w-full h-full">
          {/* Apply custom styles to override the Chat component's full-screen behavior */}
          <div className="w-full h-full">
            {/* Wrapper to override Chat's h-screen */}
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
