"use client";

import { useState, useEffect } from "react";

export function MonogramLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(255,87,34,0.35)]"
      >
        <rect
          x="1.5"
          y="1.5"
          width="29"
          height="29"
          rx="8"
          fill="#0c0c10"
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="1.2"
        />
        <path
          d="M20.5 11C20.5 9.34 19.16 8 17.5 8H14C11.79 8 10 9.79 10 12C10 14.21 11.79 16 14 16H18C20.21 16 22 17.79 22 20C22 22.21 20.21 24 18 24H14.5C12.84 24 11.5 22.66 11.5 21"
          stroke="url(#monogram-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="1.4" fill="#ff5722" />
        <defs>
          <linearGradient id="monogram-grad" x1="10" y1="8" x2="22" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.5" stopColor="#ff5722" />
            <stop offset="1" stopColor="#f4f4f5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Works", href: "#works" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Timeline", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("unlock-intro"));
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none px-4 sm:px-8 lg:px-16 pt-4 sm:pt-6 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Monogram & Name Pill */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="glass-pill rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-3 hover:border-white/25 transition-all duration-300 group cursor-pointer"
          >
            <MonogramLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-xs sm:text-sm tracking-wider text-zinc-100 font-sans flex items-center gap-1.5">
                SUCCESS OLUWAYOMI
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722] inline-block animate-pulse" />
              </span>
              <span className="text-[10px] text-zinc-400 font-light tracking-widest uppercase hidden sm:inline">
                Web & App Developer
              </span>
            </div>
          </a>

          {/* Desktop Nav Center Pill */}
          <nav className="hidden md:flex items-center gap-1 glass-pill rounded-full px-3 py-1.5 border border-white/10 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-1.5 rounded-full text-xs text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action & Status */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 glass-pill rounded-full px-3 py-1 text-[11px] text-zinc-300 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="text-zinc-400">Status:</span>
              <span className="text-emerald-300 font-medium">Available for Hire</span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff5722] hover:bg-[#ff6e3d] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_28px_rgba(255,87,34,0.5)] cursor-pointer"
            >
              <span>Hire Me</span>
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden glass-pill w-9 h-9 flex flex-col items-center justify-center gap-[4.5px] rounded-full hover:bg-white/10 transition-colors"
            >
              <span
                className={`w-4 h-[1.5px] bg-zinc-200 rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-zinc-200 rounded-full transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-zinc-200 rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <MonogramLogo className="w-6 h-6" />
              <span className="font-bold text-sm tracking-wider text-white">SUCCESS OLUWAYOMI</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 text-sm hover:text-white"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8 text-lg font-light text-zinc-200">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between py-2 border-b border-white/5 hover:text-[#ff5722] transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-zinc-500">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available for Web & Mobile App Contracts</span>
            </div>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="w-full py-3 text-center rounded-full bg-[#ff5722] text-white font-medium text-xs tracking-wider uppercase shadow-lg"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </>
  );
}
