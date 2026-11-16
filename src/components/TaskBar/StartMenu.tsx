import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { List } from "@react95/core";
import { useWindowStore } from "../../store/windowStore";
import { appRegistry } from "../../data/appsRegistry";
import { useViewportSize } from "../../hooks/useViewportSize";
import type { AppId } from "../../types";

interface MenuItem {
  appId: AppId;
  label: string;
  icon: string;
}

type Submenu = "games" | "programs" | null;

const topItems: MenuItem[] = [
  { appId: "about", label: "Bio", icon: "/icons/Winhlp324001_32x32_4.png" },
  {
    appId: "projects",
    label: "Research Projects",
    icon: "/icons/Folder_32x32_4.png",
  },
  {
    appId: "publications",
    label: "Publications",
    icon: "/icons/Notepad1_32x32_4.png",
  },
  {
    appId: "exhibitions",
    label: "Exhibitions",
    icon: "/icons/Folder_32x32_4.png",
  },
  {
    appId: "design",
    label: "Design Stuff",
    icon: "/icons/Folder_32x32_4.png",
  },
  { appId: "contact", label: "Contacts", icon: "/icons/Mailnews2_32x32_4.png" },
  {
    appId: "my-computer",
    label: "My Computer",
    icon: "/icons/Computer3_32x32_4.png",
  },
  {
    appId: "accessibility",
    label: "Accessibility Options",
    icon: "/icons/Access110_32x32_4.png",
  },
];

const gamesItems: MenuItem[] = [
  { appId: "solitaire", label: "Solitaire", icon: "/icons/Sol1_32x32_4.png" },
  {
    appId: "minesweeper",
    label: "Minesweeper",
    icon: "/icons/Winmine1_32x32_4.png",
  },
];

const programsItems: MenuItem[] = [
  {
    appId: "calculator",
    label: "Calculator",
    icon: "/icons/Calculator_32x32_4.png",
  },
  { appId: "paint", label: "MS Paint", icon: "/icons/Mspaint_32x32_4.png" },
  { appId: "ms-dos", label: "MS-DOS Prompt", icon: "/icons/MsDos_32x32_32.png" },
  {
    appId: "character-map",
    label: "Character Map",
    icon: "/icons/Charmap1_32x32_4.png",
  },
  {
    appId: "internet-explorer",
    label: "Internet Explorer",
    icon: "/icons/Inetcpl1313_32x32_4.png",
  },
  {
    appId: "bouncing-dvd",
    label: "Bouncing DVD",
    icon: "/icons/BlankScreen100_32x32_4.png",
  },
];

const MENUITEM = '[role="menuitem"]';

function MenuRow({
  icon,
  label,
  onClick,
  onMouseEnter,
  expanded,
  submenuKind,
  accordion,
  className,
}: {
  icon?: string;
  label: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  expanded?: boolean;
  /** Set on items that open a submenu. */
  submenuKind?: "games" | "programs";
  accordion?: boolean;
  className?: string;
}) {
  const hasSubmenu = Boolean(submenuKind);
  return (
    <List.Item
      role="menuitem"
      tabIndex={-1}
      data-submenu={submenuKind}
      aria-haspopup={hasSubmenu ? "menu" : undefined}
      aria-expanded={hasSubmenu ? Boolean(expanded) : undefined}
      className={className}
      icon={
        icon ? (
          <img
            src={icon}
            alt=""
            style={{
              width: 24,
              height: 24,
              imageRendering: "pixelated",
              marginRight: 10,
            }}
          />
        ) : (
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 24,
              height: 24,
              marginRight: 10,
            }}
          />
        )
      }
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={
        hasSubmenu
          ? {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }
          : undefined
      }
    >
      <span style={{ flex: 1 }}>{label}</span>
      {hasSubmenu && (
        <span
          aria-hidden="true"
          style={{
            marginLeft: 12,
            opacity: expanded ? 1 : 0.7,
            display: "inline-block",
            transition: "transform 0.15s ease",
            transform: accordion && expanded ? "rotate(90deg)" : "none",
          }}
        >
          ▶
        </span>
      )}
    </List.Item>
  );
}

function itemsIn(list: HTMLElement | null): HTMLElement[] {
  if (!list) return [];
  return Array.from(list.querySelectorAll<HTMLElement>(`:scope > ${MENUITEM}`));
}

/** Arrow / Home / End movement inside one menu. Returns true if handled. */
function moveFocus(e: KeyboardEvent, items: HTMLElement[]): boolean {
  const i = items.indexOf(document.activeElement as HTMLElement);
  let next: number | null = null;
  if (e.key === "ArrowDown") next = i < 0 ? 0 : (i + 1) % items.length;
  else if (e.key === "ArrowUp")
    next = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = items.length - 1;
  if (next === null) return false;
  e.preventDefault();
  items[next]?.focus();
  return true;
}

export function StartMenu({
  onClose,
  focusFirstItem,
  startButton,
}: {
  onClose: (opts?: { restoreFocus?: boolean }) => void;
  focusFirstItem: boolean;
  startButton: RefObject<HTMLElement | null>;
}) {
  const open = useWindowStore((s) => s.openWindow);
  const setShutdownPhase = useWindowStore((s) => s.setShutdownPhase);
  const [submenu, setSubmenu] = useState<Submenu>(null);
  // Set when a submenu is opened from the keyboard: focus its first item
  // once it has rendered.
  const focusSubmenuRef = useRef(false);
  const { width } = useViewportSize();
  const isMobile = width <= 600;
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLUListElement>(null);
  const subRef = useRef<HTMLUListElement>(null);

  // When the menu opens: keyboard users land on the first item; mouse users
  // get focus on the menu itself (no highlighted item, like Windows 98).
  useEffect(() => {
    if (focusFirstItem) itemsIn(mainRef.current)[0]?.focus();
    else mainRef.current?.focus();
  }, [focusFirstItem]);

  useEffect(() => {
    if (!focusSubmenuRef.current || !submenu) return;
    focusSubmenuRef.current = false;
    const items = isMobile
      ? itemsIn(mainRef.current).filter((el) =>
          el.classList.contains("start-menu-subitem"),
        )
      : itemsIn(subRef.current);
    items[0]?.focus();
  }, [submenu, isMobile]);

  const openApp = (item: MenuItem) => {
    const app = appRegistry[item.appId];
    open(item.appId, { title: app.defaultTitle, icon: item.icon });
    onClose();
  };

  const openRun = () => {
    const app = appRegistry.run;
    open("run", { title: app.defaultTitle, icon: app.defaultIcon });
    onClose();
  };

  const activeItems =
    submenu === "games"
      ? gamesItems
      : submenu === "programs"
        ? programsItems
        : null;

  const parentItem = (kind: "games" | "programs") =>
    mainRef.current?.querySelector<HTMLElement>(`[data-submenu="${kind}"]`);

  const onMainKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const target = document.activeElement as HTMLElement | null;
    const kind = target?.dataset.submenu as "games" | "programs" | undefined;
    if (moveFocus(e, itemsIn(mainRef.current))) return;
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose({ restoreFocus: true });
    } else if (e.key === "Tab") {
      onClose();
    } else if (kind && (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      focusSubmenuRef.current = true;
      setSubmenu(kind);
    } else if (e.key === "ArrowLeft" && isMobile && submenu) {
      e.preventDefault();
      const kindOpen = submenu;
      setSubmenu(null);
      parentItem(kindOpen)?.focus();
    } else if ((e.key === "Enter" || e.key === " ") && target?.matches(MENUITEM)) {
      e.preventDefault();
      target.click();
    }
  };

  const onSubKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    e.stopPropagation();
    if (moveFocus(e, itemsIn(subRef.current))) return;
    const target = document.activeElement as HTMLElement | null;
    if (e.key === "ArrowLeft" || e.key === "Escape") {
      e.preventDefault();
      const kindOpen = submenu;
      setSubmenu(null);
      if (kindOpen) parentItem(kindOpen)?.focus();
    } else if (e.key === "Tab") {
      onClose();
    } else if ((e.key === "Enter" || e.key === " ") && target?.matches(MENUITEM)) {
      e.preventDefault();
      target.click();
    }
  };

  const onBlur = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (!next) return; // focus went to nothing (e.g. clicked item closed the menu)
    if (rootRef.current?.contains(next) || next === startButton.current) return;
    onClose();
  };

  const renderSubmenuParent = (
    kind: "games" | "programs",
    label: string,
    icon: string,
  ) => (
    <MenuRow
      key={kind}
      icon={icon}
      label={label}
      submenuKind={kind}
      accordion={isMobile}
      expanded={submenu === kind}
      onMouseEnter={isMobile ? undefined : () => setSubmenu(kind)}
      onClick={() => setSubmenu(submenu === kind ? null : kind)}
    />
  );

  return (
    <div
      ref={rootRef}
      className="start-menu-root"
      onMouseDown={(e) => e.stopPropagation()}
      onBlur={onBlur}
    >
      <div className="start-menu-banner" aria-hidden="true">
        <span className="start-menu-banner-text">
          <strong>diegomorra</strong>.EXE
        </span>
      </div>
      <div className="start-menu-list">
        <List
          ref={mainRef}
          id="start-menu"
          role="menu"
          aria-label="Start menu"
          tabIndex={-1}
          onKeyDown={onMainKeyDown}
        >
          {renderSubmenuParent("games", "Games", "/icons/Joy110_32x32_4.png")}
          {isMobile &&
            submenu === "games" &&
            gamesItems.map((item) => (
              <MenuRow
                key={item.appId}
                className="start-menu-subitem"
                icon={item.icon}
                label={item.label}
                onClick={() => openApp(item)}
              />
            ))}
          {renderSubmenuParent("programs", "Programs", "/icons/FolderExe_32x32_4.png")}
          {isMobile &&
            submenu === "programs" &&
            programsItems.map((item) => (
              <MenuRow
                key={item.appId}
                className="start-menu-subitem"
                icon={item.icon}
                label={item.label}
                onClick={() => openApp(item)}
              />
            ))}
          <List.Divider role="separator" />
          {topItems.map((item) => (
            <MenuRow
              key={item.appId}
              icon={item.icon}
              label={item.label}
              onMouseEnter={() => setSubmenu(null)}
              onClick={() => openApp(item)}
            />
          ))}
          <List.Divider role="separator" />
          <MenuRow
            icon="/icons/Rundll1_32x32_4.png"
            label="Run..."
            onMouseEnter={() => setSubmenu(null)}
            onClick={openRun}
          />
          <List.Divider role="separator" />
          <MenuRow
            icon="/icons/Logo_16x16_4.png"
            label="Shut Down..."
            onMouseEnter={() => setSubmenu(null)}
            onClick={() => {
              onClose();
              setShutdownPhase("off");
            }}
          />
        </List>
      </div>

      {!isMobile && activeItems && (
        <div className="start-menu-submenu">
          <List
            ref={subRef}
            role="menu"
            aria-label={submenu === "games" ? "Games" : "Programs"}
            onKeyDown={onSubKeyDown}
          >
            {activeItems.map((item) => (
              <MenuRow
                key={item.appId}
                icon={item.icon}
                label={item.label}
                onClick={() => openApp(item)}
              />
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
