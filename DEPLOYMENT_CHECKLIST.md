# 🚀 Checklist de Deployment — DEVIT506

## ✅ Estado Actual: LISTO PARA PRODUCCIÓN

La estructura técnica de la web está completa y optimizada. Este documento detalla los pasos finales antes del deployment a Vercel.

---

## 📋 Pre-Deployment Checklist

### 1. Código y Funcionalidad ✅

- [x] **Mobile Menu (Navbar)**
  - Hamburger button funcional
  - Drawer desde la derecha con bg-brand-black
  - Overlay semi-transparente
  - Transiciones suaves (300ms ease-in-out)
  - Prevención de scroll cuando está abierto
  - Cierre automático al hacer scroll

- [x] **Formulario de Contacto**
  - Envío vía Microsoft Graph API
  - Honeypot anti-spam (campo `website_url`)
  - Auto-responder al cliente
  - Flujo circular con buzón compartido
  - Reply-To funcional
  - Validación con Zod

- [x] **Animaciones (Framer Motion)**
  - Hero: Cascade fade-in on mount
  - TrustBar: Stagger wave on scroll
  - Capabilities: Fade-in + slide-up on scroll
  - Projects: Fade-in + slide-up on scroll
  - Todas con `viewport={{ once: true }}`

- [x] **Linter**
  - 0 errores de TypeScript
  - 0 warnings de ESLint
  - Código limpio y tipado

- [x] **Build Local**
  ```bash
  npm run build
  ```
  - Verificar que compile sin errores

---

### 2. SEO y Metadata ✅ (con pendientes)

- [x] **Meta Tags Básicos**
  - Title: "DEVIT506 | Socios Tecnológicos Estratégicos desde 2012"
  - Description: 155 caracteres (óptimo para Google)
  - Keywords: 11 keywords específicas
  - Lang: es-CR
  - Canonical URL definido

- [x] **Open Graph (Facebook/LinkedIn)**
  - og:type, og:locale, og:url, og:siteName
  - og:title y og:description optimizados
  - og:image configurado (ruta definida)

- [x] **Twitter Cards**
  - card: summary_large_image
  - twitter:title, twitter:description
  - twitter:image configurado (ruta definida)
  - twitter:creator: @devit506

- [x] **Robots Meta**
  - index: true, follow: true
  - max-image-preview: large
  - max-snippet: -1

- [ ] **⚠️ PENDIENTE: Imágenes Open Graph**
  - Crear `/public/og-image.png` (1200x630px)
  - Crear `/public/twitter-image.png` (1200x675px)
  - Diseño: Fondo #222223, logo blanco, acento #009CDE
  - **Herramienta sugerida:** Figma, Canva, o Photoshop

---

### 3. Variables de Entorno 🔐

**Local (.env.local):**
```env
ID_APPLICATION=your-client-id-here
ID_DIRECTORY=your-tenant-id-here
SECRET_KEY=your-client-secret-here
OFFICE365_SENDER_EMAIL=no-reply@devit506.net
```

**Vercel (configurar en dashboard):**

1. Ir a: `Vercel Dashboard → Project → Settings → Environment Variables`

2. Agregar las siguientes variables:

| Variable | Valor | Scope |
|----------|-------|-------|
| `ID_APPLICATION` | `your-client-id-here` | Production |
| `ID_DIRECTORY` | `your-tenant-id-here` | Production |
| `SECRET_KEY` | `your-client-secret-here` | Production |
| `OFFICE365_SENDER_EMAIL` | `no-reply@devit506.net` | Production |

**⚠️ CRÍTICO:** No exponer estas variables en el código ni en Git.

---

### 4. Buzón Compartido Microsoft 365 ✉️

- [ ] **Verificar que el buzón esté activo**
  - Acceder a: `outlook.office365.com`
  - "Open another mailbox" → `no-reply@devit506.net`
  - Confirmar que se puede acceder

- [ ] **Verificar permisos en Azure AD**
  - Azure Portal → App registrations
  - Buscar app: ID `your-client-id-here`
  - API permissions → `Mail.Send` → Admin consent ✅
  - Si no está granted: "Grant admin consent for [tenant]"

- [ ] **Probar envío desde local**
  - Llenar formulario en http://localhost:3000
  - Verificar logs en consola del servidor
  - Confirmar que llegan ambos emails:
    - Email interno al buzón compartido
    - Auto-responder al cliente

---

### 5. Build de Producción 🏗️

**Pasos para verificar build:**

```bash
cd web-devit506

# 1. Limpiar build anterior
rm -rf .next

# 2. Build de producción
npm run build

# 3. Verificar que compile sin errores
# Salida esperada:
# ✓ Generating static pages
# ✓ Collecting page data
# ✓ Finalizing page optimization
# Route (app)                Size     First Load JS
# ○ /                       XX kB        XXX kB

# 4. Probar build localmente
npm run start

# 5. Abrir http://localhost:3000 y verificar:
#    - Navbar mobile funciona
#    - Animaciones se reproducen
#    - Formulario envía correctamente
```

**Si el build falla:**
- Revisar errores en consola
- Verificar que todas las importaciones estén correctas
- Confirmar que `.env.local` exista y tenga las variables

---

## 🚀 Deployment a Vercel

### Opción A: Deployment desde CLI (Recomendado)

```bash
# 1. Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd web-devit506
vercel

# 4. Seguir el wizard:
#    Set up and deploy "web-devit506"? [Y/n] y
#    Which scope? → Seleccionar tu cuenta/org
#    Link to existing project? [y/N] n
#    What's your project's name? web-devit506
#    In which directory is your code located? ./
#    Auto-detected Project Settings (Next.js):
#    - Build Command: next build
#    - Output Directory: .next
#    - Development Command: next dev
#    Want to modify these settings? [y/N] n

# 5. Deployment en preview
#    Vercel generará una URL preview: https://web-devit506-xxx.vercel.app

# 6. Probar preview deployment:
#    - Abrir URL en navegador
#    - Verificar que todo funcione
#    - Probar formulario de contacto

# 7. Promote to production
vercel --prod
```

---

### Opción B: Deployment desde Dashboard (Alternativo)

1. **Conectar repositorio a Vercel**
   - Ir a: https://vercel.com/new
   - Importar proyecto desde Git (GitHub/GitLab/Bitbucket)
   - Seleccionar repositorio: `WEB_DEVIT506`

2. **Configurar proyecto**
   - Framework Preset: Next.js
   - Root Directory: `web-devit506`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Agregar variables de entorno**
   - En la sección "Environment Variables"
   - Agregar todas las variables listadas arriba
   - Scope: Production

4. **Deploy**
   - Click "Deploy"
   - Esperar ~2-3 minutos

5. **Obtener URL de producción**
   - Vercel asignará: `https://web-devit506.vercel.app`
   - (Configurar dominio custom más adelante)

---

## 🌐 Configuración de Dominio Custom

**Si tienes `devit506.com`:**

1. **En Vercel Dashboard:**
   - Project → Settings → Domains
   - Add Domain: `devit506.com`
   - Add Domain: `www.devit506.com` (opcional)

2. **En tu proveedor de DNS (GoDaddy/Namecheap/etc):**
   - Agregar registro A:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21 (IP de Vercel)
     TTL: 3600
     ```
   - Agregar registro CNAME:
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     TTL: 3600
     ```

3. **Esperar propagación DNS (15-60 minutos)**

4. **Verificar dominio en Vercel**
   - Vercel detectará automáticamente la configuración
   - SSL certificate se generará automáticamente (Let's Encrypt)

---

## ✅ Post-Deployment Checklist

### Inmediatamente después del deploy:

- [ ] **Verificar que el sitio cargue**
  - Abrir URL de producción
  - Verificar que no haya errores 404
  - Probar en múltiples navegadores (Chrome, Safari, Firefox)

- [ ] **Probar mobile menu**
  - Abrir DevTools → Device mode
  - Probar iPhone, iPad, Android
  - Verificar que el drawer funcione
  - Confirmar transiciones suaves

- [ ] **Probar formulario de contacto**
  - Llenar con email real
  - Enviar formulario
  - Verificar auto-responder en bandeja
  - Verificar email interno en buzón compartido
  - Probar Reply-To desde Outlook

- [ ] **Verificar animaciones**
  - Scrollear por la landing page
  - Confirmar que Hero anime al cargar
  - Confirmar que TrustBar anime al scrollear
  - Confirmar que Capabilities y Projects animen

- [ ] **Performance Audit**
  - Google PageSpeed Insights: https://pagespeed.web.dev/
  - Objetivo: >90 en Performance
  - Si <90: revisar oportunidades de optimización

---

### Primer día:

- [ ] **Crear imágenes Open Graph**
  - `/public/og-image.png` (1200x630px)
  - `/public/twitter-image.png` (1200x675px)
  - Subir a Vercel (redeploy)

- [ ] **Probar Open Graph**
  - Facebook Debugger: https://developers.facebook.com/tools/debug/
  - Pegar URL: `https://devit506.com`
  - Click "Scrape Again"
  - Verificar que preview sea correcto

- [ ] **Probar Twitter Cards**
  - Twitter Card Validator: https://cards-dev.twitter.com/validator
  - Pegar URL: `https://devit506.com`
  - Verificar preview

- [ ] **LinkedIn Post Inspector**
  - https://www.linkedin.com/post-inspector/
  - Pegar URL y verificar

---

### Primera semana:

- [ ] **Google Search Console**
  - Agregar propiedad: https://search.google.com/search-console
  - Verificar propiedad (método: DNS o HTML tag)
  - Enviar sitemap: `https://devit506.com/sitemap.xml`

- [ ] **Bing Webmaster Tools**
  - Agregar sitio: https://www.bing.com/webmasters
  - Enviar sitemap

- [ ] **Google Analytics 4**
  - Crear propiedad en: https://analytics.google.com
  - Obtener Measurement ID (G-XXXXXXXXXX)
  - Agregar en `layout.tsx`:
    ```tsx
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      `}
    </Script>
    ```

- [ ] **Probar honeypot anti-spam**
  - DevTools Console:
    ```javascript
    fetch('https://devit506.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Bot Test",
        company: "Spam",
        email: "spam@bot.com",
        challenge: "Spam message",
        website_url: "https://spam.com" // Honeypot filled
      })
    }).then(r => r.json()).then(console.log);
    ```
  - Verificar que retorne 200 pero NO envíe email

---

### Primer mes:

- [ ] **Monitorear métricas SEO**
  - Google Search Console:
    - Impresiones: objetivo 100+
    - Clicks: objetivo 10+
    - CTR: objetivo 5%+
    - Posición promedio: objetivo <50

- [ ] **Revisar Core Web Vitals**
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1

- [ ] **Content adicional (Blog)**
  - Crear `/blog` route
  - Artículos sugeridos:
    - "¿Cuándo necesitas un CTO Externo?"
    - "Migración a Azure: Guía para empresas"
    - "Automatización vs. Desarrollo custom"

- [ ] **Schema.org (Structured Data)**
  - Agregar JSON-LD en `layout.tsx`:
    ```tsx
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "DEVIT506",
          "url": "https://devit506.com",
          "logo": "https://devit506.com/logo.png",
          "sameAs": [
            "https://www.linkedin.com/company/devit506",
          ]
        })
      }}
    />
    ```

---

## 🐛 Troubleshooting Común

### Build falla con error de tipos

**Error:**
```
Type error: Property 'X' does not exist on type 'Y'
```

**Solución:**
```bash
npm run build -- --debug
# Revisar output detallado
# Corregir tipos en el archivo indicado
```

---

### Variables de entorno no funcionan en Vercel

**Síntomas:**
- Formulario no envía
- Error 500 en `/api/contact`

**Solución:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Verificar que TODAS las variables estén agregadas
3. Verificar que Scope sea "Production"
4. Redeploy: `vercel --prod`

---

### Animaciones no se reproducen

**Síntomas:**
- Hero se muestra instantáneamente sin fade-in
- TrustBar no anima al scrollear

**Solución:**
1. Verificar que `framer-motion` esté instalado:
   ```bash
   npm list framer-motion
   ```
2. Si no está:
   ```bash
   npm install framer-motion
   vercel --prod
   ```

---

### Honeypot no bloquea spam

**Síntomas:**
- Emails de spam llegan al buzón compartido

**Diagnóstico:**
1. Revisar logs en Vercel:
   ```
   Vercel Dashboard → Project → Deployments → [latest] → Functions
   ```
2. Buscar: "🚫 Intento de spam detectado"

**Solución:**
- Si no aparece el log: el campo `website_url` no está llegando al backend
- Verificar que `ContactSection.tsx` tenga:
  ```tsx
  const [formData, setFormData] = useState({
    // ...
    website_url: "", // DEBE estar aquí
  });
  ```

---

### Open Graph no muestra preview

**Síntomas:**
- Al compartir en Facebook/LinkedIn, no aparece imagen ni descripción

**Solución:**
1. Verificar que `/public/og-image.png` exista
2. Facebook Debugger: https://developers.facebook.com/tools/debug/
3. Pegar URL y click "Scrape Again"
4. Si sigue sin funcionar:
   - Verificar que metadata en `layout.tsx` tenga ruta correcta
   - Verificar que imagen sea exactamente 1200x630px
   - Esperar 5-10 minutos (cache de Facebook)

---

## 📊 KPIs Post-Launch

| Métrica | Target Mes 1 | Target Mes 3 | Cómo Medir |
|---------|--------------|--------------|------------|
| **SEO Impresiones** | 100+ | 500+ | Google Search Console |
| **SEO Clicks** | 10+ | 50+ | Google Search Console |
| **Posición Promedio** | <50 | <20 | Google Search Console |
| **Performance Score** | >90 | >95 | PageSpeed Insights |
| **Leads recibidos** | 5+ | 20+ | Buzón compartido |
| **Spam bloqueado** | >90% | >95% | Logs en Vercel |
| **CTR formulario** | 5%+ | 10%+ | Google Analytics |

---

## 🎯 Estado Final: READY TO DEPLOY

✅ **Código:**
- Mobile menu funcional
- Formulario con honeypot + auto-responder
- Animaciones sutiles y profesionales
- 0 errores de linter

✅ **SEO:**
- Metadata completa (OpenGraph + Twitter)
- Title y description optimizados
- Robots meta configurado
- Lang attribute: es-CR

✅ **Funcionalidad:**
- Buzón compartido: `no-reply@devit506.net`
- Graph API con OAuth2
- Reply-To funcional
- Logs detallados

⚠️ **Pendiente:**
- Crear imágenes Open Graph (1200x630px y 1200x675px)
- Configurar Google Analytics
- Enviar sitemap a Search Console

---

**¿Listo para deployment?** → Ejecutar:

```bash
cd web-devit506
npm run build  # Verificar que compile
vercel --prod  # Deploy a producción
```

---

**DEVIT506** — Deployment Checklist v1.0  
Última actualización: 2026-01-27
