import SplitHeading from "./SplitHeading.jsx";
import { email, socials } from "../data/content.js";

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="glass contact-card text-center" data-aos="zoom-in">
          <span className="kicker">Contact</span>
          <SplitHeading text="Get in touch." />
          <p className="contact-text">
            Open to any exciting ventures, whether they’re freelance gigs,
            internships, or entry-level roles. Shoot me a message with your
            queries or just drop a friendly hello!
          </p>
          <a href={`mailto:${email}`} className="btn-main btn-lg-main" data-magnetic>
            <i className="bi bi-envelope-fill"></i> Send Email
          </a>
          <div className="hero-social justify-content-center mt-4">
            {socials.map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <i className={`bi ${s.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
        <footer className="footer">
          © {new Date().getFullYear()} Nida Fitrianie. Built with React & Vite.
        </footer>
      </div>
    </section>
  );
}
