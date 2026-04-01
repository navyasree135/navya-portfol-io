/**
 * gsapSetup.ts — Central GSAP + ScrollTrigger initialisation
 *
 * Import this ONCE (in Index.tsx) before any section component mounts.
 * Every component that needs ScrollTrigger just imports { gsap, ScrollTrigger }
 * from here — no async re-imports, no duplicate registrations.
 *
 * Lenis wires into ScrollTrigger via:
 *   lenis.on('scroll', ScrollTrigger.update)
 * so ScrollTrigger always reads Lenis' smoothed position, not native scrollY.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tell ScrollTrigger to use Lenis' scroller proxy so it never reads
// window.scrollY directly — it will instead call our custom getter.
// This is wired up in Index.tsx once Lenis is ready.
export { gsap, ScrollTrigger };
