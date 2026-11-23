import SplitHeading from "./SplitHeading.jsx";
import { aboutText, highlights, education } from "../data/content.js";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head" data-aos="fade-up">
          <span className="kicker">About</span>
          <SplitHeading text="About Me." />
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5" data-aos="fade-up">
            <div className="glass about-card h-100">
              <p className="lead-text">{aboutText}</p>
              <div className="row g-3 mt-1">
                {highlights.map((h) => (
                  <div className="col-sm-6" key={h.title}>
                    <div className="mini-card">
                      <i className={`bi ${h.icon}`}></i>
                      <h6>{h.title}</h6>
                      <p>{h.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
            <h4 className="sub-title">
              <i className="bi bi-mortarboard-fill"></i> Education
            </h4>
            <div className="timeline">
              {education.map((e) => (
                <div className="tl-item" key={e.school}>
                  <span className="tl-dot"></span>
                  <div className="glass tl-card">
                    <div className="tl-top">
                      <div>
                        <h5>{e.school}</h5>
                        <p className="tl-role">{e.degree}</p>
                      </div>
                      <span className="chip chip-date">{e.period}</span>
                    </div>
                    <p className="tl-place">
                      <i className="bi bi-geo-alt"></i> {e.place} ·{" "}
                      <strong>{e.meta}</strong>
                    </p>
                    <p className="tl-detail">{e.detail}</p>
                    <p className="award">
                      <i className="bi bi-trophy-fill"></i> {e.award}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
