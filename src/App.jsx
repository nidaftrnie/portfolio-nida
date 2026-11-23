import { useEffect } from "react";
import Loader from "./components/Loader.jsx";
import CursorFollower from "./components/CursorFollower.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import { initMotion } from "./lib/motion.js";

export default function App() {
  useEffect(() => initMotion(), []);

  return (
    <>
      <Loader />
      <CursorFollower />
      <CommandPalette />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
    </>
  );
}
