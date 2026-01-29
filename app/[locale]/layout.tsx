import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { locales } from "../../i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ CRÍTICO: Genera rutas estáticas para /es y /en durante el build
export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "en" }
  ];
}

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
    "Python",
    "Node.js",
    "React",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "NoSQL",
    "API",
    "REST",
    "GraphQL",
    "Microservicios",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "DevOps",
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
        url: "/og-image.png",
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
    images: ["/twitter-image.png"],
    creator: "@devit506",
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  console.log(">>> SERVER: layout.tsx recibió locale de params:", locale);

  // ✅ Validación suave: confiar en que middleware ya validó
  // Si locale es inválido, middleware habrá redirigido
  // Solo validamos por seguridad extra
  if (!locales.includes(locale as any)) {
    console.log(">>> SERVER: locale NO VÁLIDO, llamando notFound()");
    notFound();
  }

  console.log(">>> SERVER: locale VÁLIDO, obteniendo mensajes...");

  // ✅ CRÍTICO: Pasar locale explícitamente para forzar sincronización
  // Durante SSG, el contexto de next-intl puede no estar configurado correctamente
  // Forzamos el uso del locale de params en vez de confiar en el contexto
  const messages = await getMessages({ locale });

  console.log(">>> SERVER: Mensajes obtenidos, keys disponibles:", Object.keys(messages).slice(0, 3).join(", "));
  console.log(">>> SERVER: Pasando a NextIntlClientProvider - locale:", locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
