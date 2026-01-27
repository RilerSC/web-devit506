"use client";

import { motion } from "framer-motion";

export default function CapabilitiesBento() {
  const capabilities = [
    {
      title: "Consultoría C-Suite",
      description: "Servicios de CTO Externo. Gestión de presupuestos de TI, planificación estratégica tecnológica y liderazgo ejecutivo para organizaciones de alto impacto.",
      icon: "🎯",
      size: "large"
    },
    {
      title: "Desarrollo de Software a Medida",
      description: "Soluciones empresariales con Next.js, React, TypeScript y Azure. Arquitectura escalable y código de calidad industrial.",
      icon: "⚙️",
      size: "medium"
    },
    {
      title: "Automatización de Procesos",
      description: "Automatización de flujos de negocio críticos. Reducción de tareas manuales, optimización operativa y eficiencia empresarial.",
      icon: "🔄",
      size: "medium"
    },
    {
      title: "Integración de Ecosistemas",
      description: "Conectores a medida entre ERP, CRM y plataformas de negocio. Sincronización de datos y unificación de sistemas legacy.",
      icon: "🔗",
      size: "small"
    },
    {
      title: "Cloud Infrastructure",
      description: "Infraestructura en Azure. CI/CD pipelines, DevOps, monitoreo y optimización de costos en la nube.",
      icon: "☁️",
      size: "small"
    },
    {
      title: "Planificación Estratégica TI",
      description: "Roadmaps tecnológicos, evaluación de stack, due diligence técnica y definición de arquitectura empresarial.",
      icon: "📋",
      size: "small"
    }
  ];

  return (
    <section id="capabilities" className="py-20 bg-gray-50">
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
            Capacidades Core
          </h2>
          <p className="text-xl text-gray-600">
            Excelencia técnica en todo el stack. Consultoría estratégica combinada con ingeniería de software de primer nivel.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                bg-white rounded-xl p-8 border border-gray-200 
                hover:border-brand-blue hover:shadow-lg transition-all duration-300
                ${capability.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''}
                ${capability.size === 'medium' ? 'md:col-span-1' : ''}
              `}
            >
              <div className="text-4xl mb-4">{capability.icon}</div>
              <h3 className="text-xl font-bold text-brand-black mb-3">
                {capability.title}
              </h3>
              <p className="text-gray-600">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center text-brand-blue font-medium hover:text-brand-blue/80 transition-colors"
          >
            Conversemos sobre tus desafíos técnicos
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
