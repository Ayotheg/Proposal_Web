import emailjs from '@emailjs/browser'

// EmailJS lets a fully static site send an email from the browser — no
// backend/server needed. Free tier covers this easily (one-off use, not a
// high-volume app).
//
// Setup (one-time, ~5 minutes):
//   1. Create a free account at https://www.emailjs.com
//   2. Add an Email Service (e.g. connect your Gmail) — note the Service ID
//   3. Create an Email Template — it just needs two variables in the body:
//        {{message}}   — what happened / her note
//        {{sent_at}}   — timestamp
//      Set the template's "To email" field to your friend's own inbox —
//      that's what makes this "come back to him", not something in the code.
//   4. Grab your Public Key from Account > General
//   5. Fill in the three values below (or set them as environment
//      variables VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID /
//      VITE_EMAILJS_PUBLIC_KEY in a .env file, which is safer if this
//      project ever ends up in a public repo)

const SERVICE_ID = import.meta.env.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const TEMPLATE_ID = import.meta.env.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = import.meta.env.EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

const isConfigured = () =>
  ![SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].some((v) => !v || v.startsWith('YOUR_'))

// Fails silently (just logs) rather than breaking the proposal moment for
// her if email sending has a hiccup — the site experience matters more
// than the notification succeeding on the first try.
export async function sendResponse(message) {
  if (!isConfigured()) {
    console.warn('[notify] EmailJS is not configured yet — see src/lib/notify.js')
    return { sent: false, reason: 'not_configured' }
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { message, sent_at: new Date().toLocaleString() },
      { publicKey: PUBLIC_KEY }
    )
    return { sent: true }
  } catch (err) {
    console.error('[notify] failed to send', err)
    return { sent: false, reason: 'send_failed' }
  }
}
