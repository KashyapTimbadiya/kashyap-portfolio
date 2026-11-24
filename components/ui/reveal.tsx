"use client";
import { motion } from "framer-motion";

/** Spring-based slide/scale-in on scroll (transform + opacity only). */
export function Reveal({ children, delay = 0, className, y = 32, x = 0, rotate = 0 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number; x?: number; rotate?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, rotate, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}
