import { motion } from 'framer-motion'
import DoodleHeart from './DoodleHeart.jsx'
import { timeline } from '../content.js'
import ContinueButton from './ContinueButton.jsx'

export default function Timeline({ onNext }) {
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
      <Eyebrow>{timeline.eyebrow}</Eyebrow>

      <div
        style={{
          marginTop: '40px',
          maxWidth: '420px',
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '9px',
            top: '10px',
            bottom: '10px',
            width: '1.5px',
            background: 'var(--color-line)',
          }}
        />

        {timeline.milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '14px 0',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: i === timeline.milestones.length - 1 ? 'var(--color-pink-deep)' : 'var(--color-surface)',
                border: '2px solid var(--color-pink-deep)',
                flexShrink: 0,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {i === timeline.milestones.length - 1 && (
                <DoodleHeart size={10} color="var(--color-surface)" />
              )}
            </div>
            <span
              style={{
                fontFamily: i === timeline.milestones.length - 1 ? 'var(--font-accent)' : 'var(--font-body)',
                fontStyle: i === timeline.milestones.length - 1 ? 'italic' : 'normal',
                fontSize: '17px',
                color: 'var(--color-ink)',
              }}
            >
              {m.label}
            </span>
          </motion.div>
        ))}
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
