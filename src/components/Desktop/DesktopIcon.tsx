import type { DesktopIconConfig } from "../../data/desktopIcons";
import { useTouchPrimary } from "../../hooks/useTouchPrimary";
import {
  iconActivationHandlers,
  linkActivationHandlers,
} from "../../utils/activation";

interface Props {
  config: DesktopIconConfig;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export function DesktopIcon({ config, selected, onSelect, onOpen }: Props) {
  const touchPrimary = useTouchPrimary();
  const decorative = Boolean(config.decorative);
  const className = `desktop-icon ${selected ? "selected" : ""}`;

  const content = (
    <>
      <span className="desktop-icon-img-wrap" aria-hidden="true">
        <img src={config.icon} alt="" />
      </span>
      <span className="desktop-icon-label">{config.label}</span>
      {config.srHint && (
        <span className="visually-hidden"> ({config.srHint})</span>
      )}
    </>
  );

  // Icons that point to a document (the CV PDF) are real links: they open in
  // a new browser tab instead of a Windows 98 window.
  if (config.href) {
    return (
      <li>
        <a
          className={className}
          href={config.href}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          onFocus={onSelect}
          {...linkActivationHandlers({
            href: config.href,
            onSelect,
            touchPrimary,
          })}
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    // Decorative icons are hidden from screen readers and removed from the
    // tab order, but keep working with the mouse.
    <li aria-hidden={decorative || undefined}>
      <button
        type="button"
        className={className}
        tabIndex={decorative ? -1 : undefined}
        // Don't let a mouse click move keyboard focus into hidden content.
        onMouseDown={decorative ? (e) => e.preventDefault() : undefined}
        onFocus={decorative ? undefined : onSelect}
        {...iconActivationHandlers({ onSelect, onOpen, touchPrimary })}
      >
        {content}
      </button>
    </li>
  );
}
