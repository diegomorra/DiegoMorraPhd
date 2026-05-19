import { useSyncExternalStore } from "react";

const QUERY = "(hover: none) and (pointer: coarse)";

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

export function useTouchPrimary() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
