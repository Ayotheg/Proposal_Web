import { motion } from 'framer-motion'
import { whatYouMeanToMe } from '../content.js'
import ContinueButton from './ContinueButton.jsx'

export default function WhatYouMeanToMe({ onNext }) {
  return (
    <section
      style={{
        minHeight: '100vh',
        padding: '96px 24px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Eyebrow>{whatYouMeanToMe.eyebrow}</Eyebrow>

        <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {whatYouMeanToMe.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            margin: '36px 0 0',
            padding: '24px',
            borderRadius: '18px',
            background: 'var(--color-pink-soft)',
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
            fontSize: '20px',
            lineHeight: 1.5,
            color: 'var(--color-ink)',
          }}
        >
          “{whatYouMeanToMe.closingQuote}”
        </motion.blockquote>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ContinueButton onClick={onNext} />
        </div>
      </div>
    </section>
  )
}

function Eyebrow({ children }) {
  return (
    <div
      style={{
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
