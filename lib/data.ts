/** All portfolio content, sourced from the resume. Edit here, not in components. */

export const summary =
  "Full-Stack Software Developer with ~3 years of experience building and shipping scalable, high-performance web applications using JavaScript, TypeScript, React.js, Next.js, Node.js, Express.js, and NestJS. Delivered production features across AI chatbot, Web3/NFT, and e-commerce platforms, from component-driven frontends and REST/GraphQL APIs to real-time WebSocket features, virtual-currency flows, and AI image, video, and voice integrations. Skilled in Clean Architecture and performance optimization, and comfortable owning features end-to-end in Agile teams.";

export const csFoundations = ["Data Structures & Algorithms", "DBMS", "OOP", "Blockchain Fundamentals"];

export const education = {
  degree: "B.Tech in Computer Engineering",
  school: "Dharmsinh Desai University, Nadiad",
  years: "2020 – 2024",
  cgpa: "8.33 / 10",
};

export type SkillGroup = { name: string; accent: "iris" | "ember" | "mint"; items: string[] };

/** Complete skills list from the resume, one card per category. */
export const skillGroups: SkillGroup[] = [
  { name: "Languages", accent: "iris", items: ["JavaScript", "TypeScript", "SQL"] },
  { name: "Frontend", accent: "mint", items: ["React.js", "Next.js", "Zustand", "Tailwind CSS", "Shadcn UI", "Styled-components", "HTML5/CSS3", "Responsive Design"] },
  { name: "Backend & APIs", accent: "ember", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "GraphQL", "WebSockets", "JWT & OTP Authentication", "Webhooks"] },
  { name: "Databases", accent: "iris", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { name: "AI & Integrations", accent: "ember", items: ["AI Image/Video Generation", "LoRA Model Training", "Voice Cloning", "Yoti Identity Verification"] },
  { name: "Tools & Practices", accent: "mint", items: ["Git/GitHub", "CI/CD", "Deployment (Vercel, Render)", "Clean Architecture", "Code Reviews", "Performance Optimization"] },
  { name: "CS Foundations", accent: "iris", items: ["Data Structures & Algorithms", "DBMS", "OOP", "Blockchain Fundamentals"] },
];

export type Experience = {
  company: string; role: string; location: string; period: string; bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Knackroot Technolabs LLP",
    role: "Software Developer",
    location: "Ahmedabad, Gujarat",
    period: "Jan 2024 – Present",
    bullets: [
      "Design, build, and ship full-stack features across multiple products (AI chatbot platform, NFT marketplace, client web apps) with React.js / Next.js frontends and Node.js / Express.js / NestJS backends, following Clean Architecture.",
      "Develop responsive, reusable React.js and Next.js component libraries that improve UI consistency and reduce duplicate development effort across products.",
      "Design and integrate RESTful and GraphQL APIs with JWT/OTP authentication, validation, and real-time data flows over WebSockets.",
      "Implement monetization features end-to-end — virtual currency, tiered memberships, tipping, and referrals — with reliable balance and transaction tracking.",
      "Optimize performance with code splitting, lazy loading, and efficient state management (Zustand); write technical documentation and use AI-assisted development tools to speed up delivery.",
    ],
  },
  {
    company: "NENS Informatics Pvt. Ltd.",
    role: "Software Developer (Freelance)",
    location: "Remote",
    period: "Nov 2025 – Jul 2026",
    bullets: [
      "Delivered a client jewellery e-commerce frontend end-to-end as an independent contractor, owning architecture, component development, and API integration.",
      "Translated UI/UX designs into responsive interfaces with React.js, Next.js, and Tailwind CSS, coordinating directly with the client through final delivery.",
    ],
  },
];

export type Project = {
  slug: string; name: string; role: string; org: string;
  blurb: string; bullets: string[]; tech: string[];
  /** Live URL; omit for private projects. */
  liveUrl?: string;
  /** "featured" = resume project, "client" = Figma-to-code live site. */
  kind: "featured" | "client";
  /** Screenshot in /public/projects. Omit to show a designed placeholder. */
  image?: string;
  accent: "iris" | "ember" | "mint";
};

export const projects: Project[] = [
  {
    slug: "ai-chatbot-creator",
    name: "AI Chatbot Creator Platform",
    role: "Full-Stack Developer", org: "Knackroot Technolabs",
    blurb: "Creators publish AI chatbots; users chat with them in real time — including AI clones that look and sound like the creator.",
    bullets: [
      "Persona system: users create and switch between multiple personas mid-chat.",
      "AI Clone Character: Yoti identity verification, LoRA model training from photos, and voice cloning.",
      "Gems-based virtual currency, tiered memberships, tipping and referral rewards.",
      "Chatbot-creation flow, creator fan pages and an admin review-and-approval workflow.",
      "Real-time notifications and in-app support over WebSockets.",
    ],
    tech: ["Next.js", "React.js", "NestJS", "Node.js", "PostgreSQL", "Tailwind CSS", "WebSockets", "LoRA", "Voice Cloning", "Yoti"],
    accent: "iris", kind: "featured",
  },
  {
    slug: "nft-marketplace",
    name: "NFT Marketplace",
    role: "Full-Stack Developer", org: "Knackroot Technolabs",
    blurb: "A full-featured NFT marketplace serving ~120K NFT owners across 47 collections and 693,563+ NFTs.",
    bullets: [
      "Collection creation, minting, single and bulk listings, cart-based purchasing and offer management.",
      "React.js / Next.js interface with Node.js / Express.js services on a MySQL data layer.",
      "Wallet-based actions for on-chain interactions.",
    ],
    tech: ["Next.js", "React.js", "Node.js", "Express.js", "MySQL", "Styled-components", "Web3"],
    accent: "ember", kind: "featured",
  },
  {
    slug: "axis-jeweltech",
    name: "Axis Jeweltech — Jewellery E-Commerce",
    role: "Frontend Developer", org: "NENS Informatics",
    blurb: "A jewellery e-commerce frontend delivered end-to-end as a freelance contractor.",
    bullets: [
      "Clean, scalable architecture with reusable components for listings, cart, checkout, order tracking and admin dashboards.",
      "OTP authentication and REST API integration; rendering optimized for performance.",
    ],
    tech: ["Next.js", "React.js", "Tailwind CSS", "Shadcn UI", "Clean Architecture"],
    image: "/projects/axis-jeweltech.png", accent: "mint", kind: "featured",
    liveUrl: "https://www.axisjeweltech.com",
  },
  {
    slug: "asia-spa-resort", name: "Asia Spa Resort", role: "Frontend Developer", org: "Client project",
    blurb: "Live website translated from Figma designs into a responsive, production frontend.",
    bullets: ["Pixel-accurate, responsive implementation of the provided design."],
    tech: ["Figma to Code", "Responsive UI"],
    image: "/projects/asia-spa-resort.png", accent: "ember", kind: "client",
    liveUrl: "https://www.asiasparesort.com/",
  },
  {
    slug: "pluscash", name: "PlusCash", role: "Frontend Developer", org: "Client project",
    blurb: "Live website translated from Figma designs into a responsive, production frontend.",
    bullets: ["Pixel-accurate, responsive implementation of the provided design."],
    tech: ["Figma to Code", "Responsive UI"],
    image: "/projects/pluscash.png", accent: "mint", kind: "client",
    liveUrl: "https://www.pluscash.club/",
  },
  {
    slug: "goosh", name: "Goosh by PlusCash", role: "Frontend Developer", org: "Client project",
    blurb: "Live website translated from Figma designs into a responsive, production frontend.",
    bullets: ["Pixel-accurate, responsive implementation of the provided design."],
    tech: ["Figma to Code", "Responsive UI"],
    image: "/projects/goosh.png", accent: "iris", kind: "client",
    liveUrl: "https://goosh.pluscash.club/",
  },
  {
    slug: "lv-woods", name: "LV Woods", role: "Frontend Developer", org: "Client project",
    blurb: "Live website translated from Figma designs into a responsive, production frontend.",
    bullets: ["Pixel-accurate, responsive implementation of the provided design."],
    tech: ["Figma to Code", "Responsive UI"],
    image: "/projects/lv-woods.png", accent: "ember", kind: "client",
    liveUrl: "https://lvwoods.in/",
  },
  {
    slug: "pluscapital", name: "PlusCapital", role: "Frontend Developer", org: "Client project",
    blurb: "Live website translated from Figma designs into a responsive, production frontend.",
    bullets: ["Pixel-accurate, responsive implementation of the provided design."],
    tech: ["Figma to Code", "Responsive UI"],
    image: "/projects/pluscapital.png", accent: "iris", kind: "client",
    liveUrl: "https://www.pcglobal.com/",
  },
  {
    slug: "nens-informatics", name: "NENS Informatics", role: "Frontend Developer", org: "Client project",
    blurb: "Live website translated from Figma designs into a responsive, production frontend.",
    bullets: ["Pixel-accurate, responsive implementation of the provided design."],
    tech: ["Figma to Code", "Responsive UI"],
    image: "/projects/nens-informatics.png", accent: "mint", kind: "client",
    liveUrl: "https://nensinformatics.com/",
  },
  {
    slug: "finark", name: "Finark", role: "Frontend Developer", org: "Client project",
    blurb: "Live website translated from Figma designs into a responsive, production frontend.",
    bullets: ["Pixel-accurate, responsive implementation of the provided design."],
    tech: ["Figma to Code", "Responsive UI"],
    image: "/projects/finark.png", accent: "iris", kind: "client",
    liveUrl: "https://www.finark.com/",
  },
];

export const achievements = [
  { title: "Appreciation Award", org: "Knackroot Technolabs", year: "2024–2025", text: "Recognized for outstanding performance and impact." },
  { title: "Pat on the Back Award", org: "Knackroot Technolabs", year: "Internship", text: "Honored for strong contribution, ownership, and initiative." },
] as const;
