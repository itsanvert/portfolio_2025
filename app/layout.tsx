// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Kantumruy_Pro, Roboto } from "next/font/google";
import "./globals.css";
import "@fontsource/nokora";
import { ThemeProvider } from "next-themes";

import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
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
  title: "Vert San - Full-Stack Developer & IT Professional",
  description:
    "Portfolio of Vert San, a passionate full-stack developer and IT professional specializing in web development, network administration, and cybersecurity.",
  keywords: [
    "Web Developer",
    "IT Professional",
    "Full-Stack",
    "React",
    "Next.js",
    "Laravel",
    "Node.js",
  ],
  authors: [{ name: "Vert San" }],
  creator: "Vert San",
  openGraph: {
    title: "Vert San - Full-Stack Developer & IT Professional",
    description:
      "Portfolio of Vert San, a passionate full-stack developer and IT professional",
    url: "https://vertsan.com",
    siteName: "Vert San Portfolio",
    images: [
      {
        url: "https://vertsan.com/me.jpg",
        width: 800,
        height: 600,
        alt: "Vert San",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vert San - Full-Stack Developer & IT Professional",
    description:
      "Portfolio of Vert San, a passionate full-stack developer and IT professional",
    images: ["https://vertsan.com/me.jpg"],
    creator: "@itsanvert",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <body className="antialiased bg-black min-h-screen">
        <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Global Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-full mix-blend-screen blur-3xl opacity-60 animate-pulse"></div>
            <div
              className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full mix-blend-screen blur-3xl opacity-60 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full mix-blend-screen blur-3xl opacity-60 animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          <main className="relative z-10">
            <Navbar />
            <div className="w-full">{children}</div>
            <Footer />
          </main>
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
