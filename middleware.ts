import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  // Idiomas soportados
  locales,

  // Idioma por defecto (español)
  defaultLocale,

  // ✅ URL-FIRST: Desactivar detección automática de idioma
  // La URL tiene prioridad ABSOLUTA sobre cookies y headers del navegador
  // El usuario controla el idioma manualmente mediante LanguageSwitcher
  localeDetection: false,

  // ✅ Siempre mostrar el prefijo de locale en la URL (/es o /en)
  localePrefix: "always",
});

export const config = {
  // Matcher simplificado: todas las rutas excepto archivos estáticos, API y assets
  matcher: [
    "/",                                          // Raíz para detección de idioma
    "/(es|en)/:path*",                           // Rutas con locale explícito
    "/((?!api|_next|_vercel|.*\\..*).*)",       // Todo lo demás excepto archivos
  ],
};
