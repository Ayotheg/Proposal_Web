import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DoodleHeart from './DoodleHeart.jsx'
import { thingsILove } from '../content.js'
import ContinueButton from './ContinueButton.jsx'

export default function ThingsILove({ onNext }) {
  const [tapped, setTapped] = useState(() => new Set())

  const toggle = (i) => {
    setTapped((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        padding: '96px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
        <Eyebrow>{thingsILove.eyebrow}</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(26px, 4.5vw, 36px)',
            margin: '18px 0 12px',
          }}
        >
          {thingsILove.heading}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--color-ink)',
            opacity: 0.65,
            margin: '0 0 44px',
          }}
        >
          tap the ones that make you smile
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '14px',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        {thingsILove.cards.map((label, i) => {
          const isTapped = tapped.has(i)
          return (
            <motion.button
              key={label}
              onClick={() => toggle(i)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: 'easeOut' }}
              style={{
                position: 'relative',
                border: 'none',
                borderRadius: '18px',
                padding: '26px 16px',
                background: 'var(--color-surface)',
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-label)',
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: isTapped
                  ? '0 8px 22px rgba(217, 142, 136, 0.35)'
                  : '0 4px 14px rgba(43, 35, 32, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isTapped ? 'filled' : 'outline'}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <DoodleHeart
                    size={22}
                    color={isTapped ? 'var(--color-pink-deep)' : 'var(--color-pink-soft)'}
                  />
                </motion.span>
              </AnimatePresence>
              {label}
            </motion.button>
          )
        })}
      </div>

      <ContinueButton onClick={onNext} />
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
