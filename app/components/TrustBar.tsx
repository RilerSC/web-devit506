"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

// Componente de contador animado
function AnimatedCounter({ 
  value, 
  suffix = "", 
  decimals = 0 
}: { 
  value: number; 
  suffix?: string; 
  decimals?: number;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 25,
    stiffness: 50,
  });
  const display = useTransform(spring, (current) => {
    return current.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    // Animar de 0 a value en 2 segundos
    const startTime = Date.now();
    const duration = 2000; // 2 segundos
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing easeOut
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = value * eased;
      
      motionValue.set(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        motionValue.set(value);
      }
    };
    
    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [motionValue, value]);

  return <motion.span>{display}</motion.span>;
}

// Componente de KPI individual
function KPICard({ 
  value, 
  suffix, 
  label, 
  decimals = 0,
  delay = 0 
}: { 
  value: number; 
  suffix?: string; 
  label: string; 
  decimals?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1" style={{ color: "#009CDE" }}>
        <AnimatedCounter value={value} suffix={suffix} decimals={decimals} />
      </div>
      <p className="text-sm md:text-base text-gray-500 text-center font-medium">
        {label}
      </p>
    </motion.div>
  );
}

// Componente de logo de cliente
function ClientLogo({ 
  src, 
  alt, 
  delay = 0 
}: { 
  src: string; 
  alt: string; 
  delay?: number;
}) {
  // Detectar si es el logo de Coopebanacio para aplicar escala mayor
  const isCoopebanacio = src.includes("Coopebanacio");
  const baseScale = isCoopebanacio ? 2.0 : 1.0;  // Coopebanacio 2x más grande
  const hoverScale = isCoopebanacio ? 2.3 : 1.25;  // Mantener el efecto hover proporcional
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center justify-center p-4 md:p-5 h-24 md:h-28 lg:h-32"
    >
      <motion.div
        className="relative w-full h-full opacity-80"
        initial={{ scale: baseScale }}
        animate={{ scale: baseScale }}
        whileHover={{ 
          scale: hoverScale,
          opacity: 1
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </motion.div>
    </motion.div>
  );
}

export default function TrustBar() {
  const kpis = [
    {
      value: 50,
      suffix: "+",
      label: "Proyectos Exitosos",
      decimals: 0,
      delay: 0,
    },
    {
      value: 30,
      suffix: "+",
      label: "Clientes Satisfechos",
      decimals: 0,
      delay: 0.1,
    },
    {
      value: 12,
      suffix: "+",
      label: "Años de Trayectoria",
      decimals: 0,
      delay: 0.2,
    },
    {
      value: 99.9,
      suffix: "%",
      label: "Uptime en Soluciones",
      decimals: 1,
      delay: 0.3,
    },
  ];

  const clients = [
    { src: "/clientes/Coopebanacio.png", alt: "COOPEBANACIO R.L." },
    { src: "/clientes/Universidad FUNDEPOS.png", alt: "Universidad FUNDEPOS" },
    { src: "/clientes/CENECOOP.png", alt: "CENECOOP" },
    { src: "/clientes/COOPECOBANA.png", alt: "COOPECOBANA" },
    { src: "/clientes/Observatorio de Sostenibilidad.svg", alt: "Observatorio de Sostenibilidad" },
    { src: "/clientes/Creativehut.png", alt: "Creativehut" },
    { src: "/clientes/Guanaco.png", alt: "Guanaco" },
    { src: "/clientes/Rey Velaz.jpeg", alt: "Rey Velaz" },
    { src: "/clientes/Pasitos de Bebe.jpeg", alt: "Pasitos de Bebe" },
  ];

  return (
    <section className="bg-white border-y border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sección de KPIs Animados */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-base md:text-lg font-semibold text-gray-800 mb-5"
          >
            Nuestra Trayectoria en Números
          </motion.h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {kpis.map((kpi, index) => (
              <KPICard
                key={index}
                value={kpi.value}
                suffix={kpi.suffix}
                label={kpi.label}
                decimals={kpi.decimals}
                delay={kpi.delay}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-xs md:text-sm text-gray-400 mt-4"
          >
            Experiencia desde 2012 • Soluciones robustas y confiables
          </motion.p>
        </div>

        {/* Sección de Logos de Clientes */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-base md:text-lg font-semibold text-gray-800 mb-5"
          >
            Ellos confían en nosotros
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {clients.map((client, index) => (
              <ClientLogo
                key={index}
                src={client.src}
                alt={client.alt}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
