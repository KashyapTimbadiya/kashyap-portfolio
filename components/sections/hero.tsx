"use client";
import { useRef } from "react";
import { motion, type MotionValue, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import { Linkedin } from "@/components/ui/brand-icons";
import { site } from "@/lib/site";
import { scrollToId } from "@/lib/scroll";
import { useCoarsePointer, useMounted } from "@/lib/hooks";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitText } from "@/components/ui/split-text";

const chips = [
  { label: "Next.js", x: "66%", y: "20%", depth: 40, color: "text-iris" },
  { label: "NestJS", x: "84%", y: "30%", depth: 70, color: "text-ember" },
  { label: "TypeScript", x: "74%", y: "52%", depth: 30, color: "text-mint" },
  { label: "PostgreSQL", x: "85%", y: "68%", depth: 55, color: "text-iris" },
];

type Chip = (typeof chips)[number];

function useLayer(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  return { x: useTransform(mx, (v) => v * depth), y: useTransform(my, (v) => v * depth) };
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const mounted = useMounted();
  const off = !mounted || !!reduce || coarse;

  // Mouse-driven depth (normalised -0.5..0.5, sprung)
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", off ? "0%" : "25%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", off ? "0%" : "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const blobA = useLayer(mx, my, 90), blobB = useLayer(mx, my, -70), blobC = useLayer(mx, my, 50);
  const grid = useLayer(mx, my, 20);
  const text = useLayer(mx, my, -14);

  return (
    <section
      id="top" ref={ref}
      onPointerMove={(e) => {
        if (off) return;
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set((e.clientX - r.left) / r.width - 0.5);
        rawY.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Layer 1: morphing mesh gradient */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-0 -z-10">
        <motion.div style={off ? undefined : blobA} className="absolute -left-[10%] -top-[15%] h-[60vmax] w-[60vmax]">
          <div className="blob-a h-full w-full rounded-full bg-iris/30 blur-[90px] md:blur-[130px]" />
        </motion.div>
        <motion.div style={off ? undefined : blobB} className="absolute -right-[15%] top-[10%] h-[50vmax] w-[50vmax]">
          <div className="blob-b h-full w-full rounded-full bg-ember/25 blur-[90px] md:blur-[130px]" />
        </motion.div>
        <motion.div style={off ? undefined : blobC} className="absolute bottom-[-20%] left-[25%] h-[45vmax] w-[45vmax]">
          <div className="blob-c h-full w-full rounded-full bg-mint/20 blur-[90px] md:blur-[130px]" />
        </motion.div>
        {/* Layer 2: grid */}
        <motion.div
          style={off ? undefined : grid}
          className="absolute inset-[-5%] opacity-[0.35] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
      </motion.div>

      {/* Layer 3: floating tech chips */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {chips.map((c) => (
          <div key={c.label} className="absolute" style={{ left: c.x, top: c.y }}>
            <ChipInner c={c} mx={mx} my={my} off={off} />
          </div>
        ))}
      </div>

      {/* Layer 4: content */}
      <motion.div style={{ y: fgY, opacity: fade }} className="mx-auto w-full max-w-6xl px-5 pb-16 pt-32">
        <motion.div style={off ? undefined : text}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-elev/60 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-mint" /></span>
            {site.location}
          </motion.p>

          <h1 className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-semibold leading-[0.95] tracking-tight">
            <SplitText text="Kashyap" delay={0.4} stagger={0.045} className="block" />
            <SplitText text="Timbadiya" delay={0.6} stagger={0.045} className="block" charClassName="text-iris" />
          </h1>

          <p className="mt-6 font-display text-xl text-fg md:text-2xl">
            <SplitText by="word" text={site.title} delay={1.1} stagger={0.08} />
          </p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 18, delay: 1.4 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 18, delay: 1.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <motion.button
                whileTap={{ scale: 0.94 }} onClick={() => scrollToId("projects")} data-cursor
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg"
              >
                View Projects <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </motion.button>
            </Magnetic>
            <Magnetic>
              <motion.a
                whileTap={{ scale: 0.94 }} href={site.resume} download data-cursor
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-elev/60 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-iris"
              >
                Download Resume <Download size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]" />
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.button
                whileTap={{ scale: 0.94 }} onClick={() => scrollToId("contact")} data-cursor
                className="link-draw px-2 py-3 text-sm font-medium"
              >
                Contact Me
              </motion.button>
            </Magnetic>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}
            aria-label="Social links" className="mt-10 flex items-center gap-3"
          >
            {[
              { href: site.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${site.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <li key={label}>
                <Magnetic strength={0.5}>
                  <motion.a
                    href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    whileHover={{ rotate: [0, -12, 10, -6, 0] }} whileTap={{ scale: 0.88 }} transition={{ duration: 0.5 }}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line bg-elev/60 backdrop-blur transition-colors hover:border-iris hover:text-iris"
                  >
                    <Icon size={18} />
                  </motion.a>
                </Magnetic>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:flex">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span className="absolute inset-x-0 top-0 h-4 bg-iris" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </div>
    </section>
  );
}

function ChipInner({ c, mx, my, off }: { c: Chip; mx: MotionValue<number>; my: MotionValue<number>; off: boolean }) {
  const t = useLayer(mx, my, c.depth);
  return (
    <motion.div
      style={off ? undefined : t}
      className={`hidden rounded-full border border-line bg-elev/70 px-4 py-2 font-mono text-xs backdrop-blur md:block ${c.color}`}
      initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 14, delay: 1.2 }}
    >
      <motion.span className="block" animate={off ? undefined : { y: [0, -10, 0] }} transition={{ duration: 3 + c.depth / 20, repeat: Infinity, ease: "easeInOut" }}>{c.label}</motion.span>
    </motion.div>
  );
}
