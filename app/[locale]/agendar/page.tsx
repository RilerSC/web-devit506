"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";
import Script from "next/script";
import { useState, useMemo, useEffect } from "react";

export default function SchedulePage() {
  const t = useTranslations("schedule");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);

  // Configuración del widget según idioma
  const widgetConfig = useMemo(() => {
    if (locale === "en") {
      return {
        url: "https://koalendar.com/e/coffee-with-riler",
        selector: "#inline-widget-coffee-with-riler",
        containerId: "inline-widget-coffee-with-riler"
      };
    }
    // Por defecto español
    return {
      url: "https://koalendar.com/e/reunirse-con-riler",
      selector: "#inline-widget-reunirse-con-riler",
      containerId: "inline-widget-reunirse-con-riler"
    };
  }, [locale]);

  // Inicializar widget (funciona en navegación SPA y completa)
  useEffect(() => {
    let mounted = true;
    let attempts = 0;
    const maxAttempts = 50; // 5 segundos máximo (50 * 100ms)

    const initWidget = () => {
      if (!mounted) return true;

      if (typeof window !== "undefined") {
        // Verificar que el container existe en el DOM
        const container = document.getElementById(widgetConfig.containerId);
        
        if (!container) {
          // Container no existe todavía, React aún no ha actualizado el DOM
          console.warn(`[Koalendar] Container ${widgetConfig.containerId} not found yet, retrying...`);
          return false;
        }

        // @ts-ignore
        if (window.Koalendar) {
          // Limpiar container previo
          container.innerHTML = '';

          // @ts-ignore
          window.Koalendar('inline', {
            url: widgetConfig.url,
            selector: widgetConfig.selector,
            // Parámetros de personalización
            theme: {
              primaryColor: "#0066CC",     // brand-blue
              textColor: "#1a1a1a",        // brand-black
              backgroundColor: "#ffffff",
              borderRadius: "12px"
            }
          });
          
          if (mounted) {
            console.log(`[Koalendar] Widget initialized successfully: ${widgetConfig.containerId}`);
            setIsLoading(false);
          }
          return true;
        }
      }
      return false;
    };

    // Pequeño delay inicial para permitir que React actualice el DOM
    const initialDelay = setTimeout(() => {
      // Intentar inmediatamente después del delay
      if (initWidget()) return;

      // Si falla, hacer polling cada 100ms
      const interval = setInterval(() => {
        attempts++;
        if (initWidget() || attempts >= maxAttempts) {
          clearInterval(interval);
          if (attempts >= maxAttempts && mounted) {
            console.error(`[Koalendar] Widget failed to load after 5 seconds. Container: ${widgetConfig.containerId}`);
            setIsLoading(false);
          }
        }
      }, 100);

      // Guardar interval para cleanup
      return () => clearInterval(interval);
    }, 50);

    // Cleanup
    return () => {
      mounted = false;
      clearTimeout(initialDelay);
    };
  }, [widgetConfig]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 hover:text-brand-blue transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t("backToHome")}
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-medium">
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-6"
          >
            {t("hero.title")}{" "}
            <span className="text-brand-blue">{t("hero.titleHighlight")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16"
          >
            {(t.raw("hero.features") as string[]).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group flex items-center gap-4 text-left bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 text-center min-h-[700px] flex flex-col items-center justify-center">
              <div className="relative">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-brand-blue/20 border-t-brand-blue mb-6"></div>
                <div className="absolute inset-0 inline-block animate-ping rounded-full h-16 w-16 border-4 border-brand-blue/10"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">{t("loading")}</p>
              <p className="text-gray-400 text-sm mt-2">Preparando tu experiencia de agendamiento</p>
            </div>
          )}

          {/* Koalendar Container - Premium Design */}
          <div 
            className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500"
            style={{ display: isLoading ? "none" : "block" }}
          >
            {/* Glassmorphism Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-blue-400 to-brand-blue"></div>
            
            {/* Container con padding mejorado */}
            <div className="p-4 sm:p-6 md:p-10 min-h-[700px]">
              {/* Widget Container */}
              <div 
                key={widgetConfig.containerId}
                id={widgetConfig.containerId}
                className="w-full"
                style={{
                  minHeight: "650px",
                  borderRadius: "12px"
                }}
              ></div>
            </div>

            {/* Subtle bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none"></div>
          </div>
        </motion.div>
      </section>

      {/* Koalendar Scripts */}
      <Script
        id="koalendar-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.Koalendar = window.Koalendar || function() {
              (Koalendar.props = Koalendar.props || []).push(arguments);
            };
          `
        }}
      />
      <Script
        src="https://koalendar.com/assets/widget.js"
        strategy="afterInteractive"
      />

      {/* Trust Indicators */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Trust Card */}
          <div className="bg-gradient-to-br from-brand-blue/5 via-blue-50/30 to-brand-blue/5 rounded-2xl p-8 md:p-10 border border-brand-blue/10 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue rounded-2xl mb-4 shadow-lg shadow-brand-blue/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-2">
                Servicios de CTO Externo desde 2012
              </h3>
              <p className="text-gray-600 text-lg">
                Experiencia trabajando con empresas líderes en fintech, educación y servicios empresariales
              </p>
            </div>

            {/* Trust Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50">
                <div className="text-3xl font-bold text-brand-blue mb-2">12+</div>
                <p className="text-gray-600 text-sm">Años de Experiencia</p>
              </div>
              <div className="text-center p-6 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50">
                <div className="text-3xl font-bold text-brand-blue mb-2">30min</div>
                <p className="text-gray-600 text-sm">Sesión Sin Costo</p>
              </div>
              <div className="text-center p-6 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50">
                <div className="text-3xl font-bold text-brand-blue mb-2">100%</div>
                <p className="text-gray-600 text-sm">Sin Compromiso</p>
              </div>
            </div>
          </div>

          {/* Security & Privacy Note */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Tus datos están protegidos y nunca serán compartidos con terceros
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
