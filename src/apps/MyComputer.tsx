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
    appId: "about",
    label: "About",
    icon: "/icons/Winhlp324001_32x32_4.png",
    title: "About - Notepad",
  },
  {
    appId: "contact",
    label: "Contacts",
    icon: "/icons/Mailnews2_32x32_4.png",
    title: "Contacts",
  },
  {
    appId: "projects",
    label: "Projects and Exhibitions",
    icon: "/icons/Folder_32x32_4.png",
    title: "Projects and Exhibitions",
  },
  {
    appId: "recycle-bin",
    label: "Recycle Bin",
    icon: "/icons/RecycleEmpty_32x32_4.png",
    title: "Recycle Bin",
  },
];

interface ToolBtnProps {
  icon?: string;
  flip?: boolean;
  rotate?: number;
  label: string;
  unicode?: string;
}

function ToolBtn({ icon, flip, rotate, label, unicode }: ToolBtnProps) {
  return (
    <button
      type="button"
      style={{
        background: "transparent",
        border: "1px solid transparent",
        padding: "2px 4px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        fontSize: 11,
        fontFamily: "inherit",
        color: "#000",
        minWidth: 42,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border =
          "1px solid";
        e.currentTarget.style.borderColor =
          "#ffffff #808080 #808080 #ffffff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid transparent";
      }}
    >
      {icon ? (
        <img
          src={icon}
          alt=""
          style={{
            width: 22,
            height: 22,
            imageRendering: "pixelated",
            transform: `${flip ? "scaleX(-1) " : ""}${rotate ? `rotate(${rotate}deg)` : ""}`.trim(),
          }}
        />
      ) : (
        <span
          style={{
            width: 22,
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          {unicode}
        </span>
      )}
      <span>{label}</span>
    </button>
  );
}

function ToolBarSeparator() {
  return (
    <div
      style={{
        width: 2,
        margin: "4px 4px",
        background: "transparent",
        boxShadow: "inset 1px 0 0 #808080, inset -1px 0 0 #ffffff",
      }}
    />
  );
}

export function MyComputer() {
  const open = useWindowStore((s) => s.openWindow);
  const isTouch = useTouchPrimary();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#c0c0c0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 2,
          padding: "2px 4px",
          alignItems: "stretch",
          borderBottom: "1px solid #808080",
          boxShadow: "inset 0 -1px 0 #ffffff",
        }}
      >
        <ToolBtn icon="/icons/Back_16x16_4.png" label="Back" />
        <ToolBtn icon="/icons/Back_16x16_4.png" flip label="Forward" />
        <ToolBtn unicode="▲" label="Up" />
        <ToolBarSeparator />
        <ToolBtn icon="/icons/Cut_16x16_4.png" label="Cut" />
        <ToolBtn icon="/icons/Copy_16x16_4.png" label="Copy" />
        <ToolBtn icon="/icons/Paste_16x16_4.png" label="Paste" />
        <ToolBarSeparator />
        <ToolBtn icon="/icons/Undo_16x16_4.png" label="Undo" />
        <ToolBtn icon="/icons/Delete_16x16_4.png" label="Delete" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "2px 4px",
          fontSize: 11,
          background: "#c0c0c0",
          borderBottom: "1px solid #808080",
        }}
      >
        <span>Address</span>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#ffffff",
            boxShadow: "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
            padding: "2px 6px",
          }}
        >
          <img
            src="/icons/Computer3_32x32_4.png"
            alt=""
            style={{ width: 14, height: 14, imageRendering: "pixelated" }}
          />
          <span>My Computer</span>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div
          style={{
            width: 160,
            background:
              "linear-gradient(180deg, #4a8cd6 0%, #79b1eb 35%, #cde2f5 65%, #ffffff 100%)",
            color: "#000",
            padding: "16px 12px",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <img
            src="/icons/Computer3_32x32_4.png"
            alt=""
            style={{
              width: 32,
              height: 32,
              imageRendering: "pixelated",
            }}
          />
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.05,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            My
            <br />
            Computer
          </h2>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "#000" }}>
            Select an item to view its description.
          </p>
        </div>
        <div
          style={{
            flex: 1,
            background: "#ffffff",
            padding: 12,
            overflow: "auto",
          }}
        >
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
      </div>
      <div
        style={{
          padding: "2px 8px",
          fontSize: 11,
          background: "#c0c0c0",
          borderTop: "1px solid #808080",
          boxShadow: "inset 0 1px 0 #ffffff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{entries.length} object(s)</span>
        <span>My puter</span>
      </div>
    </div>
  );
}
