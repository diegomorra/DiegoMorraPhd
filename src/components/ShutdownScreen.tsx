import { useEffect, useState } from "react";

const OPTIONS = [
  { label: "Boot diegomorraPHD.exe", hc: false },
  { label: "Boot diegomorraPHD_HighContrast.exe", hc: true },
];

export function ShutdownScreen() {
  const [selected, setSelected] = useState(0);

  const reboot = (hc: boolean) => {
    if (hc) {
      sessionStorage.setItem("phd-hc-mode", "1");
    } else {
      sessionStorage.removeItem("phd-hc-mode");
    }
    window.location.reload();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "1") {
        e.preventDefault();
        reboot(false);
      } else if (e.key === "2") {
        e.preventDefault();
        reboot(true);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => (s === 0 ? OPTIONS.length - 1 : s - 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => (s + 1) % OPTIONS.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        reboot(OPTIONS[selected].hc);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        color: "#c0c0c0",
        zIndex: 10000000,
        fontFamily: "'Classic Console', 'VT323', 'Lucida Console', monospace",
        fontSize: 22,
        padding: "24px 32px",
        lineHeight: 1.25,
        userSelect: "none",
      }}
    >
      <div
        style={{
          paddingBottom: 6,
          borderBottom: "3px double #c0c0c0",
        }}
      >
        DiegomorraPHD CD-ROM Startup Menu
      </div>
      <div style={{ marginTop: 24 }}>
        {OPTIONS.map((opt, i) => {
          const isSel = selected === i;
          return (
            <div
              key={i}
              onClick={() => reboot(opt.hc)}
              onMouseEnter={() => setSelected(i)}
              style={{
                padding: "2px 6px",
                margin: "2px 0",
                background: isSel ? "#c0c0c0" : "transparent",
                color: isSel ? "#000000" : "#c0c0c0",
                cursor: "pointer",
                display: "block",
                width: "fit-content",
                minWidth: 380,
                whiteSpace: "pre",
              }}
            >
              {`${i + 1}.   ${opt.label}`}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 32 }}>
        Enter your choice: <span className="blink-cursor">_</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 32,
          right: 32,
          fontSize: 16,
          color: "#808080",
        }}
      >
        Use ↑↓ to select, Enter to confirm, or click an option.
      </div>
    </div>
  );
}
