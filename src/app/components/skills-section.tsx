"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Layout, Server, Cloud, Briefcase, Globe } from "lucide-react";

// Skill data organized by category with experience levels
const SKILLS_DATA = [
  {
    category: "Programming Languages",
    icon: <Code2 className="h-5 w-5" />,
    skills: [
      { name: "JavaScript", experience: "4+ years", level: 90 },
      { name: "TypeScript", experience: "2+ years", level: 85 },
      { name: "Python", experience: "4+ years", level: 88 },
      { name: "SQL", experience: "3+ years", level: 80 },
    ],
  },
  {
    category: "Frontend Development",
    icon: <Layout className="h-5 w-5" />,
    skills: [
      { name: "React.js", experience: "3+ years", level: 92 },
      { name: "Next.js", experience: "2+ years", level: 88 },
      { name: "UI/UX Design", experience: "", level: 75 },
      { name: "Figma", experience: "", level: 70 },
      { name: "Responsive Design", experience: "", level: 85 },
      { name: "React Native", experience: "", level: 78 },
    ],
  },
  {
    category: "Backend Development",
    icon: <Server className="h-5 w-5" />,
    skills: [
      { name: "Node.js", experience: "3+ years", level: 85 },
      { name: "FastAPI", experience: "", level: 75 },
      { name: "RESTful APIs", experience: "", level: 88 },
      { name: "Python", experience: "", level: 82 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: <Cloud className="h-5 w-5" />,
    skills: [
      { name: "AWS (S3, Lambda)", experience: "", level: 78 },
      { name: "Docker", experience: "", level: 75 },
      { name: "Kubernetes", experience: "", level: 70 },
      { name: "CI/CD", experience: "", level: 72 },
    ],
  },
  {
    category: "Additional Skills",
    icon: <Briefcase className="h-5 w-5" />,
    skills: [
      { name: "Git", experience: "", level: 90 },
      { name: "Automated Testing", experience: "", level: 80 },
      { name: "Cross-Platform Development", experience: "", level: 75 },
      { name: "Team Collaboration", experience: "", level: 95 },
    ],
  },
  {
    category: "Languages",
    icon: <Globe className="h-5 w-5" />,
    skills: [{ name: "English", experience: "Fluent, IELTS: 7", level: 90 }],
  },
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Programming Languages");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="py-16 md:py-24 relative" id="skills">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white inline-block">
            Skills & Expertise
          </h2>
          <div className="h-1 w-20 bg-white mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Categories sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-4">
              <h3 className="text-white text-lg font-medium mb-4 pl-2">
                Categories
              </h3>
              <ul className="space-y-1">
                {SKILLS_DATA.map((category) => (
                  <motion.li
                    key={category.category}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => setActiveCategory(category.category)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        activeCategory === category.category
                          ? "bg-white/10 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="text-white/70">{category.icon}</span>
                      <span>{category.category}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              {SKILLS_DATA.map((category) => (
                <div
                  key={category.category}
                  className={
                    activeCategory === category.category ? "block" : "hidden"
                  }
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span className="p-2 bg-white/10 rounded-lg text-white">
                      {category.icon}
                    </span>
                    <h3 className="text-white text-xl font-medium">
                      {category.category}
                    </h3>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
                  >
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariant}
                        className="relative group"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="text-white font-medium">
                              {skill.name}
                            </span>
                            {skill.experience && (
                              <span className="ml-2 text-xs text-gray-400 font-light">
                                {skill.experience}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-white rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`relative mt-6 col-span-2 row-span-1 transform transition-all duration-500 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ marginTop: "-0.5rem" }}
      >
        <div className="h-full rounded-xl bg-gray-800/80 border border-white/10 p-6 mt-6 flex flex-col justify-center hover:border-white/20 transition-all duration-300">
          <blockquote className="relative">
            <p className="text-white text-sm md:text-base italic pl-6 pr-6">
              "Everything is obsolete in this world, so try to learn every day."
            </p>
            <footer className="text-right mt-2 text-gray-400 text-sm">
              — Maruf Rayhan
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
