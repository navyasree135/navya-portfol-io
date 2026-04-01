import { useEffect, useRef, useState, useCallback } from "react";
import airplanePng from "@/assets/air2.png";
/**
 * AirplanePath  (v6 — smooth-lerped plane, native page scroll)
 *
 * Page scroll = 100% native (no library).
 * Plane + trail = lerped progress each RAF frame so they glide
 * smoothly along the path at any scroll speed, both directions.
 */
interface Pt { x: number; y: number; }
const ANCHOR_IDS = [
    "apt-hero",
    "apt-about",
    "apt-skills",
    "apt-experience",
    "apt-projects",
    "apt-certifications",
    "apt-contact",
];
// Horizontal x% for each anchor (alternating sides so path weaves nicely)
const X_PCTS = [48, 68, 28, 72, 26, 70, 50];
function buildCombinedPath(pts: Pt[]): string {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dy = (b.y - a.y) * 0.48;
        d += ` C ${a.x.toFixed(1)} ${(a.y + dy).toFixed(1)},`
            + ` ${b.x.toFixed(1)} ${(b.y - dy).toFixed(1)},`
            + ` ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    return d;
}
const AirplanePath = () => {
    // The main visible dotted path + its mask clone
    const dotRef = useRef<SVGPathElement>(null);
    const maskRef = useRef<SVGPathElement>(null);
    const glowRef = useRef<SVGPathElement>(null);
    const planeRef = useRef<HTMLImageElement>(null);
    const lenRef = useRef<number>(0);
    // smoothProgress lerps toward rawProgress each frame — gives the plane
    // a fluid glide without affecting the actual page scroll at all.
    const smoothProgressRef = useRef<number>(0);
    const LERP = 0.25; // higher = catches up faster, stops sooner
    const [svgW, setSvgW] = useState(1440);
    const [svgH, setSvgH] = useState(8000);
    const [pathD, setPathD] = useState("");
    /** Read DOM anchor positions and rebuild the single combined path */
    const recompute = useCallback(() => {
        const vw = window.innerWidth;
        const docH = document.documentElement.scrollHeight;
        setSvgW(vw);
        setSvgH(docH);
        const pts: Pt[] = [];
        ANCHOR_IDS.forEach((id, idx) => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            pts.push({
                x: (X_PCTS[idx] / 100) * vw,
                y: rect.top + window.scrollY + rect.height * 0.5,
            });
        });
        if (pts.length >= 2) setPathD(buildCombinedPath(pts));
    }, []);
    // Cache total path length after pathD updates
    useEffect(() => {
        if (!dotRef.current || !pathD) return;
        lenRef.current = dotRef.current.getTotalLength();
        // Initialise: nothing drawn yet
        if (maskRef.current) {
            maskRef.current.style.strokeDasharray = `0 ${lenRef.current + 99999}`;
        }
        if (glowRef.current) {
            glowRef.current.style.strokeDasharray = `0 ${lenRef.current + 99999}`;
        }
    }, [pathD]);
    /** Core tick — runs every RAF frame.
     *  rawProgress  = exact scroll fraction (0–1) from window.scrollY.
     *  smoothProgress = lerped toward rawProgress → plane glides, no jumps.
     *  The page itself is untouched — 100% native scroll speed.
     */
    const tick = useCallback(() => {
        const dot = dotRef.current;
        const mask = maskRef.current;
        const glow = glowRef.current;
        const plane = planeRef.current;
        if (!dot || !mask) return;
        const len = lenRef.current;
        if (!len) return;

        // ── Raw target from native scroll ───────────────────────────────────────
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const rawProgress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;

        // ── Lerp toward rawProgress, snap when gap is negligible ────────────────
        // LERP=0.25 catches up in ~3 frames. The snap threshold ensures
        // the plane stops dead the moment scroll stops — no trailing drift.
        const diff = rawProgress - smoothProgressRef.current;
        if (Math.abs(diff) < 0.0005) {
            smoothProgressRef.current = rawProgress; // locked — plane stops
        } else {
            smoothProgressRef.current += diff * LERP;
        }
        const sp = smoothProgressRef.current;

        const drawn = sp * len;
        const show = sp > 0.003;

        // ── Mask (trail grows/shrinks with smooth progress) ─────────────────────
        mask.style.strokeDasharray = show ? `${drawn.toFixed(2)} ${len + 99999}` : `0 ${len + 99999}`;
        mask.style.strokeDashoffset = "0";
        mask.style.opacity = show ? "1" : "0";

        // ── Glow layer ──────────────────────────────────────────────────────────
        if (glow) {
            glow.style.strokeDasharray = show ? `${drawn.toFixed(2)} ${len + 99999}` : `0 ${len + 99999}`;
            glow.style.strokeDashoffset = "0";
            glow.style.opacity = show ? "1" : "0";
        }

        // ── Plane position ──────────────────────────────────────────────────────
        if (plane) {
            if (drawn > 1) {
                const ptAt = Math.min(drawn, len - 0.5);
                const pt = dot.getPointAtLength(ptAt);
                // Look back a tiny bit along the path for tangent direction
                const ptPrv = dot.getPointAtLength(Math.max(ptAt - 8, 0));
                const angle = Math.atan2(pt.y - ptPrv.y, pt.x - ptPrv.x) * (180 / Math.PI);
                plane.style.left = `${pt.x - 36}px`;
                plane.style.top  = `${pt.y - 28}px`;
                plane.style.transform = `rotate(${angle}deg)`;
                plane.style.opacity = show ? "1" : "0";
            } else {
                plane.style.opacity = "0";
            }
        }
    }, []);
    // Native RAF loop — runs every frame, reads window.scrollY directly
    useEffect(() => {
        if (!pathD) return;
        let rafId: number;
        const loop = () => { tick(); rafId = requestAnimationFrame(loop); };
        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, [pathD, tick]);
    // Mount + resize
    useEffect(() => {
        recompute();
        const t1 = setTimeout(recompute, 250);
        const t2 = setTimeout(recompute, 800);
        window.addEventListener("resize", recompute);
        return () => {
            window.removeEventListener("resize", recompute);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [recompute]);
    if (!pathD) return null;
    return (
        <>
            <svg
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${svgW}px`,
                    height: `${svgH}px`,
                    pointerEvents: "none",
                    zIndex: 2,
                    overflow: "visible",
                    willChange: "transform",
                    transform: "translateZ(0)",
                }}
                viewBox={`0 0 ${svgW} ${svgH}`}
                fill="none"
                aria-hidden="true"
            >
                <defs>
                    {/*
            ── Mask definition ─────────────────────────────────────────────
            A solid stroke along the path that grows with scroll.
            Everything INSIDE the mask (white = opaque) is what gets shown.
            The dotted path below uses this mask so dots only appear where
            the plane has already travelled.
          */}
                    <mask id="apt-trail-mask" maskUnits="userSpaceOnUse">
                        <path
                            ref={maskRef}
                            d={pathD}
                            stroke="white"
                            strokeWidth="14"
                            strokeLinecap="round"
                            fill="none"
                            style={{ strokeDasharray: "0 99999" }}
                        />
                    </mask>
                </defs>
                {/* Soft glow — same grow behaviour as the mask, no dots */}
                <path
                    ref={glowRef}
                    d={pathD}
                    stroke="rgba(220,180,255,0.35)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                        filter: "blur(8px)",
                        strokeDasharray: "0 99999",
                    }}
                />
                {/*
          ── Dotted white trail ────────────────────────────────────────────
          Full 10/14 dot pattern rendered along the whole path,
          but only the portion inside the mask (= 0..drawn) is visible.
          This keeps dot spacing perfectly even while the line grows.
        */}
                <path
                    ref={dotRef}
                    d={pathD}
                    stroke="rgba(255,255,255,0.95)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="10 14"
                    fill="none"
                    mask="url(#apt-trail-mask)"
                />
            </svg>
            {/* Paper plane */}
            <img
                ref={planeRef}
                src={airplanePng}
                alt=""
                aria-hidden="true"
                style={{
                    position: "absolute",
                    width: "72px",
                    height: "auto",
                    pointerEvents: "none",
                    zIndex: 3,
                    opacity: 0,
                    transformOrigin: "center center",
                    transition: "opacity 0.2s ease",
                    filter: "drop-shadow(0 3px 14px rgba(200,130,255,0.75)) brightness(1.1)",
                    willChange: "transform",
                    transform: "translateZ(0)",
                }}
            />
        </>
    );
};
export default AirplanePath;