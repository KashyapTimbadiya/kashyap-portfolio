"use client";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string; className?: string; charClassName?: string; by?: "char" | "word";
  delay?: number; stagger?: number; as?: "h1" | "h2" | "h3" | "p" | "span";
};

/** Char/word-level masked stagger reveal with spring easing. Screen readers get the plain text. */
export function SplitText({ text, className, charClassName = "", by = "char", delay = 0, stagger = 0.03, as = "span" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ delayChildren: delay, staggerChildren: reduce ? 0 : stagger }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            {(by === "char" ? word.split("") : [word]).map((unit, ci) => (
              <motion.span
                key={ci}
                className={`inline-block ${charClassName}`}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { y: "110%", rotate: 6, opacity: 0 },
                  show: { y: 0, rotate: 0, opacity: 1 },
                }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
              >
                {unit}
              </motion.span>
            ))}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </Tag>
  );
}
