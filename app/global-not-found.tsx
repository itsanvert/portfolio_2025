// Import global styles and fonts
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br">
          <img
            src="/gif/not-found.gif"
            alt="404 - Not Found"
            className="w-24 h-24 mb-6"
          />
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            404 - Not Found
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Sorry, the page you’re looking for doesn’t exist.
          </p>
          <a
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go back home
          </a>
        </div>
      </body>
    </html>
  );
}
