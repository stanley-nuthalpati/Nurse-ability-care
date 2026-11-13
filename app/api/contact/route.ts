import { NextResponse } from 'next/server'
import { EmailConfigurationError, sendContactEmails } from '@/lib/email'

export const runtime = 'nodejs'

const maxRequestBytes = 10_000
const emailPattern =
  /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?$/i

function responseForSubmission(request: Request, message: string, status: number, submission: string) {
  if (request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: message }, { status })
  }

  const url = new URL('/contact', request.url)
  url.searchParams.set('submission', submission)
  return NextResponse.redirect(url, 303)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function textField(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const text = value.trim()
  return text.length <= maxLength ? text : null
}

export async function POST(request: Request) {
  const isJsonRequest = request.headers.get('content-type')?.includes('application/json') ?? false
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > maxRequestBytes) {
    return responseForSubmission(request, 'Your request is too large.', 413, 'invalid')
  }

  let payload: unknown
  try {
    const body = await request.text()
    if (new TextEncoder().encode(body).byteLength > maxRequestBytes) {
      return responseForSubmission(request, 'Your request is too large.', 413, 'invalid')
    }
    payload = isJsonRequest ? JSON.parse(body) : Object.fromEntries(new URLSearchParams(body))
  } catch {
    return responseForSubmission(request, 'Please submit a valid enquiry.', 400, 'invalid')
  }

  if (!isRecord(payload)) {
    return responseForSubmission(request, 'Please submit a valid enquiry.', 400, 'invalid')
  }

  const fullName = textField(payload.fullName, 120)
  const email = textField(payload.email, 254)
  const phone = textField(payload.phone, 30)
  const serviceOfInterest = textField(payload.serviceOfInterest, 120)
  const message = textField(payload.message, 4000)
  const website = textField(payload.website ?? '', 200)
  const phoneDigits = phone?.replace(/\D/g, '') ?? ''

  if (website === null) {
    return responseForSubmission(request, 'Please submit a valid enquiry.', 400, 'invalid')
  }

  if (website) {
    if (!isJsonRequest) {
      const url = new URL('/contact', request.url)
      url.searchParams.set('submission', 'sent')
      return NextResponse.redirect(url, 303)
    }
    return NextResponse.json({ ok: true })
  }

  if (
    !fullName ||
    !email ||
    !emailPattern.test(email) ||
    !phone ||
    !/^\+?[0-9 ().-]+$/.test(phone) ||
    phoneDigits.length < 8 ||
    phoneDigits.length > 15 ||
    !serviceOfInterest ||
    !message ||
    (payload.privacyConsent !== true && payload.privacyConsent !== 'on')
  ) {
    return responseForSubmission(
      request,
      'Please check the required details and privacy consent.',
      400,
      'invalid',
    )
  }

  try {
    await sendContactEmails({
      fullName,
      email,
      phone,
      serviceOfInterest,
      message,
    })
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      return responseForSubmission(
        request,
        'Email delivery is not configured yet. Please contact our team by phone or email.',
        503,
        'not-configured',
      )
    }
    console.error('Contact enquiry email delivery failed:', error instanceof Error ? error.name : 'Unknown error')
    return responseForSubmission(
      request,
      'We could not send your enquiry just now. Please try again or contact our team directly.',
      502,
      'failed',
    )
  }

  if (!isJsonRequest) {
    const url = new URL('/contact', request.url)
    url.searchParams.set('submission', 'sent')
    return NextResponse.redirect(url, 303)
  }

  return NextResponse.json({ ok: true })
}
