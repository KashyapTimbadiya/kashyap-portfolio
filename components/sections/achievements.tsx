"use client";
import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { achievements } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const icons = [Trophy, Award];

export function Achievements() {
  return (
    <Section id="achievements" eyebrow="05 — Achievements" title="Recognition.">
      <div className="grid gap-6 md:grid-cols-2">
        {achievements.map((a, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={a.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-line bg-elev p-7 md:p-9">
                <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-ember/30 to-iris/30 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                <motion.div whileHover={{ rotate: [0, -15, 12, 0] }} transition={{ duration: 0.6 }}
                  className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-ember to-iris text-white">
                  <Icon size={26} />
                </motion.div>
                <p className="relative font-mono text-xs uppercase tracking-wider text-iris">{a.org} · {a.year}</p>
                <h3 className="relative mt-2 font-display text-2xl font-semibold">&ldquo;{a.title}&rdquo;</h3>
                <p className="relative mt-3 text-muted">{a.text}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
