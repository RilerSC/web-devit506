"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

// Componente de tarjeta de métrica
function MetricCard({ 
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
      <div className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">
        {value}
      </div>
      <p className="text-gray-300 text-sm md:text-base">
        {label}
      </p>
    </motion.div>
  );
}

// Componente de fase del approach
function PhaseCard({ 
  number, 
  title, 
  description, 
  delay = 0 
}: { 
  number: string; 
  title: string; 
  description: string; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4 md:gap-6"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-brand-black mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

// Componente de tecnología del stack
function TechItem({ 
  name, 
  role, 
  delay = 0 
}: { 
  name: string; 
  role: string; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-brand-blue hover:shadow-lg transition-all duration-300"
    >
      <h4 className="text-lg font-semibold text-brand-black mb-1">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
    </motion.div>
  );
}

export default function CaseStudyHubSpot() {
  const t = useTranslations("projectDetails.hubspot");
  const tc = useTranslations("projectDetails.common");

  const metrics = t.raw("hero.metrics") as Array<{value: string; label: string}>;
  const painPoints = t.raw("challenge.painPoints") as string[];
  const phases = t.raw("phases.items") as Array<{number: string; title: string; description: string}>;
  const techStack = t.raw("techStack.items") as Array<{name: string; role: string}>;
  const highlights = t.raw("highlights.items") as string[];

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
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-brand-blue/20 text-brand-blue rounded-full text-sm font-medium">
              {t("meta.category")} • {t("meta.year")}
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
            className="text-xl text-gray-400 mb-12"
          >
            {tc("client")}: <span className="text-white">{t("meta.client")}</span>
          </motion.p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                value={metric.value}
                label={metric.label}
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
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
              {t("executiveSummary.title")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t("executiveSummary.paragraph1") }} />
            <p className="text-lg text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t("executiveSummary.paragraph2") }} />
          </motion.div>
        </div>
      </section>

      {/* El Problema */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("challenge.badge")}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-6">
                {t("challenge.title")}
              </h2>
              <p className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: t("challenge.description1") }} />
              <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t("challenge.description2") }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-brand-black mb-6">{t("challenge.painPointsTitle")}</h3>
              <ul className="space-y-4">
                {painPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm">✕</span>
                    <span className="text-gray-600 text-sm">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* La Solución */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("solution.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              {t("solution.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("solution.description")}
            </p>
          </motion.div>

          {/* Phases */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {phases.map((phase, index) => (
              <PhaseCard
                key={index}
                number={phase.number}
                title={phase.title}
                description={phase.description}
                delay={index * 0.15}
              />
            ))}
          </div>

          {/* Technical Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-brand-black rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold text-white mb-8">{t("highlights.title")}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-white text-sm">✓</span>
                  <span className="text-gray-300">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stack Tecnológico */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide">{t("techStack.badge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-2 mb-4">
              {t("techStack.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("solution.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {techStack.map((tech, index) => (
              <TechItem
                key={index}
                name={tech.name}
                role={tech.role}
                delay={index * 0.1}
              />
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
              "La integración desarrollada por DEVIT506 transformó nuestra operación comercial. Ahora nuestros ejecutivos visualizan en HubSpot el estado real de cada cliente directamente desde el ERP y el ERP recibe actualizaciones de HubSpot, sin necesidad de consultas manuales. La eliminación de la doble digitación nos ahorró incontables horas y eliminó errores críticos."
            </blockquote>
            <div>
              <p className="text-white font-semibold">Equipo Comercial COOPEBANACIO R.L.</p>
              <p className="text-white/70"></p>
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
