import { motion } from 'framer-motion'

export default function ContinueButton({ onClick, children = 'Continue' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        marginTop: '40px',
        padding: '14px 30px',
        borderRadius: '999px',
        border: 'none',
        background: 'var(--color-surface)',
        color: 'var(--color-ink)',
        fontFamily: 'var(--font-label)',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        boxShadow: '0 4px 16px rgba(217, 142, 136, 0.22)',
        alignSelf: 'center',
      }}
    >
      {children}
    </motion.button>
  )
}
