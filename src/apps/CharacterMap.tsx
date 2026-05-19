import { useState } from "react";
import { Button } from "@react95/core";

const CHARS: string[] = (() => {
  const out: string[] = [];
  // basic latin printable
  for (let i = 33; i <= 126; i++) out.push(String.fromCodePoint(i));
  // extended Latin
  for (let i = 161; i <= 255; i++) out.push(String.fromCodePoint(i));
  // box drawing / shapes / arrows / suits
  const extras = [
    0x2190, 0x2191, 0x2192, 0x2193,
    0x2194, 0x2195, 0x21A9, 0x21AA,
    0x25A0, 0x25A1, 0x25AA, 0x25AB, 0x25B2, 0x25B3, 0x25B6, 0x25BC,
    0x25BD, 0x25C0, 0x25C6, 0x25C7, 0x25CB, 0x25CF, 0x25D8, 0x25D9,
    0x2605, 0x2606, 0x2660, 0x2661, 0x2662, 0x2663, 0x2664, 0x2665,
    0x2666, 0x2667, 0x2668, 0x2669, 0x266A, 0x266B, 0x266C, 0x266D,
    0x2713, 0x2714, 0x2717, 0x2718, 0x2728, 0x2734, 0x2735, 0x2736,
    0x2737, 0x2738, 0x2739, 0x273A, 0x273B, 0x273C, 0x273D,
  ];
  for (const cp of extras) out.push(String.fromCodePoint(cp));
  return out;
})();

export function CharacterMap() {
  const [selected, setSelected] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(selected);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      style={{
        padding: 8,
        background: "#c0c0c0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: 1,
          background: "#ffffff",
          boxShadow:
            "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
          overflow: "auto",
          padding: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(16, 1fr)",
            gap: 0,
          }}
        >
          {CHARS.map((ch, i) => {
            const isSel = ch === selected;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(ch)}
                onDoubleClick={() => {
                  setSelected(ch);
                  void onCopy();
                }}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: isSel ? "#000080" : "#ffffff",
                  color: isSel ? "#ffffff" : "#000000",
                  border: "1px solid #c0c0c0",
                  fontFamily: "'Lucida Console', 'Courier New', monospace",
                  fontSize: 16,
                  cursor: "pointer",
                  padding: 0,
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={`U+${ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`}
              >
                {ch}
              </button>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 11 }}>Characters to copy:</span>
        <div
          style={{
            flex: 1,
            background: "#ffffff",
            boxShadow:
              "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
            padding: "2px 6px",
            fontFamily: "'Lucida Console', monospace",
            fontSize: 14,
            minHeight: 22,
          }}
        >
          {selected}
        </div>
        <Button onClick={onCopy} style={{ minWidth: 60 }} disabled={!selected}>
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
