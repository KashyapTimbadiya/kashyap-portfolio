"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { Linkedin } from "@/components/ui/brand-icons";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

const links = [
  { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { Icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { Icon: Linkedin, label: "LinkedIn", value: "kashyap-timbadiya", href: site.linkedin },
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const field = "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition focus:border-iris focus:ring-2 focus:ring-iris/30";

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const next: Record<string, string> = {};
    if (!name) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email.";
    if (message.length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    console.log("Contact form submission:", { name, email, message });
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Section id="contact" eyebrow="06 — Contact" title="Let's work together.">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {links.map(({ Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 0.07}>
              <Magnetic strength={0.12} className="block">
                <motion.a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }} data-cursor
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-elev p-4 transition-colors hover:border-iris">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-iris/10 text-iris transition group-hover:bg-iris group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-wider text-muted">{label}</span>
                    <span className="block truncate font-medium">{value}</span>
                  </span>
                </motion.a>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl border border-line bg-elev p-6 md:p-8">
            {(["name", "email"] as const).map((n) => (
              <div key={n}>
                <label htmlFor={n} className="mb-1.5 block text-sm font-medium capitalize">{n}</label>
                <input id={n} name={n} type={n === "email" ? "email" : "text"} autoComplete={n} className={field}
                  aria-invalid={!!errors[n]} aria-describedby={errors[n] ? `${n}-err` : undefined} />
                {errors[n] && <p id={`${n}-err`} role="alert" className="mt-1 text-xs text-ember">{errors[n]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows={5} className={field}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
              {errors.message && <p id="message-err" role="alert" className="mt-1 text-xs text-ember">{errors.message}</p>}
            </div>
            <motion.button type="submit" whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} data-cursor
              className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg">
              Send message <Send size={15} />
            </motion.button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
