"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { skillGroups, type SkillGroup } from "@/lib/data";
import { useMounted } from "@/lib/hooks";
import { chipIcons, clusters, TechGlyph } from "@/lib/tech-icons";

const tone = {
  iris: "from-iris/25 to-ember/15", ember: "from-ember/25 to-iris/15", mint: "from-mint/25 to-iris/15",
} as const;
const n = skillGroups.length;
const pad = (i: number) => String(i + 1).padStart(2, "0");

const spread = [
  { k: 40, cls: "" }, { k: -30, cls: "translate-y-6" }, { k: 55, cls: "-translate-y-2" }, { k: -45, cls: "translate-y-4" },
];

function Tile({ g, i, d }: { g: SkillGroup; i: number; d: MotionValue<number> }) {
  const t = clusters[g.name][i];
  const x = useTransform(d, [-1.5, 1.5], [-spread[i].k, spread[i].k]);
  const rotate = useTransform(d, [-1.5, 1.5], [-12 - i * 4, 12 + i * 4]);
  return (
    <div className={spread[i].cls}>
      <motion.div style={{ x, rotate }} whileHover={{ scale: 1.18, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 14 }}
        className={`grid h-16 w-16 place-items-center rounded-2xl border border-line bg-gradient-to-br text-fg shadow-lg backdrop-blur ${tone[g.accent]} sm:h-[72px] sm:w-[72px]`}>
        <TechGlyph t={t} size={30} />
      </motion.div>
    </div>
  );
}

/** One card; `p` is the section's scroll progress (0..1). d = distance from focus in card units. */
function Card({ s, i, p }: { s: SkillGroup; i: number; p: MotionValue<number> }) {
  const d = useTransform(p, (v) => v * (n - 1) - i);
  const scale = useTransform(d, [-1.5, 0, 1.5], [0.82, 1, 0.82]);
  const rotateY = useTransform(d, [-1.5, 0, 1.5], [28, 0, -28]);
  const y = useTransform(d, [-1.5, 0, 1.5], [30, 0, 30]);
  const opacity = useTransform(d, [-2, 0, 2], [0.35, 1, 0.35]);
  const numX = useTransform(d, [-1.5, 1.5], [30, -30]);

  return (
    <motion.li
      style={{ scale, rotateY, y, opacity, transformPerspective: 1000 }}
      className="relative flex h-[min(60svh,500px)] sm:h-[min(68svh,500px)] w-[82vw] max-w-[390px] shrink-0 flex-col justify-between gap-4 overflow-hidden rounded-[2rem] border border-line bg-elev p-6 will-change-transform sm:w-[390px]"
    >
      <motion.span aria-hidden style={{ x: numX }} className="font-mono text-sm text-muted">{pad(i)} / {pad(n - 1)}</motion.span>
      <div className="relative mt-4 grid grid-cols-2 gap-3 self-end pr-1">
        {clusters[s.name].map((_, ti) => <Tile key={ti} g={s} i={ti} d={d} />)}
      </div>
      <div className="relative">
        <h3 className="font-display text-3xl font-semibold leading-tight">{s.name}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {s.items.map((t) => (
            <motion.li key={t} whileHover={{ scale: 1.08, rotate: -2 }} className="flex items-center gap-1.5 rounded-full border border-line bg-bg/70 px-3 py-1.5 text-sm text-fg backdrop-blur">{chipIcons[t] && <span className="text-iris"><TechGlyph t={chipIcons[t]} size={14} /></span>}{t}</motion.li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

function Static() {
  return (
    <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((s) => (
        <li key={s.name} className="rounded-3xl border border-line bg-elev p-6">
          <h3 className="font-display text-2xl font-semibold">{s.name}</h3>
          <p className="mt-3 text-sm text-muted">{s.items.join(" · ")}</p>
        </li>
      ))}
    </ul>
  );
}

function Heading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-iris">02 — Skills</p>
      <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-6xl">Everything I build with.</h2>
    </div>
  );
}

function Pinned() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [dist, setDist] = useState(0);
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const x = useTransform(p, [0, 1], [0, -dist]);
  const bgX = useTransform(p, [0, 1], ["8%", "-38%"]);
  useMotionValueEvent(p, "change", (v) => setIdx(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))))));

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <section id="skills" ref={section} style={{ height: `calc(100svh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-5 overflow-hidden pt-20 sm:gap-8 sm:pt-16">
        {/* giant parallax backdrop word */}
        <motion.span aria-hidden style={{ x: bgX }}
          className="pointer-events-none absolute bottom-[8%] left-0 select-none whitespace-nowrap font-display text-[26vw] font-bold leading-none text-transparent [-webkit-text-stroke:1px_var(--line)]">
          STACK · STACK · STACK
        </motion.span>
        <div className="relative"><Heading /></div>
        <motion.ul ref={track} style={{ x }} className="relative flex w-max items-center gap-5 pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] pr-[20vw] sm:gap-8">
          {skillGroups.map((s, i) => <Card key={s.name} s={s} i={i} p={p} />)}
        </motion.ul>
        <div className="relative mx-auto flex w-full max-w-6xl items-center gap-4 px-5">
          <span className="font-mono text-sm tabular-nums">{pad(idx)}</span>
          <div className="h-px flex-1 bg-line"><motion.div style={{ scaleX: p }} className="h-full origin-left bg-gradient-to-r from-iris via-ember to-mint" /></div>
          <span className="font-mono text-sm text-muted">{pad(n - 1)}</span>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  if (!mounted || reduce) {
    return (
      <section id="skills" className="py-20 md:py-28">
        <Heading />
        <div className="mt-10">{mounted ? <Static /> : null}</div>
      </section>
    );
  }
  return <Pinned />;
}
