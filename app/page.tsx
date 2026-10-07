"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 240;

function getFrameUrl(index: number) {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/frames/frame_${frameNum}.webp`;
}

function SuccessLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Subtle dark squircle container */}
        <rect
          x="1.5"
          y="1.5"
          width="29"
          height="29"
          rx="7"
          fill="#111115"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="1.2"
        />
        {/* Continuous precision S monogram */}
        <path
          d="M20.5 11C20.5 9.34 19.16 8 17.5 8H14C11.79 8 10 9.79 10 12C10 14.21 11.79 16 14 16H18C20.21 16 22 17.79 22 20C22 22.21 20.21 24 18 24H14.5C12.84 24 11.5 22.66 11.5 21"
          stroke="url(#logo-grad)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Subtle amber/orange neural spark */}
        <circle cx="16" cy="16" r="1.3" fill="#ff5722" />
        <defs>
          <linearGradient id="logo-grad" x1="10" y1="8" x2="22" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.5" stopColor="#ff5722" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [promptText, setPromptText] = useState(
    "Editorial cybernetic muse in obsidian lighting, 8k architectural composition"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationDone, setGenerationDone] = useState(false);

  // Cinematic scroll canvas references
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const targetProgressRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number>(0);

  const samplePrompts = [
    "Monochrome architectural pavilions in Scandinavian fog",
    "Minimalist glass sculpture catching refracted morning light",
    "Subtle cinematic portrait with soft directional shadow",
    "Kinetic typography study in motion, stark negative space",
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    setIsGenerating(true);
    setGenerationDone(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationDone(true);
    }, 1800);
  };

  // Helper to draw image covering canvas with bleed to completely eliminate any edge borders or letterboxing
  const drawCover = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      canvasW: number,
      canvasH: number,
      alpha: number = 1.0
    ) => {
      if (!img.naturalWidth || !img.naturalHeight) return;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvasW / canvasH;
      // 5% over-bleed guarantees zero black bars on any screen ratio
      const BLEED = 1.05;
      let renderW = canvasW * BLEED;
      let renderH = canvasH * BLEED;

      if (canvasRatio > imgRatio) {
        renderW = canvasW * BLEED;
        renderH = (canvasW / imgRatio) * BLEED;
      } else {
        renderH = canvasH * BLEED;
        renderW = (canvasH * imgRatio) * BLEED;
      }

      renderW = Math.ceil(renderW);
      renderH = Math.ceil(renderH);
      const offsetX = Math.floor((canvasW - renderW) / 2);
      const offsetY = Math.floor((canvasH - renderH) / 2);

      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      ctx.globalAlpha = 1.0;
    },
    []
  );

  // Helper to find the closest loaded frame to avoid any blank frames or flicker
  const getClosestLoadedFrame = useCallback((targetIndex: number) => {
    const loaded = loadedRef.current;
    const images = imagesRef.current;
    if (loaded[targetIndex] && images[targetIndex]) {
      return images[targetIndex];
    }
    // Search outwards for nearest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && loaded[prev] && images[prev]) return images[prev];
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && loaded[next] && images[next]) return images[next];
    }
    return null;
  }, []);

  // Track last rendered frame to skip redundant redraws
  const lastRenderedFrameRef = useRef<number>(-1);

  // Frame rendering function - crisp, instantaneous 240-frame playback with zero ghosting
  const renderCanvasFrame = useCallback(
    (frameVal: number, force?: boolean) => {
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameVal));
      const roundedIndex = Math.round(clamped);

      // Skip redraw if integer frame hasn't changed (saves massive GPU fill rate for solid 60+ FPS)
      if (!force && roundedIndex === lastRenderedFrameRef.current) return;
      lastRenderedFrameRef.current = roundedIndex;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const img = getClosestLoadedFrame(roundedIndex);
      if (img) {
        drawCover(ctx, img, width, height, 1.0);
      }

      ctx.restore();
    },
    [drawCover, getClosestLoadedFrame]
  );

  // Scroll and canvas lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle high DPI retina display sizing accurately based on viewport
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      renderCanvasFrame(currentFrameRef.current, true);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    let isCancelled = false;

    // Preload frames progressively: instant frame 0, immediate 30-frame buffer, then background streaming
    const preloadAllFrames = async () => {
      // Step 1: Preload and decode frame 0 immediately for 0ms initial render
      const firstImg = new window.Image();
      firstImg.src = getFrameUrl(0);
      try {
        if (firstImg.decode) await firstImg.decode();
      } catch (_) {}
      if (!isCancelled) {
        imagesRef.current[0] = firstImg;
        loadedRef.current[0] = true;
        renderCanvasFrame(0, true);
      }

      // Step 2: Immediate buffer of the first 30 frames for instantaneous start
      const initialBuffer = Math.min(30, TOTAL_FRAMES);
      const initPromises = [];
      for (let i = 1; i < initialBuffer; i++) {
        initPromises.push(
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = getFrameUrl(i);
            const onDone = async () => {
              try {
                if (img.decode) await img.decode();
              } catch (_) {}
              if (!isCancelled) {
                imagesRef.current[i] = img;
                loadedRef.current[i] = true;
              }
              resolve();
            };
            img.onload = onDone;
            img.onerror = () => resolve();
          })
        );
      }
      await Promise.all(initPromises);

      // Step 3: Stream the remaining frames in background batches of 15
      const batchSize = 15;
      for (let start = initialBuffer; start < TOTAL_FRAMES; start += batchSize) {
        if (isCancelled) break;
        const end = Math.min(start + batchSize, TOTAL_FRAMES);
        const batchPromises = [];
        for (let i = start; i < end; i++) {
          batchPromises.push(
            new Promise<void>((resolve) => {
              const img = new window.Image();
              img.src = getFrameUrl(i);
              const onDone = async () => {
                try {
                  if (img.decode) await img.decode();
                } catch (_) {}
                if (!isCancelled) {
                  imagesRef.current[i] = img;
                  loadedRef.current[i] = true;
                  if (Math.abs(currentFrameRef.current - i) <= 1) {
                    renderCanvasFrame(currentFrameRef.current, true);
                  }
                }
                resolve();
              };
              img.onload = onDone;
              img.onerror = () => resolve();
            })
          );
        }
        await Promise.all(batchPromises);
      }
    };

    preloadAllFrames();

    // Scroll & gesture mapping for completely fixed view with buttery inertia:
    let lastTime = performance.now();
    const velocityRef = { current: 0 };
    let isDragging = false;
    let dragStartY = 0;
    let dragStartProgress = 0;

    // 1. Mouse wheel & trackpad with momentum injection
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Normalize delta based on deltaMode (pixels, lines, pages)
      const rawDelta =
        e.deltaMode === 1
          ? e.deltaY * 30
          : e.deltaMode === 2
          ? e.deltaY * 450
          : e.deltaY;

      // Pure fluid impulse: calibrated for 240 frames across ~3800px travel
      const impulse = rawDelta / 3800;
      velocityRef.current += impulse * 2.0;
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    // 2. Drag-to-scrub interaction for desktop mouse
    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest("button, input, a, textarea")) return;
      isDragging = true;
      dragStartY = e.clientY;
      dragStartProgress = targetProgressRef.current;
      velocityRef.current = 0;
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaY = dragStartY - e.clientY;
      const travel = window.innerHeight * 1.1;
      const newProgress = Math.max(0, Math.min(1, dragStartProgress + deltaY / travel));
      const instantaneousVelocity = (newProgress - targetProgressRef.current) * 16;
      velocityRef.current = velocityRef.current * 0.5 + instantaneousVelocity * 0.5;
      targetProgressRef.current = newProgress;
    };
    const handlePointerUp = () => {
      isDragging = false;
    };
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    // 3. Touch gesture with inertial flick
    let touchStartY = 0;
    let touchStartProgress = 0;
    let lastTouchY = 0;
    let lastTouchTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      touchStartProgress = targetProgressRef.current;
      lastTouchTime = performance.now();
      velocityRef.current = 0;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const now = performance.now();
      const dt = Math.max(1, now - lastTouchTime);
      const instantVelocity = ((lastTouchY - touchY) / dt) * 0.035;
      velocityRef.current = velocityRef.current * 0.6 + instantVelocity * 0.4;
      lastTouchY = touchY;
      lastTouchTime = now;

      targetProgressRef.current = Math.max(
        0,
        Math.min(1, touchStartProgress + deltaY / (window.innerHeight * 0.9))
      );
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // 4. Keyboard arrow navigation (smooth step)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        velocityRef.current += 0.8;
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        velocityRef.current -= 0.8;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Persistent animation loop for video-like smooth playback with inertia
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = (currentTime: number) => {
      const dt = Math.min(0.06, Math.max(0.001, (currentTime - lastTime) / 1000));
      lastTime = currentTime;

      // Apply inertial velocity to progress
      if (!isDragging && Math.abs(velocityRef.current) > 0.00001) {
        targetProgressRef.current = Math.max(
          0,
          Math.min(1, targetProgressRef.current + velocityRef.current * dt)
        );
        // Silky exponential friction (coasts smoothly like a weighted cinema wheel)
        velocityRef.current *= Math.exp(-4.2 * dt);
        if (Math.abs(velocityRef.current) < 0.00001) {
          velocityRef.current = 0;
        }
      }

      targetFrameRef.current = targetProgressRef.current * (TOTAL_FRAMES - 1);
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (prefersReducedMotion) {
        currentFrameRef.current = target;
      } else {
        // High-precision smooth glide: responsive and silky with zero overshoot
        const factor = 1 - Math.exp(-9.5 * dt);
        currentFrameRef.current += diff * factor;
      }

      renderCanvasFrame(currentFrameRef.current);
      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [renderCanvasFrame]);

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black select-none">
      {/* COMPLETELY FIXED IMMOBILE VIEWPORT CONTAINER */}
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full overflow-hidden flex flex-col justify-between"
      >
        {/* 1. CINEMATIC HTML5 SCROLL CANVAS BEHIND HERO */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none will-change-transform transform-gpu"
        />

        {/* 2. EXISTING HERO UI PINNED ON TOP */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-auto">
          {/* 1. MINIMALIST TOP BAR WITH BESPOKE LOGO */}
          <header className="relative z-40 w-full px-6 sm:px-12 lg:px-20 pt-4 sm:pt-6 flex items-center justify-between">
            {/* Sleek Minimalist Brand Pill */}
            <div className="glass-pill rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-3 border border-white/10 hover:border-white/20 transition-all duration-300">
              <SuccessLogo className="w-5 h-5" />
              <span className="font-bold text-xs sm:text-sm tracking-wider text-zinc-100 font-sans">
                SUCCESS
              </span>

              <div className="w-[1px] h-3 bg-white/15 mx-0.5" />

              {/* Minimalist Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
                className="w-6 h-6 flex flex-col items-center justify-center gap-[4px] rounded-full hover:bg-white/10 transition-colors"
              >
                <span
                  className={`w-3.5 h-[1.2px] bg-zinc-300 rounded-full transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-[5.2px]" : ""
                  }`}
                />
                <span
                  className={`w-3.5 h-[1.2px] bg-zinc-300 rounded-full transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-3.5 h-[1.2px] bg-zinc-300 rounded-full transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-[5.2px]" : ""
                  }`}
                />
              </button>
            </div>
          </header>

          {/* Nav Dropdown Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-start justify-start p-6 sm:p-12 animate-in fade-in duration-200">
              <div className="w-full max-w-sm rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#09090b] relative">
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <SuccessLogo className="w-5 h-5" />
                    <span className="font-bold tracking-wider text-sm text-white">SUCCESS</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs"
                  >
                    ✕
                  </button>
                </div>
                <nav className="flex flex-col gap-4 py-6 text-sm font-light text-zinc-300">
                  <a
                    href="#models"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-white hover:translate-x-1 transition-all"
                  >
                    Neural Models
                  </a>
                  <a
                    href="#showcase"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-white hover:translate-x-1 transition-all"
                  >
                    Selected Visuals
                  </a>
                  <a
                    href="#canvas"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-white hover:translate-x-1 transition-all"
                  >
                    Studio Canvas
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-white hover:translate-x-1 transition-all"
                  >
                    Documentation & API
                  </a>
                </nav>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsPromptModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-full border border-white/20 hover:border-white/40 text-white font-light text-xs tracking-wider uppercase transition-all bg-white/[0.04]"
                >
                  Open Studio
                </button>
              </div>
            </div>
          )}

          {/* 2. MAIN HERO CONTENT (BALANCED SPACING & COMPOSITION) */}
          <section className="relative z-20 flex-1 w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col justify-center py-2 sm:py-4 my-auto">
            {/* Subtle Category Pill */}
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/90 font-light">
                Generative Intelligence
              </span>
            </div>

            {/* Minimalist Headline and Right Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
              <div className="lg:col-span-8">
                <h1 className="font-light text-white text-3xl sm:text-4xl lg:text-[44px] tracking-[-0.03em] leading-[1.14] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                  Studio-quality imagery, synthesized through pure mathematical precision.
                </h1>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start gap-3 pt-1">
                <p className="text-white/90 text-sm leading-relaxed font-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
                  Transform natural language prompts into photorealistic compositions and conceptual visuals with sub-second latency.
                </p>

                {/* Minimalist Orange CTA Button with Arrow */}
                <button
                  onClick={() => setIsPromptModalOpen(true)}
                  className="group inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#ff5722] hover:bg-[#ff6e3d] text-white transition-all duration-300 text-xs tracking-wider uppercase font-medium shadow-[0_2px_20px_rgba(255,87,34,0.35)] hover:shadow-[0_2px_28px_rgba(255,87,34,0.55)] cursor-pointer"
                >
                  <span>Start Creating</span>
                  <svg
                    className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* 3. MONUMENTAL BOLD "SUCCESS" WORDMARK - PERFECTLY POSITIONED INSIDE 100VH */}
          <div className="relative z-10 w-full overflow-hidden select-none pointer-events-none shrink-0 pb-2 sm:pb-3">
            <div className="w-full flex items-center justify-center px-4">
              <h2
                className="font-bold sm:font-black tracking-[-0.035em] leading-[0.78] sm:leading-[0.8] text-white text-center w-full uppercase drop-shadow-[0_6px_32px_rgba(0,0,0,0.65)]"
                style={{
                  fontSize: "clamp(2.8rem, 14.5vw, 15rem)",
                  letterSpacing: "-0.035em",
                }}
              >
                SUCCESS
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MINIMALIST PROMPT STUDIO MODAL */}
      {isPromptModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#09090b] shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <SuccessLogo className="w-4 h-4" />
                <h3 className="text-xs font-bold text-white tracking-wider uppercase">
                  Prompt Studio
                </h3>
              </div>
              <button
                onClick={() => setIsPromptModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleGenerate} className="mt-5 space-y-4">
              <div>
                <label className="block text-[11px] font-light uppercase tracking-wider text-zinc-400 mb-2">
                  Prompt Description
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="Describe your creative vision..."
                    className="w-full bg-black border border-white/10 focus:border-white/40 rounded-xl p-3.5 text-zinc-100 text-sm focus:outline-none transition-colors resize-none font-light placeholder:text-zinc-600"
                  />
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/75 rounded-xl flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-light text-zinc-300">
                        Synthesizing...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sample Prompt Chips */}
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono block mb-2">
                  Inspirations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPromptText(sample)}
                      className="text-xs text-zinc-400 hover:text-zinc-200 px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-left font-light"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Status */}
              {generationDone && (
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs font-light">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Latent synthesis complete (850ms)</span>
                  </div>
                  <span className="text-zinc-500 font-mono text-[11px]">Seed: 884729104</span>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsPromptModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-light text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-normal tracking-wide transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isGenerating ? "Synthesizing..." : "Generate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
