import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { ourSong } from '../content.js'
import ContinueButton from './ContinueButton.jsx'

// Looks for the song at public/audio/forever-sweet.mp3 — drop the real file
// there (any filename works, just update the src below) once you have it.
// Until then the button is visible but silently does nothing, which is a
// safe fallback rather than a broken build.
const AUDIO_SRC = '/audio/forever-sweet.mp3'

export default function Song({ onNext }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setPlaying(!playing)
  }

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
        {playing ? 'now playing' : 'play our song'}
      </p>

      <audio ref={audioRef} src={AUDIO_SRC} loop onEnded={() => setPlaying(false)} />

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
