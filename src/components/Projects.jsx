import { useEffect, useState } from "react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading.jsx";

const PAGE_SIZE = 5;

// pola lebar kartu per jumlah item di halaman (grid 6 kolom di desktop)
const LAYOUT = {
  5: ["s2", "s2", "s2", "s3", "s3"],
  4: ["s3", "s3", "s3", "s3"],
  3: ["s2", "s2", "s2"],
  2: ["s3", "s3"],
  1: ["solo"],
};

function ProjectCard({ p }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="glass project-card tilt">
      <div className="project-media">
        {p.img ? (
          <img src={p.img} alt={p.title} loading="lazy" />
        ) : (
          <i className={`bi ${p.icon}`}></i>
        )}
      </div>
      <div className="project-body">
        <span
          className="project-tag"
          style={{ backgroundColor: p.tagBg, color: p.tagColor }}
        >
          {p.tag}
        </span>
        <h3>{p.title}</h3>
        <p className="project-role">{p.role}</p>
        <p className={`project-desc ${expanded ? "open" : ""}`}>{p.desc}</p>
        <button className="link-btn" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Show less" : "Read more"}
        </button>
        <div className="project-foot">
          <small>
            <i className="bi bi-calendar3"></i> {p.date}
          </small>
          {p.link && (
            <a href={p.link} target="_blank" rel="noreferrer" className="btn-mini">
              View Project <i className="bi bi-arrow-up-right"></i>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(0);

  const list =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const items = list.slice(start, start + PAGE_SIZE);
  const layout = LAYOUT[items.length] || [];

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.from(".pg-item", { opacity: 0, y: 36, duration: 0.6, stagger: 0.08, ease: "power3.out", clearProps: "transform,opacity" });
    }
    refreshMotion();
  }, [filter, page]);

  const changeFilter = (f) => {
    setFilter(f);
    setPage(0);
  };

  const goTo = (p) => {
    setPage(p);
    scrollToId("projects");
  };

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head" data-aos="fade-up">
          <span className="kicker">Portfolio</span>
          <SplitHeading text="Projects." />
        </div>

        <div className="filters" data-aos="fade-up">
          {projectFilters.map((f) => (
            <button
              key={f}
              className={`filter ${filter === f ? "active" : ""}`}
              onClick={() => changeFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="project-grid" key={`${filter}-${page}`}>
          {items.map((p, i) => (
            <div className={`pg-item pg-${layout[i]}`} key={p.id}>
              <ProjectCard p={p} />
            </div>
          ))}
        </div>

        <div className="pager">
          <p className="pager-info">
            Showing {start + 1}–{start + items.length} of {list.length} projects
            {page === 0 && pages > 1 ? " · newest first" : ""}
          </p>
          {pages > 1 && (
            <div className="pager-ctrl">
              <button
                className="pager-btn"
                disabled={page === 0}
                onClick={() => goTo(page - 1)}
              >
                <i className="bi bi-arrow-left"></i> Prev
              </button>
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  className={`pager-num ${i === page ? "active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={i === page ? "page" : undefined}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="pager-btn"
                disabled={page === pages - 1}
                onClick={() => goTo(page + 1)}
              >
                Next <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
