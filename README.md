# Diego Morra — Win98 Desktop website

Personal website built as an interactive Windows 98 desktop simulation.
Website is live at: https://diego-morra.com/

Stack: Vite + React + TypeScript, [React95](https://github.com/React95/React95) for the
Win98 UI components, [zustand](https://github.com/pmndrs/zustand) for window state.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploy (Vercel)

The repo includes a `vercel.json` and Vercel auto-detects Vite. Either:

- push to the `main` branch of a Vercel-connected GitHub repo, or
- run `vercel` from the project root.

## Project structure

```
src/
  apps/                 # Each "app" rendered inside a window (Bio, Research Projects, Publications, ...)
  accessible/           # Text version of the site (prerendered to /text/)
  components/
    Desktop/            # Desktop background + icon grid
    Window/             # Window component wrapping React95's Modal (focus management, Esc)
    TaskBar/            # Taskbar, Start menu (WAI-ARIA menu pattern), clock
    shared/             # Pieces shared by desktop and text version
  data/                 # ALL the content lives here (single source of truth)
    profile.ts          # Bio, research statement, appointments, education, awards, links
    research.ts         # Research Projects, Exhibitions and Design Stuff folders → projects
    projectImages.ts    # Project images with alt text
    publications.ts     # Curated publication list (authors, venues, DOIs)
    scholar.ts          # Citations and h-index copied from Google Scholar (manual)
    activities.ts       # Invited talks, academic service, press links
    desktopIcons.ts     # Icons shown on the desktop
    appsRegistry.tsx    # AppId → React component mapping
  store/windowStore.ts  # zustand store for open windows, z-index, focus requests
  utils/activation.ts   # Mouse vs keyboard/screen-reader activation of icons
  styles/global.css     # Win98 desktop layout styling
public/icons/           # Pixel Win98 PNG icons
public/projects/        # Project photos hosted on the site (others are external links)
scripts/
  prerender-accessible.mjs  # build: writes dist/text/index.html
```

## Editing content

Everything shown on the desktop **and** on the text version comes from
`src/data/`, so the two never diverge:

- **New project**: add it to a folder in `src/data/research.ts`: a research
  line of Research Projects (a line marked `standalone` is a single project
  shown directly as a document), or the single folder of Exhibitions or
  Design Stuff, which are shown without sub-folders. A project that groups
  several works lists them in `parts` (one section each, with its own text,
  role and publications). Images with alt text go in
  `src/data/projectImages.ts`.
- **New publication**: add it to `src/data/publications.ts` (with its DOI) and
  reference its `id` from the project's `publicationIds`.
- **Citations**: copied by hand from Google Scholar into `src/data/scholar.ts`
  (citations, h-index, "Cited by" per publication, date). Scholar has no API
  and blocks automated requests, so update it from time to time.
- **Talks, service, press**: `src/data/activities.ts` (talks and service are
  shown at the end of Bio).
- **CV**: replace `public/CV_Morra_2026.pdf` and update `cv.updated` in
  `src/data/profile.ts`.

## Accessibility

- The desktop is operable with keyboard and screen readers: icons are buttons
  (Enter/Space open them; with a mouse, click selects and double click opens),
  windows are labelled dialogs that receive focus when opened and return it on
  close, Escape closes the active window.
- Decorative elements (Start menu, taskbar, window minimize buttons, My
  Computer, Recycle Bin) work with the mouse but are skipped by the keyboard
  and hidden from screen readers (`tabIndex={-1}` + `aria-hidden`), so Tab and
  VoiceOver only reach content. Mark a desktop icon as `decorative: true` in
  `src/data/desktopIcons.ts` to do the same.
- `/text/` is the text version of the whole site: one linear, semantic page,
  designed to be easier to use with screen readers, in the style
  of the Windows reboot screens, prerendered at build time (works without
  JavaScript). Its contents menu sits beside the text on wide screens (sticky,
  never covering content) and at the top on small screens, with "Back to
  contents" links. It is linked from the first focusable element of the page,
  from the "Accessibility Options" desktop icon and from the Start menu. In dev it is
  rendered client-side at http://localhost:5173/text/. Never call it the
  "accessible version" in the interface: the desktop is meant to work with
  screen readers too.
- The "Accessibility Options" window (tabs General, Display, Mouse, like the
  Windows 98 dialog) adjusts the desktop version: High Contrast (white on black
  or black on white), Text size (normal, large, extra large) and single-click
  opening. Settings live in `src/store/accessibilitySettings.ts`, are saved in
  localStorage and applied as `data-*` attributes on `<html>`; the CSS is in the
  "Accessibility Options settings" section of `src/styles/global.css`. Content
  windows follow them when registered with `adaptive: true`; games keep their
  own look. "Boot diegomorra_HighContrast.exe" in the shutdown menu turns
  High Contrast on.

## Adding a new "app"

1. Create a component under `src/apps/`.
2. Add a new `AppId` in `src/types.ts`.
3. Register the app in `src/data/appsRegistry.tsx` with its default title, icon,
   size (use `contentRole: "document"` for text content, and `adaptive: true`
   if it should follow High Contrast and Text size).
4. Optionally surface it on the desktop in `src/data/desktopIcons.ts` or in the
   Start menu in `src/components/TaskBar/StartMenu.tsx`.

## Pinned dependency versions

`@react95/core` and `@react95/icons` are pinned to the last known
correctly-published versions (`9.7.3` and `2.4.1`). Newer versions on npm
ship a malformed package layout that breaks Vite's resolver. Do not bump these
without verifying the published tarball has `esm/` + `types/` at the package
root.
