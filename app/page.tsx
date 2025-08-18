import { AboutSection } from "./components/AboutSection";
import { HeroSectionOne } from "./components/Hero";
import { HydrationBoundary } from "./components/HydrationBoundary";


import SectionTwo from "./components/SectionTwo";

import ProjectsPage from "./projects/page";

export default function Home() {
  return (
    <main className="max-w-7xl w-full px-4 md:px-8 mx-auto">
      <section id="hero" className="mb-16">
        <HydrationBoundary>
          <HeroSectionOne />
        </HydrationBoundary>
      </section>
      <section id="about" className="mb-16">
        <HydrationBoundary>
          <AboutSection />
        </HydrationBoundary>
      </section>
      <section id="projects" className="mb-16">
        <HydrationBoundary>
          <ProjectsPage />
        </HydrationBoundary>
      </section>
      <section id="more" className="mb-16">
        <HydrationBoundary>
          <SectionTwo />
        </HydrationBoundary>
      </section>
      {/* Uncomment to enable guestbook */}
      {/* <section id="guestbook" className="mb-16">
        <GuestbookPage />
      </section> */}
    </main>
  );
}
