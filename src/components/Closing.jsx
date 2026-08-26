import { motion } from 'framer-motion'
import DoodleHeart from './DoodleHeart.jsx'
import { closing } from '../content.js'

export default function Closing() {
  // Locked to the moment she actually caught the YESSSS button, stored in
  // FinalProposal.jsx — not recalculated on every visit/reload, so it
  // stays true to the real date even if the link is opened again later.
  const stored = localStorage.getItem('proposalRespondedAt')
  const respondedAt = stored ? new Date(stored) : new Date()

  const today = respondedAt.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section
      style={{
        minHeight: '100vh',
        padding: '96px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <DoodleHeart size={32} color="var(--color-pink-deep)" />

      <Eyebrow>{closing.eyebrow}</Eyebrow>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{
          marginTop: '18px',
          fontFamily: 'var(--font-accent)',
          fontStyle: 'italic',
          fontSize: '20px',
          color: 'var(--color-ink)',
        }}
      >
        {today}
      </motion.p>
    </section>
  )
}

function Eyebrow({ children }) {
  return (
    <div
      style={{
        marginTop: '22px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-label)',
        fontSize: '12px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-pink-deep)',
      }}
    >
      <span style={{ width: '18px', height: '1px', background: 'var(--color-pink-deep)' }} />
      {children}
    </div>
  )
}
