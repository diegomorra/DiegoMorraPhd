export function RecycleBin() {
  return (
    <div className="explorer-body" style={{ textAlign: "center", padding: 24 }}>
      <img
        src="/icons/RecycleFull_32x32_4.png"
        alt=""
        style={{
          width: 64,
          height: 64,
          imageRendering: "pixelated",
          marginBottom: 12,
        }}
      />
      <h3 style={{ margin: "0 0 8px" }}>The Recycle Bin is not empty</h3>
      <p style={{ color: "#404040", maxWidth: 320, margin: "0 auto" }}>
        Contains: abandoned ideas, old logos, badly chosen fonts and a folder
        named "thesis_FINAL_v9_REALLY_FINAL.zip".
      </p>
    </div>
  );
}
