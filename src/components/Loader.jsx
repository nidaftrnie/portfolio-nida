import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/** Intro: hitung 0–100%, lalu tirai naik dan memicu animasi hero. */
export default function Loader() {
  const [gone, setGone] = useState(false);
  const root = useRef(null);
  const num = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    document.body.classList.add("is-loading");
    const o = { v: 0 };
    const fadeEls = root.current.querySelectorAll(".loader-brand, .loader-meta, .loader-bar");
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("is-loading");
        setGone(true);
        window.dispatchEvent(new Event("intro:done"));
      },
    });
    tl.to(o, {
      v: 100,
      duration: 1.3,
      ease: "power2.inOut",
      onUpdate: () => {
        if (num.current) num.current.textContent = Math.round(o.v);
        if (bar.current) bar.current.style.transform = `scaleX(${o.v / 100})`;
      },
    })
      .to(fadeEls, { opacity: 0, y: -12, duration: 0.35, stagger: 0.05 }, "+=0.1")
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });

    return () => {
      tl.kill();
      document.body.classList.remove("is-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-brand">
          <span className="brand-mark">NF</span>
        </div>
        <div className="loader-meta">
          <span className="loader-name">Nida Fitrianie</span>
          <span className="loader-count">
            <b ref={num}>0</b>%
          </span>
        </div>
        <div className="loader-bar">
          <i ref={bar}></i>
        </div>
      </div>
    </div>
  );
}
