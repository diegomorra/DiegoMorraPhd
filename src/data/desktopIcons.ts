import type { AppId } from "../types";

export type IconPlacement = "left" | "right" | "bottom-right";

export interface DesktopIconConfig {
  id: string;
  appId: AppId;
  label: string;
  icon: string;
  placement?: IconPlacement;
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
    id: "about",
    appId: "about",
    label: "About",
    icon: "/icons/Winhlp324001_32x32_4.png",
  },
  {
    id: "contact",
    appId: "contact",
    label: "Contacts",
    icon: "/icons/Mailnews2_32x32_4.png",
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
    label: "Projects and Exhibitions",
    icon: "/icons/Folder_32x32_4.png",
    placement: "right",
  },
  {
    id: "publications",
    appId: "publications",
    label: "Publications",
    icon: "/icons/Notepad1_32x32_4.png",
    placement: "right",
  },
  {
    id: "cv",
    appId: "cv",
    label: "CV",
    icon: "/icons/Awschd32400_32x32_4.png",
    placement: "right",
  },
  {
    id: "recycle-bin",
    appId: "recycle-bin",
    label: "Recycle Bin",
    icon: "/icons/RecycleFull_32x32_4.png",
    placement: "bottom-right",
  },
];
