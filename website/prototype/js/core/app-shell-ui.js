/**
 * Single source of truth for the prototype top bar and bottom tab bar.
 *
 * On every page, use empty mount nodes (classes stay on the host for layout):
 *
 * <header id="prototype-app-header" class="app-top-bar"></header>
 * <main class="app-main">...</main>
 * <nav id="prototype-app-bottom-nav" class="app-bottom-nav" aria-label="Primary"></nav>
 *
 * Then load `js/core/boot-nav.js` (calls `initAppChrome()` which mounts here first).
 */

/** Demo avatar used in header across the prototype. */
export const PROTOTYPE_PROFILE_AVATAR_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDRmrhfObH-LkrQzLP_NOZMZNafRHQRdw8BPpAuwkuPPmP0-I1dNNUS7ga9DTVxV-wKWNvKzl4WVg3Yu06Mms71uwVoy907QPOsgHsRGoFOnWG-BCf1ElVahyYrMAPguSMF6qqZai6t5UNCZIBbRYcDcbp3tPD6BXrCheYVpwvMdlI1TlQLOcRbyBL4pcInM0RUvmhKlqMMYW-g5hPd0FguD4rSh9U7n8DhDZdanSgDECcibmLXwz4vuXcdIsF-xZw6b21W0Fpn8X0";

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#006948"/><path fill="#C8F9E4" d="M10 27 18 14l4 4.5 9.5-10V27z"/><path fill="#fff" fill-opacity="0.45" d="M10 27 20.5 21.7 31 27z"/></svg>`;

const HEADER_INNER = `<a href="index.html" class="app-logo" aria-label="TrailNotes home, dashboard">${LOGO_SVG}</a><a href="profile.html" class="block h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-container-high ring-1 ring-black/5 shadow-sm"><img alt="Profile" class="h-full w-full object-cover" src="${PROTOTYPE_PROFILE_AVATAR_SRC}"/></a>`;

const BOTTOM_NAV_INNER = `<a data-nav-tab="dashboard" href="index.html" class="prototype-nav__link"><span class="material-symbols-outlined prototype-nav__icon text-[22px]">dashboard</span><span class="font-sans text-[11px] font-semibold">Dashboard</span></a><a data-nav-tab="trips" href="trips.html" class="prototype-nav__link"><span class="material-symbols-outlined prototype-nav__icon text-[22px]">map</span><span class="font-sans text-[11px] font-semibold">Trips</span></a><a data-nav-tab="journal" href="journal.html" class="prototype-nav__link"><span class="material-symbols-outlined prototype-nav__icon text-[22px]">edit_note</span><span class="font-sans text-[11px] font-semibold">Journal</span></a>`;

/**
 * Injects shared header and bottom nav markup once per document.
 * @returns {boolean} true if both mounts exist and were filled (or already filled)
 */
export function mountPrototypeAppShell() {
  const header = document.getElementById("prototype-app-header");
  const bottomNav = document.getElementById("prototype-app-bottom-nav");
  if (!header || !bottomNav) return false;
  if (header.dataset.shellMounted === "1") return true;
  header.innerHTML = HEADER_INNER;
  bottomNav.innerHTML = BOTTOM_NAV_INNER;
  header.dataset.shellMounted = "1";
  bottomNav.dataset.shellMounted = "1";
  return true;
}
