"use client";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCoarsePointer, useMounted } from "@/lib/hooks";

/** Wraps children so they are pulled toward the cursor (spring physics). */
export function Magnetic({ children, strength = 0.35, className }: {
  children: React.ReactNode; strength?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });
  const mounted = useMounted();
  const off = !mounted || reduce || coarse;

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={off ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (off || e.pointerType === "touch" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
