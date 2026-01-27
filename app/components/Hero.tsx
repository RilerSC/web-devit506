"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
            <span>Servicios de CTO Externo desde 2012</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-black mb-6 leading-tight"
          >
            Socios Tecnológicos
            <br />
            <span className="text-brand-blue">Estratégicos</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            Consultoría estratégica y desarrollo de software liderado por un ingeniero 
            con más de una década de experiencia. Excelencia técnica con visión de negocio.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="#contact"
              className="bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-brand-blue/90 transition-all shadow-lg hover:shadow-xl"
            >
              Iniciemos la Conversación
            </Link>
            <Link
              href="#capabilities"
              className="bg-white text-brand-black border-2 border-gray-300 px-8 py-4 rounded-lg text-lg font-medium hover:border-brand-blue hover:text-brand-blue transition-all"
            >
              Ver Capacidades
            </Link>
          </motion.div>

          {/* Social Proof Line */}
          <div className="mt-12 text-sm text-gray-500">
            <p>Socios tecnológicos de empresas líderes en fintech, educación y servicios empresariales</p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-black/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
