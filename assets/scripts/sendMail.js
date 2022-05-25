import nodemailer from 'nodemailer'
import { google } from 'googleapis'

/**
 * Sending the email with ebook
 */
export async function sendMail(subject, message, email) {
  const CLIENT_EMAIL = process.env.REACT_APP_EMAIL
  const CLIENT_ID = process.env.REACT_APP_EMAIL_CLIENT_ID
  const CLIENT_SECRET = process.env.REACT_APP_EMAIL_CLIENT_SECRET
  const REDIRECT_URI = process.env.REACT_APP_EMAIL_CLIENT_REDIRECT_URI
  const REFRESH_TOKEN = process.env.REACT_APP_EMAIL_REFRESH_TOKEN
  const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  )

  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

  try {
    // Generate the accessToken on the fly
    const accessToken = await OAuth2Client.getAccessToken()

    // Create the email envelope (transport)
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: CLIENT_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    })

    // Create the email options and body
    const mailOptions = {
      from: `${email}  <${CLIENT_EMAIL}>`,
      to: CLIENT_EMAIL,
      subject: subject,
      html: `<div>Sender: ${email}</div> ${message}`,
    }

    // Set up the email options and delivering it
    const result = await transport.sendMail(mailOptions)
    return result
  } catch (error) {
    return error
  }
}
