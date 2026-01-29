# 🚨 DIAGNÓSTICO: Rutas de Proyectos y Traducción Dinámica

**Fecha:** 2026-01-28  
**Problema:** Enlaces de proyectos no mantienen locale + contenido hardcodeado en español  
**Severidad:** 🔴 CRÍTICO - Afecta navegación bilingüe y contenido

---

## 📋 RESUMEN DE PROBLEMAS

### **Problema #1: Enlaces No Mantienen Locale (CRÍTICO)**

**Síntoma:**
- Usuario en `/en` → Click en proyecto → Redirige a `/es`
- URL pierde el locale actual

**Causa Raíz:**
```typescript
// ❌ FeaturedProjects.tsx - línea 4
import Link from "next/link";  // Usa Link estándar de Next.js

// ❌ marketplace-coopebanacio/page.tsx - línea 5
import Link from "next/link";

// ❌ integracion-hubspot-codeas/page.tsx - línea 5
import Link from "next/link";

// ❌ observatorio-sostenibilidad/page.tsx - línea 4
import Link from "next/link";
```

**Problema:**
- `Link` de `next/link` NO sabe sobre locales
- NO agrega prefijo `/en` o `/es` automáticamente
- Enlaces son "absolutos" sin contexto de idioma

**Ejemplo del Bug:**
```typescript
// Usuario en: /en
<Link href="/proyectos/marketplace-coopebanacio">
  // Navega a: /proyectos/marketplace-coopebanacio
  // Next.js middleware lo redirige a: /es/proyectos/marketplace-coopebanacio
  // ❌ PERDIÓ EL LOCALE "en"
</Link>
```

---

### **Problema #2: Contenido Hardcodeado en Español (CRÍTICO)**

**Síntoma:**
- `/en/proyectos/marketplace-coopebanacio` muestra contenido en español
- Todas las páginas de proyectos solo tienen texto en español

**Archivos Afectados:**
1. `marketplace-coopebanacio/page.tsx` (636 líneas, 100% español)
2. `integracion-hubspot-codeas/page.tsx` (439 líneas, 100% español)
3. `observatorio-sostenibilidad/page.tsx` (602 líneas, 100% español)

**Ejemplo del Problema:**
```typescript
// marketplace-coopebanacio/page.tsx - línea 275
<Link href="/#projects" className="...">
  Volver a Proyectos  {/* ❌ Hardcoded en español */}
</Link>

// línea 301
<h1 className="...">
  Plataforma Transaccional de{" "}
  <span className="text-brand-blue">Economía Social</span>
  {/* ❌ Hardcoded en español */}
</h1>
```

---

## 🔍 ANÁLISIS DE ARCHIVOS

### **1. FeaturedProjects.tsx**

**Ubicación:** `app/components/FeaturedProjects.tsx`

**Problema:**
```typescript
// ❌ Línea 4
import Link from "next/link";

// ❌ Líneas 109-111
<Link 
  href={project.link}  // "/proyectos/marketplace-coopebanacio"
  className="..."
>
```

**Solución:**
```typescript
// ✅ CORRECTO
import { Link } from "@/navigation";

// ✅ El Link de @/navigation es aware del locale
<Link href={project.link}>
  {/* Automáticamente genera /en/proyectos/... o /es/proyectos/... */}
</Link>
```

---

### **2. marketplace-coopebanacio/page.tsx**

**Ubicación:** `app/[locale]/proyectos/marketplace-coopebanacio/page.tsx`

**Estadísticas:**
- Líneas totales: 636
- Links internos: 3
- Textos a traducir: ~150 strings
- Componentes: 4 (KPICard, RoadmapPhase, ArchitectureBlock, ImpactMetric)

**Enlaces Problemáticos:**
```typescript
// ❌ Línea 5
import Link from "next/link";

// ❌ Línea 268
<Link href="/#projects" className="...">
  Volver a Proyectos
</Link>

// ❌ Línea 617
<Link href="/#contact" className="...">
  Agenda una Consultoría
</Link>

// ❌ Línea 624
<Link href="/#projects" className="...">
  Ver más Proyectos
</Link>
```

**Textos Hardcodeados (Ejemplos):**
- Título: "Plataforma Transaccional de Economía Social"
- Cliente: "Coopebanacio R.L."
- KPIs: "7,500+ Asociados Potenciales", "Zero-Trust Seguridad"
- Secciones: "Resumen Ejecutivo", "El Reto Estratégico", etc.
- Testimonial: Todo en español
- CTAs: "Agenda una Consultoría", "Ver más Proyectos"

---

### **3. integracion-hubspot-codeas/page.tsx**

**Ubicación:** `app/[locale]/proyectos/integracion-hubspot-codeas/page.tsx`

**Estadísticas:**
- Líneas totales: 439
- Links internos: 3
- Textos a traducir: ~80 strings
- Componentes: 3 (MetricCard, PhaseCard, TechItem)

**Enlaces Problemáticos:**
```typescript
// ❌ Línea 5
import Link from "next/link";

// ❌ Líneas con Links (similares a marketplace)
```

**Textos Hardcodeados (Ejemplos):**
- Título: "Integración Bidireccional HubSpot CRM ↔ SQL Server ERP"
- Cliente: "CODEAS ERP Solutions S.A."
- Métricas: "100% Integridad de Datos", "+10,000 Registros Sincronizados"
- Pain Points: "Silos de datos entre CRM y ERP..."
- Stack Técnico: Todo en español

---

### **4. observatorio-sostenibilidad/page.tsx**

**Ubicación:** `app/[locale]/proyectos/observatorio-sostenibilidad/page.tsx`

**Estadísticas:**
- Líneas totales: 602
- Links internos: 3
- Textos a traducir: ~120 strings
- Componentes: 4 (EngineeringKPI, RoadmapModule, TechStackItem, Phase1Feature)

**Enlaces Problemáticos:**
```typescript
// ❌ Línea 4
import Link from "next/link";
```

**Textos Hardcodeados (Ejemplos):**
- Título: "Observatorio Nacional de Sostenibilidad y Medio Ambiente"
- Cliente: "Universidad Fidélitas"
- KPIs: "React 19 RC", "Next.js 15", "+200% Performance"
- Fase 1: "En Desarrollo Activo"
- Stack Técnico: Todo en español

---

## ✅ SOLUCIONES PROPUESTAS

### **Fix #1: Corregir Imports de Link (4 archivos)**

**Archivos a Modificar:**
1. `app/components/FeaturedProjects.tsx`
2. `app/[locale]/proyectos/marketplace-coopebanacio/page.tsx`
3. `app/[locale]/proyectos/integracion-hubspot-codeas/page.tsx`
4. `app/[locale]/proyectos/observatorio-sostenibilidad/page.tsx`

**Cambio:**
```typescript
// ❌ ANTES
import Link from "next/link";

// ✅ DESPUÉS
import { Link } from "@/navigation";
```

**Resultado:**
- ✅ Links mantienen locale actual
- ✅ `/en` → Click proyecto → `/en/proyectos/...`
- ✅ `/es` → Click proyecto → `/es/proyectos/...`

---

### **Fix #2: Extraer Contenido a JSON (es.json y en.json)**

**Estructura Propuesta:**

```json
{
  "projectDetails": {
    "common": {
      "backToProjects": "Volver a Proyectos",
      "scheduleConsultation": "Agenda una Consultoría",
      "viewMoreProjects": "Ver más Proyectos",
      "client": "Cliente",
      "year": "Año",
      "completed": "Completado",
      "inProgress": "En Progreso",
      "planned": "Planificado"
    },
    "marketplace": {
      "hero": {
        "category": "E-commerce / Fintech",
        "status": "75% Completado",
        "title": "Plataforma Transaccional de",
        "titleHighlight": "Economía Social",
        "client": "Coopebanacio R.L.",
        "description": "Ecosistema digital para 4,300+ asociados con arquitectura Zero-Trust y motor geoespacial...",
        "kpis": [
          { "value": "7,500+", "label": "Asociados Potenciales" },
          { "value": "Zero-Trust", "label": "Seguridad / Ley 8968" },
          { "value": "<1.2s", "label": "Tiempo de Carga (Edge)" }
        ]
      },
      "executiveSummary": {
        "badge": "Proyecto Buque Insignia",
        "title": "Resumen Ejecutivo",
        "paragraph1": "...",
        "paragraph2": "..."
      },
      "challenges": {
        "badge": "El Reto Estratégico",
        "title": "Desafíos de Transformación Digital",
        "items": [
          {
            "title": "Ausencia de Canales Digitales",
            "description": "..."
          },
          ...
        ],
        "painPoints": {
          "title": "Impacto Económico Sin Solución",
          "items": ["...", "...", "..."]
        }
      },
      "architecture": {
        "badge": "La Solución",
        "title": "Arquitectura Híbrida de Alto Rendimiento",
        "subtitle": "Combinación óptima de Vercel Edge...",
        "blocks": [
          {
            "title": "Frontend Distribuido Globalmente",
            "subtitle": "Vercel Edge Network...",
            "items": ["...", "..."]
          },
          ...
        ],
        "benefits": [
          { "value": "60%", "label": "Menos abandono por carga" },
          ...
        ]
      },
      // ... más secciones
    },
    "hubspot": {
      // Similar estructura
    },
    "observatorio": {
      // Similar estructura
    }
  }
}
```

---

### **Fix #3: Traducción al Inglés (Tono Senior Consulting)**

**Principios de Traducción:**

1. **Tono:** Consultoría Estratégica / External CTO
2. **Términos Técnicos:** Mantener precisión (PostGIS, Zero-Trust, etc.)
3. **Métricas:** Mantener formato (7,500+ → 7,500+)
4. **Evitar:** Traducciones literales que pierden impacto

**Ejemplos de Traducción:**

| Español | ❌ MAL (Literal) | ✅ BIEN (Profesional) |
|---------|------------------|---------------------|
| "Socios Tecnológicos Estratégicos" | "Strategic Technology Partners" | "Strategic Technology Partners" ✅ |
| "Casos de Éxito" | "Success Cases" | "Case Studies" ✅ |
| "Resumen Ejecutivo" | "Executive Summary" | "Executive Summary" ✅ |
| "El Reto Estratégico" | "The Strategic Challenge" | "Strategic Challenge" ✅ |
| "Agenda una Consultoría" | "Schedule a Consultancy" | "Schedule a Consultation" ✅ |
| "Ver más Proyectos" | "See more Projects" | "View More Case Studies" ✅ |
| "Proyecto Buque Insignia" | "Flagship Project" | "Flagship Initiative" ✅ |
| "Arquitectura Híbrida" | "Hybrid Architecture" | "Hybrid Architecture" ✅ |
| "Impacto Empresarial" | "Business Impact" | "Business Impact" ✅ |
| "Nueva Línea de Ingresos" | "New Income Line" | "New Revenue Stream" ✅ |

---

### **Fix #4: Refactorizar Páginas con useTranslations()**

**Ejemplo de Refactorización (marketplace-coopebanacio):**

**ANTES:**
```typescript
export default function CaseStudyMarketplace() {
  const kpis = [
    { value: "7,500+", label: "Asociados Potenciales" },
    { value: "Zero-Trust", label: "Seguridad / Ley 8968" },
    { value: "<1.2s", "label": "Tiempo de Carga (Edge)" },
  ];

  return (
    <main>
      <section>
        <Link href="/#projects">
          Volver a Proyectos
        </Link>
        <h1>
          Plataforma Transaccional de{" "}
          <span>Economía Social</span>
        </h1>
        {/* ... */}
      </section>
    </main>
  );
}
```

**DESPUÉS:**
```typescript
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function CaseStudyMarketplace() {
  const t = useTranslations("projectDetails.marketplace");
  const tc = useTranslations("projectDetails.common");

  const kpis = [
    { value: t("hero.kpis.0.value"), label: t("hero.kpis.0.label") },
    { value: t("hero.kpis.1.value"), label: t("hero.kpis.1.label") },
    { value: t("hero.kpis.2.value"), label: t("hero.kpis.2.label") },
  ];

  return (
    <main>
      <section>
        <Link href="/#projects">
          {tc("backToProjects")}
        </Link>
        <h1>
          {t("hero.title")}{" "}
          <span>{t("hero.titleHighlight")}</span>
        </h1>
        {/* ... */}
      </section>
    </main>
  );
}
```

---

## 📊 IMPACTO DEL FIX

### **Antes:**
- ❌ `/en` → Click proyecto → `/es` (pierde locale)
- ❌ `/en/proyectos/marketplace` muestra español
- ❌ Links sin contexto de idioma
- ❌ Contenido 100% hardcodeado

### **Después:**
- ✅ `/en` → Click proyecto → `/en/proyectos/...` (mantiene locale)
- ✅ `/en/proyectos/marketplace` muestra inglés
- ✅ Links con contexto de idioma automático
- ✅ Contenido dinámico desde JSON

---

## 📂 ARCHIVOS A MODIFICAR

**Cambios de Código:**
1. `app/components/FeaturedProjects.tsx` (1 línea)
2. `app/[locale]/proyectos/marketplace-coopebanacio/page.tsx` (~100 cambios)
3. `app/[locale]/proyectos/integracion-hubspot-codeas/page.tsx` (~60 cambios)
4. `app/[locale]/proyectos/observatorio-sostenibilidad/page.tsx` (~80 cambios)

**Archivos JSON:**
5. `messages/es.json` (+~350 strings)
6. `messages/en.json` (+~350 strings traducidos)

**Documentación:**
7. `AUDIT_LOG.md` (nueva sección)

---

## ⏱️ ESTIMACIÓN

- **Corrección de Links:** 5 minutos
- **Extracción a JSON (es.json):** 30 minutos
- **Traducción al inglés (en.json):** 45 minutos
- **Refactorización de páginas:** 60 minutos
- **Testing:** 15 minutos
- **Documentación:** 10 minutos

**Total:** ~165 minutos (2.75 horas)

---

## ✅ PLAN DE IMPLEMENTACIÓN

### **Fase 1: Quick Win - Corrección de Links (5 min)**
1. Cambiar import en 4 archivos
2. Build y verificar navegación

### **Fase 2: Extracción a JSON (30 min)**
1. Extraer contenido de marketplace a es.json
2. Extraer contenido de hubspot a es.json
3. Extraer contenido de observatorio a es.json
4. Organizar en estructura jerárquica

### **Fase 3: Traducción (45 min)**
1. Traducir marketplace a en.json
2. Traducir hubspot a en.json
3. Traducir observatorio a en.json
4. Revisar consistencia de términos

### **Fase 4: Refactorización (60 min)**
1. Refactorizar marketplace/page.tsx
2. Refactorizar hubspot/page.tsx
3. Refactorizar observatorio/page.tsx
4. Build y verificar errores

### **Fase 5: Testing (15 min)**
1. Probar `/es/proyectos/...` (español)
2. Probar `/en/proyectos/...` (inglés)
3. Probar navegación desde FeaturedProjects
4. Verificar todos los links internos

### **Fase 6: Documentación (10 min)**
1. Actualizar AUDIT_LOG.md
2. Eliminar console.log si existen

---

## 📝 CRITERIOS DE ACEPTACIÓN (DoD)

- [ ] FeaturedProjects usa Link de @/navigation
- [ ] `/en` → Click proyecto → `/en/proyectos/...` (mantiene locale)
- [ ] `/es` → Click proyecto → `/es/proyectos/...` (mantiene locale)
- [ ] `/en/proyectos/marketplace` muestra inglés
- [ ] `/en/proyectos/hubspot` muestra inglés
- [ ] `/en/proyectos/observatorio` muestra inglés
- [ ] `/es/proyectos/...` muestra español
- [ ] Todos los links internos mantienen locale
- [ ] Links "Volver a Proyectos" funcionan con locale
- [ ] Links "Ver más Proyectos" funcionan con locale
- [ ] Links "Agenda una Consultoría" funcionan con locale
- [ ] Build sin errores
- [ ] TypeScript sin errores
- [ ] Traducción profesional (tono CTO/Consulting)
- [ ] AUDIT_LOG.md actualizado

---

**Fecha de Diagnóstico:** 2026-01-28  
**Estado:** ⏸️ Listo para implementación  
**Próximo Paso:** Aplicar Fix #1 (Corrección de Links)  
**Prioridad:** 🚨 CRÍTICO - Navegación bilingüe rota
