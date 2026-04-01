/**
 * Index.tsx — Native Scroll
 * Pure browser scroll. GSAP ScrollTrigger drives section entrance animations.
 * Spline background is static fixed — parallaxing a WebGL iframe causes
 * compositor thread conflicts and stutter, so we keep it clean.
 */

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsapSetup";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative">

      {/* ── Liquid Waves 3D Background ───────────── */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-base">
        <div 
          className="absolute inset-[0] bg-cover bg-center bg-no-repeat opacity-60 mix-blend-screen"
          style={{ 
            backgroundImage: 'url("/bg-waves.png")',
            animation: 'slow-pan 30s ease-in-out infinite alternate',
            transform: 'scale(1.1)'
          }}
        />
        {/* Gradient overlay to blend it cleanly into the deep navy at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/30 to-[#0F172A]" />
      </div>

      {/* ── Noise texture overlay ────────────────────────────────────────── */}
      <div className="noise-overlay" />

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <div className="relative z-[1] space-y-8">
        <section id="apt-hero">
          <Navbar />
          <HeroSection />
        </section>
        <section id="apt-about">
          <AboutSection />
        </section>
        <section id="apt-skills">
          <SkillsSection />
        </section>
        <section id="apt-experience">
          <ExperienceSection />
        </section>
        <section id="apt-projects">
          <ProjectsSection />
        </section>
        <section id="apt-certifications">
          <CertificationsSection />
        </section>
        <section id="apt-contact">
          <ContactSection />
        </section>
      </div>
    </div>
  );
};

export default Index;
