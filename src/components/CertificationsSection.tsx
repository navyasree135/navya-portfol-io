import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import { CheckCircle, Trophy, X, Brain, Globe, Sparkles, MessageCircle } from "lucide-react";

import cert1 from "@/assets/cert 1.jpg";
import cert2 from "@/assets/cert 2.jpg";
import cert3 from "@/assets/cert 3.jpg";
import cert4 from "@/assets/cert 4.jpg";

const certImages = [
  { src: cert1, label: "Oracle DBMS" },
  { src: cert2, label: "NPTEL – Responsible and Safe AI Systems", url: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS118S57070082010448820" },
  { src: cert3, label: "NPTEL – Artificial Intelligence Concepts and Techniques", url: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS159S127070093210448820" },
  { src: cert4, label: "NPTEL – Introduction to Internet of Things", url: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS147S77070065310448820" },
];

const softSkills = [
  "Problem Solving",
  "Analytical Thinking",
  "Attention to Detail",
  "Collaborative",
  "Adaptability",
  "Research-Oriented",
  "Data Storytelling",
  "Critical Thinking",
  "Technical Communication",
  "Time Management",
];
const languages = ["English (Native)", "Telugu (Native)", "Hindi (Intermediate)", "Tamil (Intermediate)", "German(Basic)"];

const CertificationsSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        y: 20, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 95%" },
      });
    }
    if (galleryRef.current) {
      const imgs = galleryRef.current.querySelectorAll(".cert-card");
      gsap.from(imgs, {
        y: 30, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: galleryRef.current, start: "top 95%" },
      });
    }
    if (metaRef.current) {
      gsap.from(metaRef.current, {
        x: 30, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: metaRef.current, start: "top 95%" },
      });
    }
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="certifications" className="py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h2
          ref={headingRef}
          id="apt-certifications"
          className="font-display italic text-pastel-dark text-center mb-14"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          Certifications &amp; More
        </h2>

        {/* ── Certificate image gallery ─────────────────────────────────── */}
        <div className="glass p-6 md:p-8 mb-14">
          <h3 className="font-body font-semibold mb-4 text-pastel-dark text-xl text-center">My Certificates</h3>
          <div
            ref={galleryRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {certImages.map((c, i) => (
              <button
                key={i}
                className="cert-card group relative rounded-xl overflow-hidden aspect-[4/3] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-accent border border-white/20"
                onClick={() => setLightbox(i)}
                aria-label={`View certificate: ${c.label}`}
              >
                <img
                  src={c.src}
                  alt={c.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full px-3 py-2 text-xs font-mono text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/50 backdrop-blur-sm hover:underline cursor-pointer"
                    >
                      {c.label} ↗
                    </a>
                  ) : (
                    <span className="w-full px-3 py-2 text-xs font-mono text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/50 backdrop-blur-sm">
                      {c.label}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Meta cards (achievements, soft skills, languages) ─────────── */}
        <div ref={metaRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">


          {/* Soft Skills */}
          {/* Soft Skills */}
          <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50" style={{ background: "radial-gradient(circle, #f5c6ea 0%, transparent 70%)" }} />
            <h3 className="font-body font-bold mb-6 text-pastel-dark text-xl md:text-2xl flex items-center gap-2 relative z-10">
              <Brain size={22} className="text-pastel-accent" /> Soft Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
              {softSkills.map((s, i) => (
                <div
                  key={s}
                  className="glass px-4 py-2.5 text-xs md:text-sm font-mono text-pastel-dark rounded-xl flex items-center gap-2.5 hover:-translate-y-1 hover:shadow-md hover:border-white/50 hover:bg-white/20 cursor-default transition-all duration-300"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <Sparkles size={14} className="text-pastel-accent shrink-0 opacity-80" />
                  <span className="font-medium tracking-tight text-pastel-dark/90">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          {/* Languages */}
          <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50" style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }} />
            <h3 className="font-body font-bold mb-6 text-pastel-dark text-xl md:text-2xl flex items-center gap-2 relative z-10">
              <Globe size={22} className="text-pastel-accent" /> Languages
            </h3>
            <div className="flex flex-col gap-3 relative z-10">
              {languages.map((l, i) => (
                <div
                  key={l}
                  className="glass px-4 py-2.5 text-xs md:text-sm font-mono text-pastel-dark rounded-xl flex items-center justify-between hover:-translate-y-1 hover:shadow-md hover:border-white/50 hover:bg-white/20 cursor-default transition-all duration-300 w-full sm:w-3/4"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle size={14} className="text-pastel-accent shrink-0 opacity-80" />
                    <span className="font-medium tracking-tight text-pastel-dark/90">{l}</span>
                  </div>
                  {/* Native proficiency indicator dots */}
                  <div className="flex gap-1 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-pastel-accent"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-pastel-accent"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-pastel-accent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={certImages[lightbox].src}
              alt={certImages[lightbox].label}
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-center mt-3 text-sm font-mono text-white/80">
              {certImages[lightbox].label}
            </p>

            {/* Close */}
            <button
              className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Prev / Next */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 text-white text-lg transition-colors"
              onClick={() => setLightbox((lightbox - 1 + certImages.length) % certImages.length)}
              aria-label="Previous"
            >‹</button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 text-white text-lg transition-colors"
              onClick={() => setLightbox((lightbox + 1) % certImages.length)}
              aria-label="Next"
            >›</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;