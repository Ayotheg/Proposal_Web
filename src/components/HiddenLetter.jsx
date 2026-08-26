import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail } from 'lucide-react'
import { hiddenLetter } from '../content.js'
import ContinueButton from './ContinueButton.jsx'

export default function HiddenLetter({ onNext }) {
  const [open, setOpen] = useState(false)

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
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="envelope"
            onClick={() => setOpen(true)}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: 'none',
              background: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px',
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '20px',
                background: 'var(--color-surface)',
                boxShadow: '0 10px 26px rgba(43, 35, 32, 0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mail size={32} color="var(--color-pink-deep)" />
            </motion.div>
            <span
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-ink)',
              }}
            >
              {hiddenLetter.teaser}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              maxWidth: '480px',
              background: 'var(--color-surface)',
              borderRadius: '20px',
              padding: '36px 30px',
              boxShadow: '0 16px 40px rgba(43, 35, 32, 0.16)',
              textAlign: 'left',
            }}
          >
            {hiddenLetter.body.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.15 }}
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontStyle: 'italic',
                  fontSize: '19px',
                  lineHeight: 1.6,
                  margin: '0 0 16px',
                  color: 'var(--color-ink)',
                }}
              >
                {p}
              </motion.p>
            ))}
            <p
              style={{
                marginTop: '20px',
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                fontSize: '17px',
                color: 'var(--color-pink-deep)',
                textAlign: 'right',
              }}
            >
              {hiddenLetter.signature}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {open && <ContinueButton onClick={onNext} />}
    </section>
  )
}
