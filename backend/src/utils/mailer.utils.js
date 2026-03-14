import { transporter } from "../config/mailer.js"

export const sendResetEmail = async (to, token) => {

  const resetUrl = `http://localhost:3000/reset-password?token=${token}`

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Password recovery",
    html: `
      <h2>Password reset</h2>
      <p>Click the link below:</p>
      <a href="${resetUrl}">Reset password</a>
    `
  })
}