import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/Logotipo-DEVIT-506-BL.png"
              alt="DEVIT506"
              width={140}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-gray-400 max-w-md">
              Socios tecnológicos estratégicos desde 2012. 
              Servicios de CTO Externo con excelencia técnica 
              y visión de negocio para empresas de alto impacto.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#capabilities" className="hover:text-brand-blue transition-colors duration-200">
                  CTO Externo
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-brand-blue transition-colors duration-200">
                  Desarrollo a Medida
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-brand-blue transition-colors duration-200">
                  Automatización de Procesos
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-brand-blue transition-colors duration-200">
                  Integración de Sistemas
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:jrsolorzano@devit506.com" className="hover:text-brand-blue transition-colors duration-200">
                  jrsolorzano@devit506.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/devit506" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors duration-200">
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="text-gray-500">San José, Costa Rica</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {currentYear} DEVIT506. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-brand-blue transition-colors duration-200 cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-brand-blue transition-colors duration-200 cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
