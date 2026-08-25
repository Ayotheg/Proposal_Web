# Proposal Website — Project Scaffold

This is the starting skeleton. Nothing here is final design yet — it's just
enough to prove the setup runs before the real content (photos, videos, copy)
gets built in.

## Running it locally

1. Install Node.js (LTS) from nodejs.org if you don't have it.
2. In this folder, run:
   npm install
3. Then run:
   npm run dev
4. Open the URL it prints (usually http://localhost:5173) in your browser.

## Where things go

- `src/assets/images/`  — drop all photos here
- `src/assets/videos/`  — drop any video clips here
- `src/assets/audio/`   — the background/proposal song file, if self-hosted
  instead of embedded from Spotify

Keep original filenames reasonably simple (no spaces/special characters work
best) — e.g. `first-date.jpg`, `us-at-the-beach.mp4`.

## What's built so far

Just the opening screen shell (heading + "Open My Heart" button + doodle
heart), to confirm fonts, colors, and animation are wired up correctly.
Everything else (story section, gallery, "things I love about you" cards,
timeline, hidden letter, final proposal screen, celebration) comes next,
once the media is in.

## Do not commit

`node_modules` and `dist` are gitignored — don't zip those back up, just the
source files plus whatever you drop into `src/assets/`.
