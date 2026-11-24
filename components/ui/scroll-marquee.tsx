"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/** Big headline strip that slides sideways as you scroll past it. */
export function ScrollMarquee({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sp = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const x = useTransform(sp, [0, 1], reverse ? ["-35%", "0%"] : ["0%", "-35%"]);
  const row = [...words, ...words, ...words];

  return (
    <div ref={ref} aria-hidden className="overflow-hidden border-y border-line py-5 md:py-8">
      <motion.div style={reduce ? undefined : { x }} className="flex w-max items-center gap-6 whitespace-nowrap md:gap-10">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-6 font-display text-5xl font-semibold uppercase tracking-tight md:gap-10 md:text-8xl">
            <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--fg)]" : ""}>{w}</span>
            <span className="text-ember">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
