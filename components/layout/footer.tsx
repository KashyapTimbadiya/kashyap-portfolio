import { Linkedin } from "@/components/ui/brand-icons";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  const socials = [
    { href: site.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { href: `mailto:${site.email}`, Icon: Mail, label: "Email" },
  ];
  return (
    <footer className="border-t border-line px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-muted md:flex-row">
        <p>© {site.year} {site.name}. All rights reserved.</p>
        <ul className="flex gap-3" aria-label="Social links">
          {socials.map(({ href, Icon, label }) => (
            <li key={label}>
              <a href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:-translate-y-1 hover:border-iris hover:text-iris">
                <Icon size={17} />
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs">Built with Next.js · Tailwind CSS · Framer Motion</p>
      </div>
    </footer>
  );
}
