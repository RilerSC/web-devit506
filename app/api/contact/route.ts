import { NextRequest, NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import "isomorphic-fetch";
import { z } from "zod";

// Schema de validación con Zod
const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  company: z.string().min(2, "La empresa debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  challenge: z.string().min(10, "Por favor describe tu desafío con más detalle (mínimo 10 caracteres)"),
  website_url: z.string().optional(), // Honeypot anti-spam (debe estar vacío)
});

// Configurar credenciales de Azure AD
function getGraphClient() {
  const clientId = process.env.ID_APPLICATION;
  const tenantId = process.env.ID_DIRECTORY;
  const clientSecret = process.env.SECRET_KEY;

  if (!clientId || !tenantId || !clientSecret) {
    throw new Error("Faltan credenciales de Azure AD en las variables de entorno");
  }

  // Crear credenciales usando Client Secret
  const credential = new ClientSecretCredential(
    tenantId,
    clientId,
    clientSecret
  );

  // Crear auth provider
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });

  // Inicializar Graph Client
  const graphClient = Client.initWithMiddleware({
    authProvider,
  });

  return graphClient;
}

export async function POST(request: NextRequest) {
  try {
    // Parsear body
    const body = await request.json();

    // Validar con Zod
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Datos inválidos", 
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const { name, company, email, challenge, website_url } = validationResult.data;

    // HONEYPOT ANTI-SPAM: Si el campo website_url contiene algún valor, es un bot
    if (website_url && website_url.trim() !== "") {
      console.log("🚫 Intento de spam detectado (honeypot activado)");
      console.log(`   Campo honeypot contiene: "${website_url}"`);
      console.log(`   IP: ${request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown"}`);
      
      // Retornar éxito falso (200) para no alertar al bot
      // NO enviar email ni procesar nada
      return NextResponse.json(
        { 
          success: true, 
          message: "Mensaje enviado exitosamente. Nos pondremos en contacto pronto." 
        },
        { status: 200 }
      );
    }

    // Verificar que el email emisor esté configurado
    const senderEmail = process.env.OFFICE365_SENDER_EMAIL;
    if (!senderEmail) {
      console.error("ERROR: OFFICE365_SENDER_EMAIL no configurado");
      return NextResponse.json(
        { error: "Configuración de email no disponible" },
        { status: 500 }
      );
    }

    // Log de inicio de envío con buzón compartido
    console.log("📧 Iniciando envío de email desde buzón compartido/usuario:");
    console.log(`   Buzón emisor: ${senderEmail}`);
    console.log(`   Contacto: ${name} (${company})`);
    console.log(`   Email cliente: ${email}`);

    // Obtener cliente de Graph API
    const graphClient = getGraphClient();

    // Preparar el mensaje
    // Flujo circular optimizado:
    // - Emisor: OFFICE365_SENDER_EMAIL (buzón compartido)
    // - Receptor: OFFICE365_SENDER_EMAIL (mismo buzón compartido)
    // - Reply-To: email del cliente (para respuesta directa)
    // Ventajas: Hub centralizado de leads, visibilidad para todo el equipo, sin costos de licencia
    const message = {
      message: {
        subject: `[DEVIT506 Web] Nuevo contacto de ${company}`,
        body: {
          contentType: "HTML",
          content: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #222223; 
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 0;
    }
    .header { 
      background-color: #009CDE; 
      color: white; 
      padding: 30px 20px; 
      text-align: center; 
      border-radius: 8px 8px 0 0; 
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content { 
      background-color: #f9f9f9; 
      padding: 30px 20px; 
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
    }
    .field { 
      margin-bottom: 25px; 
    }
    .label { 
      font-weight: bold; 
      color: #222223; 
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value { 
      color: #555; 
      font-size: 16px;
      line-height: 1.5;
    }
    .challenge-box { 
      background-color: white; 
      padding: 20px; 
      border-left: 4px solid #009CDE; 
      margin-top: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .footer { 
      background-color: #222223; 
      color: #999; 
      padding: 20px; 
      text-align: center; 
      font-size: 12px; 
      border-radius: 0 0 8px 8px; 
    }
    .footer p {
      margin: 5px 0;
    }
    .footer strong {
      color: #009CDE;
    }
    .email-link {
      color: #009CDE;
      text-decoration: none;
      font-weight: 500;
    }
    .email-link:hover {
      text-decoration: underline;
    }
    .divider {
      height: 1px;
      background-color: #e0e0e0;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DEVIT506</h1>
      <p>Nuevo contacto desde la web</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">Nombre completo</div>
        <div class="value">${name}</div>
      </div>
      
      <div class="divider"></div>
      
      <div class="field">
        <div class="label">Empresa</div>
        <div class="value">${company}</div>
      </div>
      
      <div class="divider"></div>
      
      <div class="field">
        <div class="label">Email de contacto</div>
        <div class="value">
          <a href="mailto:${email}" class="email-link">${email}</a>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="field">
        <div class="label">Desafío Tecnológico</div>
        <div class="challenge-box">
          ${challenge.replace(/\n/g, "<br>")}
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Fecha de recepción:</strong> ${new Date().toLocaleString("es-CR", { 
        timeZone: "America/Costa_Rica",
        dateStyle: "full",
        timeStyle: "short"
      })}</p>
      <p style="margin-top: 15px;">DEVIT506 — Socios Tecnológicos Estratégicos</p>
      <p>San José, Costa Rica</p>
    </div>
  </div>
</body>
</html>
          `,
        },
        toRecipients: [
          {
            emailAddress: {
              // CRÍTICO: Usar el mismo buzón como receptor
              // Esto crea un hub centralizado donde todo el equipo de ventas
              // puede ver los leads entrantes sin necesidad de reenvíos
              address: senderEmail, // ej: no-reply.web@devit506.net
            },
          },
        ],
        replyTo: [
          {
            emailAddress: {
              // CRÍTICO: Reply-To apunta al cliente
              // Al hacer clic en "Responder" desde el buzón compartido,
              // el email va directo al cliente (no al buzón no-reply)
              address: email, // Email del cliente desde el formulario
              name: name,     // Nombre del cliente
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    // Enviar email usando Graph API desde buzón específico
    // Flujo circular: Buzón compartido envía Y recibe (hub centralizado de leads)
    console.log(`📤 Enviando vía endpoint: /users/${senderEmail}/sendMail`);
    console.log(`   🔄 Flujo circular: ${senderEmail} → ${senderEmail}`);
    
    await graphClient
      .api(`/users/${senderEmail}/sendMail`)
      .post(message);

    console.log("✅ Email interno enviado exitosamente vía Microsoft Graph API");
    console.log(`   📧 Tipo: Buzón Compartido (hub centralizado)`);
    console.log(`   📤 Emisor: ${senderEmail}`);
    console.log(`   📥 Receptor: ${senderEmail} (mismo buzón)`);
    console.log(`   ↩️  Reply-To: ${email} (${name} - ${company})`);
    console.log(`   📋 Asunto: [DEVIT506 Web] Nuevo contacto de ${company}`);
    console.log(`   ✨ Lead enviado y recibido en buzón compartido centralizado`);
    console.log(`   👥 Visible para todo el equipo de ventas`);

    // AUTO-RESPONDER: Enviar confirmación automática al cliente
    console.log(`📧 Enviando auto-responder al cliente: ${email}`);
    
    const autoResponderMessage = {
      message: {
        subject: "Recibimos su consulta - DEVIT506",
        body: {
          contentType: "HTML",
          content: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #222223; 
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container { 
      max-width: 600px; 
      margin: 40px auto; 
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header { 
      background-color: #222223; 
      color: white; 
      padding: 40px 30px; 
      text-align: center;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .brand-accent {
      color: #009CDE;
    }
    .header p {
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .content { 
      padding: 40px 30px; 
    }
    .greeting {
      font-size: 18px;
      color: #222223;
      margin-bottom: 20px;
    }
    .message-box {
      background-color: #f9f9f9;
      padding: 25px;
      border-left: 4px solid #009CDE;
      margin: 25px 0;
      font-size: 16px;
      line-height: 1.8;
    }
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 14px;
      color: #666;
    }
    .footer { 
      background-color: #f9f9f9; 
      padding: 25px 30px; 
      text-align: center; 
      font-size: 13px;
      color: #666;
      border-top: 1px solid #e0e0e0;
    }
    .footer a {
      color: #009CDE;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DEVIT<span class="brand-accent">506</span></h1>
      <p>Socios Tecnológicos Estratégicos</p>
    </div>
    
    <div class="content">
      <p class="greeting">Hola <strong>${name}</strong>,</p>
      
      <div class="message-box">
        Recibimos su consulta sobre <strong>${company}</strong> y agradecemos su interés en nuestros servicios.
        <br><br>
        Un consultor senior de DEVIT506 revisará su <strong>Desafío Tecnológico</strong> y se pondrá en contacto con usted 
        en las próximas <strong>24 horas</strong> para discutir cómo podemos ayudarle.
      </div>
      
      <p>
        Mientras tanto, si tiene alguna pregunta urgente, no dude en responder directamente a este correo.
      </p>
      
      <div class="signature">
        <p><strong>DEVIT506</strong> — Strategic Technology Leadership</p>
        <p>San José, Costa Rica</p>
        <p><a href="mailto:info@devit506.com">info@devit506.com</a></p>
      </div>
    </div>
    
    <div class="footer">
      <p>Este es un mensaje automático. Por favor no responder a ${senderEmail}.</p>
      <p style="margin-top: 10px;">© ${new Date().getFullYear()} DEVIT506. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
          `,
        },
        toRecipients: [
          {
            emailAddress: {
              address: email, // Email del cliente
              name: name,
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    // Enviar auto-responder al cliente
    await graphClient
      .api(`/users/${senderEmail}/sendMail`)
      .post(autoResponderMessage);

    console.log("✅ Auto-responder enviado al cliente");
    console.log(`   📤 Emisor: ${senderEmail}`);
    console.log(`   📥 Destinatario: ${email} (${name})`);
    console.log(`   📋 Asunto: Recibimos su consulta - DEVIT506`);

    return NextResponse.json(
      { 
        success: true, 
        message: "Mensaje enviado exitosamente. Nos pondremos en contacto pronto." 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Error al enviar email vía Graph API:", error);
    
    // Log detallado para debugging
    if (error.statusCode) {
      console.error(`   Status Code: ${error.statusCode}`);
    }
    if (error.code) {
      console.error(`   Error Code: ${error.code}`);
    }
    if (error.message) {
      console.error(`   Message: ${error.message}`);
    }
    if (error.body) {
      console.error(`   Body: ${JSON.stringify(error.body, null, 2)}`);
    }

    // Mensajes de error específicos
    let errorMessage = "Error al enviar el mensaje. Por favor intenta nuevamente o contáctanos directamente.";
    
    if (error.statusCode === 401) {
      console.error("   → Error de autenticación. Verificar credenciales de Azure AD.");
      errorMessage = "Error de autenticación con Microsoft 365. Por favor contacta al administrador.";
    } else if (error.statusCode === 403) {
      console.error("   → Permisos insuficientes. Verificar que:");
      console.error("      1. La app tenga Mail.Send permission con admin consent");
      console.error("      2. El buzón compartido tenga permisos de envío");
      console.error(`      3. La app pueda acceder al buzón: ${process.env.OFFICE365_SENDER_EMAIL}`);
      errorMessage = "Permisos insuficientes para enviar email desde buzón compartido. Por favor contacta al administrador.";
    } else if (error.code === "MailboxNotEnabledForRESTAPI") {
      console.error("   → Mailbox no habilitado para Graph API.");
      console.error(`      Buzón: ${process.env.OFFICE365_SENDER_EMAIL}`);
      console.error("      Verificar que el buzón tenga licencia Exchange Online.");
      errorMessage = "El buzón compartido no está habilitado para API. Por favor contacta al administrador.";
    } else if (error.code === "ErrorAccessDenied" || error.message?.includes("Access denied")) {
      console.error("   → Acceso denegado al buzón compartido.");
      console.error(`      Buzón: ${process.env.OFFICE365_SENDER_EMAIL}`);
      console.error("      Verificar que la aplicación tenga permisos para este buzón específico.");
      errorMessage = "Acceso denegado al buzón compartido. Por favor contacta al administrador.";
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}
