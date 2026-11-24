"use client";
import { MotionConfig } from "framer-motion";

/** Honors prefers-reduced-motion for all framer-motion transform animations. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
