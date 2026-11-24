"use client";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useCoarsePointer, useMounted } from "@/lib/hooks";

/** Fixed background orbs that drift and shift as the page scrolls. */
export function Ambient() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const y1 = useTransform(p, [0, 1], ["-10vh", "70vh"]);
  const x1 = useTransform(p, [0, 0.5, 1], ["-10vw", "40vw", "-5vw"]);
  const y2 = useTransform(p, [0, 1], ["60vh", "-10vh"]);
  const x2 = useTransform(p, [0, 0.5, 1], ["60vw", "10vw", "55vw"]);
  const hue = useTransform(p, [0, 1], [0, 140]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const mounted = useMounted();
  if (!mounted || reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ x: x1, y: y1, filter }} className="absolute left-0 top-0"><div className="h-[45vmax] w-[45vmax] rounded-full bg-iris/15 blur-[110px]" /></motion.div>
      {!coarse && <motion.div style={{ x: x2, y: y2, filter }} className="absolute left-0 top-0"><div className="h-[40vmax] w-[40vmax] rounded-full bg-ember/12 blur-[110px]" /></motion.div>}
    </div>
  );
}
