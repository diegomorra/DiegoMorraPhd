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
import { CV } from "../apps/CV";

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
}

const notepadMenu: AppMenu[] = [
  {
    name: "File",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>New</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Open...</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Save</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Save As...</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Page Setup...</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Print</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Exit</List.Item>
      </List>
    ),
  },
  {
    name: "Edit",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Undo</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Cut</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Copy</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Paste</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Delete</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Find...</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Select All</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Time/Date</List.Item>
      </List>
    ),
  },
  {
    name: "Format",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Word Wrap</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Font...</List.Item>
      </List>
    ),
  },
  {
    name: "View",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Status Bar</List.Item>
      </List>
    ),
  },
  {
    name: "Help",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Help Topics</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>About Notepad</List.Item>
      </List>
    ),
  },
];

const explorerMenu: AppMenu[] = [
  {
    name: "File",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>New</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Create Shortcut</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Delete</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Rename</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Properties</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Close</List.Item>
      </List>
    ),
  },
  {
    name: "Edit",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Undo</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Cut</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Copy</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Paste</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Select All</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Invert Selection</List.Item>
      </List>
    ),
  },
  {
    name: "View",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Toolbars</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Status Bar</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Large Icons</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Small Icons</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>List</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Details</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Refresh</List.Item>
      </List>
    ),
  },
  {
    name: "Help",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Help Topics</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>About Windows 98</List.Item>
      </List>
    ),
  },
];

const mailMenu: AppMenu[] = [
  {
    name: "File",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>New Message</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Save As...</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>Exit</List.Item>
      </List>
    ),
  },
  {
    name: "Edit",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Copy</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Select All</List.Item>
      </List>
    ),
  },
  {
    name: "View",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Layout...</List.Item>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Refresh</List.Item>
      </List>
    ),
  },
  {
    name: "Help",
    list: (
      <List>
        <List.Item style={{ color: "#808080", cursor: "default" }}>Help Topics</List.Item>
        <List.Divider />
        <List.Item style={{ color: "#808080", cursor: "default" }}>About Outlook Express</List.Item>
      </List>
    ),
  },
];

export const appRegistry: Record<AppId, AppDefinition> = {
  "my-computer": {
    id: "my-computer",
    defaultTitle: "My Computer",
    defaultIcon: "/icons/Computer3_32x32_4.png",
    defaultSize: { width: 580, height: 440 },
    render: () => <MyComputer />,
    menu: explorerMenu,
  },
  projects: {
    id: "projects",
    defaultTitle: "Portfolio",
    defaultIcon: "/icons/Folder_32x32_4.png",
    defaultSize: { width: 560, height: 400 },
    render: (w) => (
      <ProjectsExplorer
        categoryId={w.payload?.categoryId as string | undefined}
      />
    ),
    menu: explorerMenu,
  },
  "project-doc": {
    id: "project-doc",
    defaultTitle: "Document",
    defaultIcon: "/icons/FolderFile_32x32_4.png",
    defaultSize: { width: 520, height: 420 },
    render: (w) => (
      <ProjectDocument projectId={w.payload?.projectId as string | undefined} />
    ),
    menu: notepadMenu,
  },
  about: {
    id: "about",
    defaultTitle: "About - Notepad",
    defaultIcon: "/icons/Winhlp324001_32x32_4.png",
    defaultSize: { width: 480, height: 420 },
    render: () => <About />,
    menu: notepadMenu,
  },
  contact: {
    id: "contact",
    defaultTitle: "Contacts",
    defaultIcon: "/icons/Mailnews2_32x32_4.png",
    defaultSize: { width: 440, height: 320 },
    render: () => <Contact />,
    menu: mailMenu,
  },
  "recycle-bin": {
    id: "recycle-bin",
    defaultTitle: "Recycle Bin",
    defaultIcon: "/icons/RecycleFull_32x32_4.png",
    defaultSize: { width: 500, height: 360 },
    render: () => <RecycleBin />,
    menu: explorerMenu,
  },
  "internet-explorer": {
    id: "internet-explorer",
    defaultTitle: "Internet Explorer",
    defaultIcon: "/icons/Inetcpl1313_32x32_4.png",
    defaultSize: { width: 520, height: 380 },
    render: () => <InternetExplorer />,
  },
  minesweeper: {
    id: "minesweeper",
    defaultTitle: "Minesweeper",
    defaultIcon: "/icons/Winmine1_32x32_4.png",
    defaultSize: { width: 220, height: 290 },
    render: () => <Minesweeper />,
    menu: [
      {
        name: "Game",
        list: (
          <List>
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              New
            </List.Item>
            <List.Divider />
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Beginner
            </List.Item>
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Intermediate
            </List.Item>
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Expert
            </List.Item>
            <List.Divider />
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Best Times...
            </List.Item>
            <List.Divider />
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Exit
            </List.Item>
          </List>
        ),
      },
      {
        name: "Help",
        list: (
          <List>
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Help Topics
            </List.Item>
            <List.Divider />
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              About Minesweeper
            </List.Item>
          </List>
        ),
      },
    ],
  },
  solitaire: {
    id: "solitaire",
    defaultTitle: "Solitaire",
    defaultIcon: "/icons/Sol1_32x32_4.png",
    defaultSize: { width: 460, height: 480 },
    render: () => <Solitaire />,
    menu: [
      {
        name: "Game",
        list: (
          <List>
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Deal
            </List.Item>
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Undo
            </List.Item>
            <List.Divider />
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Options...
            </List.Item>
            <List.Divider />
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Exit
            </List.Item>
          </List>
        ),
      },
      {
        name: "Help",
        list: (
          <List>
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              Help Topics
            </List.Item>
            <List.Divider />
            <List.Item style={{ color: "#808080", cursor: "default" }}>
              About Solitaire
            </List.Item>
          </List>
        ),
      },
    ],
  },
  publications: {
    id: "publications",
    defaultTitle: "Publications.txt - Notepad",
    defaultIcon: "/icons/Notepad1_32x32_4.png",
    defaultSize: { width: 460, height: 380 },
    render: () => <Publications />,
    menu: notepadMenu,
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
  cv: {
    id: "cv",
    defaultTitle: "CV",
    defaultIcon: "/icons/Awschd32400_32x32_4.png",
    defaultSize: { width: 380, height: 180 },
    render: () => <CV />,
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
  },
};
