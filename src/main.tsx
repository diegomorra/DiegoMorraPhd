import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootEl = document.getElementById("root")!;

// /text/ is prerendered to a static page at build time
// (scripts/prerender-accessible.mjs). This client-side route is used by the dev
// server and as a fallback if a host rewrites /text to index.html.
const isAccessibleRoute = /^\/text(\/|$)/.test(window.location.pathname);

if (isAccessibleRoute) {
  import("./accessible/mountClient").then(({ mountAccessible }) =>
    mountAccessible(rootEl),
  );
} else {
  import("./App").then(({ default: App }) => {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });

  // A little note for the curious who open the console.
  console.log(
    "%cdiegomorra.exe%c\ninspiration for this website design came from a dream — developed with React & React95 in 2026.%c\nthanks for stopping by the console.",
    "color:#008080;font-weight:bold;font-size:16px;font-family:monospace;",
    "color:#444;font-size:12px;",
    "color:#888;font-size:11px;font-style:italic;",
  );
}
