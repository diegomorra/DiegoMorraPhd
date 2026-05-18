export function Placeholder({ icon, name }: { icon: string; name: string }) {
  return (
    <div
      className="explorer-body"
      style={{ textAlign: "center", padding: 24 }}
    >
      <img
        src={icon}
        alt=""
        style={{
          width: 48,
          height: 48,
          imageRendering: "pixelated",
          marginBottom: 12,
        }}
      />
      <h3 style={{ margin: "0 0 8px" }}>{name}</h3>
      <p style={{ color: "#404040", maxWidth: 320, margin: "0 auto" }}>
        Nothing to see here. This is just decoration for the Windows 98 vibe.
      </p>
      <p style={{ color: "#808080", marginTop: 16, fontSize: 11 }}>
        Try the other icons on the desktop.
      </p>
    </div>
  );
}
