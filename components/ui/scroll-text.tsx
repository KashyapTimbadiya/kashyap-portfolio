"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const start = i / n, end = Math.min(1, start + 2.5 / n);
  const opacity = useTransform(p, [start, end], [0.14, 1]);
  const y = useTransform(p, [start, end], [6, 0]);
  return <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">{w}</motion.span>;
}

/** Paragraph whose words light up one by one as you scroll through it. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}</span>
    </p>
  );
}
