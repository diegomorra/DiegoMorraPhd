// Client-side rendering of the text version. Used by the dev server and as a
// fallback; in production /text/ is a prerendered static page.
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { AccessibleSite } from "./AccessibleSite";
import { accessibleCss } from "./styles";
import { ACCESSIBLE_TITLE } from "./meta";

export function mountAccessible(rootEl: HTMLElement) {
  document.title = ACCESSIBLE_TITLE;
  const style = document.createElement("style");
  style.textContent = accessibleCss;
  document.head.appendChild(style);
  // The desktop's "go to the text version" link is pointless here.
  document.querySelector(".desktop-skip-link")?.remove();
  createRoot(rootEl).render(createElement(AccessibleSite));
}
