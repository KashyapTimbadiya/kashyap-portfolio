import { GraduationCap } from "lucide-react";
import { education, summary } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { ScrollText } from "@/components/ui/scroll-text";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="Building things that scale.">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ScrollText text={summary} className="text-xl font-medium leading-snug md:text-3xl" />
        </div>
        <Reveal delay={0.1} x={60} rotate={3} className="lg:col-span-2">
          <div className="rounded-3xl border border-line bg-elev p-6 md:p-8">
            <GraduationCap className="mb-4 text-iris" size={28} />
            <h3 className="font-display text-xl font-semibold">{education.degree}</h3>
            <p className="mt-1 text-muted">{education.school}</p>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-sm">
              <span className="text-muted">{education.years}</span>
              <span className="rounded-full bg-mint/15 px-3 py-1 text-mint">CGPA {education.cgpa}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
