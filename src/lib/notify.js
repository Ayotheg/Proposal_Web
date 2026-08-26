import emailjs from '@emailjs/browser'


const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

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
