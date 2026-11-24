export const site = {
  name: "Kashyap Timbadiya",
  title: "Full-Stack Software Developer",
  stack: "React.js / Next.js / Node.js",
  location: "Ahmedabad, Gujarat, India",
  email: "kashyaptimbadiya2@gmail.com",
  phone: "+91 88665 12570",
  linkedin: "https://linkedin.com/in/kashyap-timbadiya-ab098b217",
  year: 2026,
  resume: "/resume.pdf",
  tagline:
    "I build scalable, high-performance full-stack web apps — from component-driven frontends to real-time APIs and AI integrations.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;
