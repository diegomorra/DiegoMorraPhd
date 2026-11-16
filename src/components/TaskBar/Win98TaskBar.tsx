import { useEffect, useRef, useState } from "react";
import { Frame, Button } from "@react95/core";
import { useWindowStore } from "../../store/windowStore";
import { appRegistry } from "../../data/appsRegistry";
import { StartMenu } from "./StartMenu";
import { Clock } from "./Clock";
import {
  FOCUSABLE_DESKTOP_ICON,
  isVirtualClick,
} from "../../utils/activation";

const PRESSED_SHADOW =
  "inset 1px 1px 0 #404040, inset 2px 2px 0 #808080, inset -1px -1px 0 #ffffff, inset -2px -2px 0 #dfdfdf";

export function Win98TaskBar() {
  const [startOpen, setStartOpen] = useState(false);
  const [focusFirstItem, setFocusFirstItem] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  // Where keyboard focus was before the Start menu opened.
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const windows = useWindowStore((s) => s.windows);
  const toggleMinimize = useWindowStore((s) => s.toggleMinimize);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const topZ = useWindowStore((s) => s.topZ);

  useEffect(() => {
    if (!startOpen) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".start-menu-root")) return;
      if (target.closest(".taskbar-start-button")) return;
      setStartOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [startOpen]);

  const keepFocus = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const closeStart = (opts?: { restoreFocus?: boolean }) => {
    setStartOpen(false);
    if (!opts?.restoreFocus) return;
    const prev = returnFocusRef.current;
    if (prev && prev.isConnected && prev !== document.body) prev.focus();
    else document.querySelector<HTMLElement>(FOCUSABLE_DESKTOP_ICON)?.focus();
  };

  const openApp = (appId: "internet-explorer" | "contact") => {
    const app = appRegistry[appId];
    useWindowStore
      .getState()
      .openWindow(appId, { title: app.defaultTitle, icon: app.defaultIcon });
  };

  return (
    <>
      {startOpen && (
        <StartMenu
          onClose={closeStart}
          focusFirstItem={focusFirstItem}
          startButton={startButtonRef}
        />
      )}
      {/* The taskbar is decorative: it only duplicates the desktop icons and
          contains no information about the work. It stays usable with the
          mouse, but is skipped by the keyboard and hidden from screen
          readers. */}
      <Frame
        as="div"
        aria-hidden="true"
        className="taskbar-root"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "2px 4px",
        }}
        onMouseDown={() => setStartOpen(false)}
      >
        <Button
          ref={startButtonRef}
          tabIndex={-1}
          onMouseDown={keepFocus}
          onClick={(e) => {
            if (!startOpen) {
              returnFocusRef.current = document.activeElement as HTMLElement | null;
            }
            setFocusFirstItem(isVirtualClick(e.nativeEvent));
            setStartOpen((v) => !v);
          }}
          className="taskbar-start-button"
          style={startOpen ? { boxShadow: PRESSED_SHADOW } : undefined}
        >
          <img src="/icons/Logo_16x16_4.png" alt="" />
          Start
        </Button>

        <div className="taskbar-divider" />

        <div className="taskbar-quicklaunch">
          <button
            type="button"
            title="Show Desktop"
            tabIndex={-1}
            onMouseDown={keepFocus}
            onClick={() => {
              const ws = useWindowStore.getState().windows;
              ws.forEach((w) => {
                if (!w.minimized) useWindowStore.getState().minimizeWindow(w.id);
              });
            }}
          >
            <img src="/icons/Desktop_16x16_4.png" alt="" />
          </button>
          <button
            type="button"
            title="Launch Internet Explorer"
            tabIndex={-1}
            onMouseDown={keepFocus}
            onClick={() => openApp("internet-explorer")}
          >
            <img src="/icons/Inetcpl1313_16x16_4.png" alt="" />
          </button>
          <button
            type="button"
            title="Launch Outlook Express"
            tabIndex={-1}
            onMouseDown={keepFocus}
            onClick={() => openApp("contact")}
          >
            <img src="/icons/Mailnews2_16x16_4.png" alt="" />
          </button>
        </div>

        <div className="taskbar-divider" />

        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 2,
            overflow: "hidden",
          }}
        >
          {windows.map((w) => {
            const app = appRegistry[w.appId];
            const isTop = !w.minimized && w.zIndex === topZ;
            const icon = w.icon ?? app.defaultIcon;
            return (
              <Button
                key={w.id}
                tabIndex={-1}
                onMouseDown={keepFocus}
                onClick={() => {
                  if (w.minimized) {
                    focusWindow(w.id, { moveFocus: true });
                  } else if (isTop) {
                    toggleMinimize(w.id);
                  } else {
                    focusWindow(w.id, { moveFocus: true });
                  }
                }}
                style={{
                  minWidth: 120,
                  maxWidth: 180,
                  justifyContent: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  ...(isTop ? { boxShadow: PRESSED_SHADOW } : {}),
                }}
                title={w.title}
              >
                {icon && (
                  <img
                    src={icon}
                    alt=""
                    style={{
                      width: 16,
                      height: 16,
                      imageRendering: "pixelated",
                      flexShrink: 0,
                    }}
                  />
                )}
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {w.title}
                </span>
              </Button>
            );
          })}
        </div>

        <div className="system-tray">
          <img
            src="/icons/Timedate200_16x16_4.png"
            alt=""
            title="Task Scheduler"
          />
          <img
            src="/icons/Sndvol32304_16x16_4.png"
            alt=""
            title="Volume"
          />
          <Clock />
        </div>
      </Frame>
    </>
  );
}
