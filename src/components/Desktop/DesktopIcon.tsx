import type { MouseEvent } from "react";
import type { DesktopIconConfig } from "../../data/desktopIcons";
import { useTouchPrimary } from "../../hooks/useTouchPrimary";

interface Props {
  config: DesktopIconConfig;
  selected: boolean;
  onSelect: (e: MouseEvent) => void;
  onOpen: () => void;
}

export function DesktopIcon({ config, selected, onSelect, onOpen }: Props) {
  const isTouch = useTouchPrimary();

  return (
    <div
      className={`desktop-icon ${selected ? "selected" : ""}`}
      tabIndex={0}
      onMouseDown={onSelect}
      onClick={isTouch ? onOpen : undefined}
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen();
      }}
    >
      <span className="desktop-icon-img-wrap">
        <img src={config.icon} alt="" />
      </span>
      <span className="desktop-icon-label">{config.label}</span>
    </div>
  );
}
