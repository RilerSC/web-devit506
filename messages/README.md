# Diccionarios de Traducción - DEVIT506

Activos de internacionalización (i18n) para la web bilingüe Español/Inglés.

## Archivos

- **`es.json`** - Diccionario base en español (idioma primario)
- **`en.json`** - Diccionario en inglés (tono CTO/Consultoría Senior)

## Estructura de los JSON

Los diccionarios están organizados por secciones de la landing page:

```json
{
  "navbar": { ... },      // Navegación principal
  "hero": { ... },        // Sección Hero
  "trustBar": { ... },    // KPIs y logos de clientes
  "capabilities": { ... },// Capacidades Core (6 servicios)
  "projects": { ... },    // Casos de éxito (3 proyectos)
  "contact": { ... },     // Formulario de contacto
  "footer": { ... }       // Footer
}
```

## Cobertura de Contenidos

| Sección | Strings | Incluye |
|---------|---------|---------|
| Navbar | 5 | Links, CTA, email |
| Hero | 7 | Badge, títulos, CTAs, social proof |
| TrustBar | 6 | KPIs (4), títulos (2) |
| Capabilities | 9 | Header + 6 servicios |
| Projects | 13 | Header + 3 proyectos completos |
| Contact | 16 | Formulario (8 campos) + preferencias |
| Footer | 13 | Tagline, servicios, legal |
| **TOTAL** | **~80** | Strings únicos |

## Criterios de Traducción (EN)

### Tono Ejecutivo
- **Audiencia:** CTOs, VPs of Engineering, IT Directors
- **Registro:** Formal profesional, no casual
- **Verbos:** Action-oriented ("Deliver", "Optimize", "Scale")

### Terminología Clave

| Español | Inglés |
|---------|--------|
| Socios Tecnológicos Estratégicos | Strategic Technology Partners |
| Servicios de CTO Externo | External CTO Services |
| Casos de Éxito | Case Studies / Success Stories |
| Capacidades Core | Core Capabilities |
| Consultoría C-Suite | C-Suite Consulting |
| Desarrollo a Medida | Custom Software Development |
| Integración de Ecosistemas | Ecosystem Integration |
| Desafío Tecnológico | Technology Challenge |
| Arquitectura Zero-Trust | Zero-Trust Architecture |
| Motor geoespacial | Geospatial Engine |

### Adaptaciones Culturales

**Métricas:**
- Mantener precisión: "95% Fraud Reduction" (no redondear)
- KPIs en inglés: "10K+ records", "$500K+ revenue"

**CTAs:**
- ES: "Iniciemos la Conversación" → EN: "Start the Conversation"
- ES: "Hablemos" → EN: "Let's Talk"
- ES: "Agenda una Consultoría" → EN: "Schedule a Consultation"

**Formulario:**
- ES: "¿Cómo prefieres que te contactemos?" → EN: "How do you prefer we contact you?"
- ES: "Desafío Tecnológico" → EN: "Technology Challenge"

## Interpolación de Variables

Algunos strings usan placeholders:

```json
"copyright": "© {year} DEVIT506. All rights reserved."
```

El `{year}` se reemplazará dinámicamente con `new Date().getFullYear()`.

## Próximos Pasos (Implementación)

1. **Instalar next-intl:**
   ```bash
   npm install next-intl
   ```

2. **Crear middleware de i18n:**
   ```typescript
   // middleware.ts
   import createMiddleware from 'next-intl/middleware';
   export default createMiddleware({
     locales: ['es', 'en'],
     defaultLocale: 'es'
   });
   ```

3. **Actualizar componentes:**
   ```typescript
   import { useTranslations } from 'next-intl';
   const t = useTranslations('hero');
   <h1>{t('title')}</h1>
   ```

4. **Agregar switcher de idioma en Navbar**

5. **Configurar rutas:**
   - `/` → Español (default)
   - `/en` → English

## Notas de Mantenimiento

- **Agregar nuevos textos:** Siempre añadir a ambos JSON
- **Verificar coherencia:** Usar los mismos términos en toda la web
- **Testing:** Probar ambos idiomas en todos los componentes
- **SEO:** Configurar `hreflang` tags después de implementar

---

**Creado:** 2026-01-28  
**Estado:** Listo para implementación con next-intl  
**Cobertura:** 100% de la landing page (todos los componentes)
