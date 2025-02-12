import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../lib/authContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "devRoot",
  description: "Közösen írjuk a jövőd kódját!",
  keywords: [
    "Programming learning platform",
    "Informatics exercises",
    "Coding challenges",
    "Hungarian programming courses",
    "Algorithm practice",
    "Web development",
    "Linux operations",
  ],
  openGraph: {
    title: "devRoot",
    description: "Közösen írjuk a jövőd kódját!",
    url: "https://devroot.hu",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "devRoot Open Graph Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "devRoot",
    description: "Közösen írjuk a jövőd kódját!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "devRoot Twitter Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <meta name="description" content="Közösen írjuk a jövőd kódját!" />
        <meta property="og:url" content="https://devroot.hu" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="devRoot" />
        <meta property="og:description" content="Közösen írjuk a jövőd kódját!" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="devroot.hu" />
        <meta property="twitter:url" content="https://devroot.hu" />
        <meta name="twitter:title" content="devRoot" />
        <meta name="twitter:description" content="Közösen írjuk a jövőd kódját!" />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased dark`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
