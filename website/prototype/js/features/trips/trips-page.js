import { initPrototypeNav } from "../../core/nav.js";
import { MOCK_COMMUNITY_TRIPS, MOCK_MY_TRIPS } from "./trips-mock-data.js";

/** @typedef {import("./trips-mock-data.js").TripCardModel} TripCardModel */
/** @typedef {import("./trips-mock-data.js").TripsFeed} TripsFeed */
/** @typedef {import("./trips-mock-data.js").TripCategory} TripCategory */

const FEED_STORAGE_KEY = "trailnotes_trips_feed_v1";

/** @returns {TripsFeed} */
function readFeed() {
  try {
    const v = globalThis.localStorage.getItem(FEED_STORAGE_KEY);
    if (v === "community" || v === "mine") return v;
  } catch {
    /* ignore */
  }
  return "mine";
}

/** @param {TripsFeed} feed */
function writeFeed(feed) {
  try {
    globalThis.localStorage.setItem(FEED_STORAGE_KEY, feed);
  } catch {
    /* ignore */
  }
}

/** @param {TripCardModel} trip @param {HTMLElement} root */
function renderCard(trip, root) {
  const article = document.createElement("article");
  article.className =
    "relative group bg-surface-container-lowest/70 backdrop-blur-3xl rounded-xl p-4 shadow-[0_12px_32px_rgba(23,28,31,0.06)] overflow-hidden";

  const inner = document.createElement("div");
  inner.className = "flex flex-col gap-4";

  const imgWrap = document.createElement("div");
  imgWrap.className = "relative h-48 w-full rounded-lg overflow-hidden";
  const img = document.createElement("img");
  img.className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700";
  img.alt = trip.imageAlt;
  img.src = trip.imageUrl;
  imgWrap.appendChild(img);

  const badge = document.createElement("div");
  badge.className = "absolute top-4 right-4 bg-white/40 backdrop-blur-md px-3 py-1 rounded-full";
  const badgeText = document.createElement("span");
  badgeText.className = "text-[11px] font-bold text-on-primary-fixed-variant uppercase tracking-widest";
  badgeText.textContent = trip.badge;
  badge.appendChild(badgeText);
  imgWrap.appendChild(badge);

  const body = document.createElement("div");
  body.className = "px-2";

  if (trip.feed === "mine") {
    const yours = document.createElement("div");
    yours.className =
      "mb-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary";
    const hi = document.createElement("span");
    hi.className = "material-symbols-outlined text-[14px]";
    hi.setAttribute("aria-hidden", "true");
    hi.textContent = "hiking";
    yours.appendChild(hi);
    yours.appendChild(document.createTextNode(" Your log"));
    body.appendChild(yours);
  }

  if (trip.feed === "community" && trip.authorName) {
    const authorRow = document.createElement("div");
    authorRow.className = "flex items-center gap-3 mb-3";
    const av = document.createElement("img");
    av.className = "w-10 h-10 rounded-full object-cover border border-white/60 shadow-sm shrink-0";
    av.alt = "";
    av.src = trip.authorAvatar || "";
    av.width = 40;
    av.height = 40;
    const meta = document.createElement("div");
    meta.className = "min-w-0 flex-1";
    const name = document.createElement("p");
    name.className = "font-bold text-on-background text-sm truncate";
    name.textContent = trip.authorName;
    const sub = document.createElement("p");
    sub.className = "text-[11px] font-bold text-slate-500 uppercase tracking-wider";
    sub.textContent = trip.postedAgo ? `${trip.postedAgo} · Friend` : "Friend";
    meta.appendChild(name);
    meta.appendChild(sub);
    authorRow.appendChild(av);
    authorRow.appendChild(meta);
    body.appendChild(authorRow);
  }

  const titleRow = document.createElement("div");
  titleRow.className = "flex justify-between items-start mb-2 gap-2";
  const h2 = document.createElement("h2");
  h2.className = "font-serif font-bold text-2xl text-emerald-900";
  h2.textContent = trip.title;
  const outward = document.createElement("span");
  outward.className = "material-symbols-outlined text-emerald-700 shrink-0";
  outward.textContent = "arrow_outward";
  outward.setAttribute("aria-hidden", "true");
  titleRow.appendChild(h2);
  titleRow.appendChild(outward);
  body.appendChild(titleRow);

  const stats = document.createElement("div");
  stats.className = "flex flex-wrap gap-4 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest";
  const d1 = document.createElement("div");
  d1.className = "flex items-center gap-1";
  const ic1 = document.createElement("span");
  ic1.className = "material-symbols-outlined text-[16px]";
  ic1.setAttribute("aria-hidden", "true");
  ic1.textContent = "calendar_today";
  d1.appendChild(ic1);
  d1.appendChild(document.createTextNode(trip.dateLabel));
  const d2 = document.createElement("div");
  d2.className = "flex items-center gap-1";
  const ic2 = document.createElement("span");
  ic2.className = "material-symbols-outlined text-[16px]";
  ic2.setAttribute("aria-hidden", "true");
  ic2.textContent = "schedule";
  d2.appendChild(ic2);
  d2.appendChild(document.createTextNode(trip.duration));
  stats.appendChild(d1);
  stats.appendChild(d2);
  body.appendChild(stats);

  const p = document.createElement("p");
  p.className = "text-on-surface-variant leading-relaxed text-sm";
  p.textContent = trip.description;
  body.appendChild(p);

  inner.appendChild(imgWrap);
  inner.appendChild(body);
  article.appendChild(inner);
  root.appendChild(article);
}

function main() {
  initPrototypeNav();

  const titleEl = document.getElementById("trips-page-title");
  const subtitleEl = document.getElementById("trips-page-subtitle");
  const listHeadingEl = document.getElementById("trips-list-heading");
  const statsEl = document.getElementById("trips-quick-stats");
  const listRoot = document.getElementById("trips-list-root");
  const searchInput = document.getElementById("trips-search");
  const tabMine = document.getElementById("trips-tab-mine");
  const tabCommunity = document.getElementById("trips-tab-community");

  if (!listRoot || !(tabMine instanceof HTMLButtonElement) || !(tabCommunity instanceof HTMLButtonElement)) return;

  /** @type {TripsFeed} */
  let feed = readFeed();
  /** @type {TripCategory} */
  let category = "all";
  let query = "";

  function pool() {
    return feed === "mine" ? MOCK_MY_TRIPS : MOCK_COMMUNITY_TRIPS;
  }

  function filtered() {
    const q = query.trim().toLowerCase();
    return pool().filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (!q) return true;
      const hay = `${t.title} ${t.description} ${t.authorName ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }

  function syncTabs() {
    const mineOn = feed === "mine";
    tabMine.setAttribute("aria-selected", mineOn ? "true" : "false");
    tabCommunity.setAttribute("aria-selected", mineOn ? "false" : "true");
    tabMine.className = mineOn ? tabActiveClass() : tabIdleClass();
    tabCommunity.className = !mineOn ? tabActiveClass() : tabIdleClass();
  }

  function tabActiveClass() {
    return "flex-1 min-w-0 rounded-lg py-2.5 px-3 text-sm font-bold transition-colors bg-primary-fixed text-on-primary-fixed shadow-sm";
  }

  function tabIdleClass() {
    return "flex-1 min-w-0 rounded-lg py-2.5 px-3 text-sm font-bold transition-colors text-on-surface-variant hover:bg-white/50";
  }

  function updateHeader() {
    if (titleEl) {
      titleEl.textContent = feed === "mine" ? "My journeys" : "Community";
    }
    if (subtitleEl) {
      subtitleEl.textContent =
        feed === "mine"
          ? "Your logged hikes and plans"
          : "Recent hikes from friends and people you follow";
    }
    if (statsEl) {
      const n = pool().length;
      const h = pool().reduce((acc, t) => {
        const m = t.duration.match(/(\d+)h/);
        return acc + (m ? parseInt(m[1], 10) : 0);
      }, 0);
      statsEl.textContent =
        feed === "mine"
          ? `${n} journeys · about ${h}h on trail this season (demo)`
          : `${n} updates · friends and crew (demo)`;
    }
    if (listHeadingEl) {
      listHeadingEl.textContent = feed === "mine" ? "Your saved routes" : "Friend and community routes";
    }
  }

  function chipActive() {
    return "bg-primary-fixed text-on-primary-fixed px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap shrink-0 transition-colors";
  }

  function chipIdle() {
    return "bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap shrink-0 transition-colors hover:bg-surface-container";
  }

  function render() {
    syncTabs();
    updateHeader();
    document.querySelectorAll("[data-trip-chip]").forEach((b) => {
      if (!(b instanceof HTMLButtonElement)) return;
      const v = b.getAttribute("data-trip-chip");
      b.className = v === category ? chipActive() : chipIdle();
    });
    listRoot.textContent = "";
    const rows = filtered();
    if (rows.length === 0) {
      const empty = document.createElement("p");
      empty.className =
        "rounded-xl border border-dashed border-outline-variant bg-white/40 px-6 py-10 text-center text-sm text-on-surface-variant";
      empty.textContent =
        "No journeys match your filters. Try another category or clear the search.";
      listRoot.appendChild(empty);
      return;
    }
    for (const trip of rows) {
      renderCard(trip, listRoot);
    }
  }

  function setFeed(next) {
    feed = next;
    writeFeed(next);
    render();
  }

  tabMine.addEventListener("click", () => setFeed("mine"));
  tabCommunity.addEventListener("click", () => setFeed("community"));

  document.querySelectorAll("[data-trip-chip]").forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    btn.addEventListener("click", () => {
      const v = btn.getAttribute("data-trip-chip");
      if (v !== "all" && v !== "alpine" && v !== "forests" && v !== "coastal") return;
      category = v;
      render();
    });
  });

  if (searchInput instanceof HTMLInputElement) {
    searchInput.addEventListener("input", () => {
      query = searchInput.value;
      render();
    });
  }

  render();
}

main();
