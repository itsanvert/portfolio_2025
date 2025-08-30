import { AboutSection } from "./components/AboutSection";
import { HeroSectionOne } from "./components/Hero";



import { HydrationBoundary } from "./components/HydrationBoundary";


import Contact from "./contact/page";

import ProjectsPage from "./projects/page";

export default function Home() {
  return (
    <main className="w-full">
      <section id="hero">
        <HeroSectionOne />
      </section>
      <section id="about" className="py-16">
        <HydrationBoundary>
          <AboutSection />
        </HydrationBoundary>
      </section>
      <section id="projects">
        <HydrationBoundary>
          <ProjectsPage />
        </HydrationBoundary>
      </section>
      {/* <section id="more" className="py-16">
        <HydrationBoundary>
          <SectionTwo />
        </HydrationBoundary>
      </section> */}
      {/* Uncomment to enable guestbook */}
      {/* <section id="guestbook" className="py-16">
        <GuestbookPage />
      </section> */}
      <section id="contact">
        <HydrationBoundary>
          <Contact />
        </HydrationBoundary>
      </section>
    </main>
  );
}
