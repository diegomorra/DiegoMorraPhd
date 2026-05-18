import { useCallback, useEffect, useRef, useState } from "react";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

type Status = "ready" | "playing" | "won" | "lost";

const NUMBER_COLOR = [
  "",
  "#0000ff",
  "#008000",
  "#ff0000",
  "#000080",
  "#800000",
  "#008080",
  "#000000",
  "#808080",
];

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  );
}

function placeMines(board: Cell[][], avoidR: number, avoidC: number): Cell[][] {
  const next = board.map((row) => row.map((c) => ({ ...c })));
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (next[r][c].isMine) continue;
    if (Math.abs(r - avoidR) <= 1 && Math.abs(c - avoidC) <= 1) continue;
    next[r][c].isMine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (next[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
          if (next[nr][nc].isMine) count++;
        }
      }
      next[r][c].adjacentMines = count;
    }
  }
  return next;
}

function reveal(board: Cell[][], r: number, c: number): Cell[][] {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return board;
  if (board[r][c].isRevealed || board[r][c].isFlagged) return board;
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack: Array<[number, number]> = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    const cell = next[cr][cc];
    if (cell.isRevealed || cell.isFlagged) continue;
    cell.isRevealed = true;
    if (!cell.isMine && cell.adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
          stack.push([nr, nc]);
        }
      }
    }
  }
  return next;
}

function isWon(board: Cell[][]): boolean {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!board[r][c].isMine && !board[r][c].isRevealed) return false;
    }
  }
  return true;
}

function Counter({ value }: { value: number }) {
  const v = Math.max(-99, Math.min(999, value));
  const text = (v < 0 ? "-" : "") + String(Math.abs(v)).padStart(v < 0 ? 2 : 3, "0");
  return (
    <div
      style={{
        fontFamily:
          "'Digital-7', 'DSEG7', 'Courier New', monospace",
        fontSize: 22,
        lineHeight: "22px",
        fontWeight: "bold",
        color: "#ff0000",
        backgroundColor: "#000000",
        padding: "1px 4px",
        letterSpacing: 1,
        minWidth: 40,
        textAlign: "right",
        boxShadow: "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
      }}
    >
      {text}
    </div>
  );
}

function Face({ status, onClick }: { status: Status; onClick: () => void }) {
  const face =
    status === "lost" ? "x_x" : status === "won" ? "B-)" : ":-)";
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 28,
        height: 28,
        fontSize: 12,
        fontFamily: "inherit",
        background: "#c0c0c0",
        cursor: "pointer",
        border: "none",
        boxShadow:
          "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow =
          "inset -1px -1px 0 #ffffff, inset 1px 1px 0 #808080";
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
      {face}
    </button>
  );
}

interface CellViewProps {
  cell: Cell;
  exploded: boolean;
  onLeftClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

function CellView({ cell, exploded, onLeftClick, onRightClick }: CellViewProps) {
  const baseStyle: React.CSSProperties = {
    width: 18,
    height: 18,
    background: "#c0c0c0",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "default",
    userSelect: "none",
    border: "none",
    padding: 0,
  };

  if (!cell.isRevealed) {
    return (
      <button
        type="button"
        onClick={onLeftClick}
        onContextMenu={onRightClick}
        onMouseDown={(e) => e.preventDefault()}
        style={{
          ...baseStyle,
          color: "#ff0000",
          boxShadow:
            "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040",
        }}
      >
        {cell.isFlagged ? "F" : ""}
      </button>
    );
  }

  const revealedBg = exploded && cell.isMine ? "#ff0000" : "#c0c0c0";
  return (
    <div
      style={{
        ...baseStyle,
        background: revealedBg,
        color: cell.isMine
          ? "#000000"
          : NUMBER_COLOR[cell.adjacentMines] || "#000000",
        boxShadow: "inset 1px 1px 0 #808080",
      }}
    >
      {cell.isMine ? "*" : cell.adjacentMines > 0 ? cell.adjacentMines : ""}
    </div>
  );
}

export function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [status, setStatus] = useState<Status>("ready");
  const [flagCount, setFlagCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [explodedAt, setExplodedAt] = useState<{ r: number; c: number } | null>(
    null,
  );
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (status !== "playing") return;
    const t = setInterval(() => {
      if (startTime.current) {
        setSeconds(
          Math.min(999, Math.floor((Date.now() - startTime.current) / 1000)),
        );
      }
    }, 250);
    return () => clearInterval(t);
  }, [status]);

  const reset = useCallback(() => {
    setBoard(emptyBoard());
    setStatus("ready");
    setFlagCount(0);
    setSeconds(0);
    setExplodedAt(null);
    startTime.current = null;
  }, []);

  const handleClick = (r: number, c: number) => {
    if (status === "won" || status === "lost") return;
    if (board[r][c].isFlagged || board[r][c].isRevealed) return;

    let current = board;
    if (status === "ready") {
      current = placeMines(board, r, c);
      setStatus("playing");
      startTime.current = Date.now();
    }

    if (current[r][c].isMine) {
      const finalBoard = current.map((row) =>
        row.map((cell) => ({
          ...cell,
          isRevealed: cell.isMine ? true : cell.isRevealed,
        })),
      );
      setBoard(finalBoard);
      setExplodedAt({ r, c });
      setStatus("lost");
      return;
    }

    const revealed = reveal(current, r, c);
    setBoard(revealed);
    if (isWon(revealed)) {
      const finalBoard = revealed.map((row) =>
        row.map((cell) => ({
          ...cell,
          isFlagged: cell.isMine ? true : cell.isFlagged,
        })),
      );
      setBoard(finalBoard);
      setFlagCount(MINES);
      setStatus("won");
    }
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (status === "won" || status === "lost") return;
    if (board[r][c].isRevealed) return;
    const next = board.map((row) => row.map((cell) => ({ ...cell })));
    const wasFlagged = next[r][c].isFlagged;
    next[r][c].isFlagged = !wasFlagged;
    setBoard(next);
    setFlagCount((prev) => (wasFlagged ? prev - 1 : prev + 1));
  };

  const minesRemaining = MINES - flagCount;

  return (
    <div
      style={{
        padding: 6,
        background: "#c0c0c0",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        style={{
          padding: 6,
          background: "#c0c0c0",
          boxShadow:
            "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 4,
            marginBottom: 6,
            background: "#c0c0c0",
            boxShadow:
              "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
          }}
        >
          <Counter value={minesRemaining} />
          <Face status={status} onClick={reset} />
          <Counter value={seconds} />
        </div>
        <div
          style={{
            padding: 2,
            background: "#c0c0c0",
            boxShadow:
              "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
            display: "inline-block",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, 18px)`,
              gridTemplateRows: `repeat(${ROWS}, 18px)`,
              gap: 0,
            }}
          >
            {board.flatMap((row, r) =>
              row.map((cell, c) => (
                <CellView
                  key={`${r}-${c}`}
                  cell={cell}
                  exploded={
                    status === "lost" &&
                    explodedAt?.r === r &&
                    explodedAt?.c === c
                  }
                  onLeftClick={() => handleClick(r, c)}
                  onRightClick={(e) => handleRightClick(e, r, c)}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
