import { useState } from "react";
import { useWindowStore } from "../store/windowStore";
import { appRegistry } from "../data/appsRegistry";
import { ExplorerItem } from "../components/shared/ExplorerItem";
import { handleArrowNavigation } from "../utils/activation";
import { cv } from "../data/profile";
import type { AppId } from "../types";

interface Entry {
  id: string;
  /** Opens a window... */
  appId?: AppId;
  /** ...or a document in a new browser tab. */
  href?: string;
  label: string;
  icon: string;
  description: string;
}

const entries: Entry[] = [
  {
    id: "about",
    appId: "about",
    label: "Bio",
    icon: "/icons/Winhlp324001_32x32_4.png",
    description:
      "Short bio, research interests, appointments, education, awards, invited talks and academic service.",
  },
  {
    id: "projects",
    appId: "projects",
    label: "Research Projects",
    icon: "/icons/Folder_32x32_4.png",
    description: "Research projects, grouped by theme.",
  },
  {
    id: "publications",
    appId: "publications",
    label: "Publications",
    icon: "/icons/Notepad1_32x32_4.png",
    description: "Journal articles, conference papers, chapters and workshops.",
  },
  {
    id: "exhibitions",
    appId: "exhibitions",
    label: "Exhibitions",
    icon: "/icons/Folder_32x32_4.png",
    description: "Public exhibitions and installations.",
  },
  {
    id: "design",
    appId: "design",
    label: "Design Stuff",
    icon: "/icons/Folder_32x32_4.png",
    description: "Selected design work.",
  },
  {
    id: "cv",
    href: cv.pdf,
    label: "CV",
    icon: "/icons/Awschd32400_32x32_4.png",
    description: "Curriculum vitae (PDF, opens in a new tab).",
  },
  {
    id: "contact",
    appId: "contact",
    label: "Contacts",
    icon: "/icons/Mailnews2_32x32_4.png",
    description: "E-mail and academic profiles.",
  },
  {
    id: "accessibility",
    appId: "accessibility",
    label: "Accessibility Options",
    icon: "/icons/Access110_32x32_4.png",
    description: "Display and mouse settings, keyboard help and the text version of this site.",
  },
  {
    id: "recycle-bin",
    appId: "recycle-bin",
    label: "Recycle Bin",
    icon: "/icons/RecycleEmpty_32x32_4.png",
    description: "Nothing important in here.",
  },
];

/** Decorative toolbar button (Windows 98 look only, does nothing). */
function ToolBtn({
  icon,
  flip,
  label,
  unicode,
}: {
  icon?: string;
  flip?: boolean;
  label: string;
  unicode?: string;
}) {
  return (
    <span className="mc-toolbtn">
      {icon ? (
        <img
          src={icon}
          alt=""
          style={{ transform: flip ? "scaleX(-1)" : undefined }}
        />
      ) : (
        <span className="mc-toolbtn-glyph">{unicode}</span>
      )}
      <span>{label}</span>
    </span>
  );
}

export function MyComputer() {
  const open = useWindowStore((s) => s.openWindow);
  const [selected, setSelected] = useState<string | null>(null);
  const sel = entries.find((e) => e.id === selected);

  return (
    <div className="mc-root">
      <div className="mc-toolbar" aria-hidden="true">
        <ToolBtn icon="/icons/Back_16x16_4.png" label="Back" />
        <ToolBtn icon="/icons/Back_16x16_4.png" flip label="Forward" />
        <ToolBtn unicode="▲" label="Up" />
        <span className="mc-separator" />
        <ToolBtn icon="/icons/Cut_16x16_4.png" label="Cut" />
        <ToolBtn icon="/icons/Copy_16x16_4.png" label="Copy" />
        <ToolBtn icon="/icons/Paste_16x16_4.png" label="Paste" />
        <span className="mc-separator" />
        <ToolBtn icon="/icons/Undo_16x16_4.png" label="Undo" />
        <ToolBtn icon="/icons/Delete_16x16_4.png" label="Delete" />
      </div>
      <div className="mc-address" aria-hidden="true">
        <span>Address</span>
        <div className="mc-address-field">
          <img src="/icons/Computer3_32x32_4.png" alt="" />
          <span>My Computer</span>
        </div>
      </div>
      <div className="explorer-layout">
        <aside className="explorer-webview">
          <img
            src="/icons/Computer3_32x32_4.png"
            alt=""
            className="explorer-webview-icon"
          />
          <h2>My Computer</h2>
          {sel ? (
            <>
              <p className="explorer-webview-title">{sel.label}</p>
              <p>{sel.description}</p>
            </>
          ) : (
            <p>Select an item to view its description.</p>
          )}
        </aside>
        <div
          className="explorer-body"
          // Clicking an empty area deselects, as on the desktop.
          onMouseDown={(ev) => {
            if (!(ev.target as HTMLElement).closest(".explorer-item")) {
              setSelected(null);
            }
          }}
        >
          <ul
            className="explorer-grid"
            aria-label="My Computer"
            onKeyDown={(e) => handleArrowNavigation(e, ".explorer-item")}
          >
            {entries.map((e) => (
              <ExplorerItem
                key={e.id}
                icon={e.icon}
                label={e.label}
                href={e.href}
                kind={e.href ? "PDF, opens in a new tab" : undefined}
                selected={selected === e.id}
                onSelect={() => setSelected(e.id)}
                onOpen={() => {
                  if (!e.appId) return;
                  open(e.appId, {
                    title: appRegistry[e.appId].defaultTitle,
                    icon: e.icon,
                  });
                }}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="mc-status" aria-hidden="true">
        <span>{entries.length} object(s)</span>
        <span>My puter</span>
      </div>
    </div>
  );
}
