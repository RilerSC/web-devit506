"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

// Componente de tarjeta KPI de ingeniería
function EngineeringKPI({ 
  value, 
  label, 
  detail,
  delay = 0 
}: { 
  value: string; 
  label: string;
  detail: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
    >
      <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
        {value}
      </div>
      <p className="text-white font-medium mb-1">
        {label}
      </p>
      <p className="text-gray-400 text-sm">
        {detail}
      </p>
    </motion.div>
  );
}

// Componente de módulo del roadmap
function RoadmapModule({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: string; 
  title: string; 
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-blue hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-brand-black mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

// Componente de item de tecnología
function TechStackItem({ 
  category, 
  items, 
  delay = 0 
}: { 
  category: string; 
  items: string[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-900 rounded-xl p-6 border border-gray-700"
    >
      <div className="text-brand-blue font-mono text-sm mb-3">{category}</div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-300">
            <span className="text-gray-600">├─</span>
            <span className="font-mono text-sm">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Componente de feature de fase 1
function Phase1Feature({ 
  title, 
  description, 
  delay = 0 
}: { 
  title: string; 
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-4"
    >
      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-green-600 text-sm">✓</span>
      </div>
      <div>
        <h4 className="font-semibold text-brand-black mb-1">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

export default function CaseStudyObservatorio() {
  const t = useTranslations("projectDetails.observatorio");
  const tc = useTranslations("projectDetails.common");

  const engineeringKPIs = t.raw("hero.kpis") as Array<{value: string; label: string; detail: string}>;
  const phase1Features = t.raw("phase1.items") as Array<{title: string; description: string}>;

  const roadmapModules = [
    {
      icon: "📊",
      title: "Módulo de Indicadores Dinámicos",
      description: "Visualización interactiva de KPIs en tres ejes: Ambiental, Social y Económico con dashboards en tiempo real."
    },
    {
      icon: "📚",
      title: "Biblioteca Digital Especializada",
      description: "Repositorio centralizado con motores de búsqueda avanzada para investigaciones y reportes técnicos."
    },
    {
      icon: "🗺️",
      title: "Centro de Georreferenciación",
      description: "Mapeo territorial de proyectos e iniciativas de impacto sostenible con visualización geoespacial."
    },
    {
      icon: "🔔",
      title: "Sistema de Alertas Tempranas",
      description: "Notificaciones inteligentes sobre cambios críticos en indicadores nacionales y regionales."
    },
    {
      icon: "🤝",
      title: "Red de Transparencia",
      description: "Panel dedicado para la red de aliados y cooperación institucional con métricas de colaboración."
    },
    {
      icon: "🤖",
      title: "Análisis con IA (Azure OpenAI)",
      description: "Endpoints preparados para análisis automatizado de reportes de sostenibilidad usando inteligencia artificial."
    }
  ];

  const techStack = [
    {
      category: "Core Framework",
      items: ["Next.js 15 (App Router)", "React 19 (Server Components)", "TypeScript 5", "Tailwind CSS v4"]
    },
    {
      category: "Infraestructura Actual",
      items: ["Vercel Edge Network", "CDN Global (14+ nodos)", "SSL/TLS 1.3", "CI/CD Automatizado"]
    },
    {
      category: "Preparación Azure (Roadmap)",
      items: ["Azure Cosmos DB (Big Data)", "Azure OpenAI (Análisis IA)", "Azure Blob Storage", "Azure Functions"]
    },
    {
      category: "Optimización & SEO",
      items: ["Server Components (55% menos JS)", "Open Graph + Twitter Cards", "Streaming Progresivo", "WhatsApp Business API"]
    }
  ];

  const impactMetrics = [
    { label: "Lighthouse Score", value: "Alto", icon: "⚡" },
    { label: "SEO Académico", value: "Optimizado", icon: "🔍" },
    { label: "Conversión", value: "WhatsApp/MailSnend Integrado", icon: "💬" },
    { label: "Escalabilidad", value: "Big Data Ready", icon: "📈" }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-black text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/#projects" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {tc("backToProjects")}
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex flex-wrap gap-3"
          >
            <span className="inline-block px-4 py-2 bg-brand-blue/20 text-brand-blue rounded-full text-sm font-medium">
              {t("meta.category")} • {t("meta.year")}
            </span>
            <span className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
              ✓ {tc("completed")} {t("phase1.badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl"
          >
            {t("hero.title")}{" "}
            <span className="text-brand-blue">{t("hero.titleHighlight")}</span>
          </motion.h1>

          {/* Client */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 mb-4"
          >
            {tc("client")}: <span className="text-white">{t("meta.client")}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg text-gray-500 mb-12 max-w-3xl"
          >
            {t("hero.description")}{" "}
            <span className="text-brand-blue font-semibold">{t("hero.descriptionHighlight")}</span>.
          </motion.p>

          {/* Engineering KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engineeringKPIs.map((kpi, index) => (
              <EngineeringKPI
                key={index}
                value={kpi.value}
                label={kpi.label}
                detail={kpi.detail}
                delay={0.4 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("executiveSummary.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-6">
              {t("executiveSummary.title")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t("executiveSummary.paragraph1") }} />
            <p className="text-lg text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t("executiveSummary.paragraph2") }} />
          </motion.div>
        </div>
      </section>

      {/* Phase 1: La Base del Proyecto */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                <span>✓</span> 100% Operativo en Producción
              </div>
              <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide block mb-2">Fase 1: Cimientos</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
                La Base del Proyecto
              </h2>
              <p className="text-gray-600 mb-8">
                La Fase 1 ha establecido una base de ingeniería de alto rendimiento utilizando las tecnologías más modernas del ecosistema React, con un enfoque <strong>Server-First</strong> que maximiza la eficiencia y la experiencia de usuario.
              </p>

              <div className="space-y-6">
                {phase1Features.map((feature, index) => (
                  <Phase1Feature
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Impact Metrics Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-brand-black mb-6">Métricas de Impacto</h3>
              <div className="space-y-4">
                {impactMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{metric.icon}</span>
                      <span className="font-medium text-brand-black">{metric.label}</span>
                    </div>
                    <span className="text-brand-blue font-semibold">{metric.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-brand-blue/5 rounded-lg border border-brand-blue/20">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-brand-blue">Optimización extrema:</span> Reducción de <strong>1,860 KB</strong> del bundle original, logrando tiempos de carga inferiores a 1 segundo.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap de Madurez */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">Visión Integral</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              Roadmap de Madurez Tecnológica
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              El proyecto está diseñado para evolucionar hacia una plataforma de <strong>Big Data y Visualización Avanzada</strong>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapModules.map((module, index) => (
              <RoadmapModule
                key={index}
                icon={module.icon}
                title={module.title}
                description={module.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stack Tecnológico */}
      <section className="py-16 md:py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">Tecnología</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Stack Tecnológico & Escalabilidad
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Construido pensando en el crecimiento exponencial de los datos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {techStack.map((stack, index) => (
              <TechStackItem
                key={index}
                category={stack.category}
                items={stack.items}
                delay={index * 0.15}
              />
            ))}
          </div>

          {/* Azure Ready Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-brand-blue/20 rounded-full">
              <span className="text-2xl">☁️</span>
              <span className="text-brand-blue font-semibold">Arquitectura Azure-Ready para Big Data & IA</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valor DEVIT506 */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">Autoridad Técnica</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-6">
                Valor Diferencial DEVIT506
              </h2>
              <p className="text-gray-600 mb-6">
                DEVIT506 no solo actúa como desarrollador, sino como <strong>arquitecto de una solución integral</strong> que escala desde una web de contenidos (Fase 1) hasta una plataforma de Big Data con capacidades de Inteligencia Artificial.
              </p>

              <div className="space-y-4">
                {[
                  "Arquitectura Server-First con 55% menos JavaScript",
                  "Preparación para Azure Cosmos DB (Big Data)",
                  "Endpoints listos para Azure OpenAI",
                  "Visor de documentos con streaming progresivo",
                  "SEO académico optimizado con Open Graph",
                  "Integración nativa con WhatsApp Business"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-white text-sm">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-brand-blue to-blue-700 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Evolución del Proyecto</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏗️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fase 1: Web de Contenidos</h4>
                    <p className="text-white/80 text-sm">Base sólida con arquitectura Server-First y optimización extrema.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fase 2: Indicadores Dinámicos</h4>
                    <p className="text-white/80 text-sm">Dashboards interactivos con KPIs ambientales, sociales y económicos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fase 3: Big Data & IA</h4>
                    <p className="text-white/80 text-sm">Análisis automatizado con Azure OpenAI y Cosmos DB.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
              ¿Necesitas una plataforma de inteligencia de datos?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Conversemos sobre cómo podemos crear un observatorio o dashboard para tu organización.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-block bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-brand-blue/90 transition-all shadow-lg hover:shadow-xl"
              >
                Agenda una Consultoría
              </Link>
              <Link
                href="/#projects"
                className="inline-block bg-gray-100 text-brand-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-all"
              >
                Ver más Proyectos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
