// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lourdespontiroli.com"),
  title: {
    default: "Cele y Mateo — ¡Nos casamos!",
    template: "%s | Lourdes Pontiroli",
  },
  description: "Invitación digital con fecha, lugar, RSVP y más.",
  openGraph: {
    title: "Cele y Mateo — ¡Nos casamos!",
    description: "Fecha, lugar, RSVP y más.",
    url: "/invitaciones-digitales",
    siteName: "lourdespontiroli.com",
    images: [
      {
        url: "/og/cover.jpg", // coloca aquí un JPG/PNG 1200x630 público
        width: 1200,
        height: 630,
        alt: "Anillo sobre la arena frente al mar",
      },
    ],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cele y Mateo — ¡Nos casamos!",
    description: "Fecha, lugar, RSVP y más.",
    images: ["/og/cover.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="es">
      <body>{children}</body>
      </html>
  );
}
