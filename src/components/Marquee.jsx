import { skillTabs } from "../data/skills.js";

const rows = [skillTabs[0].items, skillTabs[1].items].map((items) =>
  items.filter((i) => i.logo)
);

function Row({ items, reverse }) {
  const loop = [...items, ...items];
  return (
    <div className={`mq-row ${reverse ? "rev" : ""}`}>
      <div className="mq-track">
        {loop.map((it, i) => (
          <span className="mq-item" key={i} aria-hidden={i >= items.length}>
            <img src={it.logo} alt="" loading="lazy" />
            {it.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Dua baris logo tools yang berjalan berlawanan arah. */
export default function Marquee() {
  return (
    <div className="marquee" aria-label="Tools and technologies">
      <p className="marquee-label">Tools & tech I work with</p>
      <Row items={rows[0]} />
      <Row items={rows[1]} reverse />
    </div>
  );
}
