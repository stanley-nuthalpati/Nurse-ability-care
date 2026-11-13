import nodemailer from 'nodemailer'
import path from 'node:path'

const businessEmail = 'admin@nurseabilitycare.com.au'
const businessName = 'Nurse Ability Care'
const businessPhoneNumbers = [
  { label: '+61 403 612 209', href: 'tel:+61403612209' },
  { label: '+61 430 829 992', href: 'tel:+61430829992' },
]
const brandLogoFilename = 'Nurse Ability Care Logo.png'
const brandLogoCid = 'nurse-ability-care-logo'
const brandLogoPath = path.join(process.cwd(), 'public', brandLogoFilename)

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

function emailLayout(content: string, previewText: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${businessName}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5eff7;font-family:Arial,Helvetica,sans-serif;color:#263238;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(previewText)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f5eff7;">
      <tr><td align="center" style="padding:28px 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background-color:#ffffff;border-radius:14px;overflow:hidden;">
          <tr><td height="7" style="height:7px;background-color:#713b78;font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr><td align="center" style="padding:24px 28px 20px;background-color:#ffffff;">
            <img src="cid:${brandLogoCid}" width="300" alt="${businessName} — Empowering care, enabling life" style="display:block;width:100%;max-width:300px;height:auto;border:0;">
          </td></tr>
          <tr><td style="padding:0 32px;"><div style="height:1px;background-color:#e5e7eb;font-size:0;line-height:0;">&nbsp;</div></td></tr>
          <tr><td style="padding:30px 32px 34px;">${content}</td></tr>
          <tr><td style="padding:26px 32px;background-color:#542b5b;color:#ffffff;">
            <p style="margin:0 0 12px;font-size:16px;line-height:1.4;font-weight:bold;color:#ffffff;">${businessName}</p>
            <p style="margin:0 0 14px;font-size:13px;line-height:1.7;color:#eee5f0;">We’re here to help. Contact our friendly team:</p>
            ${businessPhoneNumbers.map(({ label, href }) => `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><a href="${href}" style="color:#8bd5dc;text-decoration:none;">${label}</a></p>`).join('')}
            <p style="margin:0 0 8px;font-size:13px;line-height:1.6;"><a href="mailto:${businessEmail}" style="color:#8bd5dc;text-decoration:none;">${businessEmail}</a></p>
            <p style="margin:0;font-size:13px;line-height:1.6;"><a href="https://www.nurseabilitycare.com.au/" style="color:#8bd5dc;text-decoration:none;">www.nurseabilitycare.com.au</a></p>
          </td></tr>
          <tr><td align="center" style="padding:14px 24px;background-color:#47244d;color:#d8cddd;font-size:11px;line-height:1.5;">
            &copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.
          </td></tr>
        </table>
      </td></tr>
    </table>
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

  return emailLayout(`<p style="margin:0 0 8px;color:#159baa;font-size:12px;line-height:1.4;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Website contact form</p>
    <h1 style="margin:0 0 12px;color:#542b5b;font-size:25px;line-height:1.3;">New website enquiry</h1>
    <p style="margin:0 0 24px;color:#5f6873;font-size:15px;line-height:1.7;">A visitor has submitted a new enquiry. You can reply directly to them using the Reply-To address.</p>
    <table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table>
    <h2 style="margin:26px 0 10px;color:#542b5b;font-size:18px;">Message</h2>
    <div style="padding:16px;background:#f5eff7;border-left:4px solid #159baa;border-radius:6px;color:#263238;font-size:14px;line-height:1.7;white-space:pre-wrap;overflow-wrap:anywhere;">${escapeHtml(message)}</div>`,
    `New website enquiry from ${fullName} for Nurse Ability Care.`,
  )
}

function acknowledgementHtml(fullName: string) {
  return emailLayout(`<p style="margin:0 0 8px;color:#159baa;font-size:12px;line-height:1.4;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Enquiry received</p>
    <h1 style="margin:0 0 20px;color:#542b5b;font-size:26px;line-height:1.3;">Thank you for getting in touch</h1>
    <p style="margin:0 0 14px;color:#263238;font-size:16px;line-height:1.7;">Dear ${escapeHtml(fullName)},</p>
    <p style="margin:0 0 14px;color:#5f6873;font-size:15px;line-height:1.8;">Thank you for contacting Nurse Ability Care. We have successfully received your enquiry, and our team appreciates your interest in our services.</p>
    <p style="margin:0 0 14px;color:#5f6873;font-size:15px;line-height:1.8;">One of our team members will review your request and get back to you as soon as possible.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:22px 0;background-color:#eaf7f8;border-radius:8px;">
      <tr><td style="padding:16px 18px;border-left:4px solid #159baa;">
        <p style="margin:0;color:#263238;font-size:14px;line-height:1.7;"><strong style="color:#542b5b;">Need urgent help?</strong><br>If your enquiry is urgent, contact our team using the phone numbers in the footer.</p>
      </td></tr>
    </table>
    <p style="margin:0 0 14px;color:#5f6873;font-size:15px;line-height:1.8;">Thank you for considering Nurse Ability Care. We look forward to speaking with you.</p>
    <p style="margin:24px 0 0;color:#263238;font-size:15px;line-height:1.8;">Kind regards,<br><strong style="color:#542b5b;">${businessName} Team</strong></p>`,
    `Thanks ${fullName}, your enquiry has been received by Nurse Ability Care.`,
  )
}

function brandLogoAttachment() {
  return {
    filename: brandLogoFilename,
    path: brandLogoPath,
    cid: brandLogoCid,
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
    attachments: [brandLogoAttachment()],
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
      attachments: [brandLogoAttachment()],
    })
  } catch (error) {
    console.error(
      'Contact acknowledgement email delivery failed:',
      error instanceof Error ? error.name : 'Unknown error',
    )
  }
}
