import { useEffect, useRef, useState } from "react";
import { navItems, resumeUrl, email, socials } from "../data/content.js";
import { scrollToId } from "../lib/motion.js";

const NAV_ICONS = {
  home: "bi-house",
  about: "bi-person",
  experience: "bi-briefcase",
  projects: "bi-grid-1x2",
  skills: "bi-stars",
  certifications: "bi-patch-check",
  contact: "bi-envelope",
};

/** Command palette ala IDE: tekan Ctrl/⌘ + K untuk navigasi cepat. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState("");
  const listRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const commands = [
    ...navItems.map((n) => ({
      group: "Navigate",
      label: `Go to ${n.label}`,
      icon: NAV_ICONS[n.id] || "bi-arrow-right",
      run: () => scrollToId(n.id),
    })),
    {
      group: "Actions",
      label: "Open resume (PDF)",
      icon: "bi-file-earmark-person",
      run: () => window.open(resumeUrl, "_blank"),
    },
    {
      group: "Actions",
      label: "Copy email address",
      icon: "bi-clipboard",
      run: () => {
        const done = () => showToast("Email copied: " + email);
        if (navigator.clipboard) navigator.clipboard.writeText(email).then(done, () => showToast(email));
        else showToast(email);
      },
    },
    {
      group: "Actions",
      label: "Send email",
      icon: "bi-envelope-paper",
      run: () => (window.location.href = `mailto:${email}`),
    },
    ...socials.map((s) => ({
      group: "Social",
      label: `Open ${s.label}`,
      icon: s.icon,
      run: () => window.open(s.href, "_blank"),
    })),
  ];

  const results = commands.filter((c) => c.label.toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmd:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmd:open", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
    }
  }, [open]);

  useEffect(() => {
    const active = listRef.current && listRef.current.querySelector(".cmd-item.sel");
    if (active) active.scrollIntoView({ block: "nearest" });
  }, [sel, open]);

  const run = (c) => {
    setOpen(false);
    setTimeout(c.run, 120);
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[sel]) {
      e.preventDefault();
      run(results[sel]);
    }
  };

  let lastGroup = "";

  return (
    <>
      {open && (
        <div className="cmd-overlay" onMouseDown={() => setOpen(false)}>
          <div
            className="cmd-box"
            role="dialog"
            aria-label="Command palette"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="cmd-input-row">
              <i className="bi bi-search"></i>
              <input
                id="cmd-input"
                className="cmd-input"
                autoFocus
                placeholder="Search sections and actions…"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={onInputKey}
              />
              <kbd>Esc</kbd>
            </div>
            <div className="cmd-list" ref={listRef}>
              {results.length === 0 && <p className="cmd-empty">No results for “{q}”.</p>}
              {results.map((c, i) => {
                const header = c.group !== lastGroup ? c.group : null;
                lastGroup = c.group;
                return (
                  <div key={c.label}>
                    {header && <p className="cmd-group">{header}</p>}
                    <button
                      className={`cmd-item ${i === sel ? "sel" : ""}`}
                      onMouseEnter={() => setSel(i)}
                      onClick={() => run(c)}
                    >
                      <i className={`bi ${c.icon}`}></i>
                      <span>{c.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="cmd-foot">
              <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
              <span><kbd>Enter</kbd> select</span>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
