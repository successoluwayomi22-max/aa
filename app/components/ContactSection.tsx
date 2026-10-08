"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack Web App",
    budget: "$5k — $15k",
    message: "",
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const projectTypes = [
    "Full-Stack Web App",
    "Mobile App (iOS/Android)",
    "E-Commerce Platform",
    "API & Backend System",
  ];

  const budgetTiers = ["$2k — $5k", "$5k — $15k", "$15k — $30k", "$30k+"];

  const emailAddress = "successoluwayomi22@gmail.com";
  const phoneNumber = "09033084408";
  const whatsappUrl = "https://wa.me/2349033084408";
  const instagramUrl = "https://instagram.com/oluwayomi_success";
  const facebookUrl = "https://facebook.com/search/top?q=oluwayomi%20succe";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto z-20">
      {/* Category Marker */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-mono text-[#ff5722] tracking-widest uppercase">
          05 // WORK WITH SUCCESS OLUWAYOMI
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ff5722]/30 via-white/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Context & Direct Contact Badges */}
        <div className="lg:col-span-5">
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-[1.12] mb-6">
            Have a web or app project in mind? Let’s connect.
          </h2>
          <p className="text-zinc-400 text-base font-light leading-relaxed mb-8">
            Whether you need a brand-new web platform, a cross-platform mobile application, or want to enhance your existing codebase with modern speed and aesthetics, I am ready to collaborate. Reach out directly via WhatsApp, Phone, Email, or Social Media.
          </p>

          {/* Email Card */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 mb-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
              DIRECT EMAIL
            </span>
            <div className="flex items-center justify-between gap-3">
              <a
                href={`mailto:${emailAddress}`}
                className="text-sm sm:text-base font-mono text-white hover:text-[#ff5722] transition-colors select-all break-all"
              >
                {emailAddress}
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/10 hover:bg-[#ff5722] hover:text-white text-zinc-200 transition-all cursor-pointer shrink-0"
              >
                {copiedEmail ? "✓ Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 mb-6">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
              PHONE & WHATSAPP
            </span>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-mono text-white font-medium select-all">
                  {phoneNumber}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  WhatsApp Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Chat</span>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.995.543 1.954.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.766-5.767-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.748 0-3.385-.453-4.817-1.246l-5.183 1.358 1.383-5.053c-.878-1.488-1.383-3.228-1.383-5.059 0-5.514 4.486-10 10-10s10 4.486 10 10z" />
                  </svg>
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/10 hover:bg-white/20 text-zinc-200 transition-all cursor-pointer"
                >
                  {copiedPhone ? "✓" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Social Channels Badges */}
          <div className="mb-6">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3">
              CONNECT ON SOCIAL MEDIA
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-panel rounded-xl p-3 flex items-center gap-2.5 hover:border-emerald-500/40 hover:bg-emerald-950/20 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.995.543 1.954.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.766-5.767-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.748 0-3.385-.453-4.817-1.246l-5.183 1.358 1.383-5.053c-.878-1.488-1.383-3.228-1.383-5.059 0-5.514 4.486-10 10-10s10 4.486 10 10z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-medium text-white block group-hover:text-emerald-300 transition-colors">
                    WhatsApp
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    09033084408
                  </span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-panel rounded-xl p-3 flex items-center gap-2.5 hover:border-pink-500/40 hover:bg-pink-950/20 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-medium text-white block group-hover:text-pink-300 transition-colors">
                    Instagram
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    @oluwayomi_success
                  </span>
                </div>
              </a>

              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-panel rounded-xl p-3 flex items-center gap-2.5 hover:border-blue-500/40 hover:bg-blue-950/20 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-medium text-white block group-hover:text-blue-300 transition-colors">
                    Facebook
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    oluwayomi succe
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/robinbakshi007"
                target="_blank"
                rel="noreferrer"
                className="glass-panel rounded-xl p-3 flex items-center gap-2.5 hover:border-white/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 text-zinc-300 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-medium text-white block group-hover:text-zinc-200 transition-colors">
                    GitHub
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    Code Portfolio
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Details */}
          <div className="space-y-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span>RESPONSE TIME</span>
              <span className="text-zinc-200">&lt; 12 Hours</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span>CURRENT STATUS</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Available Immediately
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Project Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative">
            {submitted ? (
              <div className="py-16 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-white mb-2">Message Sent</h3>
                <p className="text-zinc-400 text-sm font-light max-w-sm mx-auto mb-6">
                  Thank you for reaching out! Success Oluwayomi will review your message and reply promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                    01 // What kind of product are you building?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                          formData.projectType === type
                            ? "bg-[#ff5722] text-white font-medium shadow-md"
                            : "bg-white/[0.04] text-zinc-300 hover:bg-white/10 border border-white/5"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5">
                    02 // Estimated Project Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setFormData({ ...formData, budget: tier })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                          formData.budget === tier
                            ? "bg-white text-black font-semibold shadow-md"
                            : "bg-white/[0.04] text-zinc-300 hover:bg-white/10 border border-white/5"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Your Email or Phone
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="john@example.com or WhatsApp number"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Project Overview
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your website or app concept, required features, and timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff5722] text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#ff5722] hover:bg-[#ff6e3d] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_24px_rgba(255,87,34,0.35)] hover:shadow-[0_4px_32px_rgba(255,87,34,0.55)] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Details</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
