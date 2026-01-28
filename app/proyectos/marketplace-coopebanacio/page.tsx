"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Componente de tarjeta KPI
function KPICard({ 
  value, 
  label, 
  delay = 0 
}: { 
  value: string; 
  label: string; 
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
      <p className="text-gray-300 text-sm md:text-base">
        {label}
      </p>
    </motion.div>
  );
}

// Componente de fase del roadmap
function RoadmapPhase({ 
  phase, 
  title, 
  status, 
  items, 
  delay = 0 
}: { 
  phase: string; 
  title: string; 
  status: "completed" | "in_progress" | "planned";
  items: string[];
  delay?: number;
}) {
  const statusConfig = {
    completed: { bg: "bg-green-500", text: "Completado 75%", icon: "✓" },
    in_progress: { bg: "bg-yellow-500", text: "En Progreso", icon: "⏳" },
    planned: { bg: "bg-gray-400", text: "Planificado", icon: "📅" }
  };
  
  const config = statusConfig[status];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-blue hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-brand-blue uppercase tracking-wide">
          {phase}
        </span>
        <span className={`${config.bg} text-white text-xs px-3 py-1 rounded-full font-medium`}>
          {config.icon} {config.text}
        </span>
      </div>
      <h4 className="text-xl font-bold text-brand-black mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
            <span className={`mt-0.5 ${status === "completed" ? "text-green-500" : "text-gray-400"}`}>
              {status === "completed" ? "✓" : "○"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// Componente de bloque de arquitectura
function ArchitectureBlock({ 
  title, 
  subtitle,
  items, 
  delay = 0 
}: { 
  title: string; 
  subtitle: string;
  items: string[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-900 rounded-xl p-6 border border-gray-700"
    >
      <div className="text-brand-blue font-mono text-sm mb-2">{subtitle}</div>
      <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
      <div className="space-y-2 font-mono text-sm">
        {items.map((item, index) => (
          <div key={index} className="text-gray-400 flex items-start gap-2">
            <span className="text-gray-600">├─</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Componente de métrica de impacto
function ImpactMetric({ 
  label, 
  year1, 
  year3, 
  delay = 0 
}: { 
  label: string; 
  year1: string; 
  year3: string;
  delay?: number;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="border-b border-gray-200"
    >
      <td className="py-4 font-medium text-brand-black">{label}</td>
      <td className="py-4 text-center text-gray-600">{year1}</td>
      <td className="py-4 text-center font-semibold text-brand-blue">{year3}</td>
    </motion.tr>
  );
}

export default function CaseStudyMarketplace() {
  const kpis = [
    { value: "7,500+", label: "Asociados Potenciales" },
    { value: "Zero-Trust", label: "Seguridad / Ley 8968" },
    { value: "<1.2s", label: "Tiempo de Carga (Edge)" },
  ];

  const challenges = [
    {
      title: "Ausencia de Canales Digitales",
      description: "Modelo de negocio tradicional limitado a productos financieros clásicos. Oportunidad inexplotada con base de asociados de alto poder adquisitivo sin plataforma de comercio interno."
    },
    {
      title: "Desconexión en la Economía Social",
      description: "Asociados con negocios propios carecían de vitrina digital institucional. Falta de confianza en plataformas públicas como Facebook Marketplace."
    },
    {
      title: "Cumplimiento Normativo",
      description: "Necesidad de arquitectura Zero-Trust compatible con Ley 8968 (Protección de Datos). Validación MFA2 y trazabilidad completa de transacciones."
    }
  ];

  const painPoints = [
    "Fuga de valor: Asociados usando plataformas externas",
    "Pérdida de datos: Sin captura de comportamiento comercial de asociados",
    "Brecha digital: Asociados mayores de 45 años sin acceso a e-commerce seguro"
  ];

  const architectureBlocks = [
    {
      title: "Frontend Distribuido Globalmente",
      subtitle: "Vercel Edge Network (14+ nodos CDN)",
      items: ["Next.js 14 App Router (React 18)", "Progressive Web App (PWA)", "Tailwind CSS v4", "Tiempo de carga: <1.2s (P95)"]
    },
    {
      title: "Backend Seguro en Azure Cloud",
      subtitle: "Azure Enterprise (East US)",
      items: ["PostgreSQL 14 + PostGIS (geoespacial)", "Azure Blob Storage (imágenes)", "Redis Cache (rate limiting)", "SSL/TLS 1.3 certificado"]
    },
    {
      title: "Autenticación Multi-Factor",
      subtitle: "NextAuth.js v5 + Custom OTP",
      items: ["Google Identity Platform", "Meta OAuth (Facebook + Instagram)", "OTP 6 dígitos (SHA-256)", "Verificación Zero-Trust"]
    },
    {
      title: "Motor Geoespacial PostGIS",
      subtitle: "Búsqueda por Proximidad",
      items: ["Índice GIST (consultas <50ms)", "Radio configurable (1-50 km)", "Tabla Maestra ubicaciones CR", "Leaflet + OpenStreetMap"]
    }
  ];

  const roadmapPhases = [
    {
      phase: "Fase 1",
      title: "Marketplace Transaccional",
      status: "completed" as const,
      items: [
        "Autenticación OAuth (Google, Facebook, Instagram)",
        "OTP 2FA para elevación a vendedor",
        "CRUD de listings con 10 imágenes optimizadas",
        "Motor de búsqueda geoespacial PostGIS",
        "Chat interno con notificaciones",
        "Panel de moderación Zero-Trust",
        "Sistema de auditoría completo"
      ]
    },
    {
      phase: "Fase 2",
      title: "Pagos Integrados",
      status: "in_progress" as const,
      items: [
        "Integración con Sinpe Móvil",
        "Procesamiento de tarjetas (PCI-DSS)",
        "Wallet cooperativo con saldo interno",
        "Sistema de comisiones automatizado",
        "Facturación electrónica (Hacienda CR)"
      ]
    },
    {
      phase: "Fase 3",
      title: "Inteligencia de Negocio",
      status: "planned" as const,
      items: [
        "Dashboard analytics para vendedores",
        "Recomendaciones por geolocalización",
        "Sistema de reputación y ratings",
        "Notificaciones push (PWA)",
        "Exportación de reportes financieros"
      ]
    }
  ];

  const impactMetrics = [
    { label: "Asociados Activos", year1: "4,300 vendedores", year3: "15,000+ vendedores" },
    { label: "Transacciones/mes", year1: "6,000", year3: "50,000+" },
    { label: "Ingresos Anuales", year1: "$0,00", year3: "$15K - $25K" },
    { label: "ROI sobre inversión", year1: "0%", year3: "450%+" }
  ];

  const differentiators = [
    "Arquitectura híbrida: Vercel Edge (velocidad) + Azure (seguridad)",
    "Zero-Trust con validación institucional en tiempo real",
    "PostGIS geoespacial vs soluciones propietarias ($36K/año ahorro)",
    "Preparado para pagos integrados (6 meses de ventaja)",
    "PWA instalable sin costo de tiendas de apps ($5K/año)",
    "Cumplimiento Ley 8968 desde diseño (evita multas hasta $50K)"
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
              Volver a Proyectos
            </Link>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex flex-wrap gap-3"
          >
            <span className="inline-block px-4 py-2 bg-brand-blue/20 text-brand-blue rounded-full text-sm font-medium">
              E-commerce / Fintech • 2026
            </span>
            <span className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
              🚧 75% Completado
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl"
          >
            Plataforma Transaccional de{" "}
            <span className="text-brand-blue">Economía Social</span>
          </motion.h1>

          {/* Client */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 mb-4"
          >
            Cliente: <span className="text-white">Coopebanacio R.L.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg text-gray-500 mb-12 max-w-3xl"
          >
            Ecosistema digital para 4,300+ asociados con arquitectura Zero-Trust y motor geoespacial. 
            Proyectado para generar <span className="text-brand-blue font-semibold">nuevos ingresos digitales</span>.
          </motion.p>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpis.map((kpi, index) => (
              <KPICard
                key={index}
                value={kpi.value}
                label={kpi.label}
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
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">Proyecto Buque Insignia</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-6">
              Resumen Ejecutivo
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              La <strong>Plataforma de Comercio Transaccional Cooperativo</strong> representa una solución de clase empresarial diseñada para habilitar un ecosistema digital de intercambio comercial entre más de <span className="text-brand-blue font-semibold">4,300 asociados activos</span> de Coopebanacio R.L.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Este proyecto combina <strong>arquitectura híbrida de alto rendimiento</strong> (Vercel Edge Network + Azure Cloud) con seguridad de nivel bancario, estableciendo las bases para una nueva línea de ingresos digitales <span className="text-brand-blue font-semibold"></span> una vez alcanzada la madurez operativa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* El Reto Estratégico */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">El Reto Estratégico</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              Desafíos de Transformación Digital
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl mb-4">
                  {index === 0 ? "💼" : index === 1 ? "🤝" : "🔐"}
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{challenge.title}</h3>
                <p className="text-gray-600 text-sm">{challenge.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Pain Points Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-red-50 border border-red-200 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-red-800 mb-4">Impacto Económico Sin Solución</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-red-500">⚠️</span>
                  <span className="text-red-700 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Arquitectura Híbrida */}
      <section className="py-16 md:py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">La Solución</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Arquitectura Híbrida de Alto Rendimiento
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Combinación óptima de Vercel Edge (velocidad) + Azure Enterprise (seguridad)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {architectureBlocks.map((block, index) => (
              <ArchitectureBlock
                key={index}
                title={block.title}
                subtitle={block.subtitle}
                items={block.items}
                delay={index * 0.15}
              />
            ))}
          </div>

          {/* Benefits Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid md:grid-cols-4 gap-4"
          >
            {[
              { value: "60%", label: "Menos abandono por carga" },
              { value: "95%", label: "Reducción de fraude" },
              { value: "40%", label: "Más conversión local" },
              { value: "70%", label: "Reducción ancho banda" }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-brand-blue">{benefit.value}</div>
                <div className="text-sm text-gray-400">{benefit.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impacto Empresarial */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">Impacto Empresarial</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              Nueva Línea de Ingresos Digitales
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 font-semibold text-brand-black">Métrica</th>
                  <th className="text-center py-4 font-semibold text-gray-500">Año 1</th>
                  <th className="text-center py-4 font-semibold text-brand-blue">Año 3 (Escala)</th>
                </tr>
              </thead>
              <tbody>
                {impactMetrics.map((metric, index) => (
                  <ImpactMetric
                    key={index}
                    label={metric.label}
                    year1={metric.year1}
                    year3={metric.year3}
                    delay={index * 0.1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">Roadmap de Innovación</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              Fases del Proyecto
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {roadmapPhases.map((phase, index) => (
              <RoadmapPhase
                key={index}
                phase={phase.phase}
                title={phase.title}
                status={phase.status}
                items={phase.items}
                delay={index * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciadores */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">Valor Diferencial</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              Expertise DEVIT506 Aplicado
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-white text-sm">✓</span>
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-20 bg-brand-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <svg className="w-12 h-12 mx-auto text-white/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl md:text-2xl text-white font-medium mb-8 leading-relaxed">
              "La plataforma no solo cumplió con nuestros requerimientos de seguridad bancaria, sino que estableció las bases para convertirse en el hub digital de toda nuestra comunidad de asociados. La arquitectura híbrida nos dio velocidad sin comprometer la seguridad."
            </blockquote>
            <div>
              <p className="text-white font-semibold">Dirección de Tecnología</p>
              <p className="text-white/70">Coopebanacio R.L.</p>
            </div>
          </motion.div>
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
              ¿Necesitas una plataforma transaccional similar?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Conversemos sobre cómo podemos crear un ecosistema digital para tu organización.
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
