"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import ChatModal from "./ChatModal";

// Enhanced NavLink component with special styling for Chat
const NavLink = ({ href, title, isChat = false, onClick = null }) => {
  if (isChat) {
    return (
      <button
        onClick={onClick}
        className="relative px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 flex items-center space-x-1 transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
        {title}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
    >
      {title}
    </Link>
  );
};

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);

  const handleOpenChat = () => {
    setChatModalOpen(true);
    if (navbarOpen) {
      setNavbarOpen(false);
    }
  };

  // Updated navLinks to remove the /chat path
  const navLinks = [
    {
      title: "About",
      path: "#about",
    },
    {
      title: "Skills",
      path: "#skills",
    },
    {
      title: "Coding Stats",
      path: "#coding-stats",
    },
    {
      title: "Experience",
      path: "#experience",
    },
    {
      title: "Projects",
      path: "#projects",
    },
    {
      title: "Contact",
      path: "#contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "Chat With Assistant",
      isChat: true,
      onClick: handleOpenChat,
    },
  ];

  return (
    <>
      <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-50 bg-[#121212] bg-opacity-100">
        <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
          <Link
            href={"/"}
            className="text-xl md:text-3xl text-white font-semibold font-orbitron tracking-wider uppercase drop-shadow-md hover:scale-105 transition-transform duration-300"
          >
            MRF
          </Link>
          <div className="mobile-menu block md:hidden">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="menu hidden md:block md:w-auto" id="navbar">
            <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    href={link.path}
                    title={link.title}
                    isChat={link.isChat}
                    onClick={link.onClick}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
      </nav>

      {/* Chat Modal */}
      <ChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
