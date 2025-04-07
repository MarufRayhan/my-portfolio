"use client";
import { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileText, ExternalLink } from "lucide-react";

const TAB_DATA = [
  {
    title: "Education",
    id: "education",
    content: (
      <div className="space-y-4">
        {[
          {
            institution: "Tampere University, Finland",
            degree: "MSc in Software, Web and Cloud",
            year: "2022 - 2024",
            description: "Major in Software Engineering, Minor in Data Science",
          },
          {
            institution: "American International University Bangladesh(AIUB)",
            degree: "BSc in Computer Science and Engineering (CSE)",
            year: "2014 - 2028",
            description:
              "Computer Science major with a focus on Software Development",
          },
        ].map((edu, index) => (
          <div key={index} className="border-l-2 border-white pl-4 py-1">
            <h3 className="font-bold text-lg text-white">{edu.institution}</h3>
            <p className="text-gray-400">
              {edu.degree} | {edu.year}
            </p>
            <p className="text-sm mt-1 text-gray-300">{edu.description}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <div className="space-y-3">
        {[
          {
            name: "Professional Scrum Master™ I (PSM I)",
            issuer: "Issued by Scrum.org",
            year: "December 16, 2021",
            url: "https://www.credly.com/badges/aa755ab2-6b9c-4b79-b05e-ab67fc99f78c?source=linked_in_profile",
          },
        ].map((cert, index) => (
          <a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-gray-800/50 border border-transparent hover:border-gray-700 transition-colors">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-white mt-0.5" />
                <div>
                  <h3 className="font-bold text-white">{cert.name}</h3>
                  <p className="text-sm text-gray-400">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                <span>View</span>
                <ExternalLink className="h-4 w-4 ml-1" />
              </div>
            </div>
          </a>
        ))}
      </div>
    ),
  },
  {
    title: "Publications",
    id: "publications",
    content: (
      <div className="space-y-3">
        {[
          {
            name: "Multilabel Emotion Detection from Bangla Text Using BiGRU and CNN-BiLSTM",
            issuer:
              "23rd International Conference on Computer and Information Technology (ICCIT)",
            url: "https://scholar.google.com/citations?user=JekLRZ4AAAAJ&hl=en",
          },
          {
            name: "An Experimental Analysis of Classification Techniques for Domain Generating Algorithms (DGA) based Malicious Domains Detection",
            issuer:
              "23rd International Conference on Computer and Information Technology (ICCIT)",
            url: "https://scholar.google.com/citations?user=JekLRZ4AAAAJ&hl=en",
          },
          {
            name: "LLM-based agents for automating the enhancement of user story quality: An early report",
            issuer: "arXiv preprint arXiv:2403.09442",
            url: "https://scholar.google.com/citations?user=JekLRZ4AAAAJ&hl=en",
          },
          {
            name: "A Systematic Literature Review on Requirements Engineering Practices and Challenges in Open-Source Projects",
            issuer:
              "49th Euromicro Conference on Software Engineering and Advanced Applications",
            url: "https://scholar.google.com/citations?user=JekLRZ4AAAAJ&hl=en",
          },
        ].map((pub, index) => (
          <a
            key={index}
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-gray-800/50 border border-transparent hover:border-gray-700 transition-colors">
              <div className="flex gap-3">
                <FileText className="h-5 w-5 text-white mt-0.5" />
                <div>
                  <h3 className="font-bold text-white">{pub.name}</h3>
                  <p className="text-sm text-gray-400">{pub.issuer}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                <span>View</span>
                <ExternalLink className="h-4 w-4 ml-1" />
              </div>
            </div>
          </a>
        ))}
      </div>
    ),
  },
  {
    title: "Awards",
    id: "awards",
    content: (
      <div className="space-y-3">
        {[
          {
            name: "Magna Cum Laude",
            description:
              "BSc Academic award based on exceptional result criteria - Between CGPA 3.85 - 3.94 /4.00",
          },
          {
            name: "DEAN’S LIST HONORS",
            description:
              " Two times AIUB Dean’s List and Dean’s Honorable Mention Award for successfully earning a grade point average (GPA) 3.90/4.00.",
          },
        ].map((award, index) => (
          <a
            key={index}
            className="block transition-all hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-gray-800/50 border border-transparent hover:border-gray-700 transition-colors">
              <div className="flex gap-3">
                <div>
                  <h3 className="font-bold text-white">{award.name}</h3>
                  <p className="text-sm text-gray-400">{award.description}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("education");
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-16 md:py-24" id="about">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white inline-block">
            About Me
          </h2>
          <div className="h-1 w-20 bg-white mx-auto rounded-full" />
        </motion.div>

        <div className="md:grid md:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-5 mb-8 md:mb-0"
          >
            <div className="relative rounded-xl overflow-hidden border-2 border-white/20 shadow-xl shadow-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-gray-300/10 z-0" />
              <Image
                src="/images/imgg.jpg"
                width={600}
                height={600}
                alt="Profile image"
                className="w-full h-auto relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-7 text-left"
          >
            <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-300">
              I am a{" "}
              <span className="font-semibold text-white">
                full stack web developer and AI Researcher
              </span>{" "}
              with 4+ years of experience in web development, specializing in
              creating intuitive responsive interfaces and optimizing web
              applications. I completed my Master's in Software, Web and Cloud
              at Tampere University, I combine academic knowledge with practical
              industry expertise.
            </p>

            <div className="border-b border-gray-800 mb-6">
              <div className="flex flex-wrap gap-2">
                {TAB_DATA.map((tabItem) => (
                  <button
                    key={tabItem.id}
                    onClick={() => handleTabChange(tabItem.id)}
                    className={cn(
                      "px-4 py-2 font-bold text-base md:text-lg relative transition-all duration-200",
                      tab === tabItem.id
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-200"
                    )}
                  >
                    {tabItem.title}
                    {tab === tabItem.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[250px]"
            >
              {TAB_DATA.find((t) => t.id === tab).content}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
