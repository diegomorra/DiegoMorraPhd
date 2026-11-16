import { create } from "zustand";
import type { AppId, WindowState, OpenWindowOptions } from "../types";

export type ShutdownPhase = null | "off" | "menu";

/**
 * A request to move keyboard focus into a window. The nonce makes repeated
 * requests for the same window observable.
 */
export interface FocusRequest {
  id: string;
  nonce: number;
}

interface WindowStore {
  windows: WindowState[];
  topZ: number;
  shutdownPhase: ShutdownPhase;
  focusRequest: FocusRequest | null;
  openWindow: (appId: AppId, opts?: OpenWindowOptions) => void;
  closeWindow: (id: string) => void;
  /** Bring to front. Pass moveFocus when the user acted from outside the window (e.g. taskbar). */
  focusWindow: (id: string, opts?: { moveFocus?: boolean }) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  setShutdownPhase: (p: ShutdownPhase) => void;
}

function payloadEqual(a?: Record<string, unknown>, b?: Record<string, unknown>) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return JSON.stringify(a) === JSON.stringify(b);
}

let focusNonce = 0;
function requestFocus(id: string): FocusRequest {
  focusNonce += 1;
  return { id, nonce: focusNonce };
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  topZ: 10,
  shutdownPhase: null,
  focusRequest: null,
  setShutdownPhase: (p) => set({ shutdownPhase: p }),

  openWindow: (appId, opts = {}) =>
    set((state) => {
      const moveFocus = opts.focus !== false;
      const existing = state.windows.find(
        (w) => w.appId === appId && payloadEqual(w.payload, opts.payload),
      );
      const newZ = state.topZ + 1;
      if (existing) {
        return {
          topZ: newZ,
          windows: state.windows.map((w) =>
            w.id === existing.id
              ? { ...w, zIndex: newZ, minimized: false }
              : w,
          ),
          focusRequest: moveFocus ? requestFocus(existing.id) : state.focusRequest,
        };
      }
      const id = `${appId}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;
      const newWindow: WindowState = {
        id,
        appId,
        title: opts.title ?? appId,
        icon: opts.icon,
        zIndex: newZ,
        minimized: false,
        payload: opts.payload,
        initialPosition: opts.initialPosition,
        initialSize: opts.initialSize,
      };
      return {
        topZ: newZ,
        windows: [...state.windows, newWindow],
        focusRequest: moveFocus ? requestFocus(id) : state.focusRequest,
      };
    }),

  closeWindow: (id) =>
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  focusWindow: (id, opts) =>
    set((s) => {
      const newZ = s.topZ + 1;
      return {
        topZ: newZ,
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, zIndex: newZ, minimized: false } : w,
        ),
        focusRequest: opts?.moveFocus ? requestFocus(id) : s.focusRequest,
      };
    }),

  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w,
      ),
    })),

  restoreWindow: (id) =>
    set((s) => {
      const newZ = s.topZ + 1;
      return {
        topZ: newZ,
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, minimized: false, zIndex: newZ } : w,
        ),
        focusRequest: requestFocus(id),
      };
    }),

  toggleMinimize: (id) =>
    set((s) => {
      const target = s.windows.find((w) => w.id === id);
      if (!target) return {};
      if (target.minimized) {
        const newZ = s.topZ + 1;
        return {
          topZ: newZ,
          windows: s.windows.map((w) =>
            w.id === id ? { ...w, minimized: false, zIndex: newZ } : w,
          ),
          focusRequest: requestFocus(id),
        };
      }
      return {
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, minimized: true } : w,
        ),
      };
    }),
}));
