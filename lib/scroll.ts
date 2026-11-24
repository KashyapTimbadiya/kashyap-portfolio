import type Lenis from "lenis";

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { instance = l; };

/** Smooth-scroll to a section id; falls back to native scroll. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -70, duration: 1.4 });
  else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  history.replaceState(null, "", `#${id}`);
  if (el.tabIndex < 0) el.tabIndex = -1;
  el.focus({ preventScroll: true });
}
