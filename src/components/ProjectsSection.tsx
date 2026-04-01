import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapSetup";
import { ExternalLink, Star } from "lucide-react";
import astroD8Logo from "@/assets/Astro Date.png";
import fixitLogo from "@/assets/Fixit_logo.png";

const featured = {
  name: "FIXIT",
  tagline: "Cross-platform urban services booking app with real-time scheduling & ML-powered recommendations",
  logo: fixitLogo,
  url: "https://www.thefixit.in",
  gradient: "linear-gradient(135deg, #fac6eeff 0%, #e772e5ff 60%, #c770f3ff 100%)",
  bullets: [
    "Engineered a cross-platform mobile app (Android & iOS) for booking 10+ urban services (plumbing, electrical, salon) with real-time scheduling and live database sync for listings, bookings, and user profiles",
    "Architected role-based access control (customer/provider/admin) with Supabase Auth and RLS policies",
    "Integrating ML pipeline for personalized service recommendations (collaborative filtering) and customer sentiment analysis (NLP) on user reviews",
  ],
  tools: ["React Native", "TypeScript", "Supabase", "PostgreSQL", "REST APIs", "Expo", "Google Cloud", "Git"],
};

const projects = [
  {
    name: "Astro Date – Astro Driven Dating App",
    logo: astroD8Logo,
    url: "https://www.astrodate.in",
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #8B5CF6 60%, #38BDF8 100%)",
    bullets: [
      "Built a full-stack astro-driven dating app combining Vedic astrology, Western zodiac compatibility, and personality analysis for personalized match recommendations",
      "Integrated real-time compatibility scoring using pgvector cosine similarity and SQL RPC functions for optimized matchmaking logic",
      "Designed a scalable architecture with Supabase Edge Functions and PostgreSQL supporting complex relationship insights and personalization at scale",
    ],
    tools: ["React Native", "Expo", "Supabase", "PostgreSQL", "pgvector", "Edge Functions", "AstrologyAPI", "OAuth"],
  },
  {
    name: "Secure File Sharing System",
    url: "https://github.com/navyasree135",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #38BDF8 60%, #1E3A8A 100%)",
    bullets: [
      "Designed a secure application for encrypted transmission of files between sender and receiver using AES-256",
      "Developed QR code-based authentication and integrated FTP protocol for protected transfer across networks",
      "Built a dual-interface GUI for seamless operations, enabling simultaneous chat and secure file transfer",
    ],
    tools: ["AES-256", "QR Authentication", "FTP Protocol", "GUI Development", "Cryptography"],
  },

  {
    name: "Automatic Patient Monitoring System",
    url: "https://github.com/navyasree135",
    gradient: "linear-gradient(135deg, #38BDF8 0%, #1E3A8A 60%, #8B5CF6 100%)",
    bullets: [
      "Developed a GUI-based health monitoring system to automatically track and log patient vitals like temperature, heart rate, and oxygen levels",
      "Integrated a secure login system utilizing bcrypt for password hashing and managed robust local data storage using SQLite",
      "Implemented an end-to-end patient record management system supporting complete CRUD operations and historical health viewing",
    ],
    tools: ["GUI Development", "SQLite", "bcrypt", "Authentication", "CRUD Operations"],
  },
  {
    name: "Secure Examination System",
    url: "https://github.com/navyasree135",
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 60%, #8B5CF6 100%)",
    bullets: [
      "Engineered a robust online assessment platform in Java with secure role-based access control for administrators, instructors, and students",
      "Integrated automated randomized test generation and strict session restrictions to maintain exam integrity and prevent external access",
      "Built a scalable database architecture utilizing MySQL and secure JDBC connections to process real-time submissions and analytic score reports",
    ],
    tools: ["Java", "MySQL", "JDBC", "Authentication", "Object-Oriented Design"],
  },
];

const ProjectsSection = () => {
  const featuredRef = useRef<any>(null);
  const gridRef = useRef<any>(null);

  useEffect(() => {
    if (featuredRef.current) {
      gsap.from(featuredRef.current, {
        y: 30, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: featuredRef.current, start: "top 95%" },
      });
    }
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 20, opacity: 0, duration: 0.4, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 95%" },
        });
      });
    }
  }, []);

  return (
    <section id="projects" className="py-12 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          id="apt-projects"
          className="font-display italic text-pastel-dark mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", textAlign: "center" }}
        >
          Selected Work
        </h2>

        {/* ── Featured Hero Card ─────────────────────────────────────────── */}
        {(() => {
          const FeaturedWrapper = featured.url ? 'a' : 'div';
          return (
            <FeaturedWrapper
              ref={featuredRef}
              href={featured.url}
              target={featured.url ? "_blank" : undefined}
              rel={featured.url ? "noreferrer" : undefined}
              className={`project-card glass overflow-hidden mb-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group ${featured.url ? 'block cursor-pointer' : ''}`}
            >
              {/* Gradient cover header */}
              <div
                className="relative w-full flex flex-col justify-end p-2 md:p-7 pt-6 md:pt-6"
                style={{ background: featured.gradient }}
              >
                {/* Noise / gloss overlay */}
                <div className="absolute inset-0 bg-black/10" />
                {/* Decorative radial glow */}
                <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
                <div className="relative z-10 flex items-end justify-between gap-4">
                  <div>
                    <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm mb-2 w-fit">
                      <Star size={10} fill="currentColor" /> Featured Project
                    </span>
                    <div className="flex items-center gap-3">
                      {featured.logo && (
                        <img src={featured.logo} alt={`${featured.name} logo`} className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-lg shadow-sm" />
                      )}
                      <h3 className="font-body font-bold text-white text-2xl md:text-3xl drop-shadow-md">{featured.name}</h3>
                    </div>
                    <p className="font-body text-sm text-white/80 mt-1 max-w-2xl drop-shadow-sm">{featured.tagline}</p>
                  </div>
                  {featured.url && <ExternalLink size={20} className="text-white/70 shrink-0 mb-1" />}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Bullets */}
                <ul className="space-y-2 text-sm text-pastel-dark/90 font-body leading-relaxed mb-5">
                  {featured.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-pastel-accent mt-1 shrink-0">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {featured.tools.map((t, i) => (
                    <span
                      key={t}
                      className="glass px-3 py-1 text-xs font-mono text-pastel-dark rounded-full md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FeaturedWrapper>
          );
        })()}

        {/* ── 2-Column Grid ──────────────────────────────────────────────── */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => {
            const CardWrapper = p.url ? 'a' : 'div';
            return (
              <CardWrapper
                key={p.name}
                href={p.url}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noreferrer" : undefined}
                className={`project-card glass overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group ${p.url ? 'block cursor-pointer' : ''}`}
              >
                {/* Gradient cover header */}
                <div
                  className="relative h-16 w-full flex items-end px-5 pb-3"
                  style={{ background: p.gradient }}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full opacity-25 blur-2xl" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
                  <div className="relative z-10 flex items-end justify-between w-full">
                    <div className="flex items-center gap-2">
                      {p.logo && (
                        <img src={p.logo} alt={`${p.name} logo`} className="w-6 h-6 md:w-8 md:h-8 object-contain rounded shadow-sm" />
                      )}
                      <h3 className="font-body font-bold text-white text-base md:text-lg drop-shadow-md leading-none">{p.name}</h3>
                    </div>
                    {p.url && <ExternalLink size={14} className="text-white/70 shrink-0 mb-1" />}
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <ul className="space-y-3 text-sm text-pastel-dark/90 font-body leading-relaxed mb-5">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-pastel-accent mt-0.5 shrink-0">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {p.tools.map((t, i) => (
                      <span
                        key={t}
                        className="glass px-3 py-1 text-xs font-mono text-pastel-dark rounded-full md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
