import { useEffect, useRef, useState } from "react";

type Tool = "pencil" | "eraser" | "line" | "rect" | "fill";

const PALETTE = [
  "#000000", "#808080", "#800000", "#ff0000",
  "#008000", "#00ff00", "#808000", "#ffff00",
  "#000080", "#0000ff", "#800080", "#ff00ff",
  "#008080", "#00ffff", "#c0c0c0", "#ffffff",
];

const CANVAS_W = 360;
const CANVAS_H = 220;

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function floodFill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fillHex: string,
) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const data = ctx.getImageData(0, 0, w, h);
  const px = data.data;
  const sx = Math.floor(x);
  const sy = Math.floor(y);
  if (sx < 0 || sx >= w || sy < 0 || sy >= h) return;
  const startIdx = (sx + sy * w) * 4;
  const target = [px[startIdx], px[startIdx + 1], px[startIdx + 2]];
  const rgb = hexToRgb(fillHex);
  if (target[0] === rgb.r && target[1] === rgb.g && target[2] === rgb.b) return;

  const stack: Array<[number, number]> = [[sx, sy]];
  while (stack.length) {
    const [cx, cy] = stack.pop()!;
    if (cx < 0 || cx >= w || cy < 0 || cy >= h) continue;
    const i = (cx + cy * w) * 4;
    if (
      px[i] !== target[0] ||
      px[i + 1] !== target[1] ||
      px[i + 2] !== target[2]
    )
      continue;
    px[i] = rgb.r;
    px[i + 1] = rgb.g;
    px[i + 2] = rgb.b;
    px[i + 3] = 255;
    stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
  ctx.putImageData(data, 0, 0);
}

interface ToolButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function ToolButton({ label, active, onClick }: ToolButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      style={{
        width: 24,
        height: 22,
        background: "#c0c0c0",
        border: "none",
        cursor: "pointer",
        fontSize: 11,
        fontFamily: "inherit",
        fontWeight: "bold",
        boxShadow: active
          ? "inset 1px 1px 0 #404040, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf"
          : "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040",
        padding: 0,
      }}
    >
      {label}
    </button>
  );
}

export function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState("#000000");
  const drawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const snapshotRef = useRef<ImageData | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }, []);

  const getPos = (clientX: number, clientY: number) => {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    const sx = c.width / rect.width;
    const sy = c.height / rect.height;
    return {
      x: (clientX - rect.left) * sx,
      y: (clientY - rect.top) * sy,
    };
  };

  const handleDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    canvasRef.current?.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const pos = getPos(e.clientX, e.clientY);
    startPosRef.current = pos;
    lastPosRef.current = pos;
    const ctx = canvasRef.current!.getContext("2d")!;
    if (tool === "line" || tool === "rect") {
      snapshotRef.current = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
    } else if (tool === "pencil" || tool === "eraser") {
      ctx.fillStyle = tool === "eraser" ? "#ffffff" : color;
      const size = tool === "eraser" ? 6 : 1;
      ctx.fillRect(pos.x - size / 2, pos.y - size / 2, size, size);
    } else if (tool === "fill") {
      floodFill(ctx, pos.x, pos.y, color);
      drawingRef.current = false;
    }
  };

  const handleMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const pos = getPos(e.clientX, e.clientY);
    const ctx = canvasRef.current!.getContext("2d")!;

    if (tool === "pencil" || tool === "eraser") {
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth = tool === "eraser" ? 6 : 1;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastPosRef.current = pos;
    } else if (tool === "line" && snapshotRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startPosRef.current.x, startPosRef.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === "rect" && snapshotRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeRect(
        Math.min(startPosRef.current.x, pos.x),
        Math.min(startPosRef.current.y, pos.y),
        Math.abs(pos.x - startPosRef.current.x),
        Math.abs(pos.y - startPosRef.current.y),
      );
    }
  };

  const handleUp = () => {
    drawingRef.current = false;
    snapshotRef.current = null;
  };

  const onClear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  };

  const onSave = () => {
    const c = canvasRef.current;
    if (!c) return;
    const data = c.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = data;
    a.download = "diegomorra-paint.png";
    a.click();
  };

  return (
    <div
      style={{
        background: "#c0c0c0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 6,
        gap: 4,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 2 }}>
          <ToolButton
            label="P"
            active={tool === "pencil"}
            onClick={() => setTool("pencil")}
          />
          <ToolButton
            label="E"
            active={tool === "eraser"}
            onClick={() => setTool("eraser")}
          />
          <ToolButton
            label="/"
            active={tool === "line"}
            onClick={() => setTool("line")}
          />
          <ToolButton
            label="▭"
            active={tool === "rect"}
            onClick={() => setTool("rect")}
          />
          <ToolButton
            label="F"
            active={tool === "fill"}
            onClick={() => setTool("fill")}
          />
        </div>
        <div
          style={{
            width: 2,
            alignSelf: "stretch",
            margin: "2px 4px",
            boxShadow: "inset 1px 0 0 #808080, inset -1px 0 0 #ffffff",
          }}
        />
        <button
          type="button"
          onClick={onClear}
          style={{
            background: "#c0c0c0",
            border: "none",
            padding: "2px 10px",
            fontFamily: "inherit",
            fontSize: 11,
            cursor: "pointer",
            boxShadow:
              "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040",
          }}
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onSave}
          style={{
            background: "#c0c0c0",
            border: "none",
            padding: "2px 10px",
            fontFamily: "inherit",
            fontSize: 11,
            cursor: "pointer",
            boxShadow:
              "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040",
          }}
        >
          Save
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 2,
          padding: 3,
          background: "#c0c0c0",
          boxShadow:
            "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            background: color,
            border: "1px solid #000",
            marginRight: 4,
            flexShrink: 0,
          }}
          title={`Selected: ${color}`}
        />
        {PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            title={c}
            style={{
              width: 16,
              height: 16,
              background: c,
              border: "1px solid #000",
              cursor: "pointer",
              padding: 0,
              outline: color === c ? "1px dashed #fff" : "none",
              outlineOffset: -2,
            }}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          padding: 2,
          background: "#c0c0c0",
          boxShadow:
            "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
          overflow: "auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          onPointerCancel={handleUp}
          style={{
            background: "#ffffff",
            cursor: tool === "fill" ? "cell" : "crosshair",
            touchAction: "none",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
