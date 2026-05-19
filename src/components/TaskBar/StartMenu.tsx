import { useState } from "react";
import { List } from "@react95/core";
import { useWindowStore } from "../../store/windowStore";
import { appRegistry } from "../../data/appsRegistry";
import type { AppId } from "../../types";

interface MenuItem {
  appId: AppId;
  label: string;
  icon: string;
}

const topItems: MenuItem[] = [
  {
    appId: "projects",
    label: "Projects",
    icon: "/icons/Folder_32x32_4.png",
  },
  {
    appId: "about",
    label: "About me",
    icon: "/icons/Notepad2_32x32_4.png",
  },
  {
    appId: "contact",
    label: "Contacts",
    icon: "/icons/Mailnews2_32x32_4.png",
  },
  {
    appId: "my-computer",
    label: "My Computer",
    icon: "/icons/Computer3_32x32_4.png",
  },
  {
    appId: "internet-explorer",
    label: "Internet Explorer",
    icon: "/icons/Inetcpl1313_32x32_4.png",
  },
];

const gamesItems: MenuItem[] = [
  {
    appId: "solitaire",
    label: "Solitaire",
    icon: "/icons/Sol1_32x32_4.png",
  },
  {
    appId: "minesweeper",
    label: "Minesweeper",
    icon: "/icons/Winmine1_32x32_4.png",
  },
];

function MenuRow({
  icon,
  label,
  onClick,
  onMouseEnter,
  expanded,
  hasSubmenu,
}: {
  icon?: string;
  label: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  expanded?: boolean;
  hasSubmenu?: boolean;
}) {
  return (
    <List.Item
      icon={
        icon ? (
          <img
            src={icon}
            alt=""
            style={{
              width: 24,
              height: 24,
              imageRendering: "pixelated",
            }}
          />
        ) : undefined
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
        <span style={{ marginLeft: 12, opacity: expanded ? 1 : 0.7 }}>
          ▶
        </span>
      )}
    </List.Item>
  );
}

export function StartMenu({ onClose }: { onClose: () => void }) {
  const open = useWindowStore((s) => s.openWindow);
  const [submenu, setSubmenu] = useState<null | "games">(null);

  const openApp = (item: MenuItem) => {
    const app = appRegistry[item.appId];
    open(item.appId, { title: app.defaultTitle, icon: item.icon });
    onClose();
  };

  return (
    <div
      className="start-menu-root"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="start-menu-banner">
        <span className="start-menu-banner-windows">diegomorra</span>
        <span className="start-menu-banner-98">.exe</span>
      </div>
      <div className="start-menu-list">
        <List>
          <MenuRow
            icon="/icons/Joy108_32x32_4.png"
            label="Games"
            hasSubmenu
            expanded={submenu === "games"}
            onMouseEnter={() => setSubmenu("games")}
            onClick={() => setSubmenu(submenu === "games" ? null : "games")}
          />
          <List.Divider />
          {topItems.map((item) => (
            <div
              key={item.appId}
              onMouseEnter={() => setSubmenu(null)}
            >
              <MenuRow
                icon={item.icon}
                label={item.label}
                onClick={() => openApp(item)}
              />
            </div>
          ))}
          <List.Divider />
          <div onMouseEnter={() => setSubmenu(null)}>
            <MenuRow
              icon="/icons/Logo_16x16_4.png"
              label="Shut Down..."
              onClick={() => {
                onClose();
                alert("Shut down?\n\nClick OK to do absolutely nothing.");
              }}
            />
          </div>
        </List>
      </div>

      {submenu === "games" && (
        <div className="start-menu-submenu">
          <List>
            {gamesItems.map((item) => (
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
