import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import profileImg from "@/assets/portfilo.jpg";
import { Github, Linkedin, Mail, Phone, GraduationCap, BarChart3 } from "lucide-react";

const AboutSection = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftRef.current) {
      gsap.from(leftRef.current, {
        x: -30, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 95%" }
      });
    }
    if (rightRef.current) {
      gsap.from(rightRef.current, {
        x: 30, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 95%" }
      });
    }
  }, []);

  return (
    <section id="about" className="relative py-12 md:py-16 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-8 items-center relative z-10">
        {/* Left */}
        <div ref={leftRef} className="md:col-span-3 flex-col items-center flex md:items-center justify-start">
          <div className="relative animate-float">
            <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full p-[3px] bg-white">
              <img src={profileImg} alt="Dasari Navya Sree" className="w-full h-full rounded-full object-cover" style={{ boxShadow: "0 8px 40px rgba(255, 255, 255, 0.15)" }} />
            </div>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-pastel-dark mt-6">Dasari Navya Sree</h2>
          <p className="mt-1 text-pastel-accent font-medium font-sans">Full Stack Developer · Computer Science and Engineering</p>
        </div>

        {/* Right */}
        <div ref={rightRef} className="md:col-span-4">
          <div className="relative mb-6">
            <h3 id="apt-about" className="font-display text-3xl md:text-4xl font-semibold text-pastel-dark mb-2 pl-6">Executive Summary</h3>
            <span className="font-display absolute -top-10 -left-4 leading-none select-none text-primary text-8xl">"</span>
            <p className="font-body text-pastel-dark/90 leading-relaxed text-sm pl-6 md:text-xl">
              Computer Science and Engineering undergraduate specializing in full-stack development. Hands-on experience building scalable web applications and intuitive user interfaces from frontend to backend. Passionate about turning ideas into real-world applications using modern web technologies.
            </p>
          </div>

          <div className="glass p-5 space-y-3">
            <div className="flex items-start gap-3">
              <GraduationCap size={18} className="text-pastel-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-body text-sm font-medium text-pastel-dark">B.Tech Computer Science and Engineering</p>
                <p className="font-body text-xs text-pastel-muted">SIMATS University, Chennai (2023–2027)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 size={18} className="text-pastel-accent shrink-0" />
              <p className="font-body text-sm text-pastel-dark">CGPA: 8.83 / 10</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-pastel-accent shrink-0" />
              <a href="mailto:dasarinavyasree936@gmail.com" className="font-mono text-xs text-pastel-dark hover:text-pastel-accent transition-colors">dasarinavyasree936@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-pastel-accent shrink-0" />
              <span className="font-mono text-xs text-pastel-dark">+91 9494125532</span>
            </div>
            <div className="flex gap-2 pt-2">
              <a href="https://github.com/navyasree135/" target="_blank" rel="noreferrer" className="glass flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-pastel-dark hover:scale-105 transition-transform">
                <Github size={14} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/navyasree-dasari-0b5489292" target="_blank" rel="noreferrer" className="glass flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-pastel-dark hover:scale-105 transition-transform">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default AboutSection;