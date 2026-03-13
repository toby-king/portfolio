# Toby — Personal Site

A retro-inspired personal portfolio built with React + Vite. Dark midcentury green palette, Caprasimo typography, pastel gradient accents, cinematic splash intro.

## Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy this folder to any static host.

## Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo to Vercel and it will auto-deploy on push.

## Deploy to Netlify

Drag and drop the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop), or connect your repo.

## Things to Customise

### Links (in `src/App.jsx`)

**Project links** — Find the `PROJECTS` array near the top and replace `link: "#"` with your real URLs:
```js
{ title: "Acquiro", link: "https://acquiro.app", ... }
```

**Blog post links** — Find the `POSTS` array and replace `link: "#"`:
```js
{ title: "Putting an OLED Behind a CRT...", link: "https://blog.toby.dev/oled-crt", ... }
```

**Social links** — Search for `github.com/toby`, `linkedin.com/in/toby`, `x.com/toby`, and `hello@toby.dev` and replace with your real profiles.

### Project Screenshots

Replace `img: null` in the `PROJECTS` array with a path to your screenshot:
```js
{ title: "Acquiro", img: "/screenshots/acquiro.png", ... }
```

Place screenshot files in the `public/` directory (or `public/screenshots/`).

### Profile Photo

Replace `public/profile.jpg` with your own photo. The component uses `objectPosition: "center 20%"` — adjust this in the About section if your face is positioned differently.

### Copy

- **About text** — Search for "Hey — I'm Toby." in App.jsx
- **Hero subtitle** — Search for "Developer & Product Manager. Builder of things."
- **Footer** — Search for "Hand-crafted in Dorset"
- **Splash phrase** — Search for "Let's build something."
- **Terminal text** — Search for "building things people actually want to use"

## Tech Stack

- React 18
- Vite 6
- Caprasimo (Google Fonts)
- Source Serif 4 (Google Fonts)
- JetBrains Mono (Google Fonts)
- No CSS framework — all inline styles
- No dependencies beyond React

## Features

- Cinematic splash intro with letter-by-letter reveal
- Custom gold cursor (arrow + pointer hand)
- Magnetic 3D tilt on project cards
- Staggered scroll-reveal animations
- Sticky frosted-glass navigation
- Typing terminal effect
- Floating pastel background blobs
- Animated rainbow top bar
- Responsive down to mobile
- Smooth scroll navigation
