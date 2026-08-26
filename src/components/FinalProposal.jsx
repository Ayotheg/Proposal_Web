import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DoodleHeart from './DoodleHeart.jsx'
import { finalProposal } from '../content.js'
import { sendResponse } from '../lib/notify.js'

// The chase: tapping "YES" reveals a bigger "YESSSS" button that dodges the
// first couple of taps before finally letting itself be caught. Works the
// same on mouse and touch since it's driven by tap count, not hover.
const DODGES_BEFORE_CAPTURE = 2

export default function FinalProposal({ onNext }) {
  const containerRef = useRef(null)
  const [stage, setStage] = useState('build') // build -> chase -> caught
  const [dodgeCount, setDodgeCount] = useState(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const randomizePosition = () => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const btnW = 190
    const btnH = 60
    const maxX = Math.max(width - btnW, 40)
    const maxY = Math.max(height - btnH - 60, 40)
    setPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY * 0.6,
    })
  }

  const handleYessss = () => {
    if (dodgeCount < DODGES_BEFORE_CAPTURE) {
      randomizePosition()
      setDodgeCount((c) => c + 1)
      return
    }
    setStage('caught')
    sendResponse('She said YES! 🎉')
    setTimeout(onNext, 900)
  }

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        padding: '96px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <AnimatePresence mode="wait">
        {stage === 'build' && (
          <motion.div
            key="build"
            exit={{ opacity: 0, y: -12 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {finalProposal.buildLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.5 }}
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(20px, 4vw, 26px)',
                  margin: 0,
                  color: 'var(--color-ink)',
                }}
              >
                {line}
              </motion.p>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: finalProposal.buildLines.length * 0.5 + 0.4 }}
              onClick={() => setStage('chase')}
              style={{
                marginTop: '24px',
                padding: '14px 30px',
                borderRadius: '999px',
                border: 'none',
                background: 'var(--color-surface)',
                fontFamily: 'var(--font-label)',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(217, 142, 136, 0.22)',
                alignSelf: 'center',
              }}
            >
              Keep going
            </motion.button>
          </motion.div>
        )}

        {stage !== 'build' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%' }}
          >
            <DoodleHeart size={40} color="var(--color-pink-deep)" />
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(30px, 6vw, 48px)',
                maxWidth: '14ch',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {finalProposal.question}
            </h1>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <StaticButton label={finalProposal.yesLabels[0]} caught={stage === 'caught'} />

              <motion.button
                onClick={handleYessss}
                animate={{ x: pos.x, y: pos.y, scale: stage === 'caught' ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '18px 34px',
                  borderRadius: '999px',
                  border: 'none',
                  background: 'var(--color-surface)',
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-label)',
                  fontSize: '17px',
                  fontWeight: 700,
                  boxShadow:
                    stage === 'caught'
                      ? '0 0 0 10px rgba(217, 142, 136, 0.22)'
                      : '0 8px 22px rgba(43, 35, 32, 0.16)',
                  position: 'relative',
                }}
              >
                {finalProposal.yesLabels[1]}
              </motion.button>
            </div>

            {stage === 'chase' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                  color: 'var(--color-pink-deep)',
                }}
              >
                {dodgeCount === 0 && 'go on, tap it'}
                {dodgeCount === 1 && 'nice try 😄'}
                {dodgeCount >= DODGES_BEFORE_CAPTURE && 'ok ok, for real this time'}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// The plain "YES" button is left in place, unmoving — it's the dodging
// YESSSS button that carries the joke and the actual confirmation.
function StaticButton({ label, caught }) {
  return (
    <div
      style={{
        padding: '18px 30px',
        borderRadius: '999px',
        background: 'var(--color-surface)',
        color: 'var(--color-ink)',
        fontFamily: 'var(--font-label)',
        fontSize: '16px',
        fontWeight: 600,
        opacity: caught ? 0.5 : 0.85,
        boxShadow: '0 4px 16px rgba(43, 35, 32, 0.1)',
      }}
    >
      {label}
    </div>
  )
}
