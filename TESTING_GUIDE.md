# Guía de Testing — Sistema de Contacto DEVIT506

## 🎯 Objetivo

Validar el funcionamiento completo del sistema de contacto con:
- Flujo circular con buzón compartido
- Honeypot anti-spam
- Auto-responder al cliente
- Reply-To funcional

---

## 📋 Pre-requisitos

Antes de comenzar los tests:

- ✅ Servidor Next.js corriendo: `npm run dev` en http://localhost:3000
- ✅ Variables de entorno configuradas en `.env.local`:
  - `ID_APPLICATION`
  - `ID_DIRECTORY`
  - `SECRET_KEY`
  - `OFFICE365_SENDER_EMAIL=no-reply@devit506.net`
- ✅ Buzón compartido `no-reply@devit506.net` creado en Microsoft 365
- ✅ Azure AD App con `Mail.Send` permission y admin consent

---

## ✅ Test 1: Envío Normal (Usuario Real)

### Objetivo
Verificar que un usuario real puede enviar el formulario y que se generan los 2 emails correctamente.

### Pasos

1. **Abrir la web**
   ```
   http://localhost:3000
   ```

2. **Scrollear hasta el formulario de contacto**
   - Al final de la página, antes del footer

3. **Llenar el formulario con datos reales:**
   - **Nombre:** Juan Pérez
   - **Empresa:** Tech Solutions S.A.
   - **Email:** tu-email-real@gmail.com (usa tu email real para recibir el auto-responder)
   - **Desafío Tecnológico:** "Necesitamos modernizar nuestra infraestructura cloud y migrar a Azure. Buscamos un socio tecnológico estratégico."

4. **NO llenar campos ocultos** (el campo honeypot debe permanecer vacío)

5. **Click en "Enviar Mensaje"**

### Resultado Esperado

**En el navegador:**
- Spinner "Enviando..."
- Alert verde: "Mensaje enviado exitosamente. Nos pondremos en contacto pronto."
- Formulario limpio (campos vacíos)

**En la consola del servidor:**
```
📧 Iniciando envío de email desde buzón compartido/usuario:
   Buzón emisor: no-reply@devit506.net
   Contacto: Juan Pérez (Tech Solutions S.A.)
   Email cliente: tu-email-real@gmail.com

📤 Enviando vía endpoint: /users/no-reply@devit506.net/sendMail
   🔄 Flujo circular: no-reply@devit506.net → no-reply@devit506.net

✅ Email interno enviado exitosamente
   📧 Tipo: Buzón Compartido (hub centralizado)
   📤 Emisor: no-reply@devit506.net
   📥 Receptor: no-reply@devit506.net (mismo buzón)
   ↩️  Reply-To: tu-email-real@gmail.com (Juan Pérez - Tech Solutions S.A.)
   📋 Asunto: [DEVIT506 Web] Nuevo contacto de Tech Solutions S.A.
   ✨ Lead enviado y recibido en buzón compartido centralizado
   👥 Visible para todo el equipo de ventas

📧 Enviando auto-responder al cliente: tu-email-real@gmail.com
✅ Auto-responder enviado al cliente
   📤 Emisor: no-reply@devit506.net
   📥 Destinatario: tu-email-real@gmail.com (Juan Pérez)
   📋 Asunto: Recibimos su consulta - DEVIT506
```

**En Outlook (buzón compartido no-reply@devit506.net):**
- Nuevo email en Bandeja de Entrada
- Asunto: `[DEVIT506 Web] Nuevo contacto de Tech Solutions S.A.`
- Contenido HTML profesional con todos los datos del lead
- Reply-To: tu-email-real@gmail.com

**En tu email personal:**
- Nuevo email de confirmación
- De: no-reply@devit506.net
- Asunto: `Recibimos su consulta - DEVIT506`
- Contenido: Mensaje profesional confirmando recepción y tiempo de respuesta (24h)

### ✅ Validaciones

- [ ] Formulario se envió sin errores
- [ ] Alert verde de éxito apareció
- [ ] Formulario se limpió automáticamente
- [ ] Email interno llegó a buzón compartido
- [ ] Auto-responder llegó al cliente
- [ ] Reply-To del email interno apunta al cliente
- [ ] Logs en consola son descriptivos

---

## 🚫 Test 2: Honeypot Anti-Spam (Bot Detection)

### Objetivo
Verificar que el honeypot detecta y bloquea intentos de spam sin alertar al bot.

### Pasos (Simulación de Bot)

1. **Usar la consola del navegador**
   ```javascript
   // Abrir DevTools (F12) → Console
   
   // Simular un bot llenando TODOS los campos (incluido honeypot)
   fetch('http://localhost:3000/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: "Spam Bot",
       company: "Spam Company",
       email: "spam@bot.com",
       challenge: "Buy our product now!!!",
       website_url: "https://spam-site.com" // ← BOT llena el honeypot
     })
   })
   .then(r => r.json())
   .then(data => console.log(data));
   ```

### Resultado Esperado

**En el navegador (respuesta del API):**
```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente. Nos pondremos en contacto pronto."
}
```

**En la consola del servidor:**
```
🚫 Intento de spam detectado (honeypot activado)
   Campo honeypot contiene: "https://spam-site.com"
   IP: 127.0.0.1
```

**En el buzón compartido:**
- ❌ NO debe llegar ningún email
- ❌ NO debe enviarse auto-responder

**En el email spam@bot.com:**
- ❌ NO debe llegar auto-responder

### ✅ Validaciones

- [ ] API retornó 200 (éxito falso)
- [ ] Log de spam apareció en consola del servidor
- [ ] NO se envió email interno
- [ ] NO se envió auto-responder
- [ ] Bot no detecta que fue bloqueado

---

## 👥 Test 3: Respuesta del Equipo de Ventas

### Objetivo
Verificar que el Reply-To funciona correctamente para respuestas directas al cliente.

### Pasos

1. **Acceder al buzón compartido**
   ```
   Outlook Web → outlook.office365.com
   → Click en foto de perfil
   → "Open another mailbox"
   → Escribir: no-reply@devit506.net
   → Enter
   ```

2. **Abrir el email del lead**
   - Asunto: `[DEVIT506 Web] Nuevo contacto de Tech Solutions S.A.`

3. **Click en "Responder"**

4. **Verificar destinatario**
   - Debe mostrar: `tu-email-real@gmail.com` (email del cliente)
   - NO debe mostrar: `no-reply@devit506.net`

5. **Escribir respuesta de prueba**
   ```
   Hola Juan,

   Gracias por contactarnos. Revisé tu consulta sobre modernización 
   de infraestructura en Azure.

   ¿Podemos agendar una llamada esta semana?

   Saludos,
   José Riler - DEVIT506
   ```

6. **Enviar**

### Resultado Esperado

**En tu email personal:**
- Nuevo email de José Riler
- FROM: jose@devit506.com (o el email del vendedor)
- TO: tu-email-real@gmail.com
- Contenido: Respuesta personalizada

**NO debe aparecer:**
- ❌ Referencias a no-reply@devit506.net
- ❌ Email automático
- ❌ Headers extraños

### ✅ Validaciones

- [ ] Click "Responder" va directo al cliente
- [ ] NO requiere copiar/pegar el email del cliente
- [ ] Respuesta se envía desde buzón personal del vendedor
- [ ] Cliente recibe respuesta profesional
- [ ] Conversación continúa naturalmente

---

## 📧 Test 4: Verificar Auto-Responder

### Objetivo
Confirmar que el cliente recibe el auto-responder con el diseño correcto.

### Pasos

1. **Revisar tu bandeja personal** (email usado en Test 1)

2. **Buscar email con asunto:** "Recibimos su consulta - DEVIT506"

3. **Abrir el email**

### Resultado Esperado

**Header:**
- Fondo negro (#222223)
- Logo: DEVIT**506** (con acento azul en 506)
- Subtítulo: "Socios Tecnológicos Estratégicos"

**Contenido:**
- Saludo: "Hola Juan Pérez,"
- Confirmación de recepción
- Mención de "consultor senior"
- Tiempo de respuesta: "24 horas"
- Invitación a responder si es urgente

**Footer:**
- Aviso: "No responder a no-reply@devit506.net"
- Copyright con año dinámico

**Diseño:**
- ✅ Minimalista y profesional
- ✅ Responsive (se ve bien en mobile)
- ✅ Colores de marca (negro + azul)

### ✅ Validaciones

- [ ] Email llegó al cliente
- [ ] Diseño se ve profesional
- [ ] Texto es claro y conciso
- [ ] No hay errores tipográficos
- [ ] Footer advierte sobre no-reply
- [ ] Branding consistente con web

---

## 🔄 Test 5: Flujo Completo End-to-End

### Objetivo
Simular el ciclo completo desde que un cliente potencial llena el formulario hasta que recibe respuesta del equipo.

### Escenario

**Día 1 - 10:00 AM:**
1. Cliente visita devit506.net
2. Llena formulario de contacto
3. Recibe auto-responder inmediatamente

**Día 1 - 10:01 AM:**
4. Email del lead llega a buzón compartido
5. Vendedor José ve el lead en Outlook
6. José evalúa la consulta

**Día 1 - 2:00 PM:**
7. José responde al cliente (click "Responder")
8. Email personalizado llega al cliente

**Día 1 - 3:00 PM:**
9. Cliente responde con más detalles
10. Conversación continúa naturalmente

### ✅ KPIs de Éxito

- [ ] Tiempo de respuesta automática: <5 segundos
- [ ] Tiempo de respuesta humana: <24 horas
- [ ] Tasa de spam bloqueado: >90%
- [ ] Satisfacción del cliente: Email profesional
- [ ] Facilidad para el equipo: Reply-To funcional

---

## 🐛 Troubleshooting

### Problema: No llega email interno al buzón compartido

**Diagnóstico:**
```bash
# Revisar logs en consola del servidor
# Buscar:
❌ Error al enviar email vía Graph API
   Status Code: 403
```

**Solución:**
1. Azure Portal → App registrations → tu app → API permissions
2. Verificar `Mail.Send` con admin consent ✅
3. Si no: Grant admin consent
4. Esperar 5 minutos
5. Reintentar

---

### Problema: No llega auto-responder al cliente

**Diagnóstico:**
```bash
# Revisar logs
# Si aparece:
✅ Email interno enviado...
❌ Error en auto-responder
```

**Solución:**
1. Verificar que el segundo `sendMail` no tenga errores en logs
2. Revisar carpeta de Spam del cliente
3. Verificar que `OFFICE365_SENDER_EMAIL` sea correcto

---

### Problema: Reply-To no funciona

**Diagnóstico:**
```
Click "Responder" en Outlook
  ↓
Destinatario: no-reply@devit506.net ❌
(Debería ser: cliente@empresa.com)
```

**Solución:**
1. Verificar código en route.ts:
   ```typescript
   replyTo: [
     {
       emailAddress: {
         address: email, // Email del cliente
         name: name,
       },
     },
   ],
   ```
2. Si está correcto, esperar 5 minutos (cache de Outlook)
3. Cerrar y reabrir Outlook
4. Reintentar

---

### Problema: Honeypot bloquea usuarios reales

**Síntomas:**
- Usuario real completa formulario
- NO recibe confirmación
- Logs muestran: `🚫 Intento de spam detectado`

**Causa probable:**
- Autofill del navegador llenó el campo `website_url`

**Solución:**
1. Verificar que el campo tenga `autoComplete="off"`
2. Verificar que el campo tenga `tabIndex={-1}`
3. Limpiar caché del navegador
4. Probar en modo incógnito

---

## 📊 Métricas de Éxito

| Métrica | Target | Cómo Medir |
|---------|--------|------------|
| **Tasa de entrega** | >99% | Logs de envío exitoso |
| **Tiempo de envío** | <5s | Timestamp en logs |
| **Spam bloqueado** | >90% | Ratio honeypot triggers |
| **Auto-responder entregado** | >95% | No bounces en buzón |
| **Reply-To funcional** | 100% | Test manual |

---

## 🚀 Checklist Final

Antes de marcar como completo:

### Funcionalidad
- [ ] Formulario se envía sin errores
- [ ] Email interno llega a buzón compartido
- [ ] Auto-responder llega al cliente
- [ ] Honeypot bloquea spam (test manual)
- [ ] Reply-To apunta al cliente

### Diseño
- [ ] Formulario responsive en mobile
- [ ] Email interno se ve profesional
- [ ] Auto-responder se ve profesional
- [ ] Colores de marca correctos (#222223, #009CDE)

### Seguridad
- [ ] Variables de entorno NO en Git
- [ ] Honeypot oculto correctamente
- [ ] Validación con Zod funciona
- [ ] Logs no exponen información sensible

### Performance
- [ ] Tiempo de respuesta <5s
- [ ] No errores en consola del navegador
- [ ] No warnings de TypeScript

### Documentación
- [ ] AUDIT_LOG.md actualizado
- [ ] README.md con instrucciones claras
- [ ] .env.local.example documentado
- [ ] TESTING_GUIDE.md (este archivo) creado

---

## 🎯 Deployment Checklist

Antes de desplegar a Vercel:

- [ ] Todos los tests arriba pasaron exitosamente
- [ ] Buzón compartido verificado en producción
- [ ] Variables de entorno configuradas en Vercel
- [ ] Azure AD App con permisos correctos
- [ ] Build de producción exitoso: `npm run build`
- [ ] Preview deployment testeado

---

## 📞 Soporte

Si algún test falla y no puedes resolverlo con el troubleshooting:

1. Revisar `AUDIT_LOG.md` para contexto técnico completo
2. Revisar logs detallados en consola del servidor
3. Verificar configuración de Azure AD paso a paso
4. Verificar que el buzón compartido exista en Admin Center

---

**DEVIT506** — Testing Guide v1.0  
Última actualización: 2026-01-27
