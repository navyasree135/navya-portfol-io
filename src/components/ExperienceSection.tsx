import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

const ExperienceSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        x: 30, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 95%" }
      });
    }
    if (lineRef.current) {
      gsap.from(lineRef.current, {
        scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 95%", end: "bottom 60%", scrub: true }
      });
    }
  }, []);

  const tools = ["React Native", "TypeScript", "PostgreSQL", "Supabase", "REST APIs"];

  return (
    <section id="experience" className="py-12 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          id="apt-experience"
          className="font-display italic text-pastel-dark text-center mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>

          Experience
        </h2>

        <div className="relative flex gap-4 md:gap-8 lg:gap-12">
          {/* Timeline line */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-4 h-4 rounded-full bg-pastel-accent border-4 border-pastel-lilac animate-node-pulse" />
            <div ref={lineRef} className="w-0.5 flex-1 mt-2" style={{ background: "linear-gradient(to bottom, #8B5CF6, #38BDF8)" }} />
          </div>

          {/* Card */}
          <div ref={cardRef} className="glass p-5 md:p-8 flex-1">
            <p className="font-body font-bold text-base md:text-lg text-white tracking-wide">CIEL INFITECH</p>
            <p className="font-body text-pastel-dark font-medium text-sm md:text-base">Fullstack Developer Intern</p>
            <p className="font-mono text-[10px] md:text-xs text-pastel-muted mt-1 md:mt-1">Aug 2025 – Present</p>
            <hr className="border-pastel-lilac/20 my-4" />
            <ul className="space-y-3 text-xs md:text-sm text-pastel-dark/90 font-body leading-relaxed">
              <li className="flex gap-2">
                <span className="mt-1 shrink-0 text-pastel-accent">•</span>
                <span>Architected and deployed 2 production-grade cross-platform mobile apps (Home Services & Astrology Dating) using React Native and TypeScript, with modular component design and RESTful API integration</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 shrink-0 text-pastel-accent">•</span>
                <span>Designed and managed structured PostgreSQL schemas to capture user behavioral data, enabling future integration of personalized recommendation models and data-driven feature development</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-1.5 md:gap-2 mt-5">
              {tools.map((t) => (
                <span key={t} className="glass px-2 md:px-3 py-1 text-[10px] md:text-xs font-mono text-pastel-dark">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ExperienceSection;