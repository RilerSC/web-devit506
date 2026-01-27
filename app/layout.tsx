import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEVIT506 | Socios Tecnológicos Estratégicos desde 2012",
  description: "Servicios de CTO Externo y consultoría estratégica tecnológica desde 2012. Lideramos proyectos de alto impacto con excelencia técnica y visión de negocio para empresas en Costa Rica y Latinoamérica.",
  keywords: [
    "CTO Externo",
    "Consultoría Tecnológica",
    "CTO as a Service",
    "Desarrollo de Software",
    "Arquitectura de Sistemas",
    "Azure Cloud",
    "Next.js",
    "Automatización de Procesos",
    "Integración de Sistemas",
    "Costa Rica",
    "DEVIT506"
  ],
  authors: [{ name: "DEVIT506" }],
  creator: "DEVIT506",
  publisher: "DEVIT506",
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
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: "https://devit506.com",
    siteName: "DEVIT506",
    title: "DEVIT506 | Socios Tecnológicos Estratégicos desde 2012",
    description: "Servicios de CTO Externo y consultoría estratégica tecnológica. Lideramos proyectos de alto impacto con más de una década de experiencia en el sector.",
    images: [
      {
        url: "/og-image.png", // Crear esta imagen: 1200x630px con branding DEVIT506
        width: 1200,
        height: 630,
        alt: "DEVIT506 - Socios Tecnológicos Estratégicos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEVIT506 | Socios Tecnológicos Estratégicos desde 2012",
    description: "Servicios de CTO Externo y consultoría estratégica tecnológica. Lideramos proyectos de alto impacto con excelencia técnica y visión de negocio.",
    images: ["/twitter-image.png"], // Misma imagen o variante 1200x675px
    creator: "@devit506", // Actualizar con el handle real de Twitter si existe
  },
  verification: {
    // Agregar cuando estén disponibles:
    // google: "google-site-verification-code",
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },
  alternates: {
    canonical: "https://devit506.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
