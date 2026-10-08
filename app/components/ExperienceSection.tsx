"use client";

export default function ExperienceSection() {
  const experiences = [
    {
      period: "2024 — PRESENT",
      role: "Senior Full-Stack Web & App Developer",
      company: "Independent Freelance & Digital Solutions",
      location: "Global / Remote",
      highlights: [
        "Architecting full-lifecycle web platforms, custom e-commerce engines, and cross-platform mobile apps for international clients.",
        "Developing scalable Next.js and React applications integrated with Supabase, PostgreSQL, and payment gateways.",
        "Building responsive mobile applications in React Native and Flutter with real-time sync, geolocation, and push alerts.",
      ],
      tags: ["Next.js 16", "React Native", "Flutter", "TypeScript", "Tailwind CSS"],
    },
    {
      period: "2022 — 2024",
      role: "Full-Stack Web & Mobile Engineer",
      company: "TechCraft Digital",
      location: "Hybrid / Lagos",
      highlights: [
        "Led front-end and mobile engineering for high-traffic SaaS and retail applications serving over 50,000 monthly active users.",
        "Built REST and WebSocket APIs in Node.js and PHP/Laravel, reducing server response times by 35%.",
        "Implemented automated CI/CD deployment pipelines on Vercel and AWS, cutting release cycle times in half.",
      ],
      tags: ["React", "Node.js", "PHP/Laravel", "MySQL", "Docker"],
    },
    {
      period: "2020 — 2022",
      role: "Frontend & UI/UX Developer",
      company: "Apex Interactive",
      location: "On-site",
      highlights: [
        "Transformed complex Figma design systems into responsive, pixel-perfect, accessible web interfaces.",
        "Engineered smooth micro-animations, interactive dashboards, and mobile-friendly navigation architectures.",
      ],
      tags: ["JavaScript", "React", "CSS3/Tailwind", "REST APIs", "Git"],
    },
  ];

  const recognitions = [
    { title: "Top Rated Developer", org: "Client Verified Reviews", year: "2025" },
    { title: "Best Web & Mobile UX", org: "Regional Tech Showcase", year: "2024" },
    { title: "40+ Applications Deployed", org: "Web, iOS & Android", year: "Milestone" },
    { title: "100% Job Success Score", org: "Client Partnerships", year: "Consistent" },
  ];

  return (
    <section id="experience" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto z-20">
      {/* Category Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono text-[#ff5722] tracking-widest uppercase">
          04 // PROFESSIONAL JOURNEY & MILESTONES
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ff5722]/30 via-white/10 to-transparent" />
      </div>

      <div className="mb-14">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-[1.15] mb-3">
          Proven history of building and delivering quality software.
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl">
          Years of hands-on experience designing, developing, and deploying mission-critical web and mobile applications.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-8 mb-20">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-10 border border-white/10"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#ff5722] tracking-wider block mb-1">
                  {exp.period}
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-white">{exp.role}</h3>
                <span className="text-sm font-medium text-zinc-300">{exp.company}</span>
              </div>
              <span className="text-xs font-mono text-zinc-400 self-start md:self-auto">
                {exp.location}
              </span>
            </div>

            <ul className="space-y-2.5 mb-6 text-sm text-zinc-300 font-light leading-relaxed">
              {exp.highlights.map((h, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2.5">
                  <span className="text-[#ff5722] font-mono text-xs mt-1">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/10 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Accolades & Highlights */}
      <div>
        <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff5722]" />
          Key Milestones & Client Feedback
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recognitions.map((rec, rIdx) => (
            <div
              key={rIdx}
              className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
            >
              <span className="text-xs font-mono text-[#ff5722]">{rec.year}</span>
              <div className="mt-3">
                <h4 className="text-sm font-medium text-white">{rec.title}</h4>
                <p className="text-[11px] text-zinc-400 font-light mt-0.5">{rec.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
