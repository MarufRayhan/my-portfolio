"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Calendar } from "lucide-react";
import Image from "next/image";

// Sample job experience data - replace with your actual experience
const EXPERIENCE_DATA = [
  {
    title: "Senior Frontend Developer",
    company: "Future Automation Systems and Technologies Lab- FAST.",
    location: "Tampere, Finland",
    period: "March 2024 - Present",
    description: [
      "Leading the development of an EU-funded collaborative education streaming data platform, overseeing partnerships with 25 global collaborators across 12 countries to establish a centralized learning hub.",
      "Architected and implemented a real-time learning management system (https://www.ai-prism.dev/) with scalable data pipelines using Next.js, TypeScript, and AWS (S3, Lambda). Designed streaming data workflows processing of educational content, implemented Docker-based microservices for consistent deployment, and built REST APIs to ensure data quality across development and production environments.",
      "integrate Large Language Models for automated document generation and organization, streamlining the process of creating and managing documentation by 60%",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "AWS",
      "Docker",
      "LLM",
      "Python",
      "Git",
      "Tailwind CSS",
      "Generative AI",
    ],
  },
  {
    title: "Research Assistant ",
    company: "GPT Lab",
    location: "Tampere, Finland",
    period: "June 2023 - August 2023",
    description: [
      "Developed an innovative system for AI agent collaboration, establishing one of the first implementations where AI agents work together on software engineering tasks.",
      "Authored and collaborated on research with Austrian Post Group IT, introducing an Autonomous LLM-based Agent System (ALAS) that improved the quality of thousands of user stories across 6 agile teams, driving real-world adoption and operational efficiency.",
      "Independently designed and developed the lab's website (gpt-lab.eu) from scratch, while implementing comprehensive branding strategy across LinkedIn and X (Twitter) to establish GPT Lab's digital presence.",
    ],
    technologies: ["Python", "LLM", "Wordpress"],
  },
  {
    title: "Software Engineer",
    company: "BJIT Limited",
    location: "Dhaka, Bangladesh",
    period: "January 2019 - July 2022",
    description: [
      "Developed and optimized front-end applications using ReactJS, Node.js, TypeScript, UX for multiple client projects including an e-commerce marketplace, restaurant management system, and internal CV sorting system, focusing on responsive design and unit testing frameworks.",
      "Developed multiple AI proof-of-concept projects including a conversational chatbot, speaker diarization system, and sentiment analysis engine, leveraging Python, TensorFlow, Docker, and NLP technologies to secure 3 major international client contracts.y",
      "Led cross-functional collaboration as a product owner on a Japanese NFT marketplace project, coordinating with stakeholders and development team to define product requirements, develop features to generate and update Confluence wiki pages with relevant information, leading to successful market entry and establishment of the client's NFT business in Japan.",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Python",
      "Tensorflow",
      "Docker",
      "Pandas",
      "Matplotlib",
      "Version control",
      "NumPy",
    ],
  },
];

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);

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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 md:py-24 relative" id="experience">
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
            Professional Experience
          </h2>
          <div className="h-1 w-20 bg-white mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-12 max-w-4xl mx-auto"
        >
          {EXPERIENCE_DATA.map((job, index) => (
            <motion.div key={index} variants={itemVariant} className="relative">
              {/* Timeline connector */}
              {index < EXPERIENCE_DATA.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-white/20" />
              )}

              <div className="flex gap-6">
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-white/20 flex items-center justify-center overflow-hidden"></div>
                </div>

                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-lg p-6 border border-white/10 shadow-lg hover:shadow-white/5 transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {job.title}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm mt-1 md:mt-0">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{job.period}</span>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <Building2 className="h-4 w-4 text-white mr-2" />
                      <span className="text-gray-300">{job.company}</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-gray-400">{job.location}</span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {job.description.map((item, i) => (
                        <li key={i} className="text-gray-300 flex">
                          <span className="mr-2 text-white">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-700/50 text-white text-xs rounded-full border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
