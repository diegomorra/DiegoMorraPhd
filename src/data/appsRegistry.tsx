import type { ReactElement, ReactNode } from "react";
import { List } from "@react95/core";
import type { AppId, WindowState } from "../types";
import { About } from "../apps/About";
import { MyComputer } from "../apps/MyComputer";
import { ProjectsExplorer } from "../apps/Projects/ProjectsExplorer";
import { ProjectDocument } from "../apps/Projects/ProjectDocument";
import { Contact } from "../apps/Contact";
import { RecycleBin } from "../apps/RecycleBin";
import { InternetExplorer } from "../apps/InternetExplorer";
import { Minesweeper } from "../apps/Minesweeper";
import { Solitaire } from "../apps/Solitaire";
import { Calculator } from "../apps/Calculator";
import { MsDosPrompt } from "../apps/MsDosPrompt";
import { CharacterMap } from "../apps/CharacterMap";
import { RunDialog } from "../apps/RunDialog";
import { Paint } from "../apps/Paint";
import { BouncingDvd } from "../apps/BouncingDvd";
import { Placeholder } from "../apps/Placeholder";
import { Publications } from "../apps/Publications";
import { AccessibilityOptions } from "../apps/AccessibilityOptions";

export interface AppMenu {
  name: string;
  list: ReactElement<typeof List>;
}

export interface AppDefinition {
  id: AppId;
  defaultTitle: string;
  defaultIcon: string;
  defaultSize: { width: number; height: number };
  render: (w: WindowState) => ReactNode;
  menu?: AppMenu[];
  /**
   * "document" for windows whose content is text to read: the content area
   * gets role="document" (screen readers switch to reading mode) and receives
   * keyboard focus when the window opens.
   */
  contentRole?: "document";
  /**
   * Content window (text, folders, documents): follows the Text size and
   * High Contrast settings of Accessibility Options. Games and toys keep
   * their own look.
   */
  adaptive?: boolean;
  /** Escape closes the window (default true). */
  closeOnEscape?: boolean;
}

// The Windows 98 menu bars are decorative: every item is greyed out, and the
// whole bar is hidden from assistive technology (see Window.tsx).
const DISABLED_ITEM = { color: "#808080", cursor: "default" } as const;

function menu(name: string, items: (string | "-")[]): AppMenu {
  return {
    name,
    list: (
      <List>
        {items.map((item, i) =>
          item === "-" ? (
            <List.Divider key={i} />
          ) : (
            <List.Item key={i} style={DISABLED_ITEM}>
              {item}
            </List.Item>
          ),
        )}
      </List>
    ),
  };
}

const notepadMenu: AppMenu[] = [
  menu("File", ["New", "Open...", "Save", "Save As...", "-", "Page Setup...", "Print", "-", "Exit"]),
  menu("Edit", ["Undo", "-", "Cut", "Copy", "Paste", "Delete", "-", "Find...", "Select All", "Time/Date"]),
  menu("Format", ["Word Wrap", "Font..."]),
  menu("View", ["Status Bar"]),
  menu("Help", ["Help Topics", "-", "About Notepad"]),
];

const explorerMenu: AppMenu[] = [
  menu("File", ["New", "Create Shortcut", "Delete", "Rename", "Properties", "-", "Close"]),
  menu("Edit", ["Undo", "-", "Cut", "Copy", "Paste", "-", "Select All", "Invert Selection"]),
  menu("View", ["Toolbars", "Status Bar", "-", "Large Icons", "Small Icons", "List", "Details", "-", "Refresh"]),
  menu("Help", ["Help Topics", "-", "About Windows 98"]),
];

const mailMenu: AppMenu[] = [
  menu("File", ["New Message", "Save As...", "-", "Exit"]),
  menu("Edit", ["Copy", "Select All"]),
  menu("View", ["Layout...", "Refresh"]),
  menu("Help", ["Help Topics", "-", "About Outlook Express"]),
];

export const appRegistry: Record<AppId, AppDefinition> = {
  "my-computer": {
    id: "my-computer",
    defaultTitle: "My Computer",
    defaultIcon: "/icons/Computer3_32x32_4.png",
    defaultSize: { width: 600, height: 440 },
    render: () => <MyComputer />,
    menu: explorerMenu,
    adaptive: true,
  },
  projects: {
    id: "projects",
    defaultTitle: "Research Projects",
    defaultIcon: "/icons/Folder_32x32_4.png",
    defaultSize: { width: 640, height: 440 },
    render: (w) => (
      <ProjectsExplorer
        groupId="research"
        lineId={w.payload?.lineId as string | undefined}
      />
    ),
    menu: explorerMenu,
    adaptive: true,
  },
  exhibitions: {
    id: "exhibitions",
    defaultTitle: "Exhibitions",
    defaultIcon: "/icons/Folder_32x32_4.png",
    defaultSize: { width: 640, height: 440 },
    render: () => <ProjectsExplorer groupId="exhibitions" />,
    menu: explorerMenu,
    adaptive: true,
  },
  design: {
    id: "design",
    defaultTitle: "Design Stuff",
    defaultIcon: "/icons/Folder_32x32_4.png",
    defaultSize: { width: 640, height: 440 },
    render: (w) => (
      <ProjectsExplorer
        groupId="design"
        lineId={w.payload?.lineId as string | undefined}
      />
    ),
    menu: explorerMenu,
    adaptive: true,
  },
  "project-doc": {
    id: "project-doc",
    defaultTitle: "Document",
    defaultIcon: "/icons/FolderFile_32x32_4.png",
    defaultSize: { width: 560, height: 460 },
    render: (w) => (
      <ProjectDocument projectId={w.payload?.projectId as string | undefined} />
    ),
    menu: notepadMenu,
    contentRole: "document",
    adaptive: true,
  },
  about: {
    id: "about",
    defaultTitle: "Bio - Notepad",
    defaultIcon: "/icons/Winhlp324001_32x32_4.png",
    defaultSize: { width: 540, height: 470 },
    render: () => <About />,
    menu: notepadMenu,
    contentRole: "document",
    adaptive: true,
  },
  contact: {
    id: "contact",
    defaultTitle: "Contacts",
    defaultIcon: "/icons/Mailnews2_32x32_4.png",
    defaultSize: { width: 460, height: 380 },
    render: () => <Contact />,
    menu: mailMenu,
    contentRole: "document",
    adaptive: true,
  },
  "recycle-bin": {
    id: "recycle-bin",
    defaultTitle: "Recycle Bin",
    defaultIcon: "/icons/RecycleFull_32x32_4.png",
    defaultSize: { width: 500, height: 360 },
    render: () => <RecycleBin />,
    menu: explorerMenu,
    contentRole: "document",
    adaptive: true,
  },
  "internet-explorer": {
    id: "internet-explorer",
    defaultTitle: "Internet Explorer",
    defaultIcon: "/icons/Inetcpl1313_32x32_4.png",
    defaultSize: { width: 540, height: 400 },
    render: () => <InternetExplorer />,
    contentRole: "document",
    adaptive: true,
  },
  minesweeper: {
    id: "minesweeper",
    defaultTitle: "Minesweeper",
    defaultIcon: "/icons/Winmine1_32x32_4.png",
    defaultSize: { width: 220, height: 290 },
    render: () => <Minesweeper />,
    menu: [
      menu("Game", ["New", "-", "Beginner", "Intermediate", "Expert", "-", "Best Times...", "-", "Exit"]),
      menu("Help", ["Help Topics", "-", "About Minesweeper"]),
    ],
  },
  solitaire: {
    id: "solitaire",
    defaultTitle: "Solitaire",
    defaultIcon: "/icons/Sol1_32x32_4.png",
    defaultSize: { width: 460, height: 480 },
    render: () => <Solitaire />,
    menu: [
      menu("Game", ["Deal", "Undo", "-", "Options...", "-", "Exit"]),
      menu("Help", ["Help Topics", "-", "About Solitaire"]),
    ],
  },
  publications: {
    id: "publications",
    defaultTitle: "Publications.txt - Notepad",
    defaultIcon: "/icons/Notepad1_32x32_4.png",
    defaultSize: { width: 580, height: 480 },
    render: () => <Publications />,
    menu: notepadMenu,
    contentRole: "document",
    adaptive: true,
  },
  accessibility: {
    id: "accessibility",
    defaultTitle: "Accessibility Options",
    defaultIcon: "/icons/Access110_32x32_4.png",
    defaultSize: { width: 480, height: 440 },
    render: (w) => <AccessibilityOptions windowId={w.id} />,
    contentRole: "document",
    adaptive: true,
  },
  calculator: {
    id: "calculator",
    defaultTitle: "Calculator",
    defaultIcon: "/icons/Calculator_32x32_4.png",
    defaultSize: { width: 240, height: 290 },
    render: () => <Calculator />,
  },
  "ms-dos": {
    id: "ms-dos",
    defaultTitle: "MS-DOS Prompt",
    defaultIcon: "/icons/MsDos_32x32_32.png",
    defaultSize: { width: 520, height: 340 },
    render: () => <MsDosPrompt />,
    closeOnEscape: false,
  },
  "bouncing-dvd": {
    id: "bouncing-dvd",
    defaultTitle: "Bouncing DVD",
    defaultIcon: "/icons/BlankScreen100_32x32_4.png",
    defaultSize: { width: 480, height: 300 },
    render: () => <BouncingDvd />,
  },
  paint: {
    id: "paint",
    defaultTitle: "MS Paint",
    defaultIcon: "/icons/Mspaint_32x32_4.png",
    defaultSize: { width: 420, height: 360 },
    render: () => <Paint />,
  },
  "character-map": {
    id: "character-map",
    defaultTitle: "Character Map",
    defaultIcon: "/icons/Charmap1_32x32_4.png",
    defaultSize: { width: 460, height: 380 },
    render: () => <CharacterMap />,
  },
  run: {
    id: "run",
    defaultTitle: "Run",
    defaultIcon: "/icons/Rundll1_32x32_4.png",
    defaultSize: { width: 380, height: 180 },
    render: (w) => <RunDialog windowId={w.id} />,
  },
  placeholder: {
    id: "placeholder",
    defaultTitle: "Item",
    defaultIcon: "/icons/Folder_32x32_4.png",
    defaultSize: { width: 380, height: 260 },
    render: (w) => (
      <Placeholder
        icon={(w.payload?.icon as string | undefined) ?? "/icons/Folder_32x32_4.png"}
        name={(w.payload?.name as string | undefined) ?? "Item"}
      />
    ),
    contentRole: "document",
    adaptive: true,
  },
};
