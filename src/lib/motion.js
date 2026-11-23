import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

/** Scroll halus ke posisi Y (memakai Lenis kalau aktif). */
export function scrollToY(y) {
  if (lenis) lenis.scrollTo(y, { duration: 1.3 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

export function scrollToId(id, offset = 70) {
  const el = document.getElementById(id);
  if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - offset);
}

export function refreshMotion() {
  ScrollTrigger.refresh();
}

// Elemen dengan atribut data-aos dianimasikan GSAP saat masuk layar.
const REVEAL = {
  "fade-up": { y: 40 },
  "fade-down": { y: -40 },
  "fade-left": { x: 60 },
  "fade-right": { x: -60 },
  "zoom-in": { scale: 0.92 },
};

/** Efek yang mengikuti pointer: spotlight kartu, tilt 3D, tombol magnetik. */
function initInteractions(reduce) {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!fine) return () => {};

  const onMove = (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;

    const glass = t.closest(".glass");
    if (glass) {
      const r = glass.getBoundingClientRect();
      glass.style.setProperty("--mx", `${e.clientX - r.left}px`);
      glass.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    if (reduce) return;

    const tilt = t.closest(".tilt");
    if (tilt) {
      const r = tilt.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.setProperty("--ry", `${px * 8}deg`);
      tilt.style.setProperty("--rx", `${-py * 8}deg`);
    }

    const mag = t.closest("[data-magnetic]");
    if (mag) {
      const r = mag.getBoundingClientRect();
      gsap.to(mag, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.3,
        y: (e.clientY - (r.top + r.height / 2)) * 0.3,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  const onOut = (e) => {
    const from = e.target instanceof Element ? e.target : null;
    if (!from) return;
    const left = (sel, fn) => {
      const el = from.closest(sel);
      if (el && !(e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) fn(el);
    };
    left(".tilt", (el) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
    left("[data-magnetic]", (el) =>
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)", overwrite: "auto" })
    );
  };

  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerout", onOut);
  return () => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerout", onOut);
  };
}

export function initMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups = [];

  const ctx = gsap.context(() => {
    if (!reduce) {
      // Smooth scroll. Hanya aktif jika window memang yang di-scroll.
      if (document.documentElement.scrollHeight > window.innerHeight + 50) {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => {
          gsap.ticker.remove(tick);
          lenis.destroy();
          lenis = null;
        });
      }

      // Reveal generik
      document.querySelectorAll("[data-aos]").forEach((el) => {
        const from = REVEAL[el.dataset.aos] || { y: 30 };
        const delay = (Number(el.dataset.aosDelay) || 0) / 1000;
        gsap.fromTo(
          el,
          { opacity: 0, ...from },
          {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: 0.9, delay, ease: "power3.out", clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      // Judul section: huruf naik satu per satu
      document.querySelectorAll(".split").forEach((h) => {
        gsap.from(h.querySelectorAll(".ch"), {
          yPercent: 120, rotate: 8, opacity: 0,
          duration: 0.8, stagger: 0.03, ease: "power4.out",
          scrollTrigger: { trigger: h, start: "top 90%", once: true },
        });
      });
    }

    // Garis timeline terisi mengikuti scroll
    document.querySelectorAll(".timeline").forEach((tl) => {
      ScrollTrigger.create({
        trigger: tl,
        start: "top 70%",
        end: "bottom 60%",
        scrub: reduce ? false : 0.4,
        onUpdate: (self) => tl.style.setProperty("--p", self.progress),
      });
    });
  });

  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", onLoad);
  const stopInteractions = initInteractions(reduce);

  return () => {
    window.removeEventListener("load", onLoad);
    stopInteractions();
    cleanups.forEach((fn) => fn());
    ctx.revert();
  };
}
