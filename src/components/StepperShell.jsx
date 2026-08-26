import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import DoodleHeart from './DoodleHeart.jsx'

// Drives the whole site as discrete full-screen chapters (like a slide deck)
// instead of one long scroll. Swipe/click through with the arrows, or tap
// the progress segments at top. `steps` is an array of { showChrome, render }.
export default function StepperShell({ steps }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = (next) => {
    if (next < 0 || next > steps.length - 1) return
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  const current = steps[index]
  const showChrome = current.showChrome !== false

  return (
    <div
      style={{
        height: '100dvh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg)',
      }}
    >
      {showChrome && (
        <TopBar
          progress={(index) / (steps.length - 1)}
          step={index}
          total={steps.length}
          onBack={() => goTo(index - 1)}
          canBack={index > 0}
        />
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -36 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            height: '100%',
            width: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {current.render({ onNext: () => goTo(index + 1), onBack: () => goTo(index - 1) })}
        </motion.div>
      </AnimatePresence>

      {showChrome && current.showNextArrow !== false && (
        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next"
          style={{
            position: 'fixed',
            right: '18px',
            bottom: '28px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--color-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(43, 35, 32, 0.16)',
            zIndex: 20,
          }}
        >
          <ChevronRight size={22} color="var(--color-pink-deep)" />
        </button>
      )}
    </div>
  )
}

function TopBar({ progress, step, total, onBack, canBack }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '18px 20px',
        background: 'linear-gradient(to bottom, var(--color-bg) 60%, transparent)',
      }}
    >
      <button
        onClick={onBack}
        disabled={!canBack}
        aria-label="Back"
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: 'none',
          background: canBack ? 'var(--color-surface)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: canBack ? 1 : 0,
          flexShrink: 0,
        }}
      >
        <ChevronLeft size={18} color="var(--color-pink-deep)" />
      </button>

      <div style={{ display: 'flex', gap: '5px', flex: 1 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '3px',
              borderRadius: '999px',
              background: i <= step ? 'var(--color-pink-deep)' : 'var(--color-line)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>

      <DoodleHeart size={18} color="var(--color-pink-deep)" />
    </div>
  )
}
