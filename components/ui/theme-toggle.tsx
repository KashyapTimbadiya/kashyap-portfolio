"use client";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useMounted } from "@/lib/hooks";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const btn = useRef<HTMLButtonElement>(null);
  const mounted = useMounted();

  const toggle = async () => {
    if (!mounted) return;
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      flushSync(() => setTheme(next));
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce || !btn.current) return apply();

    const { left, top, width, height } = btn.current.getBoundingClientRect();
    const x = left + width / 2, y = top + height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(apply);
    try {
      await t.ready;
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    } catch {
      // Transition skipped (e.g. rapid double click, hidden tab): theme already applied.
    }
  };

  return (
    <motion.button
      ref={btn} onClick={toggle} whileTap={{ scale: 0.88 }} whileHover={{ rotate: 15 }}
      aria-label={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme` : "Toggle theme"} data-cursor
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-elev/60 backdrop-blur"
    >
      {mounted && (resolvedTheme === "dark" ? <Sun size={17} /> : <Moon size={17} />)}
    </motion.button>
  );
}
