import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { isSingleClickEnabled } from "../store/accessibilitySettings";

/**
 * True when a click was produced by the keyboard (Enter/Space on a button) or
 * by assistive technology (screen readers), rather than by a real pointer.
 * Detection logic adapted from React Aria's `isVirtualClick`.
 */
export function isVirtualClick(event: MouseEvent): boolean {
  // Firefox + NVDA/JAWS report clicks with an "unknown" input source.
  const moz = (event as MouseEvent & { mozInputSource?: number })
    .mozInputSource;
  if (moz === 0 && event.isTrusted) return true;
  const pointerType = (event as PointerEvent).pointerType;
  return event.detail === 0 && !pointerType;
}

function isTouchClick(event: MouseEvent): boolean {
  const pointerType = (event as PointerEvent).pointerType;
  return pointerType === "touch" || pointerType === "pen";
}

/**
 * Desktop-style activation for icons: with a mouse, a single click selects and
 * a double click opens (like Windows 98). Keyboard, screen readers and touch
 * open the item immediately, so nobody needs a double click.
 * With "Single-click to open an item" (Accessibility Options > Mouse) a mouse
 * click opens too, and pointing at an icon selects it, like the Windows 98
 * "Web style".
 */
export function iconActivationHandlers(opts: {
  onSelect: () => void;
  onOpen: () => void;
  touchPrimary: boolean;
}) {
  return {
    onClick: (e: ReactMouseEvent) => {
      const native = e.nativeEvent;
      if (opts.touchPrimary || isTouchClick(native) || isVirtualClick(native)) {
        opts.onOpen();
      } else if (isSingleClickEnabled()) {
        // Ignore the second click of a double click.
        if (e.detail <= 1) opts.onOpen();
      } else {
        opts.onSelect();
      }
    },
    onDoubleClick: () => {
      if (!isSingleClickEnabled()) opts.onOpen();
    },
    onMouseEnter: () => {
      if (isSingleClickEnabled() && !opts.touchPrimary) opts.onSelect();
    },
  };
}

/**
 * Same desktop behaviour for icons that are real links (e.g. the CV PDF):
 * keyboard, screen readers and touch follow the link at once; with a mouse,
 * a click selects and a double click opens it in a new tab (or a single click
 * with "Single-click to open an item"). Modified clicks (Cmd/Ctrl/Shift) keep
 * the browser's default behaviour.
 */
export function linkActivationHandlers(opts: {
  href: string;
  onSelect: () => void;
  touchPrimary: boolean;
}) {
  return {
    onClick: (e: ReactMouseEvent) => {
      const native = e.nativeEvent;
      if (opts.touchPrimary || isTouchClick(native) || isVirtualClick(native)) {
        return; // let the browser open the link
      }
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (isSingleClickEnabled()) {
        // Let the browser open the link, but only once per double click.
        if (e.detail > 1) e.preventDefault();
        return;
      }
      e.preventDefault();
      opts.onSelect();
    },
    onDoubleClick: () => {
      if (isSingleClickEnabled()) return;
      window.open(opts.href, "_blank", "noopener,noreferrer");
    },
    onMouseEnter: () => {
      if (isSingleClickEnabled() && !opts.touchPrimary) opts.onSelect();
    },
  };
}

/** Desktop icons reachable with the keyboard (decorative ones are skipped). */
export const FOCUSABLE_DESKTOP_ICON = '.desktop-icon:not([tabindex="-1"])';

const NAV_KEYS = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"];

/**
 * Arrow-key navigation between items inside a container (desktop icons,
 * folder contents). Tab keeps working as usual; arrows are a shortcut.
 */
export function handleArrowNavigation(
  e: ReactKeyboardEvent<HTMLElement>,
  itemSelector: string,
) {
  if (!NAV_KEYS.includes(e.key)) return;
  const items = Array.from(
    e.currentTarget.querySelectorAll<HTMLElement>(itemSelector),
  );
  const current = items.indexOf(document.activeElement as HTMLElement);
  if (current === -1) return;
  e.preventDefault();
  let next = current;
  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
    next = Math.min(items.length - 1, current + 1);
  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    next = Math.max(0, current - 1);
  } else if (e.key === "Home") {
    next = 0;
  } else if (e.key === "End") {
    next = items.length - 1;
  }
  items[next]?.focus();
}
