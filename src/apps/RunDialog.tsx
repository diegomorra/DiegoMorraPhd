import { useState } from "react";
import { Button } from "@react95/core";
import { useWindowStore } from "../store/windowStore";
import { appRegistry } from "../data/appsRegistry";
import type { AppId } from "../types";

const ALIASES: Record<string, AppId> = {
  calc: "calculator",
  calculator: "calculator",
  cmd: "ms-dos",
  command: "ms-dos",
  "command.com": "ms-dos",
  "msdos.exe": "ms-dos",
  charmap: "character-map",
  paint: "paint",
  mspaint: "paint",
  "mspaint.exe": "paint",
  dvd: "bouncing-dvd",
  bounce: "bouncing-dvd",
  "bouncing-dvd": "bouncing-dvd",
  freecell: "solitaire",
  sol: "solitaire",
  solitaire: "solitaire",
  winmine: "minesweeper",
  minesweeper: "minesweeper",
  iexplore: "internet-explorer",
  ie: "internet-explorer",
  notepad: "about",
  about: "about",
  explorer: "my-computer",
  "my-computer": "my-computer",
  contacts: "contact",
  outlook: "contact",
  projects: "projects",
  publications: "publications",
  cv: "cv",
};

export function RunDialog({ windowId }: { windowId?: string }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const open = useWindowStore((s) => s.openWindow);
  const close = useWindowStore((s) => s.closeWindow);

  const tryRun = () => {
    const key = value.trim().toLowerCase();
    if (!key) return;
    const appId = ALIASES[key];
    if (!appId) {
      setError(
        `Cannot find the file '${value}'. Make sure you typed the name correctly, and then try again.`,
      );
      return;
    }
    const app = appRegistry[appId];
    open(appId, {
      title: app.defaultTitle,
      icon: app.defaultIcon,
    });
    if (windowId) close(windowId);
  };

  return (
    <div
      style={{
        padding: 16,
        background: "#c0c0c0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <img
          src="/icons/Rundll1_32x32_4.png"
          alt=""
          style={{
            width: 32,
            height: 32,
            imageRendering: "pixelated",
            flexShrink: 0,
          }}
        />
        <p style={{ margin: 0, fontSize: 11, lineHeight: 1.4 }}>
          Type the name of a program, and Windows will open it for you.
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <label style={{ fontSize: 11 }}>Open:</label>
        <input
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") tryRun();
          }}
          style={{
            flex: 1,
            background: "#ffffff",
            border: "none",
            boxShadow:
              "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
            padding: "2px 6px",
            fontFamily: "inherit",
            fontSize: 11,
          }}
        />
      </div>
      {error && (
        <p style={{ margin: 0, fontSize: 11, color: "#a00000" }}>{error}</p>
      )}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginTop: "auto",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={tryRun} style={{ minWidth: 70 }}>
          OK
        </Button>
        <Button
          onClick={() => windowId && close(windowId)}
          style={{ minWidth: 70 }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
