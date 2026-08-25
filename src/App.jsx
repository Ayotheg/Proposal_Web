import { motion } from 'framer-motion'
import DoodleHeart from './components/DoodleHeart.jsx'

// This is a scaffold, not the final build.
// Once photos/videos land in src/assets/, the real sections (story, gallery,
// timeline, proposal screen, etc.) get built out from here.
export default function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        gap: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <DoodleHeart size={40} color="var(--color-pink-deep)" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(28px, 5vw, 44px)',
          maxWidth: '18ch',
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        Hey Beautiful&hellip; I made something special for you.
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        whileTap={{ scale: 0.96 }}
        style={{
          marginTop: '12px',
          padding: '14px 28px',
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
        Open My Heart ❤️
      </motion.button>

      <p
        style={{
          marginTop: '40px',
          fontFamily: 'var(--font-label)',
          fontSize: '12px',
          color: 'var(--color-pink-deep)',
          opacity: 0.7,
        }}
      >
        scaffold running — drop images into src/assets/images to continue
      </p>
    </main>
  )
}
