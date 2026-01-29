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
      description: "Soluciones empresariales con Next.js, React, TypeScript, Python, Azure, HTML5, etc. Arquitectura escalable y código de calidad industrial.",
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
    <section id="capabilities" className="relative py-24 mesh-gradient-section overflow-hidden">
      {/* Subtle Mesh Gradient Orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-brand-blue/6 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-violet-500/4 rounded-full blur-[120px] -z-10"></div>
      
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
            Capacidades Core
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
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
                y: -6,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              className={`
                group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 
                border border-white/60 shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.6)]
                hover:bg-white hover:shadow-[0_20px_40px_-12px_rgba(0,156,222,0.15),0_0_20px_rgba(0,156,222,0.08)]
                hover:border-brand-blue/30
                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${capability.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''}
                ${capability.size === 'medium' ? 'md:col-span-1' : ''}
              `}
            >
              {/* Gradient border overlay on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,156,222,0.1) 0%, transparent 50%, rgba(139,92,246,0.05) 100%)'
                }}
              />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{capability.icon}</div>
                <h3 className="text-xl font-bold text-brand-black mb-3 tracking-tight">
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
          className="mt-14 text-center"
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
