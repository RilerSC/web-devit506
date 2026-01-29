"use client";

import { motion } from "framer-motion";

export default function CapabilitiesBento() {
  const capabilities = [
    {
      title: "Consultoría C-Suite",
      description: "Servicios de CTO Externo. Gestión de presupuestos de TI, planificación estratégica tecnológica y liderazgo ejecutivo para organizaciones de alto impacto.",
      icon: "🎯",
      size: "large",
      accent: "from-brand-blue to-cyan-400"
    },
    {
      title: "Desarrollo de Software a Medida",
      description: "Soluciones empresariales con Next.js, React, TypeScript, Python, Azure, HTML5, etc. Arquitectura escalable y código de calidad industrial.",
      icon: "⚙️",
      size: "medium",
      accent: "from-violet-500 to-purple-400"
    },
    {
      title: "Automatización de Procesos",
      description: "Automatización de flujos de negocio críticos. Reducción de tareas manuales, optimización operativa y eficiencia empresarial.",
      icon: "🔄",
      size: "medium",
      accent: "from-emerald-500 to-teal-400"
    },
    {
      title: "Integración de Ecosistemas",
      description: "Conectores a medida entre ERP, CRM y plataformas de negocio. Sincronización de datos y unificación de sistemas legacy.",
      icon: "🔗",
      size: "small",
      accent: "from-orange-500 to-amber-400"
    },
    {
      title: "Cloud Infrastructure",
      description: "Infraestructura en Azure. CI/CD pipelines, DevOps, monitoreo y optimización de costos en la nube.",
      icon: "☁️",
      size: "small",
      accent: "from-sky-500 to-blue-400"
    },
    {
      title: "Planificación Estratégica TI",
      description: "Roadmaps tecnológicos, evaluación de stack, due diligence técnica y definición de arquitectura empresarial.",
      icon: "📋",
      size: "small",
      accent: "from-rose-500 to-pink-400"
    }
  ];

  return (
    <section id="capabilities" className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Mesh Gradient Orbs - más visibles */}
      <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-[40%] right-[-15%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[140px] -z-10"></div>
      <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="inline-block px-3 py-1 mb-3 text-sm font-semibold text-brand-blue bg-brand-blue/10 rounded-full">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-3 tracking-tight">
            Capacidades Core
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Excelencia técnica en todo el stack. Consultoría estratégica combinada con ingeniería de software de primer nivel.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              className={`
                group relative bg-white rounded-2xl p-5 md:p-6 
                border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]
                hover:shadow-[0_20px_50px_-12px_rgba(0,156,222,0.25)]
                hover:border-brand-blue/40
                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                overflow-hidden
                ${capability.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''}
                ${capability.size === 'medium' ? 'md:col-span-1' : ''}
              `}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${capability.accent} opacity-80 group-hover:opacity-100 transition-opacity`} />
              
              {/* Gradient glow on hover */}
              <div 
                className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${capability.accent} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-500`}
              />
              
              <div className="relative z-10">
                {/* Icon with colored background */}
                <div className={`inline-flex items-center justify-center w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${capability.accent} bg-opacity-10 shadow-sm`}>
                  <span className="text-2xl filter drop-shadow-sm">{capability.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-black mb-2 tracking-tight group-hover:text-brand-blue transition-colors duration-300">
                  {capability.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center text-brand-blue font-medium hover:text-brand-blue/80 transition-all duration-300"
          >
            Conversemos sobre tus desafíos técnicos
            <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
