"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useCoarsePointer } from "@/lib/hooks";

const KEY = "cursor-enabled";

/** Cursor-follow ring that grows over interactive elements. Toggleable; off on touch. */
export function CustomCursor() {
  const coarse = useCoarsePointer();
  const [enabled, setEnabled] = useState(true);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read persisted preference after mount to avoid hydration mismatch
    try { if (localStorage.getItem(KEY) === "0") setEnabled(false); } catch { /* storage unavailable: keep default */ }
  }, []);

  useEffect(() => {
    if (coarse || !enabled) return;
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) =>
      setHover(e.target instanceof Element && !!e.target.closest("a, button, [data-cursor], input, textarea"));
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("mouseover", over); };
  }, [coarse, enabled, x, y]);

  if (coarse) return null;
  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try { localStorage.setItem(KEY, next ? "1" : "0"); } catch { /* storage unavailable: preference just won't persist */ }
  };

  return (
    <>
      {enabled && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4"
        >
          <motion.div
            animate={{ scale: hover ? 2.2 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="h-8 w-8 rounded-full border border-iris bg-iris/15"
          />
        </motion.div>
      )}
      <button
        onClick={toggle} aria-pressed={enabled} aria-label="Toggle custom cursor" title="Toggle custom cursor"
        className="fixed bottom-5 right-5 z-50 grid h-10 w-10 place-items-center rounded-full border border-line bg-elev/70 backdrop-blur transition hover:scale-110"
      >
        <MousePointer2 size={16} className={enabled ? "text-iris" : "text-muted"} />
      </button>
    </>
  );
}
