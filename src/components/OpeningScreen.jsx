import { motion } from 'framer-motion'
import DoodleHeart from './DoodleHeart.jsx'
import { openingScreen } from '../content.js'

export default function OpeningScreen({ onNext }) {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        gap: '22px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* faint ambient doodle hearts, purely decorative */}
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <DoodleHeart size={44} color="var(--color-pink-deep)" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(28px, 5.5vw, 46px)',
          maxWidth: '18ch',
          margin: 0,
          lineHeight: 1.18,
        }}
      >
        {openingScreen.line}
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.32, ease: 'easeOut' }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        style={{
          marginTop: '10px',
          padding: '15px 30px',
          borderRadius: '999px',
          border: 'none',
          background: 'var(--color-surface)',
          color: 'var(--color-ink)',
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          boxShadow: '0 4px 18px rgba(217, 142, 136, 0.25)',
        }}
      >
        {openingScreen.button}
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1, delay: 0.9 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          fontFamily: 'var(--font-label)',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-pink-deep)',
        }}
      >
        scroll or tap to begin
      </motion.p>
    </section>
  )
}

function FloatingHearts() {
  const hearts = [
    { top: '12%', left: '10%', size: 16, delay: 0 },
    { top: '22%', left: '82%', size: 20, delay: 0.6 },
    { top: '70%', left: '14%', size: 14, delay: 1.1 },
    { top: '78%', left: '78%', size: 18, delay: 1.6 },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', top: h.top, left: h.left }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.35, 0], y: -18 }}
          transition={{
            duration: 4.5,
            delay: h.delay,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: 'easeInOut',
          }}
        >
          <DoodleHeart size={h.size} color="var(--color-pink-soft)" />
        </motion.div>
      ))}
    </div>
  )
}
