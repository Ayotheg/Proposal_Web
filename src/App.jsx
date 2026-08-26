import StepperShell from './components/StepperShell.jsx'
import OpeningScreen from './components/OpeningScreen.jsx'
import OurStory from './components/OurStory.jsx'
import Gallery from './components/Gallery.jsx'
import ThingsILove from './components/ThingsILove.jsx'
import WhatYouMeanToMe from './components/WhatYouMeanToMe.jsx'
import Song from './components/Song.jsx'
import Timeline from './components/Timeline.jsx'
import OurFuture from './components/OurFuture.jsx'
import HiddenLetter from './components/HiddenLetter.jsx'
import FinalProposal from './components/FinalProposal.jsx'
import Celebration from './components/Celebration.jsx'
import Closing from './components/Closing.jsx'

// Each step is one full screen in the chapter-by-chapter flow (like the
// Love Wrapped reference) rather than one long scroll. showChrome hides the
// top progress bar on the cover and on the two screens that manage their
// own pacing (the proposal moment and its celebration).
const steps = [
  { showChrome: false, render: ({ onNext }) => <OpeningScreen onNext={onNext} /> },
  { render: ({ onNext }) => <OurStory onNext={onNext} /> },
  { render: ({ onNext }) => <Gallery onNext={onNext} /> },
  { render: ({ onNext }) => <ThingsILove onNext={onNext} /> },
  { render: ({ onNext }) => <WhatYouMeanToMe onNext={onNext} /> },
  { render: ({ onNext }) => <Song onNext={onNext} /> },
  { render: ({ onNext }) => <Timeline onNext={onNext} /> },
  { render: ({ onNext }) => <OurFuture onNext={onNext} /> },
  { render: ({ onNext }) => <HiddenLetter onNext={onNext} /> },
  { showChrome: false, render: ({ onNext }) => <FinalProposal onNext={onNext} /> },
  { showChrome: false, render: ({ onNext }) => <Celebration onNext={onNext} /> },
  { showChrome: false, showNextArrow: false, render: () => <Closing /> },
]

export default function App() {
  return <StepperShell steps={steps} />
}
