import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";
import "./styles/global.css";

import { useEffect } from "react";
import { Desktop } from "./components/Desktop/Desktop";
import { Window } from "./components/Window/Window";
import { Win98TaskBar } from "./components/TaskBar/Win98TaskBar";
import { useWindowStore } from "./store/windowStore";
import { appRegistry } from "./data/appsRegistry";

function App() {
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);

  useEffect(() => {
    if (useWindowStore.getState().windows.length === 0) {
      const app = appRegistry.about;
      openWindow("about", {
        title: app.defaultTitle,
        icon: app.defaultIcon,
        initialPosition: { x: 80, y: 60 },
      });
    }
  }, [openWindow]);

  return (
    <div className="desktop-root">
      <Desktop />
      <div className="windows-layer">
        {windows.map((w, i) => (
          <Window key={w.id} data={w} index={i} />
        ))}
      </div>
      <Win98TaskBar />
    </div>
  );
}

export default App;
