import type { Metadata } from "next";
import { Geist, Geist_Mono, Kantumruy_Pro, Roboto } from "next/font/google";
import "./globals.css";
import "@fontsource/nokora";
import { ThemeProvider } from "next-themes";
import { Footer } from "./components/Footer";
import CardNav, { CardNavItem } from "./components/CardNav";

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
  metadataBase: new URL("https://vertsan.com"),
  title: {
    default: "Vert San - Full-Stack Developer & IT Professional",
    template: "%s | Vert San",
  },
  description:
    "Explore the portfolio of Vert San, a passionate Full-Stack Developer and IT Professional specializing in creating modern web applications, scalable backend systems, and intuitive user experiences. Discover projects in Next.js, React, Laravel, and more.",
  keywords: [
    "Vert San",
    "Full Stack Developer",
    "Web Development",
    "IT Professional",
    "Next.js",
    "React",
    "Laravel",
    "Node.js",
    "Express.js",
    "Prisma ORM",
    "PostgreSQL",
    "SQL Server",
    "MySQL",
    "Supabase",
    "Docker",
    "REST APIs",
    "C#",
    "Windows Server",
    "Linux Server",
    "Network Configuration",
    "Cybersecurity",
    "Portfolio",
    "Cambodia",
    "Phnom Penh",
  ],
  creator: "Vert San",
  publisher: "Vert San",
  openGraph: {
    title: "Vert San - Full-Stack Developer & IT Professional",
    description:
      "Portfolio of Vert San, showcasing expertise in web development, IT solutions, and design.",
    url: "https://vertsan.com",
    siteName: "Vert San",
    images: [
      {
        url: "/me.jpg",
        width: 800,
        height: 600,
        alt: "Vert San - Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vert San – Developer & IT Professional",
    description:
      "Explore Vert San's portfolio – building high-performance web solutions with Next.js, React, and more.",
    creator: "@itsanvert",
    images: ["/me.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

// Navigation data for CardNav
const navigationItems: CardNavItem[] = [
  {
    label: "Projects",
    bgColor: "#3B82F6",
    textColor: "#FFFFFF",
    links: [
      {
        label: "Portfolio Website",
        href: "/projects/portfolio",
        ariaLabel: "View portfolio project",
      },
      {
        label: "E-commerce App",
        href: "/projects/ecommerce",
        ariaLabel: "View e-commerce project",
      },
      {
        label: "Task Manager",
        href: "/projects/task-manager",
        ariaLabel: "View task manager project",
      },
    ],
  },
  {
    label: "About",
    bgColor: "#10B981",
    textColor: "#FFFFFF",
    links: [
      {
        label: "My Story",
        href: "/about",
        ariaLabel: "Learn about my background",
      },
      {
        label: "Skills",
        href: "/about#skills",
        ariaLabel: "View my technical skills",
      },
      {
        label: "Experience",
        href: "/about#experience",
        ariaLabel: "View my work experience",
      },
    ],
  },
  {
    label: "Services",
    bgColor: "#8B5CF6",
    textColor: "#FFFFFF",
    links: [
      {
        label: "Web Development",
        href: "/services/web-dev",
        ariaLabel: "Web development services",
      },
      {
        label: "IT Support",
        href: "/services/it-support",
        ariaLabel: "IT support services",
      },
      {
        label: "Consulting",
        href: "/services/consulting",
        ariaLabel: "Technology consulting",
      },
    ],
  },
  {
    label: "Blog",
    bgColor: "#F59E0B",
    textColor: "#FFFFFF",
    links: [
      {
        label: "Latest Posts",
        href: "/blog",
        ariaLabel: "View latest blog posts",
      },
      {
        label: "Tech Tutorials",
        href: "/blog/tutorials",
        ariaLabel: "View technology tutorials",
      },
      {
        label: "Industry News",
        href: "/blog/news",
        ariaLabel: "View industry news",
      },
    ],
  },
];

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CardNav />

          <div className="pt-16 md:pt-20 lg:pt-24">
            <div className="container mx-auto px-4 md:px-8">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
