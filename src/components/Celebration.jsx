import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import DoodleHeart from './DoodleHeart.jsx'
import memory1 from '../assets/images/MEMORIES.jpg'
import memory2 from '../assets/images/MEMORIES-2.jpg'
import { celebration } from '../content.js'
import ContinueButton from './ContinueButton.jsx'
import { sendResponse } from '../lib/notify.js'

export default function Celebration({ onNext }) {
  const firedRef = useRef(false)
  const [note, setNote] = useState('')
  const [noteStatus, setNoteStatus] = useState('idle') // idle | sending | sent

  const handleSendNote = async () => {
    if (!note.trim() || noteStatus === 'sending') return
    setNoteStatus('sending')
    await sendResponse(`A note from her: "${note.trim()}"`)
    setNoteStatus('sent')
  }

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true

    const colors = ['#D98E88', '#F1D4D1', '#FBF3F0', '#2B2320']
    const duration = 2200
    const end = Date.now() + duration

    ;(function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors })
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()

    confetti({ particleCount: 90, spread: 100, origin: { y: 0.5 }, colors })
  }, [])

  const hearts = Array.from({ length: 10 }).map((_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: i * 0.25,
    size: 14 + (i % 4) * 6,
  }))

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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {hearts.map((h, i) => (
          <motion.div
            key={i}
            style={{ position: 'absolute', bottom: '-10%', left: h.left }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: '-120vh' }}
            transition={{ duration: 5, delay: h.delay, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
          >
            <DoodleHeart size={h.size} color="var(--color-pink-deep)" />
          </motion.div>
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'clamp(30px, 7vw, 52px)',
          margin: 0,
          color: 'var(--color-pink-deep)',
        }}
      >
        {celebration.heading}
      </motion.h1>

      <div style={{ display: 'flex', gap: '16px', marginTop: '36px' }}>
        {[memory1, memory2].map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt="Us"
            initial={{ opacity: 0, y: 20, rotate: i === 0 ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
            style={{
              width: '130px',
              height: '160px',
              objectFit: 'cover',
              borderRadius: '14px',
              border: '5px solid var(--color-surface)',
              boxShadow: '0 10px 26px rgba(43, 35, 32, 0.18)',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{
          marginTop: '36px',
          width: '100%',
          maxWidth: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {noteStatus === 'sent' ? (
          <p
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontSize: '15px',
              color: 'var(--color-pink-deep)',
            }}
          >
            sent 💌
          </p>
        ) : (
          <>
            <p
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '12px',
                letterSpacing: '0.04em',
                color: 'var(--color-pink-deep)',
                opacity: 0.75,
                margin: 0,
              }}
            >
              want to leave him a note?
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Say something back…"
              rows={2}
              style={{
                width: '100%',
                borderRadius: '14px',
                border: '1px solid var(--color-line)',
                background: 'var(--color-surface)',
                padding: '12px 14px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSendNote}
              disabled={!note.trim() || noteStatus === 'sending'}
              style={{
                alignSelf: 'flex-end',
                padding: '9px 20px',
                borderRadius: '999px',
                border: 'none',
                background: 'var(--color-pink-deep)',
                color: 'var(--color-surface)',
                fontFamily: 'var(--font-label)',
                fontSize: '13px',
                fontWeight: 600,
                opacity: !note.trim() ? 0.5 : 1,
              }}
            >
              {noteStatus === 'sending' ? 'sending…' : 'send'}
            </button>
          </>
        )}
      </motion.div>

      <ContinueButton onClick={onNext}>See what's next</ContinueButton>
    </section>
  )
}
