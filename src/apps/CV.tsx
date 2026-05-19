import { Button } from "@react95/core";

const CV_PDF_URL = "/CV_Morra_2026.pdf";
const CV_WEB_URL = "https://linkedin.com/in/diegomorra/";

export function CV() {
  const onOpenPdf = () => {
    window.open(CV_PDF_URL, "_blank", "noopener,noreferrer");
  };

  const onLinkedIn = () => {
    window.open(CV_WEB_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        padding: 16,
        background: "#c0c0c0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <img
          src="/icons/Awschd32400_32x32_4.png"
          alt=""
          style={{
            width: 32,
            height: 32,
            imageRendering: "pixelated",
            flexShrink: 0,
          }}
        />
        <div style={{ fontSize: 11, lineHeight: 1.5 }}>
          <p style={{ margin: "0 0 4px", fontWeight: "bold" }}>
            Diego Morra - Curriculum Vitae
          </p>
          <p style={{ margin: 0 }}>How would you like to view the CV?</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: "auto",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={onOpenPdf} style={{ minWidth: 90 }}>
          Download CV
        </Button>
        <Button onClick={onLinkedIn} style={{ minWidth: 110 }}>
          LinkedIn
        </Button>
      </div>
    </div>
  );
}
