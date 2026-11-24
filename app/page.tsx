import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { ScrollMarquee } from "@/components/ui/scroll-marquee";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollMarquee words={["Full-Stack", "Scalable", "Real-time", "High-performance"]} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <ScrollMarquee reverse words={["Let's build", "something great"]} />
      <Contact />
      <Footer />
    </>
  );
}
