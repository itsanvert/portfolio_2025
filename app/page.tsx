import { AboutSection } from "./components/AboutSection";
import { HeroSectionOne } from "./components/Hero";
import { HydrationBoundary } from "./components/HydrationBoundary";
import Contact from "./contact/page";
import Project from "./projects/page";
// Remove these imports as they are page components
// import Contact from "./contact/page";
// import Project from "./projects/page";
// import ProjectsPage from "./projects/page";

// Instead, create separate components for these sections


export default function Home() {
  return (
    <main className="max-w-7xl w-full px-2 md:px-8 mx-auto">
      <section id="hero">
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
          <Project  />
        </HydrationBoundary>
      </section>

      <section id="contact" className="mb-16">
        <HydrationBoundary>
          <Contact />
        </HydrationBoundary>
      </section>
    </main>
  );
}
