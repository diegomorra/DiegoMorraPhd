import { useWindowStore } from "../store/windowStore";

export function PowerOffScreen() {
  const setShutdownPhase = useWindowStore((s) => s.setShutdownPhase);

  const goToMenu = () => setShutdownPhase("menu");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        zIndex: 10000000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        textAlign: "center",
        padding: 24,
      }}
    >
      <p
        style={{
          color: "#ffae00",
          fontFamily: "'Classic Console', 'VT323', monospace",
          fontSize: 22,
          lineHeight: 1.6,
          letterSpacing: 1,
          margin: 0,
          maxWidth: 720,
        }}
      >
        It is now safe to turn off
        <br />
        your computer.
      </p>
      <button
        type="button"
        onClick={goToMenu}
        style={{
          background: "#c0c0c0",
          border: "none",
          padding: "6px 22px",
          fontFamily: "inherit",
          fontSize: 12,
          cursor: "pointer",
          color: "#000",
          boxShadow:
            "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.boxShadow =
            "inset 1px 1px 0 #404040, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.boxShadow =
            "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040";
        }}
      >
        Reboot
      </button>
    </div>
  );
}
