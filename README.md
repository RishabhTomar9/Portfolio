## Rishabh Tomar — Portfolio (React + Vite)

A modern, responsive developer portfolio built with React and Vite. It showcases projects, skills, certificates, achievements, and an animated experience powered by GSAP with a custom cursor and interactive visual details.

### Live Preview
- Add your deployment URL here once published (for example: `https://<your-domain>`)

### Key Features
- Animated Hero section with typewriter effects, staggered entrance, and floating elements
- Smooth scroll reveal animations using GSAP ScrollTrigger
- Custom cursor with a trailing effect and language-name particles that expand and fade over 2 seconds
- Certificates, Achievements, and Badges grid with external links
- Responsive layout and accessible interactions on desktop and mobile
- Lightweight initial Loader with sequential status messages
- Firebase Analytics bootstrapped and guarded for supported environments

## Tech Stack
- React 19 + Vite 6
- GSAP (core + ScrollTrigger)
- Plain CSS modules per feature folder
- Optional/available: `three`, `@react-three/fiber`, `@react-three/drei` (not required to run)
- Firebase (Analytics)

Dependencies are listed in `package.json` and include: `react`, `react-dom`, `gsap`, `firebase`, `react-icons`, `styled-components`, `tailwindcss` (available, not mandatory), and others.

## Folder Structure (Detailed)
```text
Portfolio/
  apphosting.yaml               # Optional Google Cloud App Hosting config
  firebase.json                 # Firebase Hosting config
  eslint.config.js              # ESLint configuration
  vite.config.js                # Vite configuration
  index.html                    # App HTML template (Vite)
  LICENSE
  package.json
  package-lock.json
  README.md

  public/
    index.html                  # Static fallback/index (if used)
    vitee.svgb

  src/
    App.css
    App.jsx
    index.css
    main.jsx
    firebase.js                 # Firebase init + guarded Analytics

    hooks/
      useWindowSize.js

    animations/
      animations.js             # GSAP utilities (ScrollTrigger reveal, etc.)

    components/
      About/
        index.jsx
        index.css
      Buttons/
        index.jsx
      CertificateAchievements/
        index.jsx               # Arrays for certificates, achievements, badges
        index.css
      CursorTracker/
        index.jsx               # Custom cursor dot + language particles
        index.css
      Footer/
        index.jsx
        index.css
      Header/
        index.jsx
        index.css
      Hero/
        index.jsx
        index.css
      Loader/
        index.jsx               # Sequenced loading messages (GSAP)
        index.css
      Projects/
        index.jsx
        index.css
      Skills/
        index.jsx
        index.css
```

## Setup
### Prerequisites
- Node.js 18+ (recommended) and npm 9+ or pnpm/yarn

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
Dev server will start with hot reloading. Use `--host` (already configured) to test across devices in your network.

### Build
```bash
npm run build
```
Outputs a production build into `dist/`.

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Deployment
### Firebase Hosting
The repo includes `firebase.json`. Typical deployment flow:
```bash
npm run build
npx firebase-tools login  # first time only
npx firebase-tools deploy
```
Adjust your Firebase project configuration in `src/firebase.js` as needed.

### Google Cloud App Hosting (optional)
An `apphosting.yaml` is included. If you use Google Cloud App Hosting, follow the Cloud docs to provision a service and deploy using your preferred workflow. This project builds to static assets in `dist/`.

## Components Overview
### `Header`
Sticky/scroll navigation linking to in-page sections such as Home, About, Projects, Skills, and Milestones.

### `Hero`
- Uses GSAP to animate heading, subheading, description, and buttons in a staggered timeline
- Typewriter effect for rotating roles (via `typewriter-effect`)
- Background tech elements and a gently floating portrait/image

### `About`
Short bio and highlights about the developer, animated on scroll.

### `Skills`
Responsive skill cards/labels to highlight the current stack (React, Node.js, MongoDB, Python, SQL, etc.).

### `Projects`
Project grid to showcase key work. Each card can link to live demos and source repositories.

### `CertificateAchievements`
- Renders Certificates, Achievements, and Badges from arrays in `src/components/CertificateAchievements/index.jsx`
- Each certificate card is clickable and opens the linked resource in a new tab
- Uses `fadeUpDownOnScroll` for reveal animations

### `Loader`
Minimal, non-blocking loader that cycles through short messages and fades out. Implemented with GSAP for smooth transitions.

### `CursorTracker`
- Custom cursor: the ring has been removed; a dot and subtle ghost trail remain
- Language particles (e.g., HTML, CSS, JavaScript, React, etc.) spawn near the cursor
- Particles scale from small to big and fade from opacity 1 to 0 in 2 seconds, then auto-remove
- Mobile devices automatically hide the custom cursor for usability

## Animations
- Centralized helpers in `src/animations/animations.js`
- `fadeUpDownOnScroll(selector)`: reveals elements as they enter the viewport with GSAP ScrollTrigger
- Additional utilities like `fadeInUp` and `staggerChildren`

## Firebase Analytics
`src/firebase.js` initializes Firebase. Analytics are guarded by `isSupported()` to avoid invalid argument errors in unsupported environments:
```js
export const initAnalytics = async () => {
  const supported = await isSupported().catch(() => false)
  if (!supported || typeof window === 'undefined') return null
  return getAnalytics(app)
}
```

To disable analytics entirely, remove `initAnalytics()` calls in `src/App.jsx`.

## Styling & Assets
- Each component folder contains its own `index.css`
- Images live in `public/Images/`; textures (if used) in `public/Textures/`
- The project can be extended with Tailwind or styled-components if desired

## Content Management
- Certificates/Achievements/Badges: Update arrays in `src/components/CertificateAchievements/index.jsx`.
- Cursor particle languages: Edit the `LANGUAGES` array in `src/components/CursorTracker/index.jsx`.
- Loader messages: Update `loadingMessages` in `src/components/Loader/index.jsx`.
- Hero texts and typewriter roles: Edit strings in `src/components/Hero/index.jsx`.
- Global styles: `src/index.css`, app-level `src/App.css`.

## Configuration
- Firebase: Replace the config in `src/firebase.js` with your own project credentials if needed. Analytics are guarded via `isSupported()`.
- Environment variables: For more secure setups, move Firebase keys to env files and import via Vite env (`import.meta.env`).

## SEO & Meta
- Update document title, description, and meta tags in `index.html`.
- Add Open Graph/Twitter meta as needed for richer link previews.

## Accessibility & Performance
- Native cursors are preserved on interactive form elements
- Custom cursor is disabled on small screens
- GSAP timelines avoid excessive layout thrashing; animations are hardware-accelerated where possible

## Scripts Reference
- `dev`: start Vite dev server (network-accessible)
- `start`: alias of `vite`
- `build`: production build
- `preview`: preview production build locally
- `lint`: run ESLint

## Contributing
Pull requests are welcome. Please open an issue to discuss major changes beforehand and ensure lint passes before submitting.

## License
This project is licensed under the terms specified in `LICENSE`.

### Copyright
© 2025 Rishabh Tomar. All Rights Reserved.

