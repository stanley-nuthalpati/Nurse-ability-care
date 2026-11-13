import nodemailer from 'nodemailer'

const businessEmail = 'admin@nurseabilitycare.com.au'
const businessName = 'Nurse Ability Care'

export class EmailConfigurationError extends Error {
  constructor() {
    super('SMTP email settings are missing or invalid.')
    this.name = 'EmailConfigurationError'
  }
}

function createTransporter() {
  const host = process.env.SMTP_HOST?.trim()
  const port = Number(process.env.SMTP_PORT)
  const secure = process.env.SMTP_SECURE?.trim().toLowerCase() === 'true'
  const user = process.env.SMTP_USER?.trim()
  const password = process.env.SMTP_PASSWORD
  const from = process.env.SMTP_FROM?.trim()

  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !user ||
    user.toLowerCase() !== businessEmail ||
    !password ||
    !from ||
    from.toLowerCase() !== businessEmail
  ) {
    throw new EmailConfigurationError()
  }

  return {
    from: { name: businessName, address: from },
    transporter: nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: !secure,
      auth: { user, pass: password },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
      tls: { minVersion: 'TLSv1.2' },
    }),
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]
  })
}

function emailLayout(content: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${businessName}</title>
  </head>
  <body style="margin:0;padding:0;background:#f2f7f6;font-family:Arial,Helvetica,sans-serif;color:#263b3b;">
    <div style="padding:24px 12px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
        <div style="padding:24px 32px;background:#075e5a;color:#ffffff;">
          <p style="margin:0;font-size:13px;letter-spacing:1px;text-transform:uppercase;">${businessName}</p>
        </div>
        <div style="padding:32px;">${content}</div>
        <div style="padding:20px 32px;background:#f5f8f7;color:#526565;font-size:13px;line-height:1.6;">
          <strong>${businessName}</strong><br>
          <a href="mailto:${businessEmail}" style="color:#075e5a;">${businessEmail}</a><br>
          <a href="https://www.nurseabilitycare.com.au/" style="color:#075e5a;">www.nurseabilitycare.com.au</a>
        </div>
      </div>
    </div>
  </body>
</html>`
}

function enquiryHtml({
  fullName,
  email,
  phone,
  serviceOfInterest,
  message,
}: {
  fullName: string
  email: string
  phone: string
  serviceOfInterest: string
  message: string
}) {
  const rows = [
    ['Full name', fullName],
    ['Email address', email],
    ['Phone number', phone],
    ['Service of interest', serviceOfInterest],
    ['Privacy policy consent', 'Yes'],
  ]
    .map(
      ([label, value]) => `<tr>
        <th align="left" style="padding:10px 12px;border-bottom:1px solid #e7eeee;color:#526565;font-size:14px;">${label}</th>
        <td style="padding:10px 12px;border-bottom:1px solid #e7eeee;font-size:14px;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join('')

  return emailLayout(`<h1 style="margin:0 0 12px;color:#075e5a;font-size:25px;line-height:1.3;">New website enquiry</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">A visitor has submitted the Contact Us form.</p>
    <table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table>
    <h2 style="margin:24px 0 10px;color:#075e5a;font-size:18px;">Message</h2>
    <div style="padding:16px;background:#f5f8f7;border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</div>`)
}

function acknowledgementHtml(fullName: string) {
  return emailLayout(`<h1 style="margin:0 0 18px;color:#075e5a;font-size:25px;line-height:1.3;">Thank you for contacting us</h1>
    <p style="margin:0 0 14px;font-size:16px;line-height:1.7;">Dear ${escapeHtml(fullName)},</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Thank you for contacting Nurse Ability Care. We have successfully received your enquiry, and our team appreciates your interest in our services.</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">One of our team members will review your request and get back to you as soon as possible.</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">If your enquiry is urgent, please contact us directly at <a href="mailto:${businessEmail}" style="color:#075e5a;">${businessEmail}</a>.</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Thank you for considering Nurse Ability Care.</p>
    <p style="margin:24px 0 0;font-size:15px;line-height:1.7;">Kind regards,<br><strong>${businessName} Team</strong></p>`)
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
  const { from, transporter } = createTransporter()
  await transporter.sendMail({
    from,
    to: businessEmail,
    replyTo,
    subject,
    text,
  })
}

export async function sendContactEmails({
  fullName,
  email,
  phone,
  serviceOfInterest,
  message,
}: {
  fullName: string
  email: string
  phone: string
  serviceOfInterest: string
  message: string
}) {
  const { from, transporter } = createTransporter()
  const enquiryText = [
    'A new enquiry was submitted through the Nurse Ability Care website.',
    '',
    `Full name: ${fullName}`,
    `Email address: ${email}`,
    `Phone number: ${phone}`,
    `Service of interest: ${serviceOfInterest}`,
    'Privacy policy consent: Yes',
    '',
    'Message:',
    message,
  ].join('\n')

  await transporter.sendMail({
    from,
    to: businessEmail,
    replyTo: email,
    subject: 'New Website Enquiry – Nurse Ability Care',
    text: enquiryText,
    html: enquiryHtml({ fullName, email, phone, serviceOfInterest, message }),
  })

  try {
    await transporter.sendMail({
      from,
      to: email,
      replyTo: businessEmail,
      subject: 'Thank You for Contacting Nurse Ability Care!',
      text: [
        `Dear ${fullName},`,
        '',
        'Thank you for contacting Nurse Ability Care.',
        '',
        'We have successfully received your enquiry. Our team appreciates your interest in our services.',
        '',
        'One of our team members will review your request and get back to you as soon as possible.',
        '',
        `If your enquiry is urgent, you can contact us directly at ${businessEmail}.`,
        '',
        'Thank you for considering Nurse Ability Care.',
        '',
        'Kind regards,',
        'Nurse Ability Care Team',
        businessEmail,
        'https://www.nurseabilitycare.com.au/',
      ].join('\n'),
      html: acknowledgementHtml(fullName),
    })
  } catch (error) {
    console.error(
      'Contact acknowledgement email delivery failed:',
      error instanceof Error ? error.name : 'Unknown error',
    )
  }
}
