"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/lib/data";
import { useCoarsePointer, useMounted } from "@/lib/hooks";

const accentBg = { iris: "from-iris/40 to-ember/30", ember: "from-ember/40 to-iris/30", mint: "from-mint/40 to-iris/30" } as const;

function Frame({ p, priority }: { p: Project; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const host = p.liveUrl ? new URL(p.liveUrl).host : "private-project";
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-line bg-elev px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-ember/80" /><span className="h-2.5 w-2.5 rounded-full bg-[#f5c542]/80" /><span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
        <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-bg px-3 py-0.5 font-mono text-[11px] text-muted">{host}</span>
      </div>
      {/* Mask reveal on scroll-in */}
      <motion.div
        className="relative aspect-[16/10] overflow-hidden"
        initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {p.image && !failed ? (
          <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} whileInView={{ scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
            <Image src={p.image} alt={`${p.name} website screenshot`} fill priority={priority}
              sizes="(min-width:1024px) 560px, (min-width:640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
              onError={() => setFailed(true)} />
          </motion.div>
        ) : (
          <div className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${accentBg[p.accent]} p-6 text-center`}>
            <span className="font-display text-2xl font-semibold">{p.name}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function ProjectCard({ p, compact, priority }: { p: Project; compact?: boolean; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const mounted = useMounted();
  const off = !mounted || !!reduce || coarse;
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 }), sry = useSpring(ry, { stiffness: 180, damping: 18 });

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.article
        ref={ref}
        style={off ? undefined : { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (off || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
        }}
        onPointerLeave={() => { rx.set(0); ry.set(0); }}
        data-cursor
        className="group/card flex h-full flex-col rounded-3xl border border-line bg-elev p-4 will-change-transform md:p-5"
      >
        <Frame p={p} priority={priority} />
        <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
          <p className="font-mono text-[11px] uppercase tracking-wider text-iris">{p.role} · {p.org}</p>
          <h3 className="mt-1 font-display text-xl font-semibold md:text-2xl">{p.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
          {!compact && (
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember" />{b}</li>
              ))}
            </ul>
          )}
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <li key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">{t}</li>
            ))}
          </ul>
          <div className="mt-auto pt-5">
            {p.liveUrl ? (
              <motion.a href={p.liveUrl} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg">
                Live Site <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-muted">
                <Lock size={14} /> Private
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
