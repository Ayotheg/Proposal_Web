import { createContext, useContext, useRef, useState } from 'react'

const AudioCtx = createContext(null)

const AUDIO_SRC = '/audio/forever-sweet.mp3'

// Mounted once at the App root, outside the step-switching area, so the
// <audio> element itself is never torn down when the site moves between
// chapters — only the UI around it (the play button on the Song screen)
// comes and goes.
export function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [everPlayed, setEverPlayed] = useState(false)

  const play = () => {
    audioRef.current?.play().catch(() => {})
    setPlaying(true)
    setEverPlayed(true)
  }

  const pause = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }

  const toggle = () => (playing ? pause() : play())

  return (
    <AudioCtx.Provider value={{ playing, everPlayed, play, pause, toggle }}>
      {children}
      <audio ref={audioRef} src={AUDIO_SRC} loop onEnded={() => setPlaying(false)} />
    </AudioCtx.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudio must be used within an AudioProvider')
  return ctx
}
