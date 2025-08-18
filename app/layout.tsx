// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Kantumruy_Pro, Roboto } from "next/font/google";
import "./globals.css";
import "@fontsource/nokora";
import { ThemeProvider } from "next-themes";
import CardNav from "./components/CardNav";
import { Footer } from "./components/Footer";
import { HydrationBoundary } from "./components/HydrationBoundary";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const notoKhmer = Kantumruy_Pro({
  variable: "--font-noto-khmer",
  subsets: ["khmer"],
  weight: ["400", "700"],
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  // ... keep your existing metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoKhmer.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vert San",
              url: "https://vertsan.com",
              jobTitle: "Full-Stack Developer & IT Professional",
              image: "https://vertsan.com/me.jpg",
              sameAs: [
                "https://github.com/itsanvert",
                "https://linkedin.com/in/itsanvert",
                "https://twitter.com/itsanvert",
                "https://web.facebook.com/profile.php?id=61574843070322",
              ],
              alumniOf: "Samdech Preah Mahasangharajah Bour Kry University",
              knowsAbout: [
                "Web Development",
                "IT Support",
                "Network Administration",
                "Next.js",
                "React",
                "Laravel",
                "Node.js",
                "Cybersecurity",
              ],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <HydrationBoundary>
            <CardNav
              logoText="Vert San"
              logoAlt="Vert San - Portfolio"
              items={[]}
            />
          </HydrationBoundary>

          <div className="pt-16">
            <div className="container">{children}</div>
            <HydrationBoundary>
              <Footer />
            </HydrationBoundary>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
