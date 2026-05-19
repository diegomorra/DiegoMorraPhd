import { useWindowStore } from "../store/windowStore";
import { useTouchPrimary } from "../hooks/useTouchPrimary";

interface Entry {
  appId:
    | "projects"
    | "about"
    | "contact"
    | "recycle-bin";
  label: string;
  icon: string;
  title: string;
}

const entries: Entry[] = [
  {
    appId: "projects",
    label: "Projects",
    icon: "/icons/Folder_32x32_4.png",
    title: "Projects",
  },
  {
    appId: "about",
    label: "About.txt",
    icon: "/icons/Notepad2_32x32_4.png",
    title: "About.txt - Notepad",
  },
  {
    appId: "contact",
    label: "Contacts",
    icon: "/icons/Mailnews2_32x32_4.png",
    title: "Contacts - Outlook Express",
  },
  {
    appId: "recycle-bin",
    label: "Recycle Bin",
    icon: "/icons/RecycleEmpty_32x32_4.png",
    title: "Recycle Bin",
  },
];

export function MyComputer() {
  const open = useWindowStore((s) => s.openWindow);
  const isTouch = useTouchPrimary();
  return (
    <div className="explorer-body">
      <div className="explorer-grid">
        {entries.map((e) => {
          const activate = () =>
            open(e.appId, { title: e.title, icon: e.icon });
          return (
            <div
              key={e.appId}
              className="explorer-item"
              tabIndex={0}
              onClick={isTouch ? activate : undefined}
              onDoubleClick={activate}
            >
              <img src={e.icon} alt="" />
              <span className="explorer-item-label">{e.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
