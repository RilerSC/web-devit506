# DEVIT506 — Socios Tecnológicos Estratégicos

Landing page institucional para DEVIT506, construida con Next.js 16, TypeScript, y Tailwind CSS v4.

**Servicios de CTO Externo desde 2012** — Consultoría estratégica y desarrollo de software liderado por un ingeniero con más de una década de experiencia.

## 🚀 Quick Start

```bash
# Instalar dependencias (ya hecho)
npm install

# Arrancar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:3000
```

## 🏗️ Stack Técnico

- **Framework**: Next.js 16.1.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (config en `globals.css`)
- **Fonts**: Geist Sans, Geist Mono
- **Email**: Microsoft Graph API + OAuth2 (Azure AD)
- **Validación**: Zod (type-safe schemas)
- **Animaciones**: Framer Motion
- **Deployment**: Vercel-ready

## 📁 Estructura del Proyecto

```
web-devit506/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts     # API Route para envío de emails (SMTP)
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.tsx       # Navegación + menu mobile hamburger
│   │   ├── Footer.tsx       # Footer con enlaces y branding
│   │   ├── Hero.tsx         # Hero section con CTAs
│   │   ├── TrustBar.tsx     # Barra de clientes
│   │   ├── CapabilitiesBento.tsx  # Grid de capacidades (con animaciones)
│   │   ├── FeaturedProjects.tsx   # Proyectos destacados (con animaciones)
│   │   └── ContactSection.tsx     # Formulario de contacto funcional
│   ├── layout.tsx           # Layout base (Navbar + Footer)
│   ├── page.tsx             # Landing page (home)
│   └── globals.css          # Estilos globales + colores de marca
├── public/                  # Assets estáticos (logos)
├── .env.local.example       # Template de variables de entorno
├── AUDIT_LOG.md            # Log de cambios y decisiones técnicas
└── README.md               # Este archivo
```

## 🎨 Colores de Marca

Definidos en `app/globals.css` bajo `@theme inline`:

- **Brand Black**: `#222223` (PANTONE BLACK C)
  - Uso: `text-brand-black`, `bg-brand-black`
- **Brand Blue**: `#009CDE` (PANTONE 2925 C)
  - Uso: `text-brand-blue`, `bg-brand-blue`

## 📄 Secciones de la Landing

1. **Hero**: "Socios Tecnológicos Estratégicos" con CTAs bilingües
2. **Trust Bar**: Clientes reales (COOPEBANACIO, FUNDEPOS, CODEAS)
3. **Capabilities Bento Grid**: 6 servicios principales (con animaciones on-scroll)
   - Consultoría C-Suite (CTO Externo)
   - Desarrollo de Software a Medida (Next.js/Azure)
   - Automatización de Procesos
   - Integración de Ecosistemas (ERP/CRM)
   - Cloud Infrastructure (Azure)
   - Planificación Estratégica TI
4. **Featured Projects**: 3 casos de éxito documentados (con animaciones on-scroll)
   - COOPEBANACIO R.L. (12 años de partnership)
   - Universidad FUNDEPOS
   - Integración HubSpot-CODEAS
5. **Contact Section**: Formulario funcional con envío por email (Microsoft 365 SMTP)
   - Validación con Zod
   - Feedback visual (success/error)
   - Email HTML template con branding

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (puerto 3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```

## ⚙️ Configuración de Email con Microsoft Graph API

El formulario de contacto usa **Microsoft Graph API con OAuth2** para envío de emails.

### 1. Configurar Azure AD App Registration

1. Ve a **Azure Portal** → **Azure Active Directory** → **App registrations**
2. **New registration**:
   - Name: `DEVIT506 Web App`
   - Supported account types: Single tenant
3. Copia las credenciales:
   - **Application (client) ID** → `ID_APPLICATION`
   - **Directory (tenant) ID** → `ID_DIRECTORY`
4. En **Certificates & secrets**:
   - New client secret → Copia el **Value** → `SECRET_KEY`
5. En **API permissions**:
   - Add permission → Microsoft Graph → Application permissions
   - Selecciona: `Mail.Send`
   - Click: **Grant admin consent**

### 2. Configurar Variables de Entorno

```bash
# Copia el template
cp .env.local.example .env.local

# Edita .env.local y completa:
```

### 3. Variables Requeridas

```env
ID_APPLICATION=tu-client-id-aqui
ID_DIRECTORY=tu-tenant-id-aqui
SECRET_KEY=tu-client-secret-value-aqui
OFFICE365_SENDER_EMAIL=no-reply@tu-dominio.com
```

**Requisitos:**
- `OFFICE365_SENDER_EMAIL` puede ser:
  - **Buzón compartido** (recomendado, sin costo de licencia)
  - Usuario individual (requiere licencia Exchange Online)
- Admin consent granted para `Mail.Send` permission
- Client Secret válido (no expirado)

**💡 Recomendación:** Usar buzón compartido para reducir costos (~$96-192/año de ahorro)

**✨ Sistema implementado:**
- Flujo circular con buzón compartido (emisor = receptor)
- Honeypot anti-spam (campo oculto `website_url`)
- Auto-responder automático al cliente
- Reply-To configurado para respuestas directas

**Nota de Seguridad:** El archivo `.env.local` está en `.gitignore`. En producción (Vercel), configura estas variables en Environment Variables.

### 4. Crear Buzón Compartido (Recomendado)

```
Microsoft 365 Admin Center
→ Teams & groups
→ Shared mailboxes
→ + Add a shared mailbox
→ Name: No Reply DEVIT506
→ Email: no-reply@tu-dominio.com
→ Create
```

**Ventajas del Buzón Compartido:**
- ✅ Sin costo de licencia Exchange Online
- ✅ Múltiples usuarios pueden acceder (visibilidad equipo ventas)
- ✅ Ideal para emails automatizados (no-reply)
- ✅ **Flujo circular**: Emisor = Receptor (hub centralizado)
- ✅ Mismo código que usuario individual

### 5. Testing Local

```bash
npm run dev
# Navega a http://localhost:3000
# Llena el formulario de contacto
# Revisa la consola del servidor para logs de envío
# Verifica el buzón compartido: no-reply@devit506.net
```

**Al enviar el formulario, se generan 2 emails:**

1. **Email Interno** (para equipo de ventas):
   - FROM: `no-reply@devit506.net`
   - TO: `no-reply@devit506.net` (buzón compartido)
   - REPLY-TO: Email del cliente
   - Contenido: Datos completos del lead

2. **Auto-Responder** (para el cliente):
   - FROM: `no-reply@devit506.net`
   - TO: Email del cliente
   - SUBJECT: "Recibimos su consulta - DEVIT506"
   - Contenido: Confirmación profesional con expectativa de 24h

**Protección Anti-Spam:**
- Campo honeypot `website_url` oculto visualmente
- Si un bot lo llena → retorna 200 pero NO envía emails
- Logs de spam en consola del servidor

## 📱 Funcionalidades Implementadas

- ✅ **Formulario de Contacto Funcional**
  - Envío vía Microsoft Graph API con OAuth2
  - Autenticación con Azure AD (Client Credentials flow)
  - Validación con Zod (backend + HTML5 frontend)
  - **Honeypot anti-spam** (campo oculto `website_url`)
  - **Auto-responder automático** al cliente
  - **Flujo circular**: Buzón compartido `no-reply@devit506.net` como emisor y receptor
  - Email HTML template con branding DEVIT506
  - Feedback visual (loading, success, error)
  
- ✅ **Menu Mobile Hamburger**
  - Drawer lateral desde la derecha
  - Fondo brand-black con logo blanco
  - Cierre automático al scroll o click en link
  - Overlay oscuro (backdrop)
  
- ✅ **Animaciones On-Scroll**
  - Fade-in + slide-up en CapabilitiesBento
  - Fade-in + slide-up en FeaturedProjects
  - Delays escalonados (efecto cascada)
  - Activación solo primera vez (performance)

## 📝 Next Steps

1. **Contenido Adicional**
   - ✅ ~~Reemplazar texto placeholder con copy definitivo~~ (COMPLETADO)
   - ✅ ~~Integrar logos de `/grafica_Devit506`~~ (COMPLETADO)
   - Ampliar casos de éxito con páginas dedicadas
   - Agregar testimonios de clientes

2. **Assets Visuales**
   - Screenshots de apps móviles COOPEBANACIO
   - Capturas de Web FUNDEPOS y Observatorio
   - Diagrama de integración HubSpot-CODEAS

3. **Funcionalidad**
   - ✅ ~~Implementar menu mobile (hamburger)~~ (COMPLETADO)
   - ✅ ~~Formulario de contacto funcional~~ (COMPLETADO)
   - ✅ ~~Animaciones on-scroll~~ (COMPLETADO)
   - Honeypot / Rate limiting para anti-spam
   - Auto-responder email de confirmación

4. **SEO & Performance**
   - Open Graph tags
   - Sitemap y robots.txt
   - Lighthouse audit
   - Google Analytics 4

## 📚 Documentación

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 📖 Documentación

- **`AUDIT_LOG.md`**: Registro completo de decisiones técnicas y arquitectura (v1.0 a v6.0)
- **`TESTING_GUIDE.md`**: Guía de testing paso a paso (honeypot, auto-responder, reply-to)
- **`DEPLOYMENT_CHECKLIST.md`**: Checklist completo para deployment a Vercel
- **`.env.local.example`**: Template de variables de entorno con instrucciones

---

**DEVIT506** — Strategic Technology Leadership since 2012
