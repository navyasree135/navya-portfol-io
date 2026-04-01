import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    // Use passive scroll listener — Lenis dispatches native scroll events
    const checkScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Native smooth scroll to section
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.querySelector(href) as HTMLElement | null;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ?
          "py-3 bg-[#0B1120]/80 backdrop-blur-md border-b border-pastel-accent/20 shadow-lg" :
          "py-5 bg-transparent"}`
        }>

        <div className="w-full px-6 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display text-2xl font-semibold tracking-wide text-pastel-dark"
          >
            D N
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) =>
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className={`relative font-body text-sm tracking-wide transition-colors duration-300 font-semibold ${active === l.href ? "text-white" : "text-pastel-dark/80 hover:text-white"}`
                }>

                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${active === l.href ? "w-full" : "w-0"}`
                  } />

              </a>
            )}
          </div>
          <button
            className="md:hidden text-pastel-dark"
            onClick={() => setMobileOpen(true)}>

            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen &&
        <div className="fixed inset-0 z-[60] bg-pastel-base/95 flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-6 right-6 text-pastel-dark"
            onClick={() => setMobileOpen(false)}>

            <X size={28} />
          </button>
          {links.map((l) =>
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                handleNavClick(e, l.href);
                setMobileOpen(false);
              }}
              className="font-display text-3xl text-pastel-dark hover:text-pastel-accent transition-colors">

              {l.label}
            </a>
          )}
        </div>
      }
    </>);

};

export default Navbar;