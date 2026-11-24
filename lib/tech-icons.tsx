import type { LucideIcon } from "lucide-react";
import { Binary, Boxes, Brain, Database, Film, Mic, ScanFace } from "lucide-react";
import {
  siCss, siEthereum, siExpress, siGit, siGithub, siGithubactions, siGraphql, siHtml5, siJavascript,
  siJsonwebtokens, siMongodb, siMysql, siNestjs, siNextdotjs, siNodedotjs, siPostgresql, siReact, siRender,
  siShadcnui, siSocketdotio, siStyledcomponents, siTailwindcss, siTypescript, siVercel, type SimpleIcon,
} from "simple-icons";

export type TechIcon = { kind: "si"; icon: SimpleIcon } | { kind: "lucide"; Icon: LucideIcon };
const si = (icon: SimpleIcon): TechIcon => ({ kind: "si", icon });
const lu = (Icon: LucideIcon): TechIcon => ({ kind: "lucide", Icon });

/** Small logo shown beside a skill chip (only where a real logo exists). */
export const chipIcons: Record<string, TechIcon> = {
  JavaScript: si(siJavascript), TypeScript: si(siTypescript), "React.js": si(siReact), "Next.js": si(siNextdotjs),
  "Tailwind CSS": si(siTailwindcss), "Shadcn UI": si(siShadcnui), "Styled-components": si(siStyledcomponents),
  "HTML5/CSS3": si(siHtml5), "Node.js": si(siNodedotjs), "Express.js": si(siExpress), NestJS: si(siNestjs),
  GraphQL: si(siGraphql), WebSockets: si(siSocketdotio), "JWT & OTP Authentication": si(siJsonwebtokens),
  PostgreSQL: si(siPostgresql), MySQL: si(siMysql), MongoDB: si(siMongodb), "Git/GitHub": si(siGithub),
  "CI/CD": si(siGithubactions), "Deployment (Vercel, Render)": si(siVercel), "Blockchain Fundamentals": si(siEthereum),
  SQL: lu(Database), "AI Image/Video Generation": lu(Film), "Voice Cloning": lu(Mic),
  "LoRA Model Training": lu(Brain), "Yoti Identity Verification": lu(ScanFace),
};

/** Large floating logo tiles on each category card. */
export const clusters: Record<string, TechIcon[]> = {
  Languages: [si(siJavascript), si(siTypescript), lu(Database), si(siCss)],
  Frontend: [si(siReact), si(siNextdotjs), si(siTailwindcss), si(siShadcnui)],
  "Backend & APIs": [si(siNodedotjs), si(siExpress), si(siNestjs), si(siGraphql)],
  Databases: [si(siPostgresql), si(siMysql), si(siMongodb), lu(Database)],
  "AI & Integrations": [lu(Brain), lu(Mic), lu(Film), lu(ScanFace)],
  "Tools & Practices": [si(siGit), si(siGithubactions), si(siVercel), si(siRender)],
  "CS Foundations": [lu(Binary), lu(Database), lu(Boxes), si(siEthereum)],
};

export function TechGlyph({ t, size = 20 }: { t: TechIcon; size?: number }) {
  if (t.kind === "lucide") return <t.Icon size={size} strokeWidth={1.75} aria-hidden />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={t.icon.path} />
    </svg>
  );
}
