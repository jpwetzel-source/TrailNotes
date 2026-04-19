import { mountPrototypeAppShell } from "./app-shell-ui.js";
import { initPrototypeNav } from "./nav.js";

/**
 * Mounts shared header and bottom nav (when mount nodes exist), syncs tab state,
 * and wires the scroll-away top bar. Safe to call once per page load.
 */
export function initAppChrome() {
  mountPrototypeAppShell();
  initPrototypeNav();
  initScrollAwayHeader();
}

function initScrollAwayHeader() {
  const bar = document.querySelector(".app-top-bar");
  if (!bar || bar.dataset.scrollAwayInit === "1") return;
  bar.dataset.scrollAwayInit = "1";

  let lastY = globalThis.scrollY || 0;
  let ticking = false;

  function onFrame() {
    const y = globalThis.scrollY || document.documentElement.scrollTop;
    const delta = y - lastY;
    const doc = document.documentElement;
    const canScroll = doc.scrollHeight > globalThis.innerHeight + 80;

    if (y < 36) {
      document.body.classList.remove("app-shell--header-hidden");
    } else if (canScroll && delta > 8 && y > 64) {
      document.body.classList.add("app-shell--header-hidden");
    } else if (delta < -6) {
      document.body.classList.remove("app-shell--header-hidden");
    }

    lastY = y;
    ticking = false;
  }

  globalThis.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        globalThis.requestAnimationFrame(onFrame);
      }
    },
    { passive: true }
  );
}
