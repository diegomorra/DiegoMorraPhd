# Diego Morra — Desktop

Personal website built as an interactive Windows 98 desktop simulation.

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
  apps/                 # Each "app" rendered inside a window (About, Projects, Contact, ...)
  components/
    Desktop/            # Desktop background + icon grid
    Window/             # Window component wrapping React95's Modal
    TaskBar/            # Taskbar, Start menu, clock
  data/
    projects.ts         # Project content tree (categories → projects)
    desktopIcons.ts     # Icons shown on the desktop
    appsRegistry.tsx    # AppId → React component mapping
  store/
    windowStore.ts      # zustand store for open windows, z-index, focus
  styles/global.css     # Win98 desktop layout styling
  types.ts              # Shared types (AppId, WindowState, ...)
public/icons/           # Pixel Win98 PNG icons
```

## Adding a project

Edit `src/data/projects.ts`. Each project goes inside one of the
`projectCategories[].projects` arrays.

## Adding a new "app"

1. Create a component under `src/apps/`.
2. Add a new `AppId` in `src/types.ts`.
3. Register the app in `src/data/appsRegistry.tsx` with its default title, icon, size.
4. Optionally surface it on the desktop in `src/data/desktopIcons.ts` or in the
   Start menu in `src/components/TaskBar/StartMenu.tsx`.

## Pinned dependency versions

`@react95/core` and `@react95/icons` are pinned to the last known
correctly-published versions (`9.7.3` and `2.4.1`). Newer versions on npm
ship a malformed package layout that breaks Vite's resolver. Do not bump these
without verifying the published tarball has `esm/` + `types/` at the package
root.
