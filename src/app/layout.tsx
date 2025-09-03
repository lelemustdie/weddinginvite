import type { Metadata } from "next";
import { Montserrat, Parisienne, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap", 
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400", 
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CELE Y MATEO",
  description: "¡NOS CASAMOS!",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://lourdespontiroli.com"),
  openGraph: {
    title: "CELE Y MATEO",
    description: "¡NOS CASAMOS!",
    url: "/invitaciones-digitales",
    siteName: "lourdespontiroli.com",
    images: [
      {
        url: "/og/cover-v3.jpg", // coloca aquí un JPG/PNG 1200x630 público
        width: 1200,
        height: 630,
        alt: "Anillo",
      },
    ],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CELE Y MATEO",
    description: "¡NOS CASAMOS!",
    images: ["/og/cover-v3.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${parisienne.variable} ${cormorantGaramond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}