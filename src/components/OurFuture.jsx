import { motion } from 'framer-motion'
import { ourFuture } from '../content.js'
import ContinueButton from './ContinueButton.jsx'

export default function OurFuture({ onNext }) {
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
      <Eyebrow>{ourFuture.eyebrow}</Eyebrow>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        style={{
          maxWidth: '460px',
          marginTop: '26px',
          fontFamily: 'var(--font-accent)',
          fontStyle: 'italic',
          fontSize: 'clamp(22px, 4.5vw, 30px)',
          lineHeight: 1.5,
          color: 'var(--color-ink)',
        }}
      >
        {ourFuture.line}
      </motion.p>

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
