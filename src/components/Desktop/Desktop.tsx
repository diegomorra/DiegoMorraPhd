import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { desktopIcons } from "../../data/desktopIcons";
import { useWindowStore } from "../../store/windowStore";
import { appRegistry } from "../../data/appsRegistry";

export function Desktop() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div
      className="desktop-icons"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setSelectedId(null);
      }}
    >
      {desktopIcons.map((icon) => (
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
      ))}
    </div>
  );
}
