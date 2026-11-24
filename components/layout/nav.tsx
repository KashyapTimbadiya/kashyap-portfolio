"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { scrollToId } from "@/lib/scroll";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "border-b border-line bg-bg/70 backdrop-blur-xl" : ""}`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollToId("top"); }} data-cursor
           className="font-display text-lg font-semibold tracking-tight">
          KT<span className="text-ember">.</span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <Magnetic strength={0.25}>
                <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
                   className="link-draw px-1 py-2 text-sm text-muted transition-colors hover:text-fg">{l.label}</a>
              </Magnetic>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={site.resume} download data-cursor
             className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition hover:border-iris hover:text-iris sm:inline-flex">
            <Download size={15} /> Resume
          </a>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-elev/60 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mx-5 mb-3 flex flex-col gap-1 rounded-2xl border border-line bg-elev/95 p-3 backdrop-blur md:hidden"
          >
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="block rounded-lg px-3 py-2.5 text-sm hover:bg-line"
                   onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId(l.id); }}>{l.label}</a>
              </li>
            ))}
            <li><a href={site.resume} download className="block rounded-lg px-3 py-2.5 text-sm text-iris">Download Resume</a></li>
          </motion.ul>
        )}
      </AnimatePresence>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-gradient-to-r from-iris via-ember to-mint" />
    </motion.header>
  );
}
