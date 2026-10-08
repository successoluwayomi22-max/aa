"use client";

import { useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 240;

function getFrameUrl(index: number) {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/frames/frame_${frameNum}.webp`;
}

interface HeroSectionProps {
  isIntroFinished: boolean;
  onIntroFinish: () => void;
}

export default function HeroSection({
  isIntroFinished,
  onIntroFinish,
}: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  const targetProgressRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const velocityRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number>(0);
  const hasFinishedTriggeredRef = useRef<boolean>(false);

  // High-fidelity cover draw with exact real aspect ratio (zero distortion, maintains real size)
  const drawCover = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      canvasW: number,
      canvasH: number
    ) => {
      if (!img.naturalWidth || !img.naturalHeight) return;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvasW / canvasH;

      let renderW = canvasW;
      let renderH = canvasH;

      if (canvasRatio > imgRatio) {
        renderW = canvasW;
        renderH = canvasW / imgRatio;
      } else {
        renderH = canvasH;
        renderW = canvasH * imgRatio;
      }

      renderW = Math.ceil(renderW);
      renderH = Math.ceil(renderH);
      const offsetX = Math.floor((canvasW - renderW) / 2);
      const offsetY = Math.floor((canvasH - renderH) / 2);

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    },
    []
  );

  // Helper to find closest loaded frame to avoid any blank frames
  const getClosestLoadedFrame = useCallback((targetIndex: number) => {
    const loaded = loadedRef.current;
    const images = imagesRef.current;
    if (loaded[targetIndex] && images[targetIndex]) {
      return images[targetIndex];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && loaded[prev] && images[prev]) return images[prev];
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && loaded[next] && images[next]) return images[next];
    }
    return null;
  }, []);

  // Frame rendering function - crystal-clear, instantaneous 60+ FPS playback
  const renderCanvasFrame = useCallback(
    (frameVal: number, force?: boolean) => {
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameVal));
      const roundedIndex = Math.round(clamped);

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
        drawCover(ctx, img, width, height);
      }

      ctx.restore();
    },
    [drawCover, getClosestLoadedFrame]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resizing maintains exact 100% viewport match without distortion
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

    // Progressive frame preloading
    const preloadFrames = async () => {
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

    preloadFrames();

    // Wheel input: accelerates play forward or scrubs
    const handleWheel = (e: WheelEvent) => {
      if (!hasFinishedTriggeredRef.current) {
        // Prevent window scrolling while cinematic has not finished
        e.preventDefault();
        const rawDelta =
          e.deltaMode === 1
            ? e.deltaY * 25
            : e.deltaMode === 2
            ? e.deltaY * 350
            : e.deltaY;
        const impulse = rawDelta / 1800;
        velocityRef.current += impulse * 2.5;
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Touch swipe handling
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!hasFinishedTriggeredRef.current) {
        e.preventDefault();
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        touchStartY = touchY;
        targetProgressRef.current = Math.max(
          0,
          Math.min(1, targetProgressRef.current + deltaY / (window.innerHeight * 0.8))
        );
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasFinishedTriggeredRef.current) {
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
          e.preventDefault();
          velocityRef.current += 1.0;
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          e.preventDefault();
          velocityRef.current -= 1.0;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // External trigger to fast-forward/complete (e.g. from nav or buttons)
    const handleUnlockEvent = () => {
      targetProgressRef.current = 1.0;
      currentFrameRef.current = TOTAL_FRAMES - 1;
      renderCanvasFrame(TOTAL_FRAMES - 1, true);
      if (!hasFinishedTriggeredRef.current) {
        hasFinishedTriggeredRef.current = true;
        onIntroFinish();
      }
    };
    window.addEventListener("unlock-intro", handleUnlockEvent);

    // Continuous smooth cinematic playback loop
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min(0.06, Math.max(0.001, (currentTime - lastTime) / 1000));
      lastTime = currentTime;

      // Steady cinematic playback advance (smooth continuous playback across the 240 frames)
      if (!hasFinishedTriggeredRef.current && targetProgressRef.current < 0.995) {
        // Advances at steady cinematic pace (~4.5 seconds for all 240 frames unless user scrubs faster)
        targetProgressRef.current = Math.min(1.0, targetProgressRef.current + dt * 0.22);
      }

      // Apply any user scroll momentum / impulse
      if (Math.abs(velocityRef.current) > 0.00001) {
        targetProgressRef.current = Math.max(
          0,
          Math.min(1, targetProgressRef.current + velocityRef.current * dt)
        );
        velocityRef.current *= Math.exp(-5.0 * dt);
        if (Math.abs(velocityRef.current) < 0.00001) {
          velocityRef.current = 0;
        }
      }

      // Check if cinematic intro has finished playing (reached frame 240)
      if (targetProgressRef.current >= 0.995 && !hasFinishedTriggeredRef.current) {
        hasFinishedTriggeredRef.current = true;
        onIntroFinish();
      }

      const targetFrame = targetProgressRef.current * (TOTAL_FRAMES - 1);
      const diff = targetFrame - currentFrameRef.current;
      const factor = 1 - Math.exp(-12.0 * dt);
      currentFrameRef.current += diff * factor;

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
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("unlock-intro", handleUnlockEvent);
    };
  }, [renderCanvasFrame, onIntroFinish]);

  // Fast-forward / skip intro and scroll to works
  const handleFinishAndScrollToWorks = () => {
    targetProgressRef.current = 1.0;
    currentFrameRef.current = TOTAL_FRAMES - 1;
    renderCanvasFrame(TOTAL_FRAMES - 1, true);
    if (!hasFinishedTriggeredRef.current) {
      hasFinishedTriggeredRef.current = true;
      onIntroFinish();
    }

    setTimeout(() => {
      const worksEl = document.getElementById("works");
      if (worksEl) {
        worksEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleScrollToNextSection = () => {
    const aboutEl = document.getElementById("about");
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-screen bg-black overflow-hidden flex flex-col justify-between select-none"
      style={{ height: "100vh", minHeight: "100vh", width: "100%" }}
    >
      {/* 1. CRYSTAL-CLEAR CINEMATIC 240-FRAME CANVAS (MAINTAINS REAL SIZE WITHOUT DISTORTION) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none will-change-transform transform-gpu"
        style={{ width: "100%", height: "100%" }}
      />

      {/* 2. TOP SPACER CLEARANCE (Below fixed Navbar - NO SEQ PILL AS REQUESTED) */}
      <div className="relative z-20 w-full pt-20 sm:pt-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
          <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/95 font-medium">
            Web & App Developer
          </span>
        </div>

        {/* Status Badge: Only shows clean status, NO SEQ PILL */}
        <div className="pointer-events-auto">
          {isIntroFinished && (
            <button
              onClick={handleScrollToNextSection}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-mono tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5 cursor-pointer animate-in fade-in"
            >
              <span>Explore Portfolio</span>
              <span className="text-[#ff5722]">↓</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. MAIN HERO HEADLINE & CONTENT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 my-auto flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-8">
            <h1 className="font-light text-white text-3xl sm:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.12] drop-shadow-[0_3px_20px_rgba(0,0,0,0.9)]">
              Building high-performance web platforms, fluid mobile apps, and scalable digital products.
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start gap-4 pt-1">
            <p className="text-white/95 text-sm sm:text-base leading-relaxed font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Hi, I&apos;m <strong className="font-semibold text-white">Success Oluwayomi</strong>. I architect production-ready web and mobile experiences with modern frameworks, resilient cloud backends, and pixel-perfect design craft.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleFinishAndScrollToWorks}
                className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#ff5722] hover:bg-[#ff6e3d] text-white transition-all duration-300 text-xs tracking-wider uppercase font-semibold shadow-[0_3px_24px_rgba(255,87,34,0.45)] hover:shadow-[0_3px_32px_rgba(255,87,34,0.65)] cursor-pointer"
              >
                <span>Explore Work</span>
                <svg
                  className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              {isIntroFinished && (
                <button
                  onClick={handleScrollToNextSection}
                  className="glass-pill rounded-full px-5 py-2.5 text-xs tracking-wider uppercase font-medium text-white hover:text-white hover:border-white/40 transition-all cursor-pointer drop-shadow-md animate-in fade-in"
                >
                  Contact Me
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. MONUMENTAL BOLD "SUCCESS" WORDMARK */}
      <div className="relative z-10 w-full overflow-hidden select-none pointer-events-none shrink-0 pb-2 sm:pb-3 flex flex-col items-center">
        {isIntroFinished && (
          <div className="mb-2 pointer-events-auto animate-in fade-in duration-500">
            <button
              onClick={handleScrollToNextSection}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-mono tracking-wider uppercase transition-all shadow-xl cursor-pointer group"
            >
              <span>Scroll Down to Enter Portfolio</span>
              <span className="group-hover:translate-y-0.5 transition-transform text-[#ff5722]">↓</span>
            </button>
          </div>
        )}

        <div className="w-full flex items-center justify-center px-4">
          <h2
            className="font-bold sm:font-black tracking-[-0.035em] leading-[0.78] sm:leading-[0.8] text-white text-center w-full uppercase drop-shadow-[0_8px_36px_rgba(0,0,0,0.7)]"
            style={{
              fontSize: "clamp(2.8rem, 14.5vw, 15rem)",
              letterSpacing: "-0.035em",
            }}
          >
            SUCCESS
          </h2>
        </div>
      </div>
    </section>
  );
}
