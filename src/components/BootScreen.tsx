import { useEffect, useState } from "react";

const MESSAGES = [
  "Summoning the Setup Wizard...",
  "Casting init.bat...",
  "Wizard is completing diegomorraPHD.exe installation...",
];

export function BootScreen() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="boot-screen">
      <div className="boot-dialog">
        <div className="boot-dialog-titlebar">
          <span>diegomorraPHD.exe starting</span>
          <span className="boot-dialog-close" aria-hidden>
            ×
          </span>
        </div>
        <div className="boot-dialog-body">
          <div className="boot-dialog-row">
            <img
              src="/icons/wizard-hat.svg"
              alt=""
              className="boot-dialog-icon"
            />
            <span className="boot-dialog-text">{MESSAGES[idx]}</span>
          </div>
          <div className="boot-progress">
            <div className="boot-progress-fill" />
          </div>
        </div>
      </div>
    </div>
  );
}
