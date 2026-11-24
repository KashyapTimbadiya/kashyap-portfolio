"use client";
import { useEffect, useState, useSyncExternalStore } from "react";

/** True on touch / coarse pointers — used to simplify heavy effects on mobile. */
/** False on the server and first client render, true after mount (hydration-safe gating). */
export function useMounted() {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(true); // assume mobile until proven otherwise
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (max-width: 767px)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return coarse;
}
