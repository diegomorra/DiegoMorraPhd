// Stylesheet of the text version, inlined into the prerendered page.
// Visual language of the Windows 98 reboot screens (pure black, console font,
// grey text, inverted selection, amber like "It is now safe to turn off your
// computer"), kept accessible: AA contrast everywhere, strong focus
// indicators, no motion with prefers-reduced-motion, a navigation menu that
// never covers the content.
export const accessibleCss = /* css */ `
@font-face {
  font-family: "Classic Console";
  src: url("/fonts/clacon2.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root {
  color-scheme: dark;
  --bg: #000000;
  --fg: #c0c0c0;       /* 12.6:1 on black */
  --bright: #ffffff;
  --dim: #a8a8a8;      /* 9:1 */
  --faint: #808080;    /* 5.3:1: rules, hints */
  --amber: #ffae00;    /* 11.3:1: links */
  --amber-visited: #ffd27a;
  --select-bg: #c0c0c0;
  --select-fg: #000000;
  --font: "Classic Console", "VT323", "Lucida Console", "Courier New", monospace;
}
@media (prefers-contrast: more) {
  :root { --fg: #ffffff; --dim: #e6e6e6; --faint: #c0c0c0; }
}

*, *::before, *::after { box-sizing: border-box; }
html { background: var(--bg); -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font);
  font-size: 1.25rem;
  line-height: 1.5;
}
strong, b { font-weight: normal; color: var(--bright); }
h1, h2, h3, h4 { font-weight: normal; color: var(--bright); }
p { margin: 0 0 1rem; }

/* Links: amber and underlined; inverted when hovered or focused,
   like the selected line of the startup menu. */
a { color: var(--amber); text-decoration: underline; text-underline-offset: 0.2em; }
a:visited { color: var(--amber-visited); }
a:hover { background: var(--amber); color: var(--select-fg); text-decoration: none; }
:focus-visible { outline: 2px solid var(--bright); outline-offset: 3px; }
a:focus-visible { background: var(--amber); color: var(--select-fg); text-decoration: none; }
main:focus { outline: none; }

.visually-hidden {
  position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
}
.skip-link {
  position: absolute; left: 1rem; top: -10rem; z-index: 100;
  background: var(--select-bg); color: var(--select-fg); padding: 0.2rem 0.75rem;
  text-decoration: none;
}
.skip-link:focus { top: 1rem; }

/* ── Header: the startup-menu title line ──────────────────────────── */
.site-header, .layout, .site-footer { max-width: 72rem; margin: 0 auto; padding-left: 1.25rem; padding-right: 1.25rem; }
.site-header { padding-top: 1.5rem; }
.titlebar { margin: 0; padding-bottom: 0.35rem; border-bottom: 3px double var(--fg); }
.prompt { margin: 1.5rem 0 0; color: var(--dim); }
.cursor { animation: blink 1s steps(2, start) 5; }
@keyframes blink { to { visibility: hidden; } }
@media (prefers-reduced-motion: reduce) { .cursor { animation: none; } }
.site-header h1 { margin: 0.4rem 0 0.2rem; font-size: 2.25rem; line-height: 1.15; }
.site-role { margin: 0 0 0.25rem; }
.site-links { margin: 0 0 0.75rem; }
.site-switch { margin: 0 0 2rem; }

/* ── Layout: contents menu + main text ────────────────────────────── */
main { max-width: 46rem; }
.toc-title { margin: 0; padding-bottom: 0.35rem; border-bottom: 3px double var(--fg); }
.toc ol { list-style: none; margin: 0.75rem 0 2rem; padding: 0; }
.toc li { margin: 0.1rem 0; }
.toc a {
  display: block; padding: 0.05rem 0.5rem; color: var(--fg); text-decoration: none;
}
.toc a:visited { color: var(--fg); }
.toc a:hover, .toc a:focus-visible { background: var(--select-bg); color: var(--select-fg); outline: none; }
.toc-num { display: inline-block; min-width: 2.2em; }
.back-to-menu { margin: 2rem 0 0; }

/* Wide screens: the menu sits in a column of its own and stays visible
   while scrolling. Being beside the text, it never covers content or
   focused elements (WCAG 2.4.11). Narrow screens and high zoom: the menu
   stays at the top and each section ends with a "Back to contents" link. */
@media (min-width: 64rem) {
  .layout {
    display: grid;
    grid-template-columns: 15rem minmax(0, 1fr);
    gap: 3.5rem;
    align-items: start;
  }
  .toc {
    position: sticky; top: 1rem;
    max-height: calc(100vh - 2rem); overflow-y: auto;
  }
  .back-to-menu { display: none; }
}

/* ── Sections ─────────────────────────────────────────────────────── */
h2 {
  font-size: 1.75rem; line-height: 1.2;
  margin: 3.5rem 0 1.25rem; padding-bottom: 0.35rem;
  border-bottom: 3px double var(--fg);
}
main > section:first-child > h2 { margin-top: 0; }
.h-num { color: var(--dim); }
h3 { font-size: 1.4rem; line-height: 1.25; margin: 2.25rem 0 0.6rem; }
h4 { font-size: 1.25rem; line-height: 1.3; margin: 0 0 0.35rem; }
h4.subhead { margin-top: 1.25rem; }
.statement-title { margin-top: 0; }
.more-info { margin-top: 2rem; }
ul, ol { margin: 0 0 1rem; padding-left: 1.5rem; }
ul { list-style: square; }
li { margin-bottom: 0.4rem; }
li::marker { color: var(--dim); }

.about-intro { display: flex; gap: 1.5rem; align-items: flex-start; }
.portrait { flex-shrink: 0; object-fit: cover; border: 1px solid var(--faint); }
@media (max-width: 36rem) { .about-intro { flex-direction: column; } }
.entries { list-style: none; padding: 0; }
.entries > li { margin-bottom: 0.9rem; }
.when { color: var(--dim); }
.note { display: block; color: var(--dim); }

/* Projects: boxed like a DOS dialog */
.project {
  border: 3px double var(--faint);
  padding: 0.9rem 1.1rem 1rem;
  margin: 1.5rem 0;
}
/* Same size whether the project title is an h3 (Design stuff) or an h4. */
.project-title { font-size: 1.25rem; line-height: 1.3; margin: 0 0 0.35rem; }
.project-summary { color: var(--bright); }
/* Works inside a project that groups several (e.g. three toolkits). */
.project-part { border-top: 1px dashed var(--faint); margin-top: 1.25rem; padding-top: 0.75rem; }
.part-title { font-size: 1.1rem; line-height: 1.3; margin: 0 0 0.35rem; font-weight: normal; color: var(--bright); }
.highlight {
  display: inline-block; margin: 0 0 0.75rem; padding: 0 0.5rem;
  background: var(--amber); color: var(--select-fg);
}
.meta {
  display: grid; grid-template-columns: max-content 1fr; gap: 0.1rem 1rem;
  margin: 0 0 1rem;
}
.meta > div { display: contents; }
.meta dt { color: var(--dim); }
.meta dd { margin: 0; }
@media (max-width: 36rem) {
  .meta { grid-template-columns: 1fr; }
  .meta dd { margin-bottom: 0.4rem; }
}
.list-label { color: var(--bright); margin: 1.25rem 0 0.4rem; }
figure { margin: 1.25rem 0 0; }
figure img {
  display: block; max-width: 100%; height: auto; max-height: 22rem;
  border: 1px solid var(--faint);
}

/* Publications */
.pub-item { margin-bottom: 1.1rem; }
.pub-badge {
  display: inline-block; padding: 0 0.4rem; line-height: 1.35;
  background: var(--select-bg); color: var(--select-fg);
}
.pub-title { color: var(--bright); }
.pub-extra { display: block; color: var(--dim); }

/* ── Footer: the startup-menu hint line ───────────────────────────── */
.site-footer {
  margin-top: 4rem; padding-top: 1rem; padding-bottom: 2.5rem;
  border-top: 3px double var(--fg);
}
.keys-hint { color: var(--faint); }

@media (forced-colors: active) {
  .pub-badge, .highlight { border: 1px solid CanvasText; }
  .toc a:focus-visible, a:focus-visible { outline: 2px solid Highlight; }
}
@media print {
  body { background: #ffffff; color: #000000; font-family: Georgia, "Times New Roman", serif; font-size: 11pt; }
  strong, h1, h2, h3, h4, .part-title, .pub-title, .project-summary, .list-label { color: #000000; }
  a, a:visited { color: #000000; }
  .skip-link, .toc, .prompt, .back-to-menu, .keys-hint, figure { display: none; }
  .project { border: 1px solid #000000; }
  h2, .titlebar, .site-footer { border-color: #000000; }
}
`;
