import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Button, Checkbox, Fieldset, RadioButton } from "@react95/core";
import { feedbackEmail, TEXT_VERSION_URL } from "../data/profile";
import {
  useAccessibilitySettings,
  type ContrastScheme,
  type TextSize,
} from "../store/accessibilitySettings";
import { useWindowStore } from "../store/windowStore";

// Modelled on the Accessibility Properties dialog of Windows 98 (Control
// Panel > Accessibility Options), with settings that work on this desktop.
// Tabs follow the WAI-ARIA tabs pattern: arrow keys, Home and End move
// between tabs.

const TABS = [
  { id: "general", label: "General" },
  { id: "display", label: "Display" },
  { id: "mouse", label: "Mouse" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const CONTRAST_SCHEMES: { value: ContrastScheme; label: string }[] = [
  { value: "white-on-black", label: "White on black" },
  { value: "black-on-white", label: "Black on white" },
];

const TEXT_SIZES: { value: TextSize; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "large", label: "Large" },
  { value: "extra-large", label: "Extra large" },
];

export function AccessibilityOptions({ windowId }: { windowId: string }) {
  const uid = useId();
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  const closeWindow = useWindowStore((s) => s.closeWindow);

  const highContrast = useAccessibilitySettings((s) => s.highContrast);
  const contrastScheme = useAccessibilitySettings((s) => s.contrastScheme);
  const textSize = useAccessibilitySettings((s) => s.textSize);
  const singleClick = useAccessibilitySettings((s) => s.singleClick);
  const update = useAccessibilitySettings((s) => s.update);
  const reset = useAccessibilitySettings((s) => s.reset);

  const tabId = (id: TabId) => `${uid}-tab-${id}`;
  const panelId = (id: TabId) => `${uid}-panel-${id}`;

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    const id = TABS[next].id;
    setActiveTab(id);
    tabRefs.current[id]?.focus();
  };

  const panelProps = (id: TabId) => ({
    role: "tabpanel",
    id: panelId(id),
    "aria-labelledby": tabId(id),
    hidden: activeTab !== id,
    // Focusable so that long panels can be scrolled with the keyboard.
    tabIndex: 0,
    className: "acc-panel",
  });

  return (
    <div className="acc-dialog">
      <h2 className="visually-hidden">Accessibility Options</h2>

      <div className="acc-tablist" role="tablist" aria-label="Accessibility Options">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[t.id] = el;
            }}
            type="button"
            role="tab"
            id={tabId(t.id)}
            className="acc-tab"
            aria-selected={activeTab === t.id}
            aria-controls={panelId(t.id)}
            tabIndex={activeTab === t.id ? 0 : -1}
            onClick={() => setActiveTab(t.id)}
            onKeyDown={(e) => onTabKeyDown(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div {...panelProps("general")}>
        <p>
          The website replicates a Windows 98 desktop and is optimized to work
          with keyboard navigation and screen readers.
        </p>

        <h3>Text version</h3>
        <p>
          A single, linear page with all the content of this site, designed
          for screen readers, keyboard navigation, zoom and quick reading, is
          available at the following link.
        </p>
        <p>
          <a className="win-btn" href={TEXT_VERSION_URL}>
            Open the text version
          </a>
        </p>

        <h3>Navigate the Windows 98 version</h3>
        <p>
          The Start menu, the taskbar, My Computer and the Recycle Bin are part
          of the Windows 98 look but contain no information about Diego’s
          work. They work with the mouse, but they are designed to be skipped
          by the keyboard and by screen readers.
        </p>
        <p>
          The games and apps available in the Start menu (Solitaire,
          Minesweeper, Calculator, Paint, MS-DOS Prompt, Character Map and
          Bouncing DVD) are only visual and do not contain information about
          Diego’s work either.
        </p>

        <h3>Feedback</h3>
        <p>
          If something doesn’t work or you have suggestions, please write to{" "}
          <a href={`mailto:${feedbackEmail}`}>{feedbackEmail}</a>.
        </p>
      </div>

      <div {...panelProps("display")}>
        <Fieldset legend="High Contrast" className="acc-group">
          <p className="acc-help">
            Use this option if you want the desktop to use colors designed for
            easy reading.
          </p>
          <Checkbox
            checked={highContrast}
            onChange={(e) => update({ highContrast: e.currentTarget.checked })}
          >
            Use High Contrast
          </Checkbox>
          <div
            className="acc-options acc-indent"
            role="radiogroup"
            aria-label="High Contrast color scheme"
          >
            {CONTRAST_SCHEMES.map((o) => (
              <RadioButton
                key={o.value}
                name={`${uid}-contrast`}
                value={o.value}
                checked={contrastScheme === o.value}
                disabled={!highContrast}
                onChange={() => update({ contrastScheme: o.value })}
              >
                {o.label}
              </RadioButton>
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Text size" className="acc-group">
          <p className="acc-help">
            Enlarges the text and pictures in the windows and the icons on the
            desktop.
          </p>
          <div className="acc-options">
            {TEXT_SIZES.map((o) => (
              <RadioButton
                key={o.value}
                name={`${uid}-text-size`}
                value={o.value}
                checked={textSize === o.value}
                onChange={() => update({ textSize: o.value })}
              >
                {o.label}
              </RadioButton>
            ))}
          </div>
        </Fieldset>
      </div>

      <div {...panelProps("mouse")}>
        <Fieldset legend="Click items as follows" className="acc-group">
          <div className="acc-options">
            <RadioButton
              name={`${uid}-click`}
              value="single"
              checked={singleClick}
              onChange={() => update({ singleClick: true })}
            >
              Single-click to open an item (point to select)
            </RadioButton>
            <RadioButton
              name={`${uid}-click`}
              value="double"
              checked={!singleClick}
              onChange={() => update({ singleClick: false })}
            >
              Double-click to open an item (single-click to select)
            </RadioButton>
          </div>
        </Fieldset>
      </div>

      <div className="acc-footer">
        <p className="acc-note">Settings are saved in this browser.</p>
        <div className="acc-buttons">
          <Button type="button" onClick={reset}>
            Restore defaults
          </Button>
          <Button type="button" onClick={() => closeWindow(windowId)}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
