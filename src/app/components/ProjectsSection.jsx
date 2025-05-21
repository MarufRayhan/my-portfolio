"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "AI Agent Pipeline for User Story Enhancement",
    description:
      "An implementation of the Autonomous LLM-based Agent System (ALAS) for improving user story quality in agile software development. This system uses LLM-based agents to automate the enhancement of user stories through a collaborative agent framework.",
    image: "/images/projects/project1.png",
    tag: ["All", "AI"],
    gitUrl: "https://github.com/MarufRayhan/AI--Agent",
    previewUrl: "/",
    techStack: ["Python", "OPENAI"],
  },
  {
    id: 2,
    title: "Notepad",
    description:
      "Personal Notepad is a React-based web application that enables users to create, manage, and organize text snippets (pastes) with a clean and intuitive interface. This project was developed as a practice project to learn React-Redux and modern state management patterns.",
    image: "/images/projects/project2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/MarufRayhan/paste",
    previewUrl: "https://paste-six-tau.vercel.app/",
    techStack: ["React", "Redux"],
  },
  {
    id: 3,
    title: "Emotion Detection from bengali text data Using Deep Learning",
    description:
      "The project utilizes Bidirectional Gated Recurrent Unit (BiGRU) and CNN-BiLSTM (Convolutional Neural Network with Bidirectional Long Short-Term Memory) models to classify text into six emotional categories: happiness (আনন্দ), sadness (বিষণ্ণতা), fear (ভয়), anger (রাগ), love (ভালবাসা), and surprise (আশ্চর্য).",
    image: "/images/projects/project3.png",
    tag: ["All", "AI"],
    gitUrl: "https://github.com/MarufRayhan/bangla-sentiment-analysis/",
    previewUrl: "https://ieeexplore.ieee.org/abstract/document/9392690",
    techStack: ["Python", "keras", "Pandas", "NumPy"],
  },
  {
    id: 4,
    title: "AI-PRISM (Professional project)",
    description:
      "I have developed this web project (AI integrated) working as a developer at FAST-Lab. This is an ongoing project soon it will be in production level. For more information about the features and functionalities, please contact with me.",
    image: "/images/projects/project4.png",
    tag: ["All", "AI"],
    gitUrl: "https://www.ai-prism.dev/",
    previewUrl: "https://www.ai-prism.dev/",
    techStack: ["Next.js", "AWS", "NeonDB", "LLM", "Auth", "Vercel"],
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="AI"
          isSelected={tag === "AI"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              techStack={project.techStack}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
