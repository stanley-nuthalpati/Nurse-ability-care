import nodemailer from 'nodemailer'

const recipient = 'stanleyyesu@gmail.com'

export class EmailConfigurationError extends Error {
  constructor() {
    super('SMTP email settings are missing or invalid.')
    this.name = 'EmailConfigurationError'
  }
}

export async function sendWebsiteEmail({
  subject,
  replyTo,
  text,
}: {
  subject: string
  replyTo: string
  text: string
}) {
  const host = process.env.SMTP_HOST?.trim()
  const from = process.env.SMTP_FROM?.trim()
  const port = Number(process.env.SMTP_PORT || '587')
  const secure = process.env.SMTP_SECURE === 'true'
  const user = process.env.SMTP_USER?.trim()
  const password = process.env.SMTP_PASSWORD

  if (
    !host ||
    !from ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    Boolean(user) !== Boolean(password)
  ) {
    throw new EmailConfigurationError()
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: user && password ? { user, pass: password } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: { minVersion: 'TLSv1.2' },
  })

  await transporter.sendMail({
    from,
    to: recipient,
    replyTo,
    subject,
    text,
  })
}
