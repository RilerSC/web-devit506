"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

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
  statusLabel,
  items, 
  delay = 0 
}: { 
  phase: string; 
  title: string; 
  status: "completed" | "in_progress" | "planned";
  statusLabel: string;
  items: string[];
  delay?: number;
}) {
  const statusConfig = {
    completed: { bg: "bg-green-500", icon: "✓" },
    in_progress: { bg: "bg-yellow-500", icon: "⏳" },
    planned: { bg: "bg-gray-400", icon: "📅" }
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
          {config.icon} {statusLabel}
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
  const t = useTranslations("projectDetails.marketplace");
  const tc = useTranslations("projectDetails.common");

  // Obtener datos estructurados del JSON
  const kpis = t.raw("hero.kpis") as Array<{value: string; label: string}>;
  const challenges = t.raw("challenge.items") as Array<{icon: string; title: string; description: string}>;
  const painPoints = t.raw("challenge.painPoints") as string[];
  const architectureBlocks = t.raw("architecture.blocks") as Array<{title: string; subtitle: string; items: string[]}>;
  const architectureBenefits = t.raw("architecture.benefits") as Array<{value: string; label: string}>;
  const impactMetrics = t.raw("impact.metrics") as Array<{label: string; year1: string; year3: string}>;
  const roadmapPhases = t.raw("roadmap.phases") as Array<{phase: string; title: string; status: "completed" | "in_progress" | "planned"; statusLabel: string; items: string[]}>;
  const differentiators = t.raw("differentiators.items") as string[];

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

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex flex-wrap gap-3"
          >
            <span className="inline-block px-4 py-2 bg-brand-blue/20 text-brand-blue rounded-full text-sm font-medium">
              {t("meta.category")} • {t("meta.year")}
            </span>
            <span className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
              {t("meta.status")}
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
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("executiveSummary.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-6">
              {t("executiveSummary.title")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t("executiveSummary.paragraph1") }} />
            <p className="text-lg text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t("executiveSummary.paragraph2") }} />
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
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("challenge.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              {t("challenge.title")}
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
                  {challenge.icon}
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
            <h3 className="text-xl font-bold text-red-800 mb-4">{t("challenge.painPointsTitle")}</h3>
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
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("architecture.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              {t("architecture.title")}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("architecture.subtitle")}
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
            {architectureBenefits.map((benefit, index) => (
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
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("impact.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              {t("impact.title")}
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 font-semibold text-brand-black">{t("impact.tableHeaders.0")}</th>
                  <th className="text-center py-4 font-semibold text-gray-500">{t("impact.tableHeaders.1")}</th>
                  <th className="text-center py-4 font-semibold text-brand-blue">{t("impact.tableHeaders.2")}</th>
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
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("roadmap.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              {t("roadmap.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {roadmapPhases.map((phase, index) => (
              <RoadmapPhase
                key={index}
                phase={phase.phase}
                title={phase.title}
                status={phase.status}
                statusLabel={phase.statusLabel}
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
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("differentiators.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              {t("differentiators.title")}
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
              {t("testimonial.quote")}
            </blockquote>
            <div>
              <p className="text-white font-semibold">{t("testimonial.author")}</p>
              <p className="text-white/70">{t("testimonial.company")}</p>
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
              {t("cta.title")}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-block bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-brand-blue/90 transition-all shadow-lg hover:shadow-xl"
              >
                {tc("scheduleConsultation")}
              </Link>
              <Link
                href="/#projects"
                className="inline-block bg-gray-100 text-brand-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-all"
              >
                {tc("viewMoreProjects")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
