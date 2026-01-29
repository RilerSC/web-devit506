"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function Footer() {
  const t = useTranslations("footer");
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
              {t("tagline")}
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("services.title")}</h3>
            <ul className="space-y-2 text-sm">
              {["items.0", "items.1", "items.2", "items.3"].map((key, index) => (
                <li key={index}>
                  <Link href="/#capabilities" className="hover:text-brand-blue transition-colors duration-200">
                    {t(`services.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("contact.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:jrsolorzano@devit506.com" className="hover:text-brand-blue transition-colors duration-200">
                  jrsolorzano@devit506.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/devit506" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors duration-200">
                  {t("contact.linkedin")}
                </a>
              </li>
              <li>
                <span className="text-gray-500">{t("contact.location")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>{t("legal.copyright", { year: currentYear })}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-brand-blue transition-colors duration-200 cursor-pointer">
                {t("legal.privacy")}
              </span>
              <span className="hover:text-brand-blue transition-colors duration-200 cursor-pointer">
                {t("legal.terms")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
