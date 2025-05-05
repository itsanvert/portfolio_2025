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
  metadataBase: new URL(
    "https://web.facebook.com/profile.php?id=61574843070322"
  ),
  title: { default: "Vert San", template: "%s | My Site" },
  description: "Welcome to Vert San - Developer, Designer, and Tech Enthusiast",
  keywords: [
    "Vert San",
    "Developer",
    "Portfolio",
    "Web Development",
    "Software Engineer",
  ],
  alternates: {
    canonical: "https://example.com",
    languages: {
      "km-KH":
        "https://static.vecteezy.com/system/resources/previews/010/251/203/original/cambodia-flag-icon-sign-png.png",
      "en-US":
        "https://icon-library.com/images/english-icon-png/english-icon-png-2.jpg",
      "zh-CN": "https://images.icon-icons.com/107/PNG/512/china_18230.png",
    },
  },
  openGraph: {
    title: "Vert San",
    description:
      "Welcome to Vert San - Developer, Designer, and Tech Enthusiast",
    url: "https://web.facebook.com/profile.php?id=61574843070322",
    siteName: "Vert San",
    images: [
      {
        url: "https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vert San",
    description:
      "Welcome to Vert San - Developer, Designer, and Tech Enthusiast",
    images: [
      "https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png",
    ],
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
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
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
