export function InternetExplorer() {
  return (
    <div
      className="explorer-body"
      style={{ textAlign: "center", padding: 24, lineHeight: 1.6 }}
    >
      <img
        src="/icons/Inetcpl1313_32x32_4.png"
        alt=""
        style={{
          width: 48,
          height: 48,
          imageRendering: "pixelated",
          marginBottom: 12,
        }}
      />
      <h3 style={{ margin: "0 0 12px" }}>Dialing remote connection...</h3>
      <p style={{ color: "#404040" }}>
        Dialing your provider...{" "}
        <span style={{ fontFamily: "monospace" }}>beeeep - krrrr - sshhh</span>
      </p>
      <p style={{ marginTop: 16, textAlign: "left", marginBottom: 6 }}>
        <strong>2</strong> results found:
      </p>
      <ul
        style={{
          textAlign: "left",
          margin: 0,
          paddingLeft: 22,
          listStyle: "square",
        }}
      >
        <li style={{ marginBottom: 4 }}>
          previous website:{" "}
          <a
            href="https://diegomorra.github.io/index.html"
            target="_blank"
            rel="noreferrer"
          >
            diegomorra.github.io
          </a>
        </li>
        <li>
          press feature:{" "}
          <a
            href="https://dusp.mit.edu/news/20-years-mapping-invisible"
            target="_blank"
            rel="noreferrer"
          >
            MIT DUSP - 20 Years of Mapping the [in]visible
          </a>
        </li>
      </ul>
    </div>
  );
}
