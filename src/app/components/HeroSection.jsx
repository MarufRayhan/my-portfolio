"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import ScholarIcon from "../../../public/scholar-icon.svg";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start text-white"
        >
          <h1 className="text-5xl font-bold mb-4">Hi, I am Maruf</h1>
          <h2 className="text-3xl mb-8">
            I am{" "}
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                1000,
                "AI Researcher",
                1000,
                "Professional Scrum Master",
                1000,
                "Thinker",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ color: "white" }}
              repeat={Number.POSITIVE_INFINITY}
            />
          </h2>
          <p className="text-lg">Welcome to my portfolio!</p>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptuous. */}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="px-6 py-3 inline-block rounded-full bg-white hover:bg-gray-100 text-gray-800"
            >
              Hire Me
            </Link>
            <Link
              href="https://drive.google.com/file/d/1HpVG1tbTyJD4wpo4mzF-KzzAnm26ZRjE/view?usp=drive_link"
              target="_blank"
              className="px-1 py-1 inline-block rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2 border border-primary-700">
                Download CV
              </span>
            </Link>
            <Link href="https://github.com/MarufRayhan" target="_blank">
              <Image src={GithubIcon} alt="Github Icon" className="w-8 h-8" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/md-maruf-rayhan/"
              target="_blank"
            >
              <Image
                src={LinkedinIcon}
                alt="Linkedin Icon"
                className="w-8 h-8"
              />
            </Link>
            <Link
              href="https://scholar.google.com/citations?user=JekLRZ4AAAAJ&hl=en"
              target="_blank"
            >
              <Image src={ScholarIcon} alt="Scholar Icon" className="w-8 h-8" />
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="  w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative overflow-hidden">
            <Image
              src="/images/my-img.jpg"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
