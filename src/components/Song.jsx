import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { ourSong } from '../content.js'
import ContinueButton from './ContinueButton.jsx'
import { useAudio } from '../context/AudioContext.jsx'

// Drop the real file at public/audio/forever-sweet.mp3 (see AudioContext.jsx
// for the referenced path). Until it's there, the button is visible but
// silently does nothing — safe fallback rather than a broken build.
export default function Song({ onNext, locked, unlock }) {
  const { playing, everPlayed, toggle } = useAudio()

  // If she already pressed play earlier (e.g. came back to this screen),
  // don't leave the chapter locked.
  useEffect(() => {
    if (everPlayed) unlock?.()
  }, [everPlayed])

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
      <Eyebrow>{ourSong.eyebrow}</Eyebrow>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginTop: '28px' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(28px, 5vw, 40px)',
            margin: 0,
          }}
        >
          {ourSong.heading}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            opacity: 0.6,
            marginTop: '6px',
          }}
        >
          {ourSong.artist}
        </p>
      </motion.div>

      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          marginTop: '40px',
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          border: 'none',
          background: 'var(--color-surface)',
          boxShadow: playing
            ? '0 0 0 8px rgba(217, 142, 136, 0.18)'
            : '0 8px 22px rgba(43, 35, 32, 0.14)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.3s ease',
        }}
        aria-label={playing ? 'Pause our song' : 'Play our song'}
      >
        {playing ? (
          <Pause size={28} color="var(--color-pink-deep)" fill="var(--color-pink-deep)" />
        ) : (
          <Play size={28} color="var(--color-pink-deep)" fill="var(--color-pink-deep)" />
        )}
      </motion.button>

      <p
        style={{
          marginTop: '18px',
          fontFamily: 'var(--font-label)',
          fontSize: '12px',
          letterSpacing: '0.04em',
          color: 'var(--color-pink-deep)',
          opacity: 0.7,
        }}
      >
        {locked ? 'press play to continue' : playing ? 'now playing' : 'paused — tap to resume'}
      </p>

      <p
        style={{
          marginTop: '4px',
          fontFamily: 'var(--font-label)',
          fontSize: '11px',
          color: 'var(--color-pink-deep)',
          opacity: 0.5,
        }}
      >
        keeps playing in the background as you continue
      </p>

      <ContinueButton onClick={onNext} disabled={locked} />
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
