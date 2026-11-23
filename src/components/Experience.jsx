import SplitHeading from "./SplitHeading.jsx";
import { experiences, leadership } from "../data/content.js";

export default function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="container">
        <div className="section-head" data-aos="fade-up">
          <span className="kicker">Career</span>
          <SplitHeading text="Work Experience." />
        </div>

        <div className="timeline">
          {experiences.map((x, i) => (
            <div className="tl-item" key={x.company} data-aos="fade-up" data-aos-delay={i * 80}>
              <span className={`tl-dot ${x.current ? "pulse" : ""}`}></span>
              <div className="glass tl-card">
                <div className="tl-top">
                  <div className="d-flex gap-3 align-items-start">
                    <span className="tl-icon">
                      <i className={`bi ${x.icon}`}></i>
                    </span>
                    <div>
                      <h5>{x.company}</h5>
                      <p className="tl-role">{x.role}</p>
                    </div>
                  </div>
                  <span className={`chip ${x.current ? "chip-live" : "chip-date"}`}>
                    {x.period}
                  </span>
                </div>
                <p className="tl-place">
                  <i className="bi bi-geo-alt"></i> {x.place}
                </p>
                <ul className="check-list">
                  {x.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {x.achievement && (
                  <p className="award">
                    <i className="bi bi-trophy-fill"></i> {x.achievement}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <h4 className="sub-title mt-5" data-aos="fade-up">
          <i className="bi bi-people-fill"></i> Leadership Experience
        </h4>
        <div className="glass tl-card" data-aos="fade-up">
          <div className="tl-top">
            <div>
              <h5>{leadership.org}</h5>
              <p className="tl-role">{leadership.role}</p>
            </div>
            <span className="chip chip-date">{leadership.period}</span>
          </div>
          <p className="tl-place">
            <i className="bi bi-geo-alt"></i> {leadership.place}
          </p>
          <ul className="check-list">
            {leadership.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
