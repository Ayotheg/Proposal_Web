import { motion } from 'framer-motion'
import { ourStory } from '../content.js'
import chatScreenshot from '../assets/images/CHATS.jpg'
import ContinueButton from './ContinueButton.jsx'

// The paragraph right after this index gets the chat screenshot tucked in
// beside it — it's the one describing "I texted you... and waited."
const CHAT_IMAGE_AFTER_INDEX = 3

export default function OurStory({ onNext }) {
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
      <div style={{ maxWidth: '620px', width: '100%' }}>
        <Eyebrow>{ourStory.eyebrow}</Eyebrow>

        <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {ourStory.paragraphs.map((p, i) => (
            <div key={i}>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                  fontFamily: i % 3 === 2 ? 'var(--font-accent)' : 'var(--font-body)',
                  fontStyle: i % 3 === 2 ? 'italic' : 'normal',
                  fontSize: i % 3 === 2 ? '22px' : '17px',
                  lineHeight: 1.65,
                  color: 'var(--color-ink)',
                  margin: 0,
                }}
              >
                {p}
              </motion.p>

              {i === CHAT_IMAGE_AFTER_INDEX && (
                <motion.div
                  initial={{ opacity: 0, y: 24, rotate: -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
                  viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{
                    marginTop: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={chatScreenshot}
                    alt="Screenshot of our first messages"
                    style={{
                      maxWidth: '220px',
                      width: '100%',
                      borderRadius: '14px',
                      boxShadow: '0 12px 30px rgba(43, 35, 32, 0.18)',
                      border: '6px solid var(--color-surface)',
                    }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ContinueButton onClick={onNext} />
        </div>
      </div>
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
