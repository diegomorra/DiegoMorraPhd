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
import {
  applyAccessibilitySettings,
  useAccessibilitySettings,
} from "./store/accessibilitySettings";
import { appRegistry } from "./data/appsRegistry";

function App() {
  const windows = useWindowStore((s) => s.windows);
  const shutdownPhase = useWindowStore((s) => s.shutdownPhase);
  const openWindow = useWindowStore((s) => s.openWindow);
  const [booting, setBooting] = useState(true);

  // Accessibility Options (High Contrast, Text size, single click).
  const highContrast = useAccessibilitySettings((s) => s.highContrast);
  const contrastScheme = useAccessibilitySettings((s) => s.contrastScheme);
  const textSize = useAccessibilitySettings((s) => s.textSize);
  const singleClick = useAccessibilitySettings((s) => s.singleClick);
  useEffect(() => {
    applyAccessibilitySettings({
      highContrast,
      contrastScheme,
      textSize,
      singleClick,
    });
  }, [highContrast, contrastScheme, textSize, singleClick]);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 2500);
    return () => clearTimeout(t);
  }, []);

  // Open the About window automatically, but only once the boot screen is gone
  // (so it's never visible behind/over the loading screen).
  useEffect(() => {
    if (booting) return;
    // Don't move keyboard focus on page load: screen-reader users start at
    // the top of the page (skip link to the text version).
    openWindow("about", {
      title: appRegistry.about.defaultTitle,
      icon: appRegistry.about.defaultIcon,
      focus: false,
    });
  }, [booting, openWindow]);

  return (
    <>
      <div className={`desktop-root ${booting ? "booting" : ""}`}>
        <Desktop />
        <main className="windows-layer" aria-label="Open windows">
          {windows.map((w, i) => (
            <Window key={w.id} data={w} index={i} />
          ))}
        </main>
        <Win98TaskBar />
        {booting && <BootScreen />}
      </div>
      {shutdownPhase === "off" && <PowerOffScreen />}
      {shutdownPhase === "menu" && <ShutdownScreen />}
    </>
  );
}

export default App;
