// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Kantumruy_Pro, Roboto } from "next/font/google";
import "./globals.css";
import "@fontsource/nokora";
import { ThemeProvider } from "next-themes";
import CardNav from "./components/CardNav";
import { Footer } from "./components/Footer";
import { HydrationBoundary } from "./components/HydrationBoundary";
import type { CardNavItem } from "./components/CardNav";

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

// Define navigation items
const navItems: CardNavItem[] = [
  {
    label: "Home",
    bgColor: "rgb(59, 130, 246)", // blue-500
    textColor: "white",
    links: [
      {
        label: "Welcome",
        href: "/",
        ariaLabel: "Go to homepage",
      },
      {
        label: "About Me",
        href: "/about",
        ariaLabel: "Learn more about me",
      },
    ],
  },
  {
    label: "Projects",
    bgColor: "rgb(168, 85, 247)", // purple-500
    textColor: "white",
    links: [
      {
        label: "View All",
        href: "/projects",
        ariaLabel: "View all projects",
      },
    ],
  },
  {
    label: "Experience",
    bgColor: "rgb(34, 197, 94)", // green-500
    textColor: "white",
    links: [
      {
        label: "Resume",
        href: "/resume/resume.pdf",
        ariaLabel: "Download resume",
        download: true,
      },
    ],
  },
  {
    label: "Contact",
    bgColor: "rgb(249, 115, 22)", // orange-500
    textColor: "white",
    links: [
      {
        label: "Get In Touch",
        href: "/contact",
        ariaLabel: "Contact me",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/itsanvert",
        ariaLabel: "Visit my LinkedIn profile",
      },
      {
        label: "GitHub",
        href: "https://github.com/itsanvert",
        ariaLabel: "Visit my GitHub profile",
      },
      {
        label: "Telegram",
        href: "https://t.me/itsanvert",
        ariaLabel: "Follow me on Telegram",
      },
      {
        label: "Facebook",
        href: "https://web.facebook.com/profile.php?id=61574843070322",
        ariaLabel: "Visit my Facebook profile",
      },
    ],
  },
];

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
      <body>
        <ThemeProvider>
          <HydrationBoundary>
            <CardNav
              logoText="Vert San"
              logoAlt="Vert San - Portfolio"
              items={navItems}
              homeHref="/"
              contactHref="https://t.me/itsanvert"
              showControls={true}
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
