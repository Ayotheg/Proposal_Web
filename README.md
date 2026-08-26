# Proposal Website

A chapter-by-chapter proposal site: opening screen, story, gallery, "things
I love about you", a written message, a song, a timeline, a future section,
a hidden letter, the proposal moment, a celebration, and a closing screen.

## Running it locally

1. Install Node.js (LTS) from nodejs.org if you don't have it.
2. In this folder, run:
   npm install
3. Then run:
   npm run dev
4. Open the URL it prints (usually http://localhost:5173) in your browser.

## Where things go

- `src/assets/images/`  — photos
- `src/assets/videos/`  — (currently unused — decided to skip video)
- `public/audio/`       — the song file (see "Adding the song" below)
- `src/content.js`      — all the site's text/copy in one place, easy to edit

## Adding the song

Drop the audio file at `public/audio/forever-sweet.mp3` (or update the
`AUDIO_SRC` constant in `src/components/Song.jsx` if the filename or format
differs). Until a file is there, the play button is visible but silently
does nothing — safe placeholder behavior, not a broken build.

## Getting her response back to you (EmailJS setup)

This site is fully static — no backend/server — so it uses EmailJS to send
an email straight from the browser the moment she says yes, plus an
optional note she can leave on the celebration screen. Free tier is more
than enough for this.

1. Create a free account at https://www.emailjs.com
2. Add an Email Service (e.g. connect your Gmail) — note the **Service ID**
3. Create an Email Template with two variables in the body: `{{message}}`
   and `{{sent_at}}`. Set the template's "To email" to your own inbox —
   that's what makes the response come back to you.
4. Grab your **Public Key** from Account > General
5. Copy `.env.example` to `.env` and fill in the three values:
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
6. Restart `npm run dev` after adding the `.env` file.

Until this is set up, the proposal moment still works perfectly for her —
it just logs a warning in the browser console instead of sending an email.

## Do not commit

`node_modules`, `dist`, and `.env` are gitignored — don't zip those back
up, just the source files, `src/assets/`, and `public/audio/`.
