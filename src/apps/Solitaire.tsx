import { useState } from "react";

type Suit = "S" | "H" | "D" | "C";

interface Card {
  id: string;
  suit: Suit;
  rank: number;
  faceUp: boolean;
}

interface GameState {
  tableau: Card[][];
  foundations: Card[][];
  stock: Card[];
  waste: Card[];
  moves: number;
  won: boolean;
}

type Selection =
  | { kind: "tableau"; col: number; idx: number }
  | { kind: "waste" }
  | null;

const SUITS: Suit[] = ["S", "H", "D", "C"];
const SUIT_SYMBOL: Record<Suit, string> = {
  S: "♠",
  H: "♥",
  D: "♦",
  C: "♣",
};

const CARD_W = 52;
const CARD_H = 72;
const FACE_UP_OFFSET = 16;
const FACE_DOWN_OFFSET = 4;
const COL_GAP = 6;

function rankLabel(r: number): string {
  if (r === 1) return "A";
  if (r === 11) return "J";
  if (r === 12) return "Q";
  if (r === 13) return "K";
  return String(r);
}

function isRed(s: Suit) {
  return s === "H" || s === "D";
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 13; rank++) {
      deck.push({ id: `${suit}${rank}`, suit, rank, faceUp: false });
    }
  }
  return deck;
}

function newGame(): GameState {
  const shuffled = shuffle(buildDeck());
  const tableau: Card[][] = Array.from({ length: 7 }, () => []);
  let i = 0;
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const c = shuffled[i++];
      tableau[col].push({ ...c, faceUp: row === col });
    }
  }
  const stock = shuffled.slice(i).map((c) => ({ ...c, faceUp: false }));
  return {
    tableau,
    foundations: [[], [], [], []],
    stock,
    waste: [],
    moves: 0,
    won: false,
  };
}

function canStackOnTableau(top: Card, dest: Card | undefined): boolean {
  if (!top.faceUp) return false;
  if (dest === undefined) return top.rank === 13;
  return (
    dest.faceUp &&
    top.rank === dest.rank - 1 &&
    isRed(top.suit) !== isRed(dest.suit)
  );
}

function canPlaceOnFoundation(card: Card, dest: Card | undefined): boolean {
  if (!card.faceUp) return false;
  if (dest === undefined) return card.rank === 1;
  return dest.suit === card.suit && card.rank === dest.rank + 1;
}

function flipTopIfNeeded(col: Card[]): Card[] {
  if (col.length === 0) return col;
  const top = col[col.length - 1];
  if (!top.faceUp) {
    const cp = col.slice(0, -1);
    cp.push({ ...top, faceUp: true });
    return cp;
  }
  return col;
}

function isWon(s: GameState): boolean {
  return s.foundations.every((f) => f.length === 13);
}

function CardView({
  card,
  selected,
  onClick,
  onDoubleClick,
  top,
}: {
  card: Card | null;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  top: number;
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    top,
    left: 0,
    width: CARD_W,
    height: CARD_H,
    boxSizing: "border-box",
    border: "1px solid #000",
    borderRadius: 4,
    cursor: card?.faceUp || (card && !card.faceUp) ? "pointer" : "default",
    userSelect: "none",
  };

  if (card == null) {
    return (
      <div
        onClick={onClick}
        style={{
          ...base,
          background: "transparent",
          border: "1px dashed #00500080",
          cursor: onClick ? "pointer" : "default",
        }}
      />
    );
  }

  if (!card.faceUp) {
    return (
      <div
        onClick={onClick}
        style={{
          ...base,
          background:
            "repeating-linear-gradient(45deg, #2c2c8c 0 4px, #4848b8 4px 8px)",
          boxShadow: selected ? "0 0 0 2px #ffff00" : undefined,
        }}
      />
    );
  }

  const color = isRed(card.suit) ? "#cc0000" : "#000000";
  const label = rankLabel(card.rank);
  const sym = SUIT_SYMBOL[card.suit];
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={{
        ...base,
        background: "#ffffff",
        color,
        boxShadow: selected ? "0 0 0 2px #ffff00" : undefined,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: 4,
          fontSize: 11,
          fontWeight: "bold",
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        {label}
        <div style={{ fontSize: 11 }}>{sym}</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 24,
          lineHeight: 1,
        }}
      >
        {sym}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 2,
          right: 4,
          fontSize: 11,
          fontWeight: "bold",
          lineHeight: 1,
          textAlign: "center",
          transform: "rotate(180deg)",
        }}
      >
        {label}
        <div style={{ fontSize: 11 }}>{sym}</div>
      </div>
    </div>
  );
}

export function Solitaire() {
  const [state, setState] = useState<GameState>(newGame);
  const [sel, setSel] = useState<Selection>(null);

  const reset = () => {
    setState(newGame());
    setSel(null);
  };

  const getSelectedCards = (s: GameState, selection: Selection): Card[] => {
    if (!selection) return [];
    if (selection.kind === "waste") {
      const last = s.waste[s.waste.length - 1];
      return last ? [last] : [];
    }
    return s.tableau[selection.col].slice(selection.idx);
  };

  const applyMove = (
    from: Selection,
    target:
      | { kind: "tableau"; col: number }
      | { kind: "foundation"; idx: number },
  ): boolean => {
    if (!from) return false;
    const moving = getSelectedCards(state, from);
    if (moving.length === 0) return false;

    if (target.kind === "foundation") {
      if (moving.length !== 1) return false;
      const card = moving[0];
      const dest = state.foundations[target.idx];
      if (!canPlaceOnFoundation(card, dest[dest.length - 1])) return false;
      const next = structuredClone(state);
      next.foundations[target.idx] = [...dest, card];
      if (from.kind === "waste") {
        next.waste = next.waste.slice(0, -1);
      } else {
        next.tableau[from.col] = flipTopIfNeeded(
          next.tableau[from.col].slice(0, from.idx),
        );
      }
      next.moves += 1;
      if (isWon(next)) next.won = true;
      setState(next);
      return true;
    }

    // tableau target
    const destCol = state.tableau[target.col];
    if (!canStackOnTableau(moving[0], destCol[destCol.length - 1])) return false;
    const next = structuredClone(state);
    next.tableau[target.col] = [...destCol, ...moving];
    if (from.kind === "waste") {
      next.waste = next.waste.slice(0, -1);
    } else {
      next.tableau[from.col] = flipTopIfNeeded(
        next.tableau[from.col].slice(0, from.idx),
      );
    }
    next.moves += 1;
    setState(next);
    return true;
  };

  const onStockClick = () => {
    setSel(null);
    if (state.stock.length > 0) {
      const next = structuredClone(state);
      const card = next.stock.pop()!;
      card.faceUp = true;
      next.waste.push(card);
      next.moves += 1;
      setState(next);
    } else if (state.waste.length > 0) {
      const next = structuredClone(state);
      next.stock = next.waste
        .slice()
        .reverse()
        .map((c) => ({ ...c, faceUp: false }));
      next.waste = [];
      next.moves += 1;
      setState(next);
    }
  };

  const onWasteClick = () => {
    const top = state.waste[state.waste.length - 1];
    if (!top) return;
    if (sel?.kind === "waste") {
      setSel(null);
      return;
    }
    setSel({ kind: "waste" });
  };

  const onTableauCardClick = (col: number, idx: number) => {
    const card = state.tableau[col][idx];
    // If something is selected, try to move onto this column
    if (sel) {
      const ok = applyMove(sel, { kind: "tableau", col });
      if (ok) {
        setSel(null);
        return;
      }
      // otherwise fall through to maybe re-select on this column's top
    }
    if (!card.faceUp) {
      // can't select face-down. But if it's top and the only face-down, clicking might flip — Win98 doesn't do this.
      setSel(null);
      return;
    }
    // Validate this is a valid sequence from idx to end
    const stack = state.tableau[col].slice(idx);
    for (let i = 1; i < stack.length; i++) {
      const prev = stack[i - 1];
      const cur = stack[i];
      if (
        !cur.faceUp ||
        cur.rank !== prev.rank - 1 ||
        isRed(cur.suit) === isRed(prev.suit)
      ) {
        // Invalid stack — only select if this is the last face-up card
        if (idx !== state.tableau[col].length - 1) {
          setSel(null);
          return;
        }
        break;
      }
    }
    setSel({ kind: "tableau", col, idx });
  };

  const onEmptyTableauClick = (col: number) => {
    if (!sel) return;
    const ok = applyMove(sel, { kind: "tableau", col });
    if (ok) setSel(null);
  };

  const onFoundationClick = (idx: number) => {
    if (!sel) {
      // optional: allow selecting a foundation top to move it back?
      return;
    }
    const ok = applyMove(sel, { kind: "foundation", idx });
    if (ok) setSel(null);
  };

  const autoMoveToFoundation = (card: Card, from: Selection) => {
    for (let i = 0; i < 4; i++) {
      const dest = state.foundations[i];
      if (canPlaceOnFoundation(card, dest[dest.length - 1])) {
        const success = applyMove(from, { kind: "foundation", idx: i });
        if (success) setSel(null);
        return;
      }
    }
  };

  const onCardDoubleClick = (where: "waste" | "tableau", col: number, idx: number) => {
    if (where === "waste") {
      const top = state.waste[state.waste.length - 1];
      if (top) autoMoveToFoundation(top, { kind: "waste" });
      return;
    }
    const colArr = state.tableau[col];
    if (idx !== colArr.length - 1) return;
    autoMoveToFoundation(colArr[idx], { kind: "tableau", col, idx });
  };

  const isSelectedTableau = (col: number, idx: number) => {
    return sel?.kind === "tableau" && sel.col === col && idx >= sel.idx;
  };

  const stockTop = state.stock[state.stock.length - 1];
  const wasteTop = state.waste[state.waste.length - 1];

  return (
    <div
      style={{
        padding: 10,
        background: "#008000",
        minHeight: "100%",
        height: "100%",
        boxSizing: "border-box",
        overflow: "auto",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: COL_GAP,
          marginBottom: 12,
        }}
      >
        {/* Stock */}
        <div
          style={{
            width: CARD_W,
            height: CARD_H,
            position: "relative",
            cursor: "pointer",
          }}
          onClick={onStockClick}
        >
          {state.stock.length > 0 ? (
            <CardView card={stockTop || null} top={0} onClick={onStockClick} />
          ) : (
            <div
              style={{
                width: CARD_W,
                height: CARD_H,
                border: "1px dashed #005000",
                borderRadius: 4,
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 18,
              }}
            >
              {state.waste.length > 0 ? "↻" : ""}
            </div>
          )}
        </div>

        {/* Waste */}
        <div
          style={{
            width: CARD_W,
            height: CARD_H,
            position: "relative",
          }}
        >
          {wasteTop && (
            <CardView
              card={wasteTop}
              selected={sel?.kind === "waste"}
              top={0}
              onClick={onWasteClick}
              onDoubleClick={() => onCardDoubleClick("waste", 0, 0)}
            />
          )}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Foundations */}
        {state.foundations.map((f, i) => (
          <div
            key={i}
            style={{
              width: CARD_W,
              height: CARD_H,
              position: "relative",
              cursor: sel ? "pointer" : "default",
            }}
            onClick={() => onFoundationClick(i)}
          >
            {f.length === 0 ? (
              <div
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  border: "1px dashed #005000",
                  borderRadius: 4,
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#005000",
                  fontSize: 22,
                }}
              >
                {SUIT_SYMBOL[SUITS[i]]}
              </div>
            ) : (
              <CardView card={f[f.length - 1]} top={0} />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: COL_GAP, alignItems: "flex-start" }}>
        {state.tableau.map((col, ci) => {
          let y = 0;
          const positions: { card: Card; top: number; idx: number }[] = [];
          for (let i = 0; i < col.length; i++) {
            positions.push({ card: col[i], top: y, idx: i });
            y += col[i].faceUp ? FACE_UP_OFFSET : FACE_DOWN_OFFSET;
          }
          const lastY =
            col.length === 0
              ? 0
              : positions[positions.length - 1].top + CARD_H;
          return (
            <div
              key={ci}
              style={{
                width: CARD_W,
                position: "relative",
                minHeight: Math.max(CARD_H, lastY),
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget && col.length === 0) {
                  onEmptyTableauClick(ci);
                }
              }}
            >
              {col.length === 0 ? (
                <div
                  onClick={() => onEmptyTableauClick(ci)}
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    border: "1px dashed #005000",
                    borderRadius: 4,
                    background: "transparent",
                    cursor: sel ? "pointer" : "default",
                  }}
                />
              ) : (
                positions.map(({ card, top, idx }) => (
                  <CardView
                    key={card.id}
                    card={card}
                    selected={isSelectedTableau(ci, idx)}
                    top={top}
                    onClick={() => onTableauCardClick(ci, idx)}
                    onDoubleClick={() =>
                      onCardDoubleClick("tableau", ci, idx)
                    }
                  />
                ))
              )}
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div
        style={{
          marginTop: 14,
          padding: "3px 8px",
          background: "#c0c0c0",
          color: "#000",
          fontSize: 11,
          boxShadow: "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Moves: {state.moves}</span>
        {state.won && (
          <span style={{ color: "#000080", fontWeight: "bold" }}>
            You won!
          </span>
        )}
        <button
          type="button"
          onClick={reset}
          style={{
            background: "#c0c0c0",
            border: "none",
            padding: "1px 8px",
            fontFamily: "inherit",
            fontSize: 11,
            cursor: "pointer",
            boxShadow:
              "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #404040",
          }}
        >
          New
        </button>
      </div>
    </div>
  );
}
