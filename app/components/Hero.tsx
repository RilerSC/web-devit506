"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative mesh-gradient-hero py-14 md:py-20 overflow-hidden">
      {/* Premium Mesh Gradient Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-[20%] left-[-15%] w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-brand-blue/8 rounded-full blur-[80px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm text-brand-blue px-5 py-2 rounded-full text-sm font-medium mb-5 border border-brand-blue/20 shadow-[0_2px_8px_rgba(0,156,222,0.1)]"
          >
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
            <span className="tracking-wide">Servicios de CTO Externo desde 2012</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[1.1] tracking-tight"
          >
            <span className="text-gradient-metallic">Socios Tecnológicos</span>
            <br />
            <span className="text-gradient-blue">Estratégicos</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Consultoría estratégica y desarrollo de software liderado por un equipo 
            con más de una década de experiencia. <span className="text-gray-800 font-medium">Excelencia técnica con visión de negocio.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="#contact"
              className="group relative bg-brand-blue text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_4px_14px_rgba(0,156,222,0.25)] hover:shadow-[0_6px_20px_rgba(0,156,222,0.35)] hover:-translate-y-0.5"
            >
              <span className="relative z-10">Iniciemos la Conversación</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-blue to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="#capabilities"
              className="group bg-white/70 backdrop-blur-sm text-brand-black border border-gray-200 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-brand-blue/50 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,156,222,0.1)]"
            >
              Ver Capacidades
            </Link>
          </motion.div>

          {/* Social Proof Line */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 text-sm text-gray-500 tracking-wide"
          >
            <p>Socios tecnológicos de empresas líderes en fintech, educación y servicios empresariales</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
