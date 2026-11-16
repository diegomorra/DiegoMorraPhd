import { useState } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { desktopIcons } from "../../data/desktopIcons";
import { useWindowStore } from "../../store/windowStore";
import { appRegistry } from "../../data/appsRegistry";
import type { DesktopIconConfig } from "../../data/desktopIcons";
import {
  FOCUSABLE_DESKTOP_ICON,
  handleArrowNavigation,
} from "../../utils/activation";

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
      onSelect={() => setSelectedId(icon.id)}
      onOpen={() => {
        if (icon.href) {
          window.open(icon.href, "_blank", "noopener,noreferrer");
          return;
        }
        if (!icon.appId) return;
        const app = appRegistry[icon.appId];
        openWindow(icon.appId, {
          title: app.defaultTitle,
          icon: icon.icon,
          payload: icon.payload,
        });
      }}
    />
  );

  const deselectOnBackground = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelectedId(null);
  };

  return (
    <div className="desktop-surface" onMouseDown={deselectOnBackground}>
      <header className="visually-hidden">
        <h1>
          Diego Morra, Ph.D. · Postdoctoral Researcher, MIT Senseable City Lab
        </h1>
        <p>
          This website looks like a Windows 98 desktop. Use Tab or the arrow
          keys to move between the desktop icons, Enter or Space to open one,
          and Escape to close a window. A text version with all the content on
          a single page, designed to be easier to use with screen readers, is
          linked at the very top of the page.
        </p>
      </header>
      <div className="desktop-watermark" aria-hidden="true">
        diegomorra.exe
      </div>
      <nav
        aria-label="Desktop"
        onKeyDown={(e) => handleArrowNavigation(e, FOCUSABLE_DESKTOP_ICON)}
      >
        <ul
          className="desktop-icons-zone desktop-icons-left"
          onMouseDown={deselectOnBackground}
        >
          {leftIcons.map(renderIcon)}
        </ul>
        {/* One column on the right: the academic content at the top, the
            corner group at the bottom; the two never overlap (see CSS). */}
        <div
          className="desktop-icons-right-side"
          onMouseDown={deselectOnBackground}
        >
          <ul
            className="desktop-icons-zone desktop-icons-right"
            onMouseDown={deselectOnBackground}
          >
            {rightIcons.map(renderIcon)}
          </ul>
          <ul className="desktop-icons-corner">
            {cornerIcons.map(renderIcon)}
          </ul>
        </div>
      </nav>
    </div>
  );
}
