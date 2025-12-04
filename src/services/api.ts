interface EmailData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  message?: string;
}

export const sendContactEmail = async (data: EmailData): Promise<EmailResponse> => {
  try {
    const emailBody = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Solicitud de Contacto</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
          <tr>
            <td style="padding: 40px 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">

                <!-- Header con gradiente -->
                <tr>
                  <td style="background: linear-gradient(135deg, #5B9FA0 0%, #A5C9CA 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                      SIR Integrales
                    </h1>
                    <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.95;">
                      Nueva Solicitud de Contacto
                    </p>
                  </td>
                </tr>

                <!-- Contenido -->
                <tr>
                  <td style="padding: 40px 30px;">

                    <!-- Info del contacto -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #5B9FA0;">

                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="padding: 0 0 15px 0;">
                                <p style="margin: 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                  Nombre
                                </p>
                                <p style="margin: 5px 0 0 0; font-size: 16px; color: #2A3D5A; font-weight: 600;">
                                  ${data.name}
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td style="padding: 15px 0; border-top: 1px solid #e9ecef;">
                                <p style="margin: 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                  Email
                                </p>
                                <p style="margin: 5px 0 0 0; font-size: 16px; color: #2A3D5A; font-weight: 600;">
                                  <a href="mailto:${data.email}" style="color: #5B9FA0; text-decoration: none;">
                                    ${data.email}
                                  </a>
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <td style="padding: 15px 0 0 0; border-top: 1px solid #e9ecef;">
                                <p style="margin: 0; font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                                  Empresa
                                </p>
                                <p style="margin: 5px 0 0 0; font-size: 16px; color: #2A3D5A; font-weight: 600;">
                                  ${data.company || 'No especificada'}
                                </p>
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>

                    <!-- Mensaje -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 15px 0;">
                          <h2 style="margin: 0; font-size: 18px; color: #2A3D5A; font-weight: 600;">
                            Mensaje
                          </h2>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                          <p style="margin: 0; font-size: 15px; color: #495057; line-height: 1.6; white-space: pre-wrap;">
${data.message}
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer con el mismo gradiente que el header -->
<tr>
  <td style="background: linear-gradient(135deg, #5B9FA0 0%, #A5C9CA 100%); padding: 35px 30px; text-align: center;">
    <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: -0.3px;">
      SIR - Soluciones de Reclutamiento
    </h2>
  </td>
</tr>
        </table>
      </body>
      </html>
    `;

    const response = await fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'empleos@sir.com.gt',
        subject: `Nuevo contacto de ${data.name} - ${data.company || 'Sin empresa'}`,
        html: emailBody,
        text: `Nombre: ${data.name}\nEmail: ${data.email}\nEmpresa: ${data.company || 'No especificada'}\n\nMensaje:\n${data.message}`,
        from: `Contacto Web <mailgun@sir.com.gt>`
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al enviar el correo');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
