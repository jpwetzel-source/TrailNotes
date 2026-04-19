import { initPrototypeNav } from "./nav.js";

/**
 * Bottom tabs + optional scroll-away top bar. Call once per page.
 */
export function initAppChrome() {
  initPrototypeNav();
  initScrollAwayHeader();
}

function initScrollAwayHeader() {
  const bar = document.querySelector(".app-top-bar");
  if (!bar) return;

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
