import nodemailer from 'nodemailer'

export const sendMailPassword = async (purchaser,token) =>
{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port:587,
        secure:false,
        auth:
        {
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_KEY
        },
        tls: {
            rejectUnauthorized: false
          }
    })

    const mail = {
        from: process.env.SMTP_MAIL,
        to: purchaser,
        subjetc: 'Cambio de contraseña',
        html:`
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1>Solicitud de cambio de conseña</h1>
        </div>
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 20px;">

          <h2 style="margin-top: 0;"Esta es su token para el cambio de contraseña  ${token} </h2>
        </div>
        <p>Esta es su token para el cambio de contraseña  ${token} </p>
        <p>Si recibio este mail y no solicitó el cambio de contraseña cambiarla</p>
      </div>`
    }

    return await transporter.sendMail(mail)
}