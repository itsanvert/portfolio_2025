import { AboutSection } from "./components/AboutSection";
import { HeroSectionOne } from "./components/Hero";


import SectionTwo from "./components/SectionTwo";

import ProjectsPage from "./project/page";

export default function Home() {
  return (
    <main className="max-w-7xl w-full px-4 md:px-8 mx-auto">
      <section id="hero" className="mb-16">
        <HeroSectionOne />
      </section>
      <section id="about" className="mb-16">
        <AboutSection />
      </section>
      <section id="projects" className="mb-16">
        <ProjectsPage />
      </section>
      <section id="more" className="mb-16">
        <SectionTwo />
      </section>
      {/* Uncomment to enable guestbook */}
      {/* <section id="guestbook" className="mb-16">
        <GuestbookPage />
      </section> */}
    </main>
  );
}
