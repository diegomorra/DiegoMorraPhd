import { useEffect, useState } from "react";
import { Frame, Button } from "@react95/core";
import { useWindowStore } from "../../store/windowStore";
import { appRegistry } from "../../data/appsRegistry";
import { StartMenu } from "./StartMenu";
import { Clock } from "./Clock";

const PRESSED_SHADOW =
  "inset 1px 1px 0 #404040, inset 2px 2px 0 #808080, inset -1px -1px 0 #ffffff, inset -2px -2px 0 #dfdfdf";

export function Win98TaskBar() {
  const [startOpen, setStartOpen] = useState(false);
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

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      <Frame
        as="div"
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
          onMouseDown={(e) => {
            e.stopPropagation();
            setStartOpen((v) => !v);
          }}
          className="taskbar-start-button"
          aria-haspopup="menu"
          aria-expanded={startOpen}
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
            onMouseDown={(e) => e.stopPropagation()}
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
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => {
              const app = appRegistry["internet-explorer"];
              useWindowStore
                .getState()
                .openWindow("internet-explorer", {
                  title: app.defaultTitle,
                  icon: app.defaultIcon,
                });
            }}
          >
            <img src="/icons/Inetcpl1313_16x16_4.png" alt="" />
          </button>
          <button
            type="button"
            title="Launch Outlook Express"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => {
              const app = appRegistry.contact;
              useWindowStore
                .getState()
                .openWindow("contact", {
                  title: app.defaultTitle,
                  icon: app.defaultIcon,
                });
            }}
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
                aria-pressed={isTop}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  if (w.minimized) {
                    focusWindow(w.id);
                  } else if (isTop) {
                    toggleMinimize(w.id);
                  } else {
                    focusWindow(w.id);
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
            alt="Task Scheduler"
            title="Task Scheduler"
          />
          <img src="/icons/Sndvol32304_16x16_4.png" alt="Volume" title="Volume" />
          <Clock />
        </div>
      </Frame>
    </>
  );
}
