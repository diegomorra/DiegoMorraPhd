// SSR entry used only at build time to prerender the text version.
// Built with `vite build --ssr` and consumed by scripts/prerender-accessible.mjs.
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AccessibleSite } from "./AccessibleSite";

export { accessibleCss } from "./styles";
export { ACCESSIBLE_TITLE, ACCESSIBLE_DESCRIPTION } from "./meta";

export function render(): string {
  return renderToStaticMarkup(createElement(AccessibleSite));
}
