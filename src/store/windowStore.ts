import { create } from "zustand";
import type { AppId, WindowState, OpenWindowOptions } from "../types";

export type ShutdownPhase = null | "off" | "menu";

interface WindowStore {
  windows: WindowState[];
  topZ: number;
  shutdownPhase: ShutdownPhase;
  openWindow: (appId: AppId, opts?: OpenWindowOptions) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
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

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  topZ: 10,
  shutdownPhase: null,
  setShutdownPhase: (p) => set({ shutdownPhase: p }),

  openWindow: (appId, opts = {}) =>
    set((state) => {
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
      };
    }),

  closeWindow: (id) =>
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  focusWindow: (id) =>
    set((s) => {
      const newZ = s.topZ + 1;
      return {
        topZ: newZ,
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, zIndex: newZ, minimized: false } : w,
        ),
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
        };
      }
      return {
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, minimized: true } : w,
        ),
      };
    }),
}));
