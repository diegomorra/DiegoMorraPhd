import { useTouchPrimary } from "../../hooks/useTouchPrimary";
import {
  iconActivationHandlers,
  linkActivationHandlers,
} from "../../utils/activation";

/**
 * A folder or file inside an Explorer-style window. A real button (or a real
 * link, when `href` is set): Enter, Space, screen readers and touch open it;
 * with a mouse, click selects and double click opens (one click with the
 * "Single-click to open an item" option of Accessibility Options).
 */
export function ExplorerItem({
  icon,
  label,
  kind,
  eyebrow,
  href,
  selected,
  onSelect,
  onOpen,
}: {
  icon: string;
  label: string;
  /** Spoken after the name, e.g. "folder" or "document". */
  kind?: string;
  /** Small label above the name (e.g. a discipline). */
  eyebrow?: string;
  /** Open this document in a new browser tab instead of calling onOpen. */
  href?: string;
  selected?: boolean;
  onSelect?: () => void;
  onOpen?: () => void;
}) {
  const touchPrimary = useTouchPrimary();
  const select = onSelect ?? (() => {});
  const className = `explorer-item ${selected ? "selected" : ""}`;

  const content = (
    <>
      <img src={icon} alt="" />
      <span className="explorer-item-label">
        {eyebrow && <span className="explorer-item-eyebrow">{eyebrow}</span>}
        {label}
        {kind && <span className="visually-hidden">, {kind}</span>}
      </span>
    </>
  );

  if (href) {
    return (
      <li>
        <a
          className={className}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          onFocus={onSelect}
          {...linkActivationHandlers({ href, onSelect: select, touchPrimary })}
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        className={className}
        onFocus={onSelect}
        {...iconActivationHandlers({
          onSelect: select,
          onOpen: onOpen ?? (() => {}),
          touchPrimary,
        })}
      >
        {content}
      </button>
    </li>
  );
}
