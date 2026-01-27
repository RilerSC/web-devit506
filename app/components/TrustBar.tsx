"use client";

import { motion } from "framer-motion";

export default function TrustBar() {
  const clients = [
    "COOPEBANACIO R.L.",
    "Universidad FUNDEPOS",
    "CODEAS",
    "Sector Financiero",
    "Educación Superior",
    "Tech Empresarial"
  ];

  return (
    <section className="bg-white border-y border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-wide"
        >
          Socios Estratégicos de Confianza
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-center h-12 text-gray-400 hover:text-brand-blue transition-colors"
            >
              <div className="text-center font-medium text-sm">
                {client}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            +50 proyectos exitosos desde 2012
          </p>
        </div>
      </div>
    </section>
  );
}
