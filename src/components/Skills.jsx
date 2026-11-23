import { useState } from "react";
import SplitHeading from "./SplitHeading.jsx";
import { skillTabs } from "../data/skills.js";

function LogoTile({ item, index }) {
  return (
    <div
      className="logo-tile"
      style={{ "--brand": item.color, "--i": index }}
      title={item.name}
    >
      <span className="logo-box">
        {item.logo ? (
          <img src={item.logo} alt="" loading="lazy" />
        ) : (
          <i className={`bi ${item.icon}`}></i>
        )}
      </span>
      <span className="logo-name">{item.name}</span>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(skillTabs[0].id);
  const tab = skillTabs.find((t) => t.id === active);
  const count = (t) =>
    t.type === "logos"
      ? t.items.length
      : t.groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <div className="section-head" data-aos="fade-up">
          <span className="kicker">Toolbox</span>
          <SplitHeading text="Skills." />
        </div>

        <div className="glass skills-shell" data-aos="fade-up">
          <div className="skill-tabs" role="tablist" aria-label="Skill categories">
            {skillTabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                className={`skill-tab ${active === t.id ? "active" : ""}`}
                onClick={() => setActive(t.id)}
              >
                <i className={`bi ${t.icon}`}></i>
                <span className="skill-tab-label">{t.label}</span>
                <span className="skill-tab-count">{count(t)}</span>
              </button>
            ))}
          </div>

          <div className="skill-panel" key={tab.id} role="tabpanel">
            {tab.type === "logos" ? (
              <div className="logo-grid">
                {tab.items.map((it, i) => (
                  <LogoTile item={it} index={i} key={it.name} />
                ))}
              </div>
            ) : (
              <div className="chip-groups">
                {tab.groups.map((g) => (
                  <div key={g.title}>
                    <h6 className="chip-group-title">{g.title}</h6>
                    <div className="chips">
                      {g.items.map((it, i) => (
                        <span
                          className="chip chip-lg"
                          style={{ "--i": i }}
                          key={it}
                        >
                          <i className="bi bi-check2-circle"></i> {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
