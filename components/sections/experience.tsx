"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Section id="experience" eyebrow="03 — Experience" title="Where I've worked.">
      <ol ref={ref} className="relative ml-3 space-y-14 pl-8 md:ml-6 md:pl-12">
        <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line" />
        <motion.span aria-hidden style={{ scaleY: draw }}
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-iris via-ember to-mint" />
        {experience.map((e, i) => (
          <li key={e.company} className="relative">
            <motion.span
              aria-hidden initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
              className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-4 border-bg bg-iris ring-2 ring-iris/40 md:-left-[57px]"
            />
            <Reveal x={i % 2 ? 80 : -80} rotate={i % 2 ? 2 : -2} y={20}>
              <div className="rounded-3xl border border-line bg-elev p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-xl font-semibold md:text-2xl">{e.company}</h3>
                  <span className="font-mono text-sm text-iris">{e.period}</span>
                </div>
                <p className="mt-1 text-muted">{e.role} · {e.location}</p>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />{b}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
