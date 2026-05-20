import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";
import "./styles/global.css";

import { useEffect, useState } from "react";
import { Desktop } from "./components/Desktop/Desktop";
import { Window } from "./components/Window/Window";
import { Win98TaskBar } from "./components/TaskBar/Win98TaskBar";
import { BootScreen } from "./components/BootScreen";
import { ShutdownScreen } from "./components/ShutdownScreen";
import { PowerOffScreen } from "./components/PowerOffScreen";
import { useWindowStore } from "./store/windowStore";
import { appRegistry } from "./data/appsRegistry";

function App() {
  const windows = useWindowStore((s) => s.windows);
  const shutdownPhase = useWindowStore((s) => s.shutdownPhase);
  const openWindow = useWindowStore((s) => s.openWindow);
  const [booting, setBooting] = useState(true);
  const [hcMode] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    const flag = sessionStorage.getItem("phd-hc-mode") === "1";
    sessionStorage.removeItem("phd-hc-mode");
    return flag;
  });

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 2500);
    return () => clearTimeout(t);
  }, []);

  // Open the About window automatically, but only once the boot screen is gone
  // (so it's never visible behind/over the loading screen).
  useEffect(() => {
    if (booting) return;
    openWindow("about", {
      title: appRegistry.about.defaultTitle,
      icon: appRegistry.about.defaultIcon,
    });
  }, [booting, openWindow]);

  return (
    <>
      <div
        className={`desktop-root ${booting ? "booting" : ""} ${
          hcMode ? "hc-mode" : ""
        }`}
      >
        <Desktop />
        <div className="windows-layer">
          {windows.map((w, i) => (
            <Window key={w.id} data={w} index={i} />
          ))}
        </div>
        <Win98TaskBar />
        {booting && <BootScreen />}
      </div>
      {shutdownPhase === "off" && <PowerOffScreen />}
      {shutdownPhase === "menu" && <ShutdownScreen />}
    </>
  );
}

export default App;
