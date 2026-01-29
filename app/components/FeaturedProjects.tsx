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
      link: "https://www.devit506.net/proyectos/marketplace-coopebanacio"
    },
    {
      title: "Universidad FUNDEPOS — Observatorio de Sostenibilidad",
      category: "Data & Sostenibilidad",
      description: "Plataforma de inteligencia para el monitoreo de indicadores de desarrollo sostenible. Arquitectura server-first optimizada para alta disponibilidad y escalabilidad hacia Big Data.",
      tags: ["Next.js 15", "React 19", "Data Intelligence", "Education"],
      metrics: "55% Menos JS en Cliente | Azure Ready",
      link: "https://www.devit506.net/proyectos/observatorio-sostenibilidad"
    },
    {
      title: "Integración HubSpot — CODEAS ERP",
      category: "Integración de Sistemas",
      description: "Conector a medida entre HubSpot CRM y ERP CODEAS (MS SQL) para optimización del flujo comercial. Sincronización bidireccional de clientes, oportunidades y pipeline.",
      tags: ["Python", "MS SQL", "HubSpot API", "REST API", "ETL"],
      metrics: "Sincronización en tiempo real de 10K+ registros",
      link: "https://www.devit506.net/proyectos/integracion-hubspot-codeas"
    }
  ];

  return (
    <section id="projects" className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4 tracking-tight">
            Nuestros más recientes casos de Éxito
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Impacto real en organizaciones líderes. Complejidad técnica resuelta con claridad estratégica.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              className="group relative bg-gradient-to-br from-gray-50/80 to-white rounded-2xl p-8 
                border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]
                hover:shadow-[0_20px_40px_-12px_rgba(0,156,222,0.12),0_0_0_1px_rgba(0,156,222,0.1)]
                hover:border-brand-blue/20
                transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(0,156,222,0.08) 0%, transparent 70%)'
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider font-mono">
                      {project.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 font-mono">{project.metrics}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-brand-black mb-3 tracking-tight group-hover:text-brand-blue/90 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1.5 bg-white/80 backdrop-blur-sm text-gray-600 text-sm rounded-lg border border-gray-100 font-mono text-xs tracking-wide
                          group-hover:border-brand-blue/20 group-hover:bg-brand-blue/5 transition-all duration-300"
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
                      className="group/link inline-flex items-center text-brand-blue font-medium hover:text-brand-blue/80 transition-all duration-300"
                    >
                      Ver Caso
                      <svg className="ml-2 w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-5">
            ¿Listo para conversar sobre tus desafíos tecnológicos?
          </p>
          <a
            href="#contact"
            className="group relative inline-block bg-brand-blue text-white px-8 py-4 rounded-xl text-lg font-medium 
              shadow-[0_4px_14px_rgba(0,156,222,0.25)] hover:shadow-[0_6px_20px_rgba(0,156,222,0.35)]
              hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            <span className="relative z-10">Agenda una Consultoría</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-blue to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
