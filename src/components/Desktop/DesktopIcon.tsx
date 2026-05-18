import type { MouseEvent } from "react";
import type { DesktopIconConfig } from "../../data/desktopIcons";

interface Props {
  config: DesktopIconConfig;
  selected: boolean;
  onSelect: (e: MouseEvent) => void;
  onOpen: () => void;
}

export function DesktopIcon({ config, selected, onSelect, onOpen }: Props) {
  return (
    <div
      className={`desktop-icon ${selected ? "selected" : ""}`}
      tabIndex={0}
      onMouseDown={onSelect}
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
