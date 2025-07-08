"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, Code2 } from "lucide-react";
import Image from "next/image";

// Sample job experience data - replace with your actual experience
const EXPERIENCE_DATA = [
  {
    title: "Full Stack Developer and Researcher",
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
      "CSS",
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
      </div>
    </section>
  );
};

export default ExperienceSection;
