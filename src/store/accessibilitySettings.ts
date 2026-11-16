import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Settings of the Accessibility Options window (Windows 98 desktop only; the
// text version has its own fixed, high-contrast design).
// They are applied as data attributes on <html> (see App.tsx and the
// "Accessibility Options settings" section of global.css) and saved in this
// browser's localStorage.

export type ContrastScheme = "white-on-black" | "black-on-white";
export type TextSize = "normal" | "large" | "extra-large";

export interface AccessibilitySettings {
  /** "Use High Contrast" (Display tab). */
  highContrast: boolean;
  contrastScheme: ContrastScheme;
  /** Like the "(large)" / "(extra large)" schemes of Windows 98. */
  textSize: TextSize;
  /** Windows 98 "Web style": single-click to open an item (point to select). */
  singleClick: boolean;
}

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  contrastScheme: "white-on-black",
  textSize: "normal",
  singleClick: false,
};

/** Zoom applied to content windows and desktop icons for each text size. */
export const TEXT_ZOOM: Record<TextSize, number> = {
  normal: 1,
  large: 1.25,
  "extra-large": 1.5,
};

interface AccessibilitySettingsStore extends AccessibilitySettings {
  update: (patch: Partial<AccessibilitySettings>) => void;
  reset: () => void;
}

// localStorage can be unavailable or throw (private windows, blocked site
// data): the settings then simply last until the page is reloaded.
const safeLocalStorage = createJSONStorage<AccessibilitySettings>(() => ({
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
}));

export const useAccessibilitySettings = create<AccessibilitySettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_ACCESSIBILITY_SETTINGS,
      update: (patch) => set(patch),
      reset: () => set(DEFAULT_ACCESSIBILITY_SETTINGS),
    }),
    {
      name: "dm-accessibility-options",
      version: 1,
      storage: safeLocalStorage,
      partialize: ({ highContrast, contrastScheme, textSize, singleClick }) => ({
        highContrast,
        contrastScheme,
        textSize,
        singleClick,
      }),
    },
  ),
);

/** Read outside React (event handlers). */
export function isSingleClickEnabled() {
  return useAccessibilitySettings.getState().singleClick;
}

/** Mirror the settings on <html> so that CSS can follow them. */
export function applyAccessibilitySettings(s: AccessibilitySettings) {
  const root = document.documentElement;
  if (s.highContrast) root.dataset.contrast = s.contrastScheme;
  else delete root.dataset.contrast;
  if (s.textSize !== "normal") root.dataset.textSize = s.textSize;
  else delete root.dataset.textSize;
  if (s.singleClick) root.dataset.singleClick = "";
  else delete root.dataset.singleClick;
}
