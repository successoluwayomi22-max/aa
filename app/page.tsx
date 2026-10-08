"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import StackSection from "./components/StackSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#ff5722] selection:text-white">
      {/* 1. Sticky Frosted Glass Navbar */}
      <Navbar />

      {/* 2. Hero Section with Cinematic 240-Frame Canvas Sequence */}
      <HeroSection
        isIntroFinished={isIntroFinished}
        onIntroFinish={() => setIsIntroFinished(true)}
      />

      {/* 3. The next sections ONLY come up when the cinematic intro has finished playing */}
      {isIntroFinished && (
        <main className="animate-in fade-in duration-700">
          <AboutSection />
          <ProjectsSection />
          <StackSection />
          <ExperienceSection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </div>
  );
}
