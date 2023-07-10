import nodemailer from 'nodemailer'

export async function sendMail(subject, message, email) {
  const CLIENT_EMAIL = process.env.REACT_APP_EMAIL
  const SMTP_HOST = process.env.REACT_APP_EMAIL_SERVICE
  const SMTP_PORT = process.env.REACT_APP_EMAIL_SERVICE_PORT
  const USERNAME = process.env.REACT_APP_EMAIL
  const PASSWORD = process.env.REACT_APP_EMAIL_APP_PASSWORD

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: USERNAME,
        pass: PASSWORD,
      },
    });

    const mailOptions = {
      from: `${email}  <${CLIENT_EMAIL}>`,
      to: CLIENT_EMAIL,
      subject: subject,
      html: `<div>Sender: ${email}</div> ${message}`,
    }

    const result = await transport.sendMail(mailOptions)
    if (result.response.includes('250 2.0.0 OK')) {
      result.status = 200;
    }
    return result

  } catch (error) {
    let err = { message: error, status: 500 }
    throw err
  }
}
