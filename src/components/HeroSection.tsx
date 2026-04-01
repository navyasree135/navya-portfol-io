import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapSetup";

const HeroSection = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.to(textRef.current, {
      opacity: 0,
      y: -60,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <span className="font-mono tracking-widest md:tracking-[0.3em] uppercase mb-4 md:mb-6 text-[10px] sm:text-xs md:text-lg px-2 break-words text-pastel-accent">
          Computer Science Engineering Undergraduate
        </span>
        <h1 id="apt-hero" className="font-display font-bold leading-none text-pastel-dark" style={{ fontSize: "clamp(4rem, 9vw, 9rem)" }}>

          DASARI NAVYASREE
        </h1>
        <p className="text-lg mt-4 text-pastel-muted font-semibold font-mono md:text-2xl">
          Full Stack Developer
        </p>
        <div className="mt-16 animate-bob">
          <span className="font-mono tracking-widest my-0 pb-[19px] text-sm text-destructive-foreground">
            scroll to explore ↓
          </span>
        </div>
      </div>
    </section>);

};

export default HeroSection;