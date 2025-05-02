import { AboutSection } from "../components/AboutSection";
import { FavoriteProjects } from "../components/FavoriteProjects";
import { Footer } from "../components/Footer";

// import GuestbookPage from "./guestbook/page";

export default function Home() {
  return (
    <div className="max-w-7xl w-full px-4 md:px-8 mx-auto ">
      <AboutSection />
      <Footer />
    </div>
  );
}
