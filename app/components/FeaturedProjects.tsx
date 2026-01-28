"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturedProjects() {
  const projects = [
    {
      title: "Coopebanacio R.L. — Marketplace Transaccional Cooperativo",
      category: "E-commerce / Fintech",
      description: "Ecosistema digital para 150,000 asociados con arquitectura Zero-Trust y motor geoespacial. Proyectado para generar $500K+ en nuevos ingresos digitales.",
      tags: ["Next.js 14", "Azure", "PostGIS", "Fintech"],
      metrics: "95% Reducción de Fraude | <1.2s Load Time",
      link: "/proyectos/marketplace-coopebanacio"
    },
    {
      title: "Universidad FUNDEPOS — Observatorio de Sostenibilidad",
      category: "Data & Sostenibilidad",
      description: "Plataforma de inteligencia para el monitoreo de indicadores de desarrollo sostenible. Arquitectura server-first optimizada para alta disponibilidad y escalabilidad hacia Big Data.",
      tags: ["Next.js 15", "React 19", "Data Intelligence", "Education"],
      metrics: "55% Menos JS en Cliente | Azure Ready",
      link: "/proyectos/observatorio-sostenibilidad"
    },
    {
      title: "Integración HubSpot — CODEAS ERP",
      category: "Integración de Sistemas",
      description: "Conector a medida entre HubSpot CRM y ERP CODEAS (MS SQL) para optimización del flujo comercial. Sincronización bidireccional de clientes, oportunidades y pipeline.",
      tags: ["Python", "MS SQL", "HubSpot API", "REST API", "ETL"],
      metrics: "Sincronización en tiempo real de 10K+ registros",
      link: "/proyectos/integracion-hubspot-codeas"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
            Nuestros mas recientes casos de Éxito
          </h2>
          <p className="text-xl text-gray-600">
            Impacto real en organizaciones líderes. Complejidad técnica resuelta con claridad estratégica.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-brand-blue hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-brand-blue uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{project.metrics}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-brand-black mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  {project.link ? (
                    <Link 
                      href={project.link}
                      className="text-brand-blue font-medium hover:text-brand-blue/80 transition-colors flex items-center"
                    >
                      Ver Caso
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="text-gray-400 font-medium flex items-center cursor-not-allowed">
                      Próximamente
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿Listo para conversar sobre tus desafíos tecnológicos?
          </p>
          <a
            href="#contact"
            className="inline-block bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-brand-blue/90 transition-all shadow-lg hover:shadow-xl"
          >
            Agenda una Consultoría
          </a>
        </div>
      </div>
    </section>
  );
}
