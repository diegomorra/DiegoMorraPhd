import type { AppId } from "../types";
import { cv } from "./profile";

export type IconPlacement = "left" | "right" | "bottom-right";

export interface DesktopIconConfig {
  id: string;
  /** App opened in a Windows 98 window... */
  appId?: AppId;
  /** ...or a document opened directly in a new browser tab (e.g. the CV PDF). */
  href?: string;
  label: string;
  /** Extra information for screen readers, read after the label. */
  srHint?: string;
  icon: string;
  placement?: IconPlacement;
  payload?: Record<string, unknown>;
  /**
   * Decorative icons (no information about the work) stay clickable with the
   * mouse but are skipped by the keyboard and hidden from screen readers.
   */
  decorative?: boolean;
}

// Left column: personal / system items. Right column: the academic content an
// evaluator looks for first (kept visible next to the Bio window). Bottom-right
// corner: Exhibitions and Design Stuff, kept visually apart from the academic
// content, above the Recycle Bin.
export const desktopIcons: DesktopIconConfig[] = [
  {
    id: "my-computer",
    appId: "my-computer",
    label: "My Computer",
    icon: "/icons/Computer3_32x32_4.png",
    decorative: true,
  },
  {
    id: "about",
    appId: "about",
    label: "Bio",
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
    id: "accessibility",
    appId: "accessibility",
    label: "Accessibility Options",
    icon: "/icons/Access110_32x32_4.png",
  },
  {
    id: "projects",
    appId: "projects",
    label: "Research Projects",
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
    href: cv.pdf,
    srHint: "PDF, opens in a new tab",
    label: "CV",
    icon: "/icons/Awschd32400_32x32_4.png",
    placement: "right",
  },
  {
    id: "exhibitions",
    appId: "exhibitions",
    label: "Exhibitions",
    icon: "/icons/Folder_32x32_4.png",
    placement: "bottom-right",
  },
  {
    id: "design",
    appId: "design",
    label: "Design Stuff",
    icon: "/icons/Folder_32x32_4.png",
    placement: "bottom-right",
  },
  {
    id: "recycle-bin",
    appId: "recycle-bin",
    label: "Recycle Bin",
    icon: "/icons/RecycleFull_32x32_4.png",
    placement: "bottom-right",
    decorative: true,
  },
];
