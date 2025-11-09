//typing
document.addEventListener("DOMContentLoaded", function () {
  new TypeIt("[data-type='typing']", {
    strings: [
      "Tech Enthusiast 🚀",
      "Product Management 📑",
      "Business Analyst📃",
      "Data Analyst 📊",
      "UI/UX Designer 🎨",
      "Database Administrator",
      "Fullstack Web Developer 💻",
      "Quality Assurance 🔍",
    ],
    speed: 100,
    deleteSpeed: 20,
    nextStringDelay: 1500,
    loop: true,
    breakLines: false,
    waitUntilVisible: true,
  }).go();
});

//active navbar
console.log("Navbar active script loaded"); // buat cek aja

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".nav-link").forEach((nav) => {
      nav.classList.remove("active");
    });
    this.classList.add("active");
  });
});

//scroll navbar active
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "home"; // default aktif home
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (
      link.getAttribute("href") === `#${current}` ||
      (current === "home" && link.getAttribute("href") === "#")
    ) {
      link.classList.add("active");
    }
  });
});

//smooth click
document.querySelectorAll('.nav-link[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});
