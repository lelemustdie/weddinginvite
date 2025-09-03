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
  title: "CELE Y MATEO - ¡NOS CASAMOS!",
  description: "Te invitamos a acompañarnos en nuestro día especial. 20 de diciembre de 2025 - El Dorado Eventos",
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
    url: "https://lourdespontiroli.com/invitaciones-digitales/CYM",
    siteName: "Cele y Mateo - Boda",
    images: [
      {
        url: "https://lourdespontiroli.com/og/cover-v3.jpg",
        width: 1200,
        height: 630,
        alt: "Cele y Mateo - Invitación de Boda",
        type: "image/jpeg",
      },
      // Alternative image in case the first one fails
      {
        url: "https://lourdespontiroli.com/portada.webp",
        width: 1200,
        height: 630,
        alt: "Cele y Mateo - Nos Casamos",
        type: "image/webp",
      },
    ],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CELE Y MATEO",
    description: "¡NOS CASAMOS!",
    images: [
      {
        url: "https://lourdespontiroli.com/og/cover-v3.jpg",
        alt: "Cele y Mateo - Invitación de Boda",
      },
    ],
  },
  // Additional metadata for better WhatsApp compatibility
  other: {
    "og:image:secure_url": "https://lourdespontiroli.com/og/cover-v3.jpg",
    "og:image:alt": "Cele y Mateo - Invitación de Boda",
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="es">
      <head>
        {/* Additional meta tags for better social media compatibility */}
        <meta property="og:image" content="https://lourdespontiroli.com/og/cover-v3.jpg" />
        <meta property="og:image:secure_url" content="https://lourdespontiroli.com/og/cover-v3.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Cele y Mateo - Invitación de Boda" />
        <meta name="twitter:image" content="https://lourdespontiroli.com/og/cover-v3.jpg" />
      </head>
      <body
          className={`${montserrat.variable} ${parisienne.variable} ${cormorantGaramond.variable} antialiased`}
      >
      {children}
      </body>
      </html>
  );
}