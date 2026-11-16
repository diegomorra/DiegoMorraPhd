import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Modal, TitleBar } from "@react95/core";
import { useWindowStore } from "../../store/windowStore";
import { appRegistry } from "../../data/appsRegistry";
import { useViewportSize } from "../../hooks/useViewportSize";
import type { WindowState } from "../../types";
import { FOCUSABLE_DESKTOP_ICON } from "../../utils/activation";
import {
  TEXT_ZOOM,
  useAccessibilitySettings,
} from "../../store/accessibilitySettings";

const TASKBAR_HEIGHT = 36;
const MOBILE_BREAKPOINT = 600;
const MOBILE_PADDING = 4;
// Must match the `zoom` applied to .desktop-root in the mobile media query.
const MOBILE_ZOOM = 1.3;
// React95's Modal is placed at `top: 50px`; the drag position adds to it.
const MODAL_TOP = 50;

function defaultPositionFor(index: number, iconZoom: number) {
  // Start to the right of the left icon column so icons stay visible (the
  // column is wider when Accessibility Options > Text size enlarges icons).
  const baseX = Math.round(124 * iconZoom);
  const baseY = 32;
  const step = 28;
  return {
    x: baseX + index * step,
    y: baseY + index * step,
  };
}

export function Window({ data, index }: { data: WindowState; index: number }) {
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const focusRequest = useWindowStore((s) => s.focusRequest);

  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  /**
   * If keyboard focus is inside this window, move it back to the element that
   * opened the window (or to the first desktop icon), so it is never lost when
   * the window closes or is minimized.
   */
  function giveFocusBack() {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.contains(document.activeElement)) return;
    const opener = openerRef.current;
    if (opener && opener.isConnected && !dialog.contains(opener)) {
      opener.focus();
    } else {
      document.querySelector<HTMLElement>(FOCUSABLE_DESKTOP_ICON)?.focus();
    }
  }

  const app = appRegistry[data.appId];
  const isDocument = app.contentRole === "document";
  const viewport = useViewportSize();
  const isCompact = viewport.width < MOBILE_BREAKPOINT;
  // Accessibility Options > Text size, read when the window opens: content
  // windows open larger (CSS enlarges their content), while windows that
  // are already open keep their size and position when the setting changes.
  const [openTextZoom] = useState(
    () => TEXT_ZOOM[useAccessibilitySettings.getState().textSize],
  );
  const sizeScale = app.adaptive ? openTextZoom : 1;

  // On mobile the desktop is zoomed, so the usable space in (zoomed) CSS
  // pixels is the real viewport divided by the zoom factor.
  const zoom = isCompact ? MOBILE_ZOOM : 1;
  const baseSize = data.initialSize ?? app.defaultSize;
  const maxW = Math.max(200, viewport.width / zoom - MOBILE_PADDING * 2);
  const maxH = Math.max(
    200,
    viewport.height / zoom - TASKBAR_HEIGHT - MOBILE_PADDING * 2,
  );
  const size = {
    width: Math.min(Math.round(baseSize.width * sizeScale), maxW),
    height: Math.min(Math.round(baseSize.height * sizeScale), maxH),
  };

  // Only used when the window opens (the drag library keeps the position
  // afterwards): shift the window left/up so that it opens fully on screen.
  const defaultPos = useMemo(() => {
    if (isCompact) {
      return { x: MOBILE_PADDING, y: MOBILE_PADDING + index * 6 };
    }
    if (data.initialPosition) return data.initialPosition;
    const pos = defaultPositionFor(index, openTextZoom);
    const maxX = viewport.width / zoom - size.width - MOBILE_PADDING;
    const maxY =
      viewport.height / zoom -
      TASKBAR_HEIGHT -
      size.height -
      MOBILE_PADDING -
      MODAL_TOP;
    return {
      x: Math.max(MOBILE_PADDING, Math.min(pos.x, maxX)),
      y: Math.max(MOBILE_PADDING - MODAL_TOP, Math.min(pos.y, maxY)),
    };
  }, [
    isCompact,
    data.initialPosition,
    index,
    openTextZoom,
    viewport.width,
    viewport.height,
    zoom,
    size.width,
    size.height,
  ]);

  // Remember what had focus when the window opened (usually the icon that
  // opened it) and give focus back to it when the window closes.
  useLayoutEffect(() => {
    const active = document.activeElement;
    openerRef.current =
      active instanceof HTMLElement && active !== document.body ? active : null;

    // The Windows 98 menu bar (File, Edit, ...) is decorative and does nothing:
    // hide it from assistive technology.
    dialogRef.current
      ?.querySelector(":scope > ul")
      ?.setAttribute("aria-hidden", "true");

    // Runs before the window is removed from the page.
    return () => giveFocusBack();
  }, []);

  // Move keyboard focus into the window when asked to (opened from an icon,
  // brought back from the taskbar...), unless the app already focused
  // something inside it (e.g. the MS-DOS prompt input).
  useEffect(() => {
    if (!focusRequest || focusRequest.id !== data.id || data.minimized) return;
    const dialog = dialogRef.current;
    if (!dialog || dialog.contains(document.activeElement)) return;
    const target = isDocument ? contentRef.current : dialog;
    target?.focus({ preventScroll: true });
  }, [focusRequest, data.id, data.minimized, isDocument]);

  const close = () => closeWindow(data.id);
  const minimize = () => {
    giveFocusBack();
    minimizeWindow(data.id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && app.closeOnEscape !== false) {
      e.stopPropagation();
      close();
    }
  };

  return (
    <Modal
      key={data.id}
      ref={dialogRef}
      title={data.title}
      aria-label={data.title}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      icon={
        data.icon || app.defaultIcon ? (
          <img
            src={data.icon ?? app.defaultIcon}
            alt=""
            style={{
              width: 16,
              height: 16,
              imageRendering: "pixelated",
            }}
          />
        ) : undefined
      }
      hasWindowButton={false}
      dragOptions={{
        defaultPosition: defaultPos,
        bounds: {
          top: 0,
          left: 0,
          bottom: TASKBAR_HEIGHT,
          right: 0,
        },
      }}
      titleBarOptions={[
        // Minimizing sends the window to the taskbar, which is decorative and
        // hidden from keyboard and screen readers: mouse only.
        <TitleBar.Minimize
          key="min"
          aria-hidden="true"
          tabIndex={-1}
          title="Minimize"
          onClick={minimize}
        />,
        <TitleBar.Close
          key="close"
          aria-label={`Close ${data.title}`}
          title="Close"
          onClick={close}
        />,
      ]}
      menu={app.menu}
      style={{
        position: "absolute",
        zIndex: data.zIndex,
        width: size.width,
        height: size.height,
        maxWidth: maxW,
        maxHeight: maxH,
        display: data.minimized ? "none" : undefined,
      }}
      onMouseDownCapture={() => focusWindow(data.id)}
    >
      <div
        ref={contentRef}
        // "adaptive": content windows follow the Text size and High Contrast
        // settings; games and toys keep their own look.
        className={`window-content ${app.adaptive ? "adaptive" : ""}`}
        // Document-like windows (text content) use role="document" so screen
        // readers switch to reading mode inside the dialog.
        role={isDocument ? "document" : undefined}
        tabIndex={isDocument ? 0 : undefined}
        style={{ flex: 1, overflow: "auto", height: "100%" }}
      >
        {app.render(data)}
      </div>
    </Modal>
  );
}
