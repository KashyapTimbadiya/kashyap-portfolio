import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionRoot } from "@/components/providers/motion-root";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Preloader } from "@/components/ui/preloader";
import { Ambient } from "@/components/ui/ambient";
import { Nav } from "@/components/layout/nav";

const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

const description = `${site.title} (${site.stack}) based in ${site.location}. I build scalable, high-performance full-stack web apps.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.title}`, template: `%s · ${site.name}` },
  description,
  keywords: ["Kashyap Timbadiya", "Full-Stack Developer", "React", "Next.js", "Node.js", "NestJS", "Ahmedabad"],
  authors: [{ name: site.name, url: site.linkedin }],
  openGraph: { type: "website", title: `${site.name} — ${site.title}`, description, url: site.url, siteName: site.name },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.title}`, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0a12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>
          <MotionRoot>
            <SmoothScroll>
              <Preloader />
              <Ambient />
              <Nav />
              <main>{children}</main>
              <CustomCursor />
            </SmoothScroll>
          </MotionRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
