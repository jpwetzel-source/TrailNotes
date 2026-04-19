const NAV_BASE =
  "prototype-nav__link flex flex-col items-center justify-center rounded-full px-5 py-2 transition-transform duration-200 no-underline";

const ACTIVE =
  "bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 scale-95";

const INACTIVE =
  "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50";

/**
 * @returns {"dashboard" | "trips" | "journal" | null}
 */
export function activeTabFromPath() {
  const file = (globalThis.location.pathname.split("/").pop() || "").toLowerCase();
  if (file === "index.html" || file === "") return "dashboard";
  // Project URL without trailing slash (e.g. /REPO) last segment is the repo folder name
  if (file && !file.includes(".")) return "dashboard";
  if (file === "trips.html") return "trips";
  if (file === "journal.html" || file === "journal-entry.html") return "journal";
  return null;
}

/**
 * Sync bottom tab state from the current URL. Safe to call on every prototype page.
 */
export function initPrototypeNav() {
  const active = activeTabFromPath();
  const links = document.querySelectorAll("a[data-nav-tab]");
  links.forEach((link) => {
    const tab = link.getAttribute("data-nav-tab");
    const isActive = tab !== null && tab === active;
    link.className = `${NAV_BASE} ${isActive ? ACTIVE : INACTIVE}`.trim();
    const icon = link.querySelector(".prototype-nav__icon");
    if (icon) {
      icon.style.fontVariationSettings = isActive ? "'FILL' 1" : "";
    }
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}
