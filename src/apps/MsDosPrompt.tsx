import { useEffect, useRef, useState } from "react";

interface Line {
  kind: "input" | "output" | "error";
  text: string;
}

const BANNER = [
  "Microsoft(R) Windows 98",
  "   (C)Copyright Microsoft Corp 1981-1999.",
  "",
];

const HELP_LINES = [
  "Available commands:",
  "  HELP        Shows this list",
  "  DIR         Lists directory contents",
  "  VER         Displays the Windows version",
  "  ECHO <txt>  Prints text",
  "  WHOAMI      Tells you who you are",
  "  CLS         Clears the screen",
  "  EXIT        Closes the prompt (kind of)",
  "",
];

const DIR_LISTING = [
  " Volume in drive C is DIEGOPHD",
  " Volume Serial Number is 1994-0420",
  "",
  " Directory of C:\\",
  "",
  "PROJECTS    <DIR>        " + nowStamp(),
  "ABOUT    TXT       1.234 " + nowStamp(),
  "CV       DOC         512 " + nowStamp(),
  "PUBLICAT TXT         896 " + nowStamp(),
  "MORE     TXT          42 " + nowStamp(),
  "        5 file(s)         2.726 bytes",
  "        1 dir(s)   nothing left",
  "",
];

function nowStamp() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yy}  ${hh}:${mi}`;
}

export function MsDosPrompt() {
  const [lines, setLines] = useState<Line[]>(() =>
    BANNER.map((t) => ({ kind: "output" as const, text: t })),
  );
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    const newLines: Line[] = [{ kind: "input", text: `C:\\> ${cmd}` }];
    if (cmd === "") {
      setLines((l) => [...l, ...newLines]);
      return;
    }
    const head = cmd.split(/\s+/)[0].toLowerCase();
    const args = cmd.slice(head.length).trim();
    let out: string[] = [];
    let isError = false;
    switch (head) {
      case "help":
        out = HELP_LINES;
        break;
      case "dir":
        out = DIR_LISTING;
        break;
      case "ver":
        out = ["", "Windows 98 [diegomorraPHD Edition]", ""];
        break;
      case "echo":
        out = [args || "ECHO is on.", ""];
        break;
      case "whoami":
        out = ["Diego Morra, designer and researcher.", ""];
        break;
      case "cls":
        setLines([]);
        return;
      case "exit":
        out = ["", "Use the [X] button to close the window.", ""];
        break;
      case "rm":
      case "del":
        out = ["Nice try.", ""];
        break;
      case "ls":
        out = ["This is DOS, you mean DIR.", ""];
        break;
      case "sudo":
        out = ["Wrong operating system.", ""];
        break;
      default:
        isError = true;
        out = [`Bad command or file name: ${head.toUpperCase()}`, ""];
    }
    setLines((l) => [
      ...l,
      ...newLines,
      ...out.map((text) => ({
        kind: (isError ? "error" : "output") as Line["kind"],
        text,
      })),
    ]);
  };

  return (
    <div
      style={{
        background: "#000000",
        color: "#c0c0c0",
        fontFamily: "'Courier New', 'Lucida Console', monospace",
        fontSize: 13,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "text",
        padding: 6,
        boxSizing: "border-box",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflow: "auto",
          whiteSpace: "pre",
        }}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              color: l.kind === "error" ? "#ff6060" : "#c0c0c0",
            }}
          >
            {l.text}
          </div>
        ))}
        <div style={{ display: "flex" }}>
          <span style={{ flexShrink: 0 }}>C:\&gt;&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                runCommand(input);
                setInput("");
              }
            }}
            spellCheck={false}
            autoComplete="off"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#c0c0c0",
              fontFamily: "inherit",
              fontSize: "inherit",
              padding: 0,
              caretColor: "#c0c0c0",
            }}
          />
        </div>
      </div>
    </div>
  );
}
