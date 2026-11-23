export const typingStrings = [
  "Business Analyst 📃",
  "System Analyst ⚙️",
  "Product Management 📑",
  "UI/UX Designer 🎨",
  "Data Analyst 📊",
  "Quality Assurance 🔍",
  "Fullstack Web Developer 💻",
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const resumeUrl = encodeURI("/assets/resume/CV NIDA FITRIANIE.pdf");
export const email = "fitrianienida@gmail.com";

export const stats = [
  { to: 3.95, decimals: 2, suffix: "", label: "GPA / 4.0" },
  { to: 10, decimals: 0, suffix: "+", label: "Odoo ERP projects supported" },
  { to: 1000, decimals: 0, suffix: "+", label: "Users on CRM project" },
  { to: 100, decimals: 0, suffix: "+", label: "Participants trained" },
];

export const aboutText =
  "Bachelor of Information Systems (GPA 3.95) and Junior Business Analyst at Medika Plaza with hands-on experience in Odoo ERP, requirements documentation (BRD & FSD), SIT/UAT coordination, UI/UX design, and data analysis. Passionate about turning business needs into reliable, user-centered systems, and committed to continuous learning.";

export const highlights = [
  { icon: "bi-clipboard-data", title: "Business & System Analysis", text: "BRD, FSD, process mapping and stakeholder coordination." },
  { icon: "bi-bug", title: "Testing & Quality", text: "SIT, UAT and automated testing with Robot Framework." },
  { icon: "bi-palette", title: "UI/UX Design", text: "User-centered design and prototyping in Figma." },
  { icon: "bi-bar-chart-line", title: "Data & Development", text: "Dashboards, SQL databases and full-stack web apps." },
];

export const education = [
  {
    school: "Gunadarma University",
    place: "Depok, Indonesia",
    degree: "Bachelor of Information System",
    period: "Sep 2021 – Aug 2025",
    meta: "GPA: 3.95/4.0",
    detail:
      "Relevant coursework: Algorithms & Programming, Information Systems Project Management, System Performance Analysis, Database Systems, System Testing and Implementation.",
    award: "Best Academic Achievement Award – Semesters 4 and 7",
  },
  {
    school: "Binar Academy",
    place: "Jakarta, Indonesia",
    degree: "Full-Stack Web Development",
    period: "Mar 2024 – Jun 2024",
    meta: "Final Score: 94/100",
    detail:
      "Relevant coursework: Create a Web API, Database Design, Design API Architecture and Documentation, Testing and Deployment of Web Applications.",
    award: "Highest Average Challenge Score",
  },
];

export const experiences = [
  {
    company: "PT Kartika Bina Medikatama (Medika Plaza)",
    place: "Jakarta, Indonesia",
    role: "Junior Business Analyst",
    period: "Dec 2025 – Present",
    current: true,
    icon: "bi-hospital",
    points: [
      "Supported 10+ Odoo ERP projects and custom module enhancements, including a CRM project supporting over 1,000 users.",
      "Tracked project progress, followed up on pending issues, and coordinated with users and developers throughout the development process.",
      "Prepared Business Requirements Documents (BRDs) and Functional Specification Documents (FSDs) to document business needs and support system development.",
      "Performed System Integration Testing (SIT) and coordinated User Acceptance Testing (UAT) to identify issues and verify system functionality before release.",
      "Created three IT Standard Operating Procedures (SOPs) and related work instructions to document and standardize IT processes.",
      "Reviewed IT helpdesk tickets, identified reported issues, and assigned them to the relevant IT teams for follow-up.",
      "Designed UI screens in Figma based on user requirements and User-Centered Design (UCD) principles.",
    ],
  },
  {
    company: "PT Mega Manunggal Property Tbk",
    place: "Jakarta, Indonesia",
    role: "Information Technology Intern",
    period: "Sep 2024 – Feb 2025",
    icon: "bi-building",
    points: [
      "Prepared BRDs, FSDs, and system flow diagrams to document requirements for internal applications.",
      "Analyzed over 2,000 internal records and created dashboards in Google Looker Studio to identify recurring issues and monitor operational data.",
      "Developed and executed automated test scripts using Robot Framework for 6 internal systems, alongside black-box and white-box testing and UAT.",
      "Designed UI screens and workflows for six internal systems using Figma.",
    ],
    achievement: "Best Business Process Flow Design award during the internship",
  },
  {
    company: "Lembaga Pengembangan Komputerisasi (LepKom) Gunadarma",
    place: "Depok, Indonesia",
    role: "Laboratory Course Instructor & Assistant",
    period: "Sep 2023 – Aug 2025",
    icon: "bi-mortarboard",
    points: [
      "Assisted in training over 100 participants in Oracle PL/SQL, C#, and ASP.NET.",
      "Guided participants through database exercises in Oracle PL/SQL and web development tasks using C# and ASP.NET.",
      "Resolved virtual machine and system setup issues using VMware during training sessions.",
    ],
  },
];

export const leadership = {
  org: "Karang Taruna",
  place: "Jakarta, Indonesia",
  role: "Leader",
  period: "Jul 2019 – Sep 2023",
  points: [
    "Led and organized various social and community activities to strengthen social engagement.",
    "Initiated social actions to support communities affected by natural disasters.",
    "Managed Independence Day celebrations by organizing 15 competitions and hosted a cultural & art performance with local residents.",
  ],
};

export const projectFilters = [
  "All",
  "Business Analysis",
  "UI/UX",
  "QA",
  "Data",
  "Development",
];

export const projects = [
  {
    id: "elearning",
    category: "Business Analysis",
    tag: "E-Learning Platform (Medika Plaza)",
    tagBg: "#d1e5fc",
    tagColor: "#253893",
    title: "E-Learning & Training System",
    role: "Business Analyst",
    desc: "Handled business analysis for an E-Learning & Training System for internal employees and external participants. Prepared BRDs, FSDs, and UI wireframes to document system requirements and user flows, and tracked project progress while coordinating SIT and UAT with users and developers.",
    date: "August 2026",
    icon: "bi-journal-richtext",
  },
  {
    id: "finance-settlement",
    category: "Business Analysis",
    tag: "Finance & Settlement (Medika Plaza)",
    tagBg: "rgba(255, 231, 153, 0.6)",
    tagColor: "#443927",
    title: "Integrated Financial Operations & Partner Settlement System",
    role: "Business Analyst",
    desc: "Documented business requirements for a system covering partner rebates, provider payments, and asset requests. Prepared BRDs, FSDs, and UI wireframes for commission calculations, payment tracking, and related finance and tax workflows, and coordinated SIT and UAT with finance, tax, and operations teams.",
    date: "June 2026",
    icon: "bi-cash-coin",
  },
  {
    id: "mpaspor",
    category: "UI/UX",
    tag: "M-Paspor Mobile Application",
    tagBg: "#d1e5fc",
    tagColor: "#253893",
    title: "Redesign UI/UX M-Paspor",
    role: "UI/UX Designer",
    desc: "Redesigned the M-Paspor application in Figma using the User-Centered Design (UCD) approach. Conducted user interviews, created prototypes, and tested the design to identify usability issues. The redesigned prototype improved the average System Usability Scale (SUS) score from “Poor” (29.17) to “Good” (82.08).",
    link: "https://tinyurl.com/NewDesignMPaspor",
    date: "July 2025",
    img: "/assets/img/M-Paspor.png",
  },
  {
    id: "journal",
    category: "Business Analysis",
    tag: "FinTech Website (Mega Manunggal Property)",
    tagBg: "rgba(255, 231, 153, 0.6)",
    tagColor: "#443927",
    title: "Automation Journal",
    role: "Business Analyst/Product Manager",
    desc: "Developed a Finance Accounting System designed to automate journal entries and streamline financial processes. Gathered and analyzed business requirements documented in a comprehensive BRD, planned the project timeline, coordinated the team, and conducted UAT. The project significantly improved operational efficiency and reduced manual errors.",
    date: "February 2025",
    img: "/assets/img/fintech.jpeg",
  },
  {
    id: "pipeline",
    category: "Business Analysis",
    tag: "Internal ERP for Marketing (Mega Manunggal Property)",
    tagBg: "#fad2d2",
    tagColor: "#e20809",
    title: "Sales Pipeline System",
    role: "Business Analyst/Product Manager",
    desc: "Developed a Sales Pipeline System as part of the ERP to help the marketing team track sales progress and manage prospective clients from first contact to conversion. Created BRD and FSD documents, refined requirements with users, designed UI/UX prototypes, and led training sessions to support user adoption.",
    date: "January 2025",
    img: "/assets/img/pipeline.png",
  },
  {
    id: "permit",
    category: "Business Analysis",
    tag: "Internal ERP System (Mega Manunggal Property)",
    tagBg: "rgba(222, 255, 210, 0.6)",
    tagColor: "#557940",
    title: "Working Permit System",
    role: "Business Analyst/Product Manager",
    desc: "Developed a Working Permit System to manage work permit applications between Tenants and Vendors, ensuring proper authorization, efficient coordination, and transparent approval tracking. Prepared BRD with flowcharts and database design, created FSD, and built automation test modules to verify reliability before deployment.",
    date: "December 2024",
    img: "/assets/img/wp.png",
  },
  {
    id: "dataviz",
    category: "Data",
    tag: "Analysis and Visualization",
    tagBg: "#d1e5fc",
    tagColor: "#253893",
    title: "Company Data Visualization & Analysis",
    role: "Data Analyst",
    desc: "Analyzed over 2,000 company data entries to identify recurring trends and provide actionable insights, and developed a data visualization dashboard in Google Looker Studio to present the cleaned and analyzed data clearly.",
    link: "https://drive.google.com/file/d/124e2n3q8YV2XLoCGzeRQIHwXCT-A1sbY/view",
    date: "September 2024",
    img: "/assets/img/analisis.png",
  },
  {
    id: "qa",
    category: "QA",
    tag: "Testing System Automation Website",
    tagBg: "rgba(254, 255, 192, 0.6)",
    tagColor: "#9b9b00",
    title: "System Testing & UAT for Internal Systems",
    role: "Quality Assurance",
    desc: "Conducted comprehensive system testing and UAT by developing detailed test cases and evaluating performance to ensure all features met business requirements. Prepared testing reports, successfully enhancing overall system functionality from 70% to 100%.",
    date: "2024",
    img: "/assets/img/QA.png",
  },
  {
    id: "jejak",
    category: "Development",
    tag: "Child Development Website",
    tagBg: "rgba(186, 234, 255, 0.6)",
    tagColor: "#4590b0",
    title: "JejakSIKecil",
    role: "Full-Stack Developer",
    desc: "JejakSIKecil is a main source of information about child development through articles, with a comment section in each article so users can share information and experiences. It serves as a guide for parents and caregivers in supporting optimal child development.",
    link: "https://github.com/nidaftrnie/JejakSiKecil",
    date: "May 2024",
    img: "/assets/img/JejakSIKecil.jpg",
  },
];

export const certifications = [
  { title: "Data Protection Officer", org: "", date: "Jun 2026", icon: "bi-shield-check" },
  { title: "Junior Web Programmer", org: "Badan Nasional Sertifikasi Profesi", date: "Jun 2025", img: "/assets/img/jwp.png" },
  { title: "Oracle For Intermediate", org: "Gunadarma University", date: "Aug 2024", img: "/assets/img/oracle.png" },
  { title: "Fullstack Web Development", org: "Binar Academy", date: "Jul 2024", icon: "bi-laptop" },
  { title: "C# For Intermediate", org: "Gunadarma University", date: "Feb 2024", img: "/assets/img/c.png" },
  { title: "Metode & Basic Skill Product", org: "Binar Academy", date: "Jan 2024", img: "/assets/img/pm.png" },
];

export const socials = [
  { href: "https://github.com/nidaftrianie", icon: "bi-github", label: "GitHub" },
  { href: "https://instagram.com/ftrnnida_", icon: "bi-instagram", label: "Instagram" },
  { href: "https://linkedin.com/in/nidafitrianie", icon: "bi-linkedin", label: "LinkedIn" },
];
