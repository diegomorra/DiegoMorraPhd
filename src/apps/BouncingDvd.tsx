import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#ff3838",
  "#3eff3e",
  "#3e7eff",
  "#ffeb3b",
  "#ff3eff",
  "#3effff",
  "#ff9800",
  "#ffffff",
];

const SPEED_X = 1.2;
const SPEED_Y = 1.0;

export function BouncingDvd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [colorIdx, setColorIdx] = useState(0);
  const [cornerHit, setCornerHit] = useState(false);
  const stateRef = useRef({
    x: 40,
    y: 30,
    dx: SPEED_X,
    dy: SPEED_Y,
  });

  useEffect(() => {
    let raf = 0;
    let flashTimer: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      const container = containerRef.current;
      const logo = logoRef.current;
      if (container && logo) {
        const cw = container.clientWidth;
        const ch = container.clientHeight;
        const lw = logo.offsetWidth;
        const lh = logo.offsetHeight;
        const s = stateRef.current;
        let { x, y, dx, dy } = s;
        x += dx;
        y += dy;
        let hitX = false;
        let hitY = false;
        if (x <= 0) {
          x = 0;
          dx = Math.abs(dx);
          hitX = true;
        } else if (x + lw >= cw) {
          x = cw - lw;
          dx = -Math.abs(dx);
          hitX = true;
        }
        if (y <= 0) {
          y = 0;
          dy = Math.abs(dy);
          hitY = true;
        } else if (y + lh >= ch) {
          y = ch - lh;
          dy = -Math.abs(dy);
          hitY = true;
        }
        if (hitX || hitY) {
          setColorIdx((i) => (i + 1) % COLORS.length);
        }
        if (hitX && hitY) {
          setCornerHit(true);
          if (flashTimer) clearTimeout(flashTimer);
          flashTimer = setTimeout(() => setCornerHit(false), 600);
        }
        s.x = x;
        s.y = y;
        s.dx = dx;
        s.dy = dy;
        logo.style.transform = `translate(${x}px, ${y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (flashTimer) clearTimeout(flashTimer);
    };
  }, []);

  const color = COLORS[colorIdx];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        background: "#000000",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div
        ref={logoRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          padding: "10px 14px",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 18,
          fontWeight: "bold",
          color,
          border: `2px solid ${color}`,
          borderRadius: 6,
          whiteSpace: "nowrap",
          willChange: "transform",
          textShadow: cornerHit ? `0 0 14px ${color}` : "none",
          boxShadow: cornerHit ? `0 0 24px ${color}` : "none",
          transition: "color 60ms linear, border-color 60ms linear",
        }}
      >
        diegomorraPHD
      </div>
      {cornerHit && (
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "#ffffff",
            fontSize: 10,
            fontFamily: "'Press Start 2P', monospace",
            letterSpacing: 1,
            opacity: 0.85,
          }}
        >
          CORNER HIT!
        </div>
      )}
    </div>
  );
}
