"use client";

export default function AboutSection() {
  const metrics = [
    { value: "6+", label: "Years Experience", sub: "Web & Mobile App Engineering" },
    { value: "40+", label: "Products Shipped", sub: "Production Web & Mobile Apps" },
    { value: "<100ms", label: "Optimized Performance", sub: "Fast Time-to-Interactive & Core Web Vitals" },
    { value: "99.9%", label: "Client Satisfaction", sub: "On-time delivery & modern code standards" },
  ];

  const pillars = [
    {
      num: "01",
      title: "Full-Stack Web Engineering",
      description:
        "Building responsive, ultra-fast web applications using Next.js, React, TypeScript, and Tailwind CSS. Focused on clean component architecture, state management, and SEO performance.",
    },
    {
      num: "02",
      title: "Cross-Platform Mobile Apps",
      description:
        "Creating smooth iOS and Android applications with React Native, Flutter, and progressive web apps. Delivering 60 FPS native feel, offline persistence, and fluid gesture interactions.",
    },
    {
      num: "03",
      title: "Scalable APIs & Cloud Backends",
      description:
        "Designing robust RESTful & GraphQL APIs, microservices, and database systems (PostgreSQL, MySQL, Firebase, Supabase) with secure authentication, caching, and cloud deployments.",
    },
  ];

  return (
    <section id="about" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto z-20">
      {/* Category Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono text-[#ff5722] tracking-widest uppercase">
          01 // ABOUT SUCCESS OLUWAYOMI
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ff5722]/30 via-white/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        {/* Main Headline */}
        <div className="lg:col-span-7">
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-[1.15] mb-6">
            Crafting seamless digital experiences from intuitive user interfaces to scalable backends.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light mb-6">
            I am <strong className="text-zinc-200 font-medium">Success Oluwayomi</strong>, a passionate Web and App Developer dedicated to turning ideas into high-performing, user-centric software. I specialize in developing modern web platforms, responsive e-commerce solutions, and cross-platform mobile apps that drive real business growth.
          </p>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
            With expertise spanning front-end craftsmanship (Next.js, React, modern CSS, dynamic animations) and back-end robustness (Node.js, Python, PHP, cloud databases), I ensure every application is fast, accessible, secure, and maintainable.
          </p>
        </div>

        {/* Quick Facts / Core Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5722]/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-sm font-mono tracking-wider text-zinc-300 uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
              Core Competencies
            </h3>
            <ul className="space-y-3 text-sm text-zinc-300 font-light">
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#ff5722] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Modern Web Apps (Next.js 16, React 19, TypeScript)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#ff5722] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Mobile App Development (React Native, Flutter, iOS/Android)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#ff5722] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Backend APIs, Databases & Authentication Systems</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#ff5722] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Interactive UI/UX, Motion Design & Performance Tuning</span>
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>LOCATION: GLOBAL / REMOTE</span>
              <span className="text-[#ff5722]">OPEN FOR HIRE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white font-sans tracking-tight mb-2">
              {m.value}
            </span>
            <div>
              <p className="text-xs sm:text-sm font-medium text-zinc-200">{m.label}</p>
              <p className="text-[11px] text-zinc-500 font-light mt-0.5">{m.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Three Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p) => (
          <div
            key={p.num}
            className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono text-[#ff5722] tracking-wider block mb-3">
                // {p.num}
              </span>
              <h3 className="text-lg sm:text-xl font-medium text-white mb-3 tracking-tight">
                {p.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
