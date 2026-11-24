import { projects } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/ui/project-card";

export function Projects() {
  const featured = projects.filter((p) => p.kind === "featured");
  const client = projects.filter((p) => p.kind === "client");
  return (
    <Section id="projects" eyebrow="04 — Projects" title="Selected work.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}><ProjectCard p={p} priority={i === 0} /></Reveal>
        ))}
      </div>
      <h3 className="mb-8 mt-20 font-display text-2xl font-semibold md:text-3xl">
        Client websites <span className="font-mono text-sm font-normal text-muted">— Figma to code, live</span>
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {client.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.08}><ProjectCard p={p} compact /></Reveal>
        ))}
      </div>
    </Section>
  );
}
