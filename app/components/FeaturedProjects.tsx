"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function FeaturedProjects() {
  const t = useTranslations("projects");

  const projects = [
    {
      tags: ["Next.js 14", "Azure", "PostGIS", "Fintech"],
      link: "/proyectos/marketplace-coopebanacio"
    },
    {
      tags: ["Next.js 15", "React 19", "Data Intelligence", "Education"],
      link: "/proyectos/observatorio-sostenibilidad"
    },
    {
      tags: ["Python", "MS SQL", "HubSpot API", "REST API", "ETL"],
      link: "/proyectos/integracion-hubspot-codeas"
    }
  ];

  return (
    <section id="projects" className="relative py-12 md:py-16 bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-3 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("subtitle")}
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
              className="group relative bg-gradient-to-br from-gray-50/80 to-white rounded-2xl p-5 md:p-6 
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
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider font-mono">
                      {t(`items.${index}.category`)}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 font-mono">{t(`items.${index}.metrics`)}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-brand-black mb-2 tracking-tight group-hover:text-brand-blue/90 transition-colors duration-300">
                    {t(`items.${index}.title`)}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 leading-relaxed text-sm md:text-base">
                    {t(`items.${index}.description`)}
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
                      {t("viewCase")}
                      <svg className="ml-2 w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="text-gray-400 font-medium flex items-center cursor-not-allowed">
                      {t("comingSoon")}
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
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-4">
            {t("ctaText")}
          </p>
          <a
            href="#contact"
            className="group relative inline-block bg-brand-blue text-white px-8 py-4 rounded-xl text-lg font-medium 
              shadow-[0_4px_14px_rgba(0,156,222,0.25)] hover:shadow-[0_6px_20px_rgba(0,156,222,0.35)]
              hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            <span className="relative z-10">{t("ctaButton")}</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-blue to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
