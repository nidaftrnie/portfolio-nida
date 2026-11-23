import { useEffect, useState } from "react";
import { navItems } from "../data/content.js";
import { scrollToId } from "../lib/motion.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);
      let current = "home";
      document.querySelectorAll("section[id]").forEach((s) => {
        if (y >= s.offsetTop - 160) current = s.id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (e, id) => {
    e.preventDefault();
    scrollToId(id);
    setOpen(false);
  };

  return (
    <header className={`nav-wrap ${scrolled || open ? "is-solid" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="brand" onClick={(e) => goTo(e, "home")}>
          <span className="brand-mark">NF</span>
          <span className="brand-text">Nida Fitrianie</span>
        </a>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "active" : ""}
              onClick={(e) => goTo(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="nav-cmd"
          aria-label="Open command palette"
          onClick={() => window.dispatchEvent(new Event("cmd:open"))}
        >
          <i className="bi bi-search"></i>
          <span className="nav-cmd-text">Search</span>
          <kbd>Ctrl K</kbd>
        </button>

        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className="scroll-progress" style={{ width: `${progress}%` }}></div>
    </header>
  );
}
