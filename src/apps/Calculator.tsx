import { useState } from "react";

type Op = "+" | "-" | "*" | "/" | null;

interface State {
  display: string;
  pending: number | null;
  op: Op;
  justEvaluated: boolean;
}

const INITIAL: State = {
  display: "0",
  pending: null,
  op: null,
  justEvaluated: false,
};

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

function trimDisplay(n: number): string {
  if (Number.isNaN(n)) return "Error";
  if (!Number.isFinite(n)) return "Error";
  const s = n.toString();
  if (s.length > 14) return n.toPrecision(10).replace(/0+e/, "e");
  return s;
}

export function Calculator() {
  const [s, setS] = useState<State>(INITIAL);

  const inputDigit = (d: string) => {
    setS((prev) => {
      if (prev.display === "Error") return { ...INITIAL, display: d };
      if (prev.justEvaluated) {
        return { display: d, pending: null, op: null, justEvaluated: false };
      }
      if (prev.display === "0" && d !== ".") {
        return { ...prev, display: d };
      }
      if (d === "." && prev.display.includes(".")) return prev;
      return { ...prev, display: prev.display + d };
    });
  };

  const applyOp = (op: Op) => {
    setS((prev) => {
      if (prev.display === "Error") return prev;
      const current = parseFloat(prev.display);
      if (prev.pending == null || prev.op == null || prev.justEvaluated) {
        return {
          display: prev.display,
          pending: current,
          op,
          justEvaluated: false,
        };
      }
      const result = compute(prev.pending, current, prev.op);
      return {
        display: trimDisplay(result),
        pending: result,
        op,
        justEvaluated: false,
      };
    });
  };

  const equals = () => {
    setS((prev) => {
      if (prev.pending == null || prev.op == null) return prev;
      const current = parseFloat(prev.display);
      const result = compute(prev.pending, current, prev.op);
      return {
        display: trimDisplay(result),
        pending: null,
        op: null,
        justEvaluated: true,
      };
    });
  };

  const clear = () => setS(INITIAL);

  const clearEntry = () => setS((prev) => ({ ...prev, display: "0" }));

  const toggleSign = () => {
    setS((prev) => {
      if (prev.display === "0" || prev.display === "Error") return prev;
      const next = prev.display.startsWith("-")
        ? prev.display.slice(1)
        : "-" + prev.display;
      return { ...prev, display: next };
    });
  };

  const sqrt = () => {
    setS((prev) => {
      const n = parseFloat(prev.display);
      if (n < 0) return { ...prev, display: "Error" };
      return { ...prev, display: trimDisplay(Math.sqrt(n)) };
    });
  };

  const btn = (
    label: string,
    onClick: () => void,
    variant: "num" | "op" | "fn" | "eq" = "num",
  ) => (
    <CalcButton key={label} label={label} onClick={onClick} variant={variant} />
  );

  return (
    <div
      style={{
        padding: 8,
        background: "#c0c0c0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "4px 6px",
          textAlign: "right",
          fontSize: 16,
          fontFamily: "'Courier New', monospace",
          minHeight: 20,
          boxShadow:
            "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
        }}
      >
        {s.display}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          flex: 1,
        }}
      >
        {btn("C", clear, "fn")}
        {btn("CE", clearEntry, "fn")}
        {btn("±", toggleSign, "fn")}
        {btn("√", sqrt, "fn")}

        {btn("7", () => inputDigit("7"))}
        {btn("8", () => inputDigit("8"))}
        {btn("9", () => inputDigit("9"))}
        {btn("/", () => applyOp("/"), "op")}

        {btn("4", () => inputDigit("4"))}
        {btn("5", () => inputDigit("5"))}
        {btn("6", () => inputDigit("6"))}
        {btn("×", () => applyOp("*"), "op")}

        {btn("1", () => inputDigit("1"))}
        {btn("2", () => inputDigit("2"))}
        {btn("3", () => inputDigit("3"))}
        {btn("-", () => applyOp("-"), "op")}

        {btn("0", () => inputDigit("0"))}
        {btn(".", () => inputDigit("."))}
        {btn("=", equals, "eq")}
        {btn("+", () => applyOp("+"), "op")}
      </div>
    </div>
  );
}

function CalcButton({
  label,
  onClick,
  variant,
}: {
  label: string;
  onClick: () => void;
  variant: "num" | "op" | "fn" | "eq";
}) {
  const color =
    variant === "op"
      ? "#0000a0"
      : variant === "fn"
        ? "#a00000"
        : variant === "eq"
          ? "#a00000"
          : "#000000";
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "#c0c0c0",
        color,
        border: "none",
        fontFamily: "inherit",
        fontWeight: "bold",
        fontSize: 12,
        cursor: "pointer",
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
      {label}
    </button>
  );
}
