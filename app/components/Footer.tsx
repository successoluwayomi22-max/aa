"use client";

import { useEffect, useState } from "react";
import { MonogramLogo } from "./Navbar";

export default function Footer() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-GB", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-black/80 backdrop-blur-md z-20 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand Monogram */}
          <div className="flex items-center gap-4">
            <MonogramLogo className="w-8 h-8" />
            <div>
              <span className="font-bold text-base tracking-wider text-white block">
                SUCCESS OLUWAYOMI
              </span>
              <span className="text-xs text-zinc-400 font-light tracking-widest uppercase">
                Web & Mobile App Developer
              </span>
            </div>
          </div>

          {/* Social Channels & Contact Chips */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/2349033084408"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp: 09033084408</span>
            </a>

            <a
              href="https://instagram.com/oluwayomi_success"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-pink-500/40 transition-colors"
            >
              @oluwayomi_success
            </a>

            <a
              href="https://facebook.com/search/top?q=oluwayomi%20succe"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:border-blue-500/40 transition-colors"
            >
              Facebook: oluwayomi succe
            </a>

            <a
              href="mailto:successoluwayomi22@gmail.com"
              className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-[#ff5722] hover:border-[#ff5722]/40 transition-colors"
            >
              successoluwayomi22@gmail.com
            </a>
          </div>

          {/* Realtime Clock & Operational Badge */}
          <div className="flex flex-wrap items-center gap-5">
            {timeString && (
              <div className="text-xs font-mono text-zinc-400">
                <span className="text-zinc-500 mr-2">TIME:</span>
                <span className="text-zinc-200">{timeString} WAT</span>
              </div>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer group"
            >
              <span>TOP</span>
              <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#ff5722] group-hover:text-white flex items-center justify-center transition-colors">
                ↑
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-500">
          <p>© {new Date().getFullYear()} Success Oluwayomi. All rights reserved.</p>
          <p className="font-mono text-[11px] text-zinc-600">
            ENGINEERED WITH NEXT.JS 16 • REACT 19 • CANVAS API • TAILWIND CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
