"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cerrar menu al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Prevenir scroll cuando el menu está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Logotipo-DEVIT-506-NG.png"
              alt="DEVIT506"
              width={140}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#capabilities" 
              className="text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors duration-200"
            >
              Capacidades
            </a>
            <a 
              href="#projects" 
              className="text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors duration-200"
            >
              Casos de Éxito
            </a>
            <a 
              href="#contact" 
              className="text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors duration-200"
            >
              Contacto
            </a>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="bg-brand-blue text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-brand-blue/90 transition-colors duration-200"
            >
              Hablemos
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-brand-blue hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-brand-black z-50 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <Image
              src="/Logotipo-DEVIT-506-BL.png"
              alt="DEVIT506"
              width={120}
              height={35}
              className="h-7 w-auto"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-white hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8 space-y-1">
            <a
              href="#capabilities"
              onClick={handleLinkClick}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 font-medium"
            >
              Capacidades
            </a>
            <a
              href="#projects"
              onClick={handleLinkClick}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 font-medium"
            >
              Casos de Éxito
            </a>
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 font-medium"
            >
              Contacto
            </a>
          </nav>

          {/* Footer CTA */}
          <div className="p-6 border-t border-gray-700">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="block w-full bg-brand-blue text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-brand-blue/90 transition-colors duration-200"
            >
              Hablemos
            </a>
            <p className="mt-4 text-xs text-gray-500 text-center">
              info@devit506.com
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
