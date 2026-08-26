import { motion } from 'framer-motion'
import memory1 from '../assets/images/MEMORIES.jpg'
import memory2 from '../assets/images/MEMORIES-2.jpg'
import memory7 from '../assets/images/MEMORIES-7.jpg'
import memory5 from '../assets/images/MEMORIES-5.jpg'
import { galleryCaptions } from '../content.js'
import ContinueButton from './ContinueButton.jsx'

const photos = [memory1, memory2, memory7, memory5]

export default function Gallery({ onNext }) {
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
      <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center' }}>
        <Eyebrow>Our Memories</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(26px, 4.5vw, 36px)',
            margin: '18px 0 48px',
          }}
        >
          A few of my favorites
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(140px, 240px))',
          gap: '18px',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        {photos.map((src, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: 'easeOut' }}
            style={{ margin: 0 }}
          >
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 26px rgba(43, 35, 32, 0.14)',
                border: '6px solid var(--color-surface)',
              }}
            >
              <img
                src={src}
                alt={galleryCaptions[i] || 'A memory'}
                loading="lazy"
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <figcaption
              style={{
                marginTop: '10px',
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                fontSize: '15px',
                color: 'var(--color-pink-deep)',
              }}
            >
              {galleryCaptions[i]}
            </figcaption>
          </motion.figure>
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
