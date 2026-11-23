import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Titik + cincin kursor (hanya di perangkat dengan mouse). */
export default function CursorFollower() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "none" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "none" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      dot.current.classList.add("on");
      ring.current.classList.add("on");
      const hot = e.target instanceof Element && e.target.closest("a, button, [role='tab'], .tilt, input");
      ring.current.classList.toggle("hot", !!hot);
    };
    const leave = () => {
      dot.current.classList.remove("on");
      ring.current.classList.remove("on");
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true"></div>
      <div className="cursor-dot" ref={dot} aria-hidden="true"></div>
    </>
  );
}
