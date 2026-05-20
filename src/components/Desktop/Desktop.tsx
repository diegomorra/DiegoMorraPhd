import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { desktopIcons } from "../../data/desktopIcons";
import { useWindowStore } from "../../store/windowStore";
import { appRegistry } from "../../data/appsRegistry";
import type { DesktopIconConfig } from "../../data/desktopIcons";

export function Desktop() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openWindow = useWindowStore((s) => s.openWindow);

  const leftIcons = desktopIcons.filter(
    (i) => !i.placement || i.placement === "left",
  );
  const rightIcons = desktopIcons.filter((i) => i.placement === "right");
  const cornerIcons = desktopIcons.filter(
    (i) => i.placement === "bottom-right",
  );

  const renderIcon = (icon: DesktopIconConfig) => (
    <DesktopIcon
      key={icon.id}
      config={icon}
      selected={selectedId === icon.id}
      onSelect={(e) => {
        e.stopPropagation();
        setSelectedId(icon.id);
      }}
      onOpen={() => {
        const app = appRegistry[icon.appId];
        openWindow(icon.appId, {
          title: app.defaultTitle,
          icon: icon.icon,
          payload: icon.payload,
        });
      }}
    />
  );

  return (
    <div
      className="desktop-surface"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setSelectedId(null);
      }}
    >
      <div className="desktop-watermark">diegomorra.exe</div>
      <div
        className="desktop-icons-zone desktop-icons-left"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) setSelectedId(null);
        }}
      >
        {leftIcons.map(renderIcon)}
      </div>
      <div
        className="desktop-icons-zone desktop-icons-right"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) setSelectedId(null);
        }}
      >
        {rightIcons.map(renderIcon)}
      </div>
      <div className="desktop-icons-corner">{cornerIcons.map(renderIcon)}</div>
    </div>
  );
}
