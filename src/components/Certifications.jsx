import SplitHeading from "./SplitHeading.jsx";
import { useEffect, useRef, useState } from "react";
import { certifications } from "../data/content.js";

const getPerView = () =>
  window.innerWidth >= 1100 ? 3 : window.innerWidth >= 700 ? 2 : 1;

export default function Certifications() {
  const total = certifications.length;
  const [perView, setPerView] = useState(getPerView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);

  const maxIndex = Math.max(0, total - perView);

  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // jaga index tetap valid saat jumlah kartu per layar berubah
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, maxIndex, index]);

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-head" data-aos="fade-up">
          <span className="kicker">Credentials</span>
          <SplitHeading text="Certifications & Training." />
        </div>

        <div
          className="cert-carousel"
          data-aos="fade-up"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className="cert-viewport"
            onTouchStart={(e) => {
              setPaused(true);
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              onTouchEnd(e);
              setPaused(false);
            }}
          >
            <div
              className="cert-track"
              style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
            >
              {certifications.map((c) => {
                const Wrapper = c.img ? "a" : "div";
                const props = c.img
                  ? { href: c.img, target: "_blank", rel: "noreferrer" }
                  : {};
                return (
                  <div
                    className="cert-slide"
                    style={{ flexBasis: `${100 / perView}%` }}
                    key={c.title}
                  >
                    <Wrapper {...props} className="glass cert-card tilt">
                      <div className="cert-media">
                        {c.img ? (
                          <img src={c.img} alt={c.title} loading="lazy" draggable="false" />
                        ) : (
                          <i className={`bi ${c.icon}`}></i>
                        )}
                      </div>
                      <div className="cert-body">
                        <h5>{c.title}</h5>
                        <p>{c.org || " "}</p>
                        <span className="chip chip-date">{c.date}</span>
                      </div>
                    </Wrapper>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="carousel-ui">
            <button className="round-btn" onClick={prev} aria-label="Previous certificates">
              <i className="bi bi-chevron-left"></i>
            </button>
            <div className="dots">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  className={`dot-btn ${i === index ? "active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                ></button>
              ))}
            </div>
            <button className="round-btn" onClick={next} aria-label="Next certificates">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
