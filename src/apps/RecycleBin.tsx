import { useState } from "react";

interface TrashFile {
  name: string;
  icon: string;
}

const FILES: TrashFile[] = [
  {
    name: "chapter_FINAL_v17_REALLY_FINAL.docx",
    icon: "/icons/Notepad2_32x32_4.png",
  },
  {
    name: "reviewer_2_comments.txt",
    icon: "/icons/FileCorrupted_32x32_4.png",
  },
  {
    name: "grant_application_REJECTED.pdf",
    icon: "/icons/FileCorrupted_32x32_4.png",
  },
  {
    name: "imposter_syndrome.exe",
    icon: "/icons/BatExec_32x32_4.png",
  },
  {
    name: "coffee_intake_log.xlsx",
    icon: "/icons/FilePencil_32x32_4.png",
  },
  {
    name: "abstract_due_yesterday.txt",
    icon: "/icons/FileText_32x32_4.png",
  },
  {
    name: "logo_definitive_v23.ai",
    icon: "/icons/Wordpad_32x32_4.png",
  },
  {
    name: "works_on_my_machine.exe",
    icon: "/icons/BatExec_32x32_4.png",
  },
  {
    name: "node_modules_backup.zip",
    icon: "/icons/FileTextSettings_32x32_4.png",
  },
  {
    name: "dear_esteemed_colleague.eml",
    icon: "/icons/Mailnews14_32x32_4.png",
  },
  {
    name: "tenure_dreams.mp3",
    icon: "/icons/Notepad_32x32_4.png",
  },
  {
    name: "MEME about crying at work",
    icon: "/icons/Folder_32x32_4.png",
  },
];

export function RecycleBin() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: 8,
          overflow: "auto",
        }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 116px)",
            gap: 4,
          }}
        >
          {FILES.map((f, i) => {
            const isSel = selected === i;
            return (
              <div
                key={i}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setSelected(i);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: 6,
                  cursor: "default",
                  border: isSel
                    ? "1px dotted #000080"
                    : "1px dotted transparent",
                  background: isSel
                    ? "rgba(0,0,128,0.05)"
                    : "transparent",
                }}
              >
                <img
                  src={f.icon}
                  alt=""
                  style={{
                    width: 32,
                    height: 32,
                    imageRendering: "pixelated",
                    marginBottom: 4,
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    lineHeight: 1.15,
                    wordBreak: "break-all",
                    padding: "0 2px",
                    color: "#000",
                    background: isSel ? "#000080" : "transparent",
                    ...(isSel ? { color: "#ffffff" } : {}),
                  }}
                >
                  {f.name}
                </span>
              </div>
            );
          })}
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
        <span>
          {selected === null
            ? `${FILES.length} object(s)`
            : "1 object(s) selected"}
        </span>
        <span>Recycle Bin</span>
      </div>
    </div>
  );
}
