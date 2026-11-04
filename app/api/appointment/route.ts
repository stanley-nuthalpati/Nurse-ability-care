import { NextResponse } from 'next/server'
import { EmailConfigurationError, sendWebsiteEmail } from '@/lib/email'

export const runtime = 'nodejs'

const maxRequestBytes = 10_000

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function textField(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const text = value.trim()
  return text.length <= maxLength ? text : null
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > maxRequestBytes) {
    return NextResponse.json({ error: 'Your request is too large.' }, { status: 413 })
  }

  let payload: unknown
  try {
    const body = await request.text()
    if (new TextEncoder().encode(body).byteLength > maxRequestBytes) {
      return NextResponse.json({ error: 'Your request is too large.' }, { status: 413 })
    }
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Please submit a valid appointment request.' }, { status: 400 })
  }

  if (!isRecord(payload)) {
    return NextResponse.json({ error: 'Please submit a valid appointment request.' }, { status: 400 })
  }

  const fullName = textField(payload.fullName, 120)
  const email = textField(payload.email, 254)
  const phone = textField(payload.phone, 30)
  const contactMethod = payload.contactMethod
  const supportRequired = textField(payload.supportRequired ?? '', 2000)
  const preferredDate = textField(payload.preferredDate ?? '', 10)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneDigits = phone?.replace(/\D/g, '') ?? ''

  if (
    !fullName ||
    !email ||
    !emailPattern.test(email) ||
    !phone ||
    phoneDigits.length < 8 ||
    phoneDigits.length > 15 ||
    !['Phone', 'Email'].includes(String(contactMethod)) ||
    supportRequired === null ||
    preferredDate === null ||
    payload.privacyConsent !== true
  ) {
    return NextResponse.json({ error: 'Please check the required details and privacy consent.' }, { status: 400 })
  }

  if (preferredDate && (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || preferredDate < new Date().toISOString().slice(0, 10))) {
    return NextResponse.json({ error: 'Please choose a valid appointment date.' }, { status: 400 })
  }

  try {
    await sendWebsiteEmail({
      subject: 'New Nurse Ability Care appointment request',
      replyTo: email,
      text: [
        'A new appointment request was submitted through the Nurse Ability Care website.',
        '',
        `Full name: ${fullName}`,
        `Email address: ${email}`,
        `Phone number: ${phone}`,
        `Preferred contact method: ${contactMethod}`,
        `Support required: ${supportRequired || 'Not provided'}`,
        `Preferred date: ${preferredDate || 'Not specified'}`,
        'Privacy policy consent: Yes',
      ].join('\n'),
    })
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      return NextResponse.json(
        { error: 'Email delivery is not configured yet. Please contact our team by phone or email.' },
        { status: 503 },
      )
    }
    console.error('Appointment request email delivery failed:', error instanceof Error ? error.name : 'Unknown error')
    return NextResponse.json({ error: 'We could not send your request just now. Please try again or contact our team directly.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
