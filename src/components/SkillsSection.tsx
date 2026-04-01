import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";
import SkillCard from "./SkillCard";

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

const categories = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "Python", logo: "python/python-original.svg" },
      { name: "Java", logo: "java/java-original.svg" },
      { name: "React", logo: "react/react-original.svg" },
      { name: "Flask", logo: "flask/flask-original.svg" }],
    pills: ["Web Development", "Backend"]
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", logo: "mysql/mysql-original.svg" },
      { name: "PostgreSQL", logo: "postgresql/postgresql-original.svg" },
      { name: "SQLite", logo: "sqlite/sqlite-original.svg" },
      { name: "Firebase", logo: "firebase/firebase-plain.svg" },
      { name: "Supabase", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/supabase.svg" }],
    pills: ["REST APIs", "Postman"]
  },
  {
    title: "Tools & Environment",
    skills: [
      { name: "Git", logo: "git/git-original.svg" },
      { name: "GitHub", logo: "github/github-original.svg" },
      { name: "Android Studio", logo: "androidstudio/androidstudio-original.svg" },
      { name: "VS Code", logo: "vscode/vscode-original.svg" }],
    pills: ["Version Control", "IDE"]
  }
];


const SkillsSection = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".skill-category");
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 20, opacity: 0, duration: 0.4, delay: i * 0.08, ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 95%" }
      });
      const items = card.querySelectorAll(".skill-item");
      gsap.from(items, {
        y: 10, opacity: 0, duration: 0.3, stagger: 0.02, ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 95%" }
      });
    });
  }, []);

  return (
    <section id="skills" className="relative min-h-screen py-12 md:py-16 overflow-hidden">

      <div className="relative z-[2] max-w-6xl mx-auto px-6">
        <h2
          id="apt-skills"
          className="font-display italic text-pastel-dark text-center mb-8"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>

          Technical Arsenal
        </h2>

        {(() => {
          const colors = ["#38BDF8", "#8B5CF6", "#1E3A8A"];
          return (
            <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
              {categories.map((cat, idx) =>
                <div
                  key={cat.title}
                  className="skill-category glass p-5 md:p-6 flex flex-col rounded-[1.25rem] relative overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div
                    className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background: `radial-gradient(circle, ${colors[idx]} 0%, transparent 70%)` }}
                  />
                  <h3 className="font-body font-bold text-pastel-dark mb-6 text-xl md:text-xl relative z-10 drop-shadow-sm">
                    {cat.title}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-x-3 gap-y-4 mb-3 relative z-10">
                    {cat.skills.map((s) =>
                      <div key={s.name} className="skill-item flex justify-center">
                        <SkillCard name={s.name} logo={s.logo} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-auto pt-4 pb-1 border-t border-white/20 relative z-10">
                    {cat.pills.map((p) =>
                      <div key={p} className="skill-item">
                        <SkillCard name={p} isTextOnly />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </section>);

};

export default SkillsSection;