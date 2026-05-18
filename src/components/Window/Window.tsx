import { useMemo } from "react";
import { Modal, TitleBar } from "@react95/core";
import { useWindowStore } from "../../store/windowStore";
import { appRegistry } from "../../data/appsRegistry";
import type { WindowState } from "../../types";

const TASKBAR_HEIGHT = 36;

function defaultPositionFor(index: number) {
  const baseX = 60;
  const baseY = 40;
  const step = 28;
  return {
    x: baseX + index * step,
    y: baseY + index * step,
  };
}

export function Window({ data, index }: { data: WindowState; index: number }) {
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);

  const app = appRegistry[data.appId];

  const defaultPos = useMemo(
    () => data.initialPosition ?? defaultPositionFor(index),
    [data.initialPosition, index],
  );

  const size = data.initialSize ?? app.defaultSize;

  return (
    <Modal
      key={data.id}
      title={data.title}
      icon={
        data.icon || app.defaultIcon ? (
          <img
            src={data.icon ?? app.defaultIcon}
            alt=""
            style={{
              width: 16,
              height: 16,
              imageRendering: "pixelated",
            }}
          />
        ) : undefined
      }
      hasWindowButton={false}
      dragOptions={{
        defaultPosition: defaultPos,
        bounds: {
          top: 0,
          left: 0,
          bottom: TASKBAR_HEIGHT,
          right: 0,
        },
      }}
      titleBarOptions={[
        <TitleBar.Minimize
          key="min"
          onClick={() => minimizeWindow(data.id)}
        />,
        <TitleBar.Close key="close" onClick={() => closeWindow(data.id)} />,
      ]}
      menu={app.menu}
      style={{
        position: "absolute",
        zIndex: data.zIndex,
        width: size.width,
        height: size.height,
        display: data.minimized ? "none" : undefined,
      }}
      onMouseDownCapture={() => focusWindow(data.id)}
    >
      <div style={{ flex: 1, overflow: "auto", height: "100%" }}>
        {app.render(data)}
      </div>
    </Modal>
  );
}
