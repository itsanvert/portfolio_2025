import type { Metadata } from "next";
import { Geist, Geist_Mono, Kantumruy_Pro, Roboto } from "next/font/google";
import "./globals.css";
import "@fontsource/nokora";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";

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
    default: "Vert San",
    template: "%s | Vert San",
  },
  description:
    "Full-stack developer & IT professional – building modern apps, scalable backends & creative UI/UX.",
  keywords: [
    "Vert San",
    "Full Stack Developer",
    "Web Development",
    "IT Professional",
    "Next.js",
    "React",
  ],
  openGraph: {
    title: "Vert San",
    description:
      "Portfolio of Vert San – Developer, Designer & IT Professional.",
    url: "https://vertsan.com",
    siteName: "Vert San",
    images: [
      {
        url: "https://vertsan.com/me.svg",
        width: 1200,
        height: 630,
        alt: "Vert San Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vert San – Developer & IT Professional",
    description:
      "Explore Vert San’s portfolio – building high-performance web solutions.",
    images: ["https://vertsan.com/me.svg"],
  },
  robots: { index: true, follow: true },
  verification: { google: "ABCDEFG12345-your-actual-code-here" },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
              image: "https://vertsan.com/me.svg",
              sameAs: [
                "https://github.com/yourusername",
                "https://linkedin.com/in/yourusername",
                "https://twitter.com/yourusername",
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
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
