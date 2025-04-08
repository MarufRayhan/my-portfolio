"use client";
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Code,
  NotebookText,
  Briefcase,
  FileText,
  Users,
  Laptop,
  GraduationCap,
} from "lucide-react";

const CVBentoBox = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="py-12 px-4 sm:py-16 xl:px-16 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white inline-block">
          Professional Highlights
        </h2>
        <div className="h-1 w-20 bg-white mx-auto rounded-full" />
      </div>

      {/* Bento box layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
        {/* Experience - Tall left */}
        <div
          className={`relative col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 transform transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="h-full rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-white/10 p-4 md:p-6 flex flex-col shadow-lg hover:shadow-white/5 hover:border-white/20 transition-all duration-300">
            <FileText className="w-7 h-7 md:w-8 md:h-8 text-white mb-3 md:mb-4 opacity-80" />
            <h3 className="text-lg md:text-xl text-white font-bold mb-2">
              Experience
            </h3>

            <div className="mt-2 space-y-3 flex-grow">
              <div className="p-2 md:p-3 rounded-lg bg-black/30 border border-white/5 hover:border-white/20 transition-all duration-300">
                <p className="text-white text-xs md:text-sm font-medium">
                  Full Stack Developer & Researcher
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  FAST Lab, Tampere, Finland
                </p>
              </div>

              <div className="p-2 md:p-3 rounded-lg bg-black/30 border border-white/5 hover:border-white/20 transition-all duration-300">
                <p className="text-white text-xs md:text-sm font-medium">
                  Research Assistant
                </p>
                <p className="text-gray-400 text-xs mt-1">GPT Lab</p>
              </div>

              <div className="p-2 md:p-3 rounded-lg bg-black/30 border border-white/5 hover:border-white/20 transition-all duration-300">
                <p className="text-white text-xs md:text-sm font-medium">
                  Software Engineer
                </p>
                <p className="text-gray-400 text-xs mt-1">BJIT Limited</p>
              </div>

              <div className="p-2 md:p-3 rounded-lg bg-black/30 border border-white/5 hover:border-white/20 transition-all duration-300">
                <p className="text-white text-xs md:text-sm font-medium">
                  Teaching Assistant
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Tampere University and AIUB
                </p>
              </div>
              <div className="p-2 md:p-3 rounded-lg bg-black/30 border border-white/5 hover:border-white/20 transition-all duration-300">
                <p className="text-white text-xs md:text-sm font-medium">
                  Intern
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  AIUB Software Division
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills - Top middle */}
        <div
          className={`relative col-span-1 sm:col-span-1 lg:col-span-2 transform transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="h-full rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-white/10 p-4 md:p-6 flex flex-col shadow-lg hover:shadow-white/5 hover:border-white/20 transition-all duration-300">
            <Code className="w-6 h-6 md:w-7 md:h-7 text-white mb-2 md:mb-3 opacity-80" />
            <h3 className="text-base md:text-lg text-white font-bold mb-2">
              Tech Skills
            </h3>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs">
                React
              </span>
              <span className="px-2 py-1 rounded-full bg-yellow-600/20 border border-yellow-500/30 text-yellow-300 text-xs">
                JavaScript
              </span>
              <span className="px-2 py-1 rounded-full bg-blue-800/20 border border-blue-700/30 text-blue-300 text-xs">
                TypeScript
              </span>
              <span className="px-2 py-1 rounded-full bg-green-600/20 border border-green-500/30 text-green-300 text-xs">
                Node.js
              </span>
              <span className="px-2 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs">
                Next.js
              </span>
              <span className="px-2 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-300 text-xs">
                Python
              </span>
              <span className="px-2 py-1 rounded-full bg-pink-600/20 border border-pink-500/30 text-red-300 text-xs">
                LLM
              </span>
            </div>
          </div>
        </div>

        {/* Experience - Top right */}
        <div
          className={`relative col-span-1 sm:col-span-1 lg:col-span-2 transform transition-all duration-500 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="h-full rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-white/10 p-4 md:p-6 flex flex-col shadow-lg hover:shadow-white/5 hover:border-white/20 transition-all duration-300">
            <Briefcase className="w-6 h-6 md:w-7 md:h-7 text-white mb-2 md:mb-3 opacity-80" />
            <h3 className="text-base md:text-lg text-white font-bold mb-2">
              Experience
            </h3>

            <div className="flex items-center justify-center w-full h-full">
              <div className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                4+
              </div>
              <p className="text-gray-300 text-base md:text-lg ml-2">Years</p>
            </div>
          </div>
        </div>

        {/* Publications - Bottom middle-left */}
        <div
          className={`relative col-span-1 transform transition-all duration-500 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="h-full rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-white/10 p-4 md:p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-white/5 hover:border-white/20 transition-all duration-300">
            <NotebookText className="w-5 h-5 md:w-6 md:h-6 text-white mb-2 md:mb-3 opacity-80" />
            <div className="text-white text-2xl md:text-3xl font-bold">4</div>
            <p className="text-gray-300 text-xs md:text-sm mt-1">
              Publications
            </p>
          </div>
        </div>

        {/* Projects - Bottom middle-right */}
        <div
          className={`relative col-span-1 transform transition-all duration-500 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="h-full rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-white/10 p-4 md:p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-white/5 hover:border-white/20 transition-all duration-300">
            <Laptop className="w-5 h-5 md:w-6 md:h-6 text-white mb-2 md:mb-3 opacity-80" />
            <div className="text-white text-2xl md:text-3xl font-bold">10+</div>
            <p className="text-gray-300 text-xs md:text-sm mt-1">Projects</p>
          </div>
        </div>

        {/* Education - Bottom right */}
        <div
          className={`relative col-span-1 sm:col-span-2 lg:col-span-2 transform transition-all duration-500 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="h-full rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-white/10 p-4 md:p-6 flex flex-col shadow-lg hover:shadow-white/5 hover:border-white/20 transition-all duration-300">
            <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-white mb-2 md:mb-3 opacity-80" />
            <h3 className="text-base md:text-lg text-white font-bold mb-2">
              Education
            </h3>

            <div className="mt-1">
              <p className="text-white text-xs md:text-sm font-medium">
                Master's in Computer Science
              </p>
              <p className="text-gray-400 text-xs">University of Tampere</p>

              <div className="flex items-center mt-2 md:mt-3">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                <p className="text-gray-300 text-xs">
                  Specialized in Software and Data Science
                </p>
              </div>
              <div className="flex items-center mt-2 md:mt-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                <p className="text-gray-300 text-xs">
                  Professional Scrum Master
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBentoBox;
