"use client";

import { useState } from "react";
import ProjectModal, { Project } from "./ProjectModal";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Web Applications", "Mobile Apps", "E-Commerce & SaaS", "Full-Stack Platforms"];

  const projects: Project[] = [
    {
      id: "diasporaland-portal",
      title: "DiasporaLand Case & Property Portal",
      category: "Web Applications" as any,
      tagline:
        "High-performance property management, dispute tracking, and land title verification platform for diaspora investors.",
      year: "2026",
      role: "Lead Full-Stack Web Developer",
      stats: [
        { label: "Active Investors", value: "8,500+" },
        { label: "Case Processing", value: "-45% Time" },
        { label: "Uptime", value: "99.9%" },
      ],
      description:
        "DiasporaLand addresses critical cross-border land management challenges. It provides secure document uploading, verified survey tracking, multi-step case creation wizards, and live lawyer/surveyor consultation scheduling.",
      challenge:
        "Designing an intuitive multi-step wizard for non-technical international users while handling complex legal document validations and multi-currency transactions safely.",
      architecture: [
        "Modular React 19 / Next.js 16 front-end with Tailwind CSS design tokens and responsive glassmorphic cards.",
        "Role-based access control (RBAC) ensuring strict separation of client data, legal teams, and administration.",
        "Automated document OCR and PDF watermark validation before cloud vault archival.",
      ],
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase", "REST API"],
      liveUrl: "https://github.com/robinbakshi007",
      githubUrl: "https://github.com/robinbakshi007",
    },
    {
      id: "noir-ecommerce",
      title: "Noir Luxury Storefront & Mobile Shopping App",
      category: "E-Commerce & SaaS" as any,
      tagline:
        "High-conversion luxury e-commerce ecosystem featuring an integrated AI shopping assistant and mobile shopping experience.",
      year: "2025",
      role: "Full-Stack Web & Mobile Developer",
      stats: [
        { label: "Conversion Rate", value: "+34%" },
        { label: "Catalog Items", value: "12,000+" },
        { label: "Page Load Time", value: "0.6s" },
      ],
      description:
        "A bespoke e-commerce platform built for high-end fashion brands. Includes sub-second product filtering, custom AI shopping assistant widget with natural language style matching, multi-currency checkout, and order tracking.",
      challenge:
        "Delivering smooth micro-interactions, responsive typography, and instant search autocomplete across thousands of SKUs without client-side lag.",
      architecture: [
        "Optimized server-side rendering paired with edge caching for instantaneous category browsing.",
        "Custom conversational AI shopping assistant embedded directly with real-time product recommendations.",
        "Secure Stripe and PayPal payment gateways with webhook-driven order fulfillment workflows.",
      ],
      techStack: ["PHP", "Next.js", "React Native", "Tailwind CSS", "MySQL", "Stripe API", "JavaScript"],
      liveUrl: "https://github.com/robinbakshi007",
      githubUrl: "https://github.com/robinbakshi007",
    },
    {
      id: "xerxes-intelligence",
      title: "Xerxes Multi-Module Intelligence Platform",
      category: "Full-Stack Platforms" as any,
      tagline:
        "Unified operating dashboard connecting physical IoT devices, digital asset passports, and real-time event analytics.",
      year: "2025",
      role: "Lead Full-Stack Architect",
      stats: [
        { label: "Connected Devices", value: "14,000+" },
        { label: "Telemetry Latency", value: "72ms" },
        { label: "Active Modules", value: "40 Systems" },
      ],
      description:
        "An all-in-one enterprise operating layer connecting physical spaces, smart cameras, maintenance workflows, and digital object records. Features interactive reality scanners, QR-based asset verification, and diagnostic checklists.",
      challenge:
        "Harmonizing 40 diverse functional modules into a cohesive, responsive web UI with synchronized offline capabilities and sub-second updates.",
      architecture: [
        "PWA offline-first shell with Service Worker caching and background IndexedDB sync queue.",
        "Real-time WebSocket event bus delivering instant device telemetry and anomaly alerts.",
        "Tamper-evident cryptographic hashing ensuring object lifecycle and maintenance integrity.",
      ],
      techStack: ["TypeScript", "Next.js", "Node.js", "WebSockets", "Docker", "Redis", "Tailwind CSS"],
      liveUrl: "https://github.com/robinbakshi007",
      githubUrl: "https://github.com/robinbakshi007",
    },
    {
      id: "veloce-mobile-app",
      title: "Veloce Fleet & Delivery Cross-Platform Mobile App",
      category: "Mobile Apps" as any,
      tagline:
        "Real-time driver dispatch, GPS route navigation, and delivery tracking application for iOS and Android.",
      year: "2024",
      role: "Lead Mobile Developer",
      stats: [
        { label: "Daily Deliveries", value: "25,000+" },
        { label: "App Store Rating", value: "4.9 ★" },
        { label: "Frame Rate", value: "Solid 60 FPS" },
      ],
      description:
        "A driver and dispatcher mobile application built for rapid logistics operations. Features turn-by-turn map routing, digital signature capture, live package tracking for customers, and offline dispatch queueing.",
      challenge:
        "Optimizing background GPS location polling to prevent battery drain while keeping customer map markers smoothly animated.",
      architecture: [
        "Cross-platform React Native code sharing 85% of logic between iOS and Android.",
        "Native background location smoothing algorithm with throttled WebSocket updates.",
        "Secure push notification service with instant job acceptance and earnings dashboards.",
      ],
      techStack: ["React Native", "Expo", "TypeScript", "Google Maps SDK", "Firebase", "Node.js", "Express"],
      liveUrl: "https://github.com/robinbakshi007",
      githubUrl: "https://github.com/robinbakshi007",
    },
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="works" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto z-20">
      {/* Category Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono text-[#ff5722] tracking-widest uppercase">
          02 // FEATURED WEB & APP PROJECTS
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ff5722]/30 via-white/10 to-transparent" />
      </div>

      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-[1.15]">
            Engineered for performance, crafted for real users.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light mt-2 max-w-xl">
            A portfolio of production web applications, cross-platform mobile apps, and scalable digital platforms built by Success Oluwayomi.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 glass-pill p-1.5 rounded-full border border-white/10 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between group cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono text-[#ff5722] uppercase tracking-wider px-3 py-1 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/20">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-zinc-500">{project.year}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl sm:text-2xl font-light text-white mb-2 group-hover:text-[#ff5722] transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                {project.tagline}
              </p>

              {/* Key Metrics Chips */}
              <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                {project.stats.map((s, idx) => (
                  <div key={idx} className="text-center">
                    <span className="block font-mono text-xs sm:text-sm font-medium text-white">
                      {s.value}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-zinc-400">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Card Footer Button */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1.5">
                <span>Inspect Project Architecture</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#ff5722] group-hover:text-white flex items-center justify-center text-zinc-300 transition-colors">
                ↗
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
