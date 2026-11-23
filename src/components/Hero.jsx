import { useEffect, useRef } from "react";
import TypeIt from "typeit";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "./HeroCanvas.jsx";
import Marquee from "./Marquee.jsx";
import { typingStrings, resumeUrl, stats, socials } from "../data/content.js";
import { scrollToId } from "../lib/motion.js";

const fmt = (v, d) =>
  v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

/** Angka yang menghitung naik setelah intro selesai dan terlihat di layar. */
function Counter({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const o = { v: 0 };
    let introDone = false, entered = false, started = false;
    el.textContent = fmt(0, decimals) + suffix;

    const go = () => {
      if (started || !introDone || !entered) return;
      started = true;
      gsap.to(o, {
        v: to, duration: 2, ease: "power2.out",
        onUpdate: () => (el.textContent = fmt(o.v, decimals) + suffix),
      });
    };
    const onIntro = () => { introDone = true; go(); };
    window.addEventListener("intro:done", onIntro);
    const failsafe = setTimeout(onIntro, 4000);
    const st = ScrollTrigger.create({
      trigger: el, start: "top 95%", once: true,
      onEnter: () => { entered = true; go(); },
    });

    return () => {
      window.removeEventListener("intro:done", onIntro);
      clearTimeout(failsafe);
      st.kill();
      gsap.killTweensOf(o);
      el.textContent = fmt(to, decimals) + suffix;
    };
  }, [to, decimals, suffix]);

  return <strong ref={ref}>{fmt(to, decimals) + suffix}</strong>;
}

export default function Hero() {
  const typeRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const instance = new TypeIt(typeRef.current, {
      strings: typingStrings,
      speed: 90,
      deleteSpeed: 20,
      nextStringDelay: 1500,
      loop: true,
      breakLines: false,
      waitUntilVisible: true,
    }).go();
    return () => instance.destroy();
  }, []);

  // animasi masuk hero, menunggu loader selesai
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.from(".hero-text > *", {
        y: 44, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", clearProps: "transform,opacity",
      }).from(".stats", { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity" }, "-=0.5");
      const play = () => tl.play();
      window.addEventListener("intro:done", play);
      const failsafe = setTimeout(play, 4000);
      return () => {
        window.removeEventListener("intro:done", play);
        clearTimeout(failsafe);
      };
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={rootRef}>
      <div className="hero-visual">
        <HeroCanvas />
        <div className="hero-content container">
          <div className="hero-text">
            <span className="eyebrow">
              <span className="dot"></span> Open to opportunities
            </span>
            <p className="hero-hi">Hi, I am</p>
            <h1 className="hero-name">
              Nida <span className="grad-text">Fitrianie</span>
            </h1>
            <h3 className="hero-typing" ref={typeRef}></h3>
            <p className="hero-sub">
              Junior Business Analyst at Medika Plaza — turning business needs
              into reliable, user-centered systems.
            </p>
            <div className="hero-cta">
              <a
                href="#projects"
                className="btn-main"
                data-magnetic
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("projects");
                }}
              >
                View Projects <i className="bi bi-arrow-right"></i>
              </a>
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost" data-magnetic>
                <i className="bi bi-download"></i> Resume
              </a>
            </div>
            <div className="hero-social">
              {socials.map((s) => (
                <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} data-magnetic>
                  <i className={`bi ${s.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container stats-wrap">
        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Marquee />
    </section>
  );
}
