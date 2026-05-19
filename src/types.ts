export type AppId =
  | "my-computer"
  | "projects"
  | "project-doc"
  | "about"
  | "contact"
  | "recycle-bin"
  | "internet-explorer"
  | "minesweeper"
  | "solitaire"
  | "calculator"
  | "ms-dos"
  | "character-map"
  | "paint"
  | "bouncing-dvd"
  | "run"
  | "publications"
  | "cv"
  | "placeholder";

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  icon?: string;
  zIndex: number;
  minimized: boolean;
  payload?: Record<string, unknown>;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

export interface OpenWindowOptions {
  title?: string;
  icon?: string;
  payload?: Record<string, unknown>;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}
