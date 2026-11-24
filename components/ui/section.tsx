import { SplitText } from "@/components/ui/split-text";

export function Section({ id, eyebrow, title, children, className = "" }: {
  id: string; eyebrow: string; title: string; children: React.ReactNode; className?: string;
}) {
  return (
    <section id={id} className={`relative overflow-x-clip px-5 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-iris">{eyebrow}</p>
        <SplitText as="h2" by="word" text={title} stagger={0.07}
          className="mb-10 block font-display text-4xl font-semibold leading-[1.05] tracking-tight md:mb-14 md:text-6xl" />
        {children}
      </div>
    </section>
  );
}
