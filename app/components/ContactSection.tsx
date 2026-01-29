"use client";

import { useState } from "react";

// Lista completa de países del mundo con bandera y código de área (ordenados alfabéticamente)
const countries = [
  // Costa Rica primero (predeterminado)
  { code: "CR", name: "Costa Rica", flag: "🇨🇷", dialCode: "+506" },
  // Resto del mundo en orden alfabético
  { code: "AF", name: "Afganistán", flag: "🇦🇫", dialCode: "+93" },
  { code: "AL", name: "Albania", flag: "🇦🇱", dialCode: "+355" },
  { code: "DE", name: "Alemania", flag: "🇩🇪", dialCode: "+49" },
  { code: "AD", name: "Andorra", flag: "🇦🇩", dialCode: "+376" },
  { code: "AO", name: "Angola", flag: "🇦🇴", dialCode: "+244" },
  { code: "AG", name: "Antigua y Barbuda", flag: "🇦🇬", dialCode: "+1268" },
  { code: "SA", name: "Arabia Saudita", flag: "🇸🇦", dialCode: "+966" },
  { code: "DZ", name: "Argelia", flag: "🇩🇿", dialCode: "+213" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", dialCode: "+54" },
  { code: "AM", name: "Armenia", flag: "🇦🇲", dialCode: "+374" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "AT", name: "Austria", flag: "🇦🇹", dialCode: "+43" },
  { code: "AZ", name: "Azerbaiyán", flag: "🇦🇿", dialCode: "+994" },
  { code: "BS", name: "Bahamas", flag: "🇧🇸", dialCode: "+1242" },
  { code: "BD", name: "Bangladés", flag: "🇧🇩", dialCode: "+880" },
  { code: "BB", name: "Barbados", flag: "🇧🇧", dialCode: "+1246" },
  { code: "BH", name: "Baréin", flag: "🇧🇭", dialCode: "+973" },
  { code: "BE", name: "Bélgica", flag: "🇧🇪", dialCode: "+32" },
  { code: "BZ", name: "Belice", flag: "🇧🇿", dialCode: "+501" },
  { code: "BJ", name: "Benín", flag: "🇧🇯", dialCode: "+229" },
  { code: "BY", name: "Bielorrusia", flag: "🇧🇾", dialCode: "+375" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴", dialCode: "+591" },
  { code: "BA", name: "Bosnia y Herzegovina", flag: "🇧🇦", dialCode: "+387" },
  { code: "BW", name: "Botsuana", flag: "🇧🇼", dialCode: "+267" },
  { code: "BR", name: "Brasil", flag: "🇧🇷", dialCode: "+55" },
  { code: "BN", name: "Brunéi", flag: "🇧🇳", dialCode: "+673" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬", dialCode: "+359" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫", dialCode: "+226" },
  { code: "BI", name: "Burundi", flag: "🇧🇮", dialCode: "+257" },
  { code: "BT", name: "Bután", flag: "🇧🇹", dialCode: "+975" },
  { code: "CV", name: "Cabo Verde", flag: "🇨🇻", dialCode: "+238" },
  { code: "KH", name: "Camboya", flag: "🇰🇭", dialCode: "+855" },
  { code: "CM", name: "Camerún", flag: "🇨🇲", dialCode: "+237" },
  { code: "CA", name: "Canadá", flag: "🇨🇦", dialCode: "+1" },
  { code: "QA", name: "Catar", flag: "🇶🇦", dialCode: "+974" },
  { code: "TD", name: "Chad", flag: "🇹🇩", dialCode: "+235" },
  { code: "CL", name: "Chile", flag: "🇨🇱", dialCode: "+56" },
  { code: "CN", name: "China", flag: "🇨🇳", dialCode: "+86" },
  { code: "CY", name: "Chipre", flag: "🇨🇾", dialCode: "+357" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", dialCode: "+57" },
  { code: "KM", name: "Comoras", flag: "🇰🇲", dialCode: "+269" },
  { code: "KP", name: "Corea del Norte", flag: "🇰🇵", dialCode: "+850" },
  { code: "KR", name: "Corea del Sur", flag: "🇰🇷", dialCode: "+82" },
  { code: "CI", name: "Costa de Marfil", flag: "🇨🇮", dialCode: "+225" },
  { code: "HR", name: "Croacia", flag: "🇭🇷", dialCode: "+385" },
  { code: "CU", name: "Cuba", flag: "🇨🇺", dialCode: "+53" },
  { code: "DK", name: "Dinamarca", flag: "🇩🇰", dialCode: "+45" },
  { code: "DM", name: "Dominica", flag: "🇩🇲", dialCode: "+1767" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨", dialCode: "+593" },
  { code: "EG", name: "Egipto", flag: "🇪🇬", dialCode: "+20" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻", dialCode: "+503" },
  { code: "AE", name: "Emiratos Árabes Unidos", flag: "🇦🇪", dialCode: "+971" },
  { code: "ER", name: "Eritrea", flag: "🇪🇷", dialCode: "+291" },
  { code: "SK", name: "Eslovaquia", flag: "🇸🇰", dialCode: "+421" },
  { code: "SI", name: "Eslovenia", flag: "🇸🇮", dialCode: "+386" },
  { code: "ES", name: "España", flag: "🇪🇸", dialCode: "+34" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸", dialCode: "+1" },
  { code: "EE", name: "Estonia", flag: "🇪🇪", dialCode: "+372" },
  { code: "SZ", name: "Esuatini", flag: "🇸🇿", dialCode: "+268" },
  { code: "ET", name: "Etiopía", flag: "🇪🇹", dialCode: "+251" },
  { code: "PH", name: "Filipinas", flag: "🇵🇭", dialCode: "+63" },
  { code: "FI", name: "Finlandia", flag: "🇫🇮", dialCode: "+358" },
  { code: "FJ", name: "Fiyi", flag: "🇫🇯", dialCode: "+679" },
  { code: "FR", name: "Francia", flag: "🇫🇷", dialCode: "+33" },
  { code: "GA", name: "Gabón", flag: "🇬🇦", dialCode: "+241" },
  { code: "GM", name: "Gambia", flag: "🇬🇲", dialCode: "+220" },
  { code: "GE", name: "Georgia", flag: "🇬🇪", dialCode: "+995" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", dialCode: "+233" },
  { code: "GD", name: "Granada", flag: "🇬🇩", dialCode: "+1473" },
  { code: "GR", name: "Grecia", flag: "🇬🇷", dialCode: "+30" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹", dialCode: "+502" },
  { code: "GN", name: "Guinea", flag: "🇬🇳", dialCode: "+224" },
  { code: "GQ", name: "Guinea Ecuatorial", flag: "🇬🇶", dialCode: "+240" },
  { code: "GW", name: "Guinea-Bisáu", flag: "🇬🇼", dialCode: "+245" },
  { code: "GY", name: "Guyana", flag: "🇬🇾", dialCode: "+592" },
  { code: "HT", name: "Haití", flag: "🇭🇹", dialCode: "+509" },
  { code: "HN", name: "Honduras", flag: "🇭🇳", dialCode: "+504" },
  { code: "HU", name: "Hungría", flag: "🇭🇺", dialCode: "+36" },
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", dialCode: "+62" },
  { code: "IQ", name: "Irak", flag: "🇮🇶", dialCode: "+964" },
  { code: "IR", name: "Irán", flag: "🇮🇷", dialCode: "+98" },
  { code: "IE", name: "Irlanda", flag: "🇮🇪", dialCode: "+353" },
  { code: "IS", name: "Islandia", flag: "🇮🇸", dialCode: "+354" },
  { code: "IL", name: "Israel", flag: "🇮🇱", dialCode: "+972" },
  { code: "IT", name: "Italia", flag: "🇮🇹", dialCode: "+39" },
  { code: "JM", name: "Jamaica", flag: "🇯🇲", dialCode: "+1876" },
  { code: "JP", name: "Japón", flag: "🇯🇵", dialCode: "+81" },
  { code: "JO", name: "Jordania", flag: "🇯🇴", dialCode: "+962" },
  { code: "KZ", name: "Kazajistán", flag: "🇰🇿", dialCode: "+7" },
  { code: "KE", name: "Kenia", flag: "🇰🇪", dialCode: "+254" },
  { code: "KG", name: "Kirguistán", flag: "🇰🇬", dialCode: "+996" },
  { code: "KI", name: "Kiribati", flag: "🇰🇮", dialCode: "+686" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼", dialCode: "+965" },
  { code: "LA", name: "Laos", flag: "🇱🇦", dialCode: "+856" },
  { code: "LS", name: "Lesoto", flag: "🇱🇸", dialCode: "+266" },
  { code: "LV", name: "Letonia", flag: "🇱🇻", dialCode: "+371" },
  { code: "LB", name: "Líbano", flag: "🇱🇧", dialCode: "+961" },
  { code: "LR", name: "Liberia", flag: "🇱🇷", dialCode: "+231" },
  { code: "LY", name: "Libia", flag: "🇱🇾", dialCode: "+218" },
  { code: "LI", name: "Liechtenstein", flag: "🇱🇮", dialCode: "+423" },
  { code: "LT", name: "Lituania", flag: "🇱🇹", dialCode: "+370" },
  { code: "LU", name: "Luxemburgo", flag: "🇱🇺", dialCode: "+352" },
  { code: "MK", name: "Macedonia del Norte", flag: "🇲🇰", dialCode: "+389" },
  { code: "MG", name: "Madagascar", flag: "🇲🇬", dialCode: "+261" },
  { code: "MY", name: "Malasia", flag: "🇲🇾", dialCode: "+60" },
  { code: "MW", name: "Malaui", flag: "🇲🇼", dialCode: "+265" },
  { code: "MV", name: "Maldivas", flag: "🇲🇻", dialCode: "+960" },
  { code: "ML", name: "Malí", flag: "🇲🇱", dialCode: "+223" },
  { code: "MT", name: "Malta", flag: "🇲🇹", dialCode: "+356" },
  { code: "MA", name: "Marruecos", flag: "🇲🇦", dialCode: "+212" },
  { code: "MU", name: "Mauricio", flag: "🇲🇺", dialCode: "+230" },
  { code: "MR", name: "Mauritania", flag: "🇲🇷", dialCode: "+222" },
  { code: "MX", name: "México", flag: "🇲🇽", dialCode: "+52" },
  { code: "FM", name: "Micronesia", flag: "🇫🇲", dialCode: "+691" },
  { code: "MD", name: "Moldavia", flag: "🇲🇩", dialCode: "+373" },
  { code: "MC", name: "Mónaco", flag: "🇲🇨", dialCode: "+377" },
  { code: "MN", name: "Mongolia", flag: "🇲🇳", dialCode: "+976" },
  { code: "ME", name: "Montenegro", flag: "🇲🇪", dialCode: "+382" },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿", dialCode: "+258" },
  { code: "MM", name: "Myanmar", flag: "🇲🇲", dialCode: "+95" },
  { code: "NA", name: "Namibia", flag: "🇳🇦", dialCode: "+264" },
  { code: "NR", name: "Nauru", flag: "🇳🇷", dialCode: "+674" },
  { code: "NP", name: "Nepal", flag: "🇳🇵", dialCode: "+977" },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮", dialCode: "+505" },
  { code: "NE", name: "Níger", flag: "🇳🇪", dialCode: "+227" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", dialCode: "+234" },
  { code: "NO", name: "Noruega", flag: "🇳🇴", dialCode: "+47" },
  { code: "NZ", name: "Nueva Zelanda", flag: "🇳🇿", dialCode: "+64" },
  { code: "OM", name: "Omán", flag: "🇴🇲", dialCode: "+968" },
  { code: "NL", name: "Países Bajos", flag: "🇳🇱", dialCode: "+31" },
  { code: "PK", name: "Pakistán", flag: "🇵🇰", dialCode: "+92" },
  { code: "PW", name: "Palaos", flag: "🇵🇼", dialCode: "+680" },
  { code: "PA", name: "Panamá", flag: "🇵🇦", dialCode: "+507" },
  { code: "PG", name: "Papúa Nueva Guinea", flag: "🇵🇬", dialCode: "+675" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾", dialCode: "+595" },
  { code: "PE", name: "Perú", flag: "🇵🇪", dialCode: "+51" },
  { code: "PL", name: "Polonia", flag: "🇵🇱", dialCode: "+48" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", dialCode: "+351" },
  { code: "PR", name: "Puerto Rico", flag: "🇵🇷", dialCode: "+1787" },
  { code: "GB", name: "Reino Unido", flag: "🇬🇧", dialCode: "+44" },
  { code: "CF", name: "Rep. Centroafricana", flag: "🇨🇫", dialCode: "+236" },
  { code: "CZ", name: "Rep. Checa", flag: "🇨🇿", dialCode: "+420" },
  { code: "CG", name: "Rep. del Congo", flag: "🇨🇬", dialCode: "+242" },
  { code: "CD", name: "Rep. Dem. del Congo", flag: "🇨🇩", dialCode: "+243" },
  { code: "DO", name: "Rep. Dominicana", flag: "🇩🇴", dialCode: "+1809" },
  { code: "RW", name: "Ruanda", flag: "🇷🇼", dialCode: "+250" },
  { code: "RO", name: "Rumania", flag: "🇷🇴", dialCode: "+40" },
  { code: "RU", name: "Rusia", flag: "🇷🇺", dialCode: "+7" },
  { code: "WS", name: "Samoa", flag: "🇼🇸", dialCode: "+685" },
  { code: "KN", name: "San Cristóbal y Nieves", flag: "🇰🇳", dialCode: "+1869" },
  { code: "SM", name: "San Marino", flag: "🇸🇲", dialCode: "+378" },
  { code: "VC", name: "San Vicente y Granadinas", flag: "🇻🇨", dialCode: "+1784" },
  { code: "LC", name: "Santa Lucía", flag: "🇱🇨", dialCode: "+1758" },
  { code: "ST", name: "Santo Tomé y Príncipe", flag: "🇸🇹", dialCode: "+239" },
  { code: "SN", name: "Senegal", flag: "🇸🇳", dialCode: "+221" },
  { code: "RS", name: "Serbia", flag: "🇷🇸", dialCode: "+381" },
  { code: "SC", name: "Seychelles", flag: "🇸🇨", dialCode: "+248" },
  { code: "SL", name: "Sierra Leona", flag: "🇸🇱", dialCode: "+232" },
  { code: "SG", name: "Singapur", flag: "🇸🇬", dialCode: "+65" },
  { code: "SY", name: "Siria", flag: "🇸🇾", dialCode: "+963" },
  { code: "SO", name: "Somalia", flag: "🇸🇴", dialCode: "+252" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", dialCode: "+94" },
  { code: "ZA", name: "Sudáfrica", flag: "🇿🇦", dialCode: "+27" },
  { code: "SD", name: "Sudán", flag: "🇸🇩", dialCode: "+249" },
  { code: "SS", name: "Sudán del Sur", flag: "🇸🇸", dialCode: "+211" },
  { code: "SE", name: "Suecia", flag: "🇸🇪", dialCode: "+46" },
  { code: "CH", name: "Suiza", flag: "🇨🇭", dialCode: "+41" },
  { code: "SR", name: "Surinam", flag: "🇸🇷", dialCode: "+597" },
  { code: "TH", name: "Tailandia", flag: "🇹🇭", dialCode: "+66" },
  { code: "TW", name: "Taiwán", flag: "🇹🇼", dialCode: "+886" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", dialCode: "+255" },
  { code: "TJ", name: "Tayikistán", flag: "🇹🇯", dialCode: "+992" },
  { code: "TL", name: "Timor Oriental", flag: "🇹🇱", dialCode: "+670" },
  { code: "TG", name: "Togo", flag: "🇹🇬", dialCode: "+228" },
  { code: "TO", name: "Tonga", flag: "🇹🇴", dialCode: "+676" },
  { code: "TT", name: "Trinidad y Tobago", flag: "🇹🇹", dialCode: "+1868" },
  { code: "TN", name: "Túnez", flag: "🇹🇳", dialCode: "+216" },
  { code: "TM", name: "Turkmenistán", flag: "🇹🇲", dialCode: "+993" },
  { code: "TR", name: "Turquía", flag: "🇹🇷", dialCode: "+90" },
  { code: "TV", name: "Tuvalu", flag: "🇹🇻", dialCode: "+688" },
  { code: "UA", name: "Ucrania", flag: "🇺🇦", dialCode: "+380" },
  { code: "UG", name: "Uganda", flag: "🇺🇬", dialCode: "+256" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", dialCode: "+598" },
  { code: "UZ", name: "Uzbekistán", flag: "🇺🇿", dialCode: "+998" },
  { code: "VU", name: "Vanuatu", flag: "🇻🇺", dialCode: "+678" },
  { code: "VA", name: "Vaticano", flag: "🇻🇦", dialCode: "+379" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", dialCode: "+58" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", dialCode: "+84" },
  { code: "YE", name: "Yemen", flag: "🇾🇪", dialCode: "+967" },
  { code: "DJ", name: "Yibuti", flag: "🇩🇯", dialCode: "+253" },
  { code: "ZM", name: "Zambia", flag: "🇿🇲", dialCode: "+260" },
  { code: "ZW", name: "Zimbabue", flag: "🇿🇼", dialCode: "+263" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    countryCode: "CR", // Costa Rica por defecto
    phone: "",
    challenge: "",
    website_url: "", // Honeypot anti-spam (campo oculto)
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  // Obtener el país seleccionado
  const selectedCountry = countries.find(c => c.code === formData.countryCode) || countries[0];

  // Filtrar países por búsqueda
  const filteredCountries = countrySearch
    ? countries.filter(c => 
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.dialCode.includes(countrySearch)
      )
    : countries;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountrySelect = (countryCode: string) => {
    setFormData({
      ...formData,
      countryCode,
    });
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "¡Mensaje enviado exitosamente!");
        // Limpiar formulario
        setFormData({
          name: "",
          company: "",
          email: "",
          countryCode: "CR",
          phone: "",
          challenge: "",
          website_url: "", // Limpiar honeypot
        });
      } else {
        setStatus("error");
        setMessage(data.error || "Error al enviar el mensaje. Intenta nuevamente.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error de conexión. Por favor verifica tu conexión a internet.");
      console.error("Error:", error);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
            Iniciemos la Conversación
          </h2>
          <p className="text-xl text-gray-600">
            Cuéntanos sobre tu desafío tecnológico. Respondemos en menos de 24 horas.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            {/* Name Field */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors text-gray-900 bg-white placeholder:text-gray-400"
                placeholder="Escribe tu nombre completo"
              />
            </div>

            {/* Company Field */}
            <div className="mb-6">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Empresa *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors text-gray-900 bg-white placeholder:text-gray-400"
                placeholder="¿Cuál es el nombre de tu empresa?"
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Corporativo *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors text-gray-900 bg-white placeholder:text-gray-400"
                placeholder="Escribe tu email, para nosotros es importante para poder contactarte"
              />
            </div>

            {/* Phone Field with Country Selector */}
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <div className="flex">
                {/* Country Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-3 border border-gray-300 border-r-0 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 min-w-[140px] justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{selectedCountry.flag}</span>
                      <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
                    </span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {isCountryDropdownOpen && (
                    <>
                      {/* Overlay para cerrar al hacer clic afuera */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => {
                          setIsCountryDropdownOpen(false);
                          setCountrySearch("");
                        }}
                      />
                      <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                        {/* Campo de búsqueda */}
                        <div className="p-2 border-b border-gray-100">
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Buscar país..."
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-brand-blue focus:border-brand-blue text-gray-900 bg-white placeholder:text-gray-400"
                            autoFocus
                          />
                        </div>
                        {/* Lista de países */}
                        <div className="max-h-64 overflow-y-auto">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  handleCountrySelect(country.code);
                                  setCountrySearch("");
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left ${
                                  formData.countryCode === country.code ? 'bg-brand-blue/5 text-brand-blue' : 'text-gray-700'
                                }`}
                              >
                                <span className="text-xl">{country.flag}</span>
                                <span className="flex-1 text-sm">{country.name}</span>
                                <span className="text-sm text-gray-500">{country.dialCode}</span>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                              No se encontraron países
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Phone Input */}
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors text-gray-900 bg-white placeholder:text-gray-400"
                  placeholder="Escribe tu número de teléfono"
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-500">
                Opcional - Te contactaremos por este medio si es necesario
              </p>
            </div>

            {/* Honeypot Field (Anti-Spam) */}
            {/* Este campo debe permanecer vacío. Si un bot lo llena, se rechaza el envío */}
            <div className="absolute left-[-9999px] opacity-0" aria-hidden="true">
              <label htmlFor="website_url">Website</label>
              <input
                type="text"
                id="website_url"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Challenge Field */}
            <div className="mb-6">
              <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-2">
                Desafío Tecnológico *
              </label>
              <textarea
                id="challenge"
                name="challenge"
                required
                value={formData.challenge}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors resize-none text-gray-900 bg-white placeholder:text-gray-400"
                placeholder="Cuéntanos sobre tu proyecto, desafío tecnológico o necesidad de consultoría estratégica..."
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {message}
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-brand-blue text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-brand-blue/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar Mensaje"
              )}
            </button>

            {/* Privacy Notice */}
            <p className="mt-4 text-xs text-gray-500 text-center">
              Al enviar este formulario, aceptas que DEVIT506 almacene tus datos para contactarte. 
              No compartimos tu información con terceros.
            </p>
          </form>

          {/* Alternative Contact */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">¿Prefieres escribirnos directamente?</p>
            <a 
              href="mailto:info@devit506.com" 
              className="text-brand-blue font-medium hover:text-brand-blue/80 transition-colors"
            >
              info@devit506.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
