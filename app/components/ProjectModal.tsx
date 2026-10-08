"use client";

import { useEffect } from "react";

export interface Project {
  id: string;
  title: string;
  category: "AI & ML" | "WebGL & 3D" | "Full-Stack Systems" | "Creative Tools";
  tagline: string;
  year: string;
  role: string;
  stats: { label: string; value: string }[];
  description: string;
  challenge: string;
  architecture: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d0d12] border border-white/15 p-6 sm:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close case study modal"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-sm border border-white/10"
        >
          ✕
        </button>

        {/* Header Information */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs font-mono text-[#ff5722] uppercase tracking-wider px-3 py-1 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/20">
            {project.category}
          </span>
          <span className="text-xs font-mono text-zinc-400">YEAR: {project.year}</span>
          <span className="text-xs font-mono text-zinc-400">• ROLE: {project.role}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white mb-3">
          {project.title}
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base font-light mb-8 max-w-2xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Quick Stats Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {project.stats.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between"
            >
              <span className="text-xl sm:text-2xl font-light text-[#ff5722] font-mono">
                {s.value}
              </span>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Deep Dive Sections */}
        <div className="space-y-8 text-sm sm:text-base font-light text-zinc-300">
          <div>
            <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
              Executive Overview
            </h3>
            <p className="leading-relaxed text-zinc-300">{project.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
              Engineering Challenge & Solution
            </h3>
            <p className="leading-relaxed text-zinc-300">{project.challenge}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
              Architectural Highlights
            </h3>
            <ul className="space-y-2.5">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="font-mono text-xs text-[#ff5722] mt-0.5">0{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] border border-white/10 text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff5722] hover:bg-[#ff6e3d] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
              >
                <span>Live System Demo</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill text-zinc-300 hover:text-white text-xs font-medium tracking-wider uppercase transition-all border border-white/15"
              >
                <span>Source Code</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-white uppercase"
          >
            Close [Esc]
          </button>
        </div>
      </div>
    </div>
  );
}
