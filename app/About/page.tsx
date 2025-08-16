import { AboutSection } from "../components/AboutSection";
import { FavoriteProjects } from "../components/FavoriteProjects";
import { Footer } from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Vert San",
  description:
    "Learn more about Vert San, a Full-Stack Developer and IT Professional from Cambodia. Discover his skills, experience, and passion for technology.",
  openGraph: {
    title: "About Vert San",
    description:
      "Learn more about Vert San, a Full-Stack Developer and IT Professional from Cambodia.",
    url: "https://vertsan.com/about",
  },
  twitter: {
    title: "About Vert San",
    description:
      "Learn more about Vert San, a Full-Stack Developer and IT Professional from Cambodia.",
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-7xl w-full px-4 md:px-8 mx-auto ">
      <AboutSection />
    </main>
  );
}