import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Евгений Солдатенко - Full Stack Developer",
    template: "%s | Portfolio"
  },
  description: "Full Stack Developer portfolio showcasing web development projects, skills, and professional experience in modern technologies.",
  keywords: ["portfolio", "full stack developer", "web development", "React", "Next.js", "TypeScript", "Евгений Солдатенко"],
  authors: [{ name: "Евгений Солдатенко" }],
  creator: "Евгений Солдатенко",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-pied-pi-a0rx8b1qju.vercel.app",
    siteName: "Portfolio | Евгений Солдатенко",
    title: "Portfolio | Евгений Солдатенко - Full Stack Developer",
    description: "Full Stack Developer portfolio showcasing web development projects and skills",
    images: [
      {
        url: "https://portfolio-pied-pi-a0rx8b1qju.vercel.app/me.jpg",
        width: 1200,
        height: 630,
        alt: "Евгений Солдатенко - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Евгений Солдатенко - Full Stack Developer",
    description: "Full Stack Developer portfolio showcasing web development projects and skills",
    images: ["https://portfolio-pied-pi-a0rx8b1qju.vercel.app/me.jpg"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
