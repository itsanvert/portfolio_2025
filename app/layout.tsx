import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Kantumruy_Pro,
  Noto_Sans_Khmer,
  Roboto,
} from "next/font/google"; // Import Roboto font
import "./globals.css";

import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoKhmer = Kantumruy_Pro({
  variable: "--font-noto-khmer",
  subsets: ["khmer"], // Specify Khmer subset
  weight: ["400", "700"], // Optional: Specify font weights
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"], // Specify font weights
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vertsan.com"), // ✅ Use your real site URL
  title: { default: "Vert San", template: "%s | Vert San" },
  description:
    "Hi, I'm Vert San — a full-stack developer and IT professional. Explore my work and connect!",
  keywords: [
    "Vert San",
    "Full Stack Developer",
    "Portfolio",
    "Tech",
    "IT Professional",
  ],
  openGraph: {
    title: "Vert San",
    description:
      "Portfolio of Vert San – Developer, Designer & IT Professional.",
    url: "https://vertsan.com",
    siteName: "Vert San",
    images: [
      {
        url: "https://vertsan.com/og-image.png", // ✅ Host your image properly
        width: 1200,
        height: 630,
        alt: "Vert San Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vert San",
    description:
      "Portfolio of Vert San – Developer, Designer & IT Professional.",
    images: ["https://vertsan.com/og-image.png"],
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
  verification: {
    google: "your-google-site-verification",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoKhmer.variable} ${roboto.variable}`}
    >
      <head>
        <link rel="shortcut icon" href="/public/me.jpg" type="image/x-icon" />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
