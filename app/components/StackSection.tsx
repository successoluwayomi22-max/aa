"use client";

export default function StackSection() {
  const stackCategories = [
    {
      title: "Web Frontend Development",
      subtitle: "Fast, Interactive & Accessible UIs",
      icon: (
        <svg className="w-5 h-5 text-[#ff5722]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      skills: [
        "Next.js 16 (App Router)",
        "React 19 & Hooks",
        "TypeScript",
        "Tailwind CSS & Modern CSS",
        "HTML5 Semantic Architecture",
        "Responsive & Mobile-First Design",
        "PWA & Offline Web Storage",
        "Core Web Vitals Optimization",
      ],
      description:
        "Developing lightning-fast, accessible, and search-optimized web applications with seamless client/server transitions.",
    },
    {
      title: "Mobile App Development",
      subtitle: "Cross-Platform iOS & Android",
      icon: (
        <svg className="w-5 h-5 text-[#ff5722]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
      skills: [
        "React Native & Expo",
        "Flutter & Dart",
        "iOS & Android Native APIs",
        "Mobile State Management",
        "Push Notifications & Deep Linking",
        "Offline-First SQLite Storage",
        "Camera, GPS & Biometrics Interop",
        "App Store & Google Play Deployment",
      ],
      description:
        "Building fluid 60 FPS mobile apps with native gesture handling, responsive layouts across phone and tablet sizes, and offline caching.",
    },
    {
      title: "Backend & API Architecture",
      subtitle: "Scalable Services & Integrations",
      icon: (
        <svg className="w-5 h-5 text-[#ff5722]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
      skills: [
        "Node.js & Express",
        "Python (FastAPI & Django)",
        "PHP & Laravel",
        "RESTful API Design",
        "WebSockets Real-Time Sync",
        "Authentication (JWT, OAuth, Auth0)",
        "Payment Gateways (Stripe, Paystack)",
        "Third-Party SDKs & Webhooks",
      ],
      description:
        "Engineering reliable API backends, real-time message streams, payment integrations, and secure user management.",
    },
    {
      title: "Databases & Cloud Infrastructure",
      subtitle: "Data Integrity, Hosting & CI/CD",
      icon: (
        <svg className="w-5 h-5 text-[#ff5722]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      skills: [
        "PostgreSQL & MySQL",
        "MongoDB & Redis Caching",
        "Firebase & Supabase",
        "Docker & Containerization",
        "Vercel & Netlify Hosting",
        "AWS (S3, EC2, Lambda)",
        "Git & GitHub Actions CI/CD",
        "SSL, Security & Automated Backups",
      ],
      description:
        "Architecting clean relational and document databases with high availability, automated deployments, and continuous monitoring.",
    },
  ];

  return (
    <section id="stack" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto z-20">
      {/* Category Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono text-[#ff5722] tracking-widest uppercase">
          03 // TECHNICAL STACK & CAPABILITIES
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ff5722]/30 via-white/10 to-transparent" />
      </div>

      <div className="mb-14">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-[1.15] mb-3">
          Comprehensive web and mobile engineering stack.
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl">
          From pixel-perfect interactive client applications to secure backend databases, I leverage industry-standard technologies to ship scalable, maintainable products.
        </p>
      </div>

      {/* Stack Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stackCategories.map((cat, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{cat.title}</h3>
                  <span className="text-xs font-mono text-zinc-400 block">{cat.subtitle}</span>
                </div>
              </div>

              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                {cat.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-zinc-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>PROFICIENCY: PRODUCTION READY</span>
              <span className="text-[#ff5722]">VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
