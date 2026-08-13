// Contact-form backend for the POLYSVIT landing page.
//
// Runs behind a public Lambda Function URL (see terraform/mail.tf). On every
// POST it appends the submitted { name, email, message } to a single
// mail.txt object in a *private* S3 bucket (never the public site bucket —
// that would make every visitor's email/message publicly downloadable).
//
// This is intentionally simple ("just dump it into mail.txt"): no auth, no
// CAPTCHA, no rate limiting beyond basic field-length caps. Fine for a
// low-traffic B2B contact form; if it starts attracting spam, add a
// honeypot field or hCaptcha/reCAPTCHA on the frontend and check it here.

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({})
const BUCKET = process.env.MAIL_BUCKET
const KEY = process.env.MAIL_KEY || 'mail.txt'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const MAX_LEN = { name: 200, email: 200, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const handler = async (event) => {
  const method = event?.requestContext?.http?.method

  if (method === 'OPTIONS') {
    return respond(204, null)
  }

  if (method !== 'POST') {
    return respond(405, { ok: false, error: 'Method not allowed.' })
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return respond(400, { ok: false, error: 'Invalid JSON body.' })
  }

  const name = clean(body.name, MAX_LEN.name)
  const email = clean(body.email, MAX_LEN.email)
  const message = clean(body.message, MAX_LEN.message)

  if (!name || !email || !message) {
    return respond(400, { ok: false, error: 'Missing required field(s).' })
  }
  if (!EMAIL_RE.test(email)) {
    return respond(400, { ok: false, error: 'Invalid email address.' })
  }

  try {
    const existing = await readExisting()
    const entry =
      `---\n` +
      `Date: ${new Date().toISOString()}\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Message: ${message}\n`

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: KEY,
        Body: existing + entry,
        ContentType: 'text/plain; charset=utf-8',
      }),
    )

    return respond(200, { ok: true })
  } catch (err) {
    console.error('contact-form error', err)
    return respond(500, { ok: false, error: 'Internal error.' })
  }
}

async function readExisting() {
  try {
    const got = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: KEY }))
    return await got.Body.transformToString()
  } catch (err) {
    if (err.name === 'NoSuchKey') return ''
    throw err
  }
}

function clean(value, maxLen) {
  return String(value ?? '').trim().slice(0, maxLen)
}

function respond(statusCode, obj) {
  return {
    statusCode,
    headers: obj ? { ...CORS_HEADERS, 'Content-Type': 'application/json' } : CORS_HEADERS,
    body: obj ? JSON.stringify(obj) : '',
  }
}
