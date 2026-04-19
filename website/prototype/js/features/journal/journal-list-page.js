import { initPrototypeNav } from "../../core/nav.js";
import { JOURNAL_STORAGE_KEY } from "./journal-schema.js";
import { listJournalEntries } from "./journal-store.js";

function previewText(text, max) {
  const oneLine = text.replace(/\s+/g, " ").trim();
  if (oneLine.length <= max) return oneLine;
  return `${oneLine.slice(0, max - 1)}…`;
}

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(iso));
  } catch {
    return "";
  }
}

function render() {
  const root = document.getElementById("journal-entries");
  const empty = document.getElementById("journal-empty");
  if (!root) return;

  const entries = listJournalEntries();
  root.textContent = "";

  if (entries.length === 0) {
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

  const list = document.createElement("div");
  list.className = "space-y-4";

  for (const entry of entries) {
    const article = document.createElement("article");
    article.className =
      "bg-surface-container-low p-5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white/40 hover:border-primary/20 transition-colors";

    const title = document.createElement("h3");
    title.className = "font-headline font-bold text-xl text-on-surface";
    title.textContent = entry.title.length > 0 ? entry.title : "Untitled entry";

    const meta = document.createElement("p");
    meta.className = "text-xs font-label uppercase tracking-widest text-outline mt-1";
    meta.textContent = `Updated ${formatDate(entry.updatedAt)}`;

    const body = document.createElement("p");
    body.className = "text-sm text-on-surface-variant leading-relaxed mt-3";
    const excerpt = entry.narrative.trim() || entry.highlights.filter(Boolean).join(" · ");
    body.textContent = excerpt ? previewText(excerpt, 180) : "No story yet. Tap to add detail.";

    const chips = document.createElement("div");
    chips.className = "mt-4 flex flex-wrap gap-2";
    if (entry.miles) {
      const s = document.createElement("span");
      s.className =
        "px-3 py-1 bg-white/60 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider";
      s.textContent = `${entry.miles} mi`;
      chips.appendChild(s);
    }
    if (entry.elevationFt) {
      const s = document.createElement("span");
      s.className =
        "px-3 py-1 bg-white/60 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider";
      s.textContent = `${entry.elevationFt} ft gain`;
      chips.appendChild(s);
    }

    const row = document.createElement("div");
    row.className = "flex items-start justify-between gap-4";
    const left = document.createElement("div");
    left.className = "min-w-0 flex-1";
    left.appendChild(title);
    left.appendChild(meta);
    left.appendChild(body);
    if (chips.childElementCount > 0) left.appendChild(chips);

    const edit = document.createElement("a");
    edit.className =
      "shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors no-underline";
    edit.href = `journal-entry.html?id=${encodeURIComponent(entry.id)}`;
    edit.setAttribute("aria-label", "Edit journal entry");
    edit.innerHTML = '<span class="material-symbols-outlined text-xl">edit</span>';

    row.appendChild(left);
    row.appendChild(edit);
    article.appendChild(row);

    const open = document.createElement("a");
    open.className = "mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary uppercase tracking-widest no-underline";
    open.href = `journal-entry.html?id=${encodeURIComponent(entry.id)}`;
    open.append(document.createTextNode("Open entry"));
    const chev = document.createElement("span");
    chev.className = "material-symbols-outlined text-sm";
    chev.setAttribute("aria-hidden", "true");
    chev.textContent = "chevron_right";
    open.appendChild(chev);

    article.appendChild(open);
    list.appendChild(article);
  }

  root.appendChild(list);
}

initPrototypeNav();
render();

globalThis.addEventListener("pageshow", (event) => {
  if (event.persisted) render();
});

globalThis.addEventListener("storage", (e) => {
  if (e.key === null || e.key === JOURNAL_STORAGE_KEY) render();
});
