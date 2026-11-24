"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";

/** Intro curtain: counts to 100, then slides up to reveal the page. Shown once per session. */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("intro-seen") === "1"; } catch { /* storage unavailable: just show intro */ }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is only readable after mount
    if (reduce || seen) { setShow(false); return; }
    document.documentElement.style.overflow = "hidden";
    const c = animate(0, 100, {
      duration: 1.3, ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => {
        setShow(false);
        try { sessionStorage.setItem("intro-seen", "1"); } catch { /* ignore */ }
      },
    });
    return () => { c.stop(); document.documentElement.style.overflow = ""; };
  }, [reduce]);

  useEffect(() => { if (!show) document.documentElement.style.overflow = ""; }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pre" role="status" aria-label="Loading"
          exit={{ y: "-100%", borderBottomLeftRadius: "50% 12%", borderBottomRightRadius: "50% 12%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0b0a12] text-[#f3efe8]"
        >
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="font-display text-6xl font-semibold tracking-tight md:text-8xl">
            KT<span className="text-ember">.</span>
          </motion.p>
          <p className="mt-6 font-mono text-sm tabular-nums text-[#9a94ad]">{String(n).padStart(3, "0")}</p>
          <div className="mt-4 h-px w-40 bg-white/10"><div className="h-full origin-left bg-gradient-to-r from-iris via-ember to-mint" style={{ width: `${n}%` }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
