import type { AppId } from "../types";

export interface DesktopIconConfig {
  id: string;
  appId: AppId;
  label: string;
  icon: string;
  payload?: Record<string, unknown>;
}

export const desktopIcons: DesktopIconConfig[] = [
  {
    id: "my-computer",
    appId: "my-computer",
    label: "My Computer",
    icon: "/icons/Computer3_32x32_4.png",
  },
  {
    id: "my-documents",
    appId: "placeholder",
    label: "My Documents",
    icon: "/icons/FolderFile_32x32_4.png",
    payload: {
      name: "My Documents",
      icon: "/icons/FolderFile_32x32_4.png",
    },
  },
  {
    id: "internet-explorer",
    appId: "internet-explorer",
    label: "Internet Explorer",
    icon: "/icons/Inetcpl1313_32x32_4.png",
  },
  {
    id: "projects",
    appId: "projects",
    label: "Projects",
    icon: "/icons/Folder_32x32_4.png",
  },
  {
    id: "about",
    appId: "about",
    label: "About.txt",
    icon: "/icons/Notepad2_32x32_4.png",
  },
  {
    id: "contact",
    appId: "contact",
    label: "Outlook Express",
    icon: "/icons/Mailnews2_32x32_4.png",
  },
  {
    id: "my-briefcase",
    appId: "placeholder",
    label: "My Briefcase",
    icon: "/icons/Setupslt3000_32x32_4.png",
    payload: {
      name: "My Briefcase",
      icon: "/icons/Setupslt3000_32x32_4.png",
    },
  },
  {
    id: "network-neighborhood",
    appId: "placeholder",
    label: "Network Neighborhood",
    icon: "/icons/Network_32x32_4.png",
    payload: {
      name: "Network Neighborhood",
      icon: "/icons/Network_32x32_4.png",
    },
  },
  {
    id: "minesweeper",
    appId: "minesweeper",
    label: "Minesweeper",
    icon: "/icons/Winmine1_32x32_4.png",
  },
  {
    id: "networking-bat",
    appId: "placeholder",
    label: "networking.bat",
    icon: "/icons/Bat_32x32_4.png",
    payload: {
      name: "networking.bat",
      icon: "/icons/Bat_32x32_4.png",
    },
  },
  {
    id: "recycle-bin",
    appId: "recycle-bin",
    label: "Recycle Bin",
    icon: "/icons/RecycleEmpty_32x32_4.png",
  },
];
