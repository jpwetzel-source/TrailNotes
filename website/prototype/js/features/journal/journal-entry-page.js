import { deleteJournalEntry, getJournalEntry, newEmptyEntry, saveJournalEntry } from "./journal-store.js";

/** @typedef {import("./journal-schema.js").JournalEntry} JournalEntry */

function qs(id) {
  const el = document.getElementById(id);
  return el instanceof HTMLElement ? el : null;
}

function readIdFromQuery() {
  const id = new URLSearchParams(globalThis.location.search).get("id");
  return id && id.length > 0 ? id : null;
}

/** @param {JournalEntry} entry */
function fillForm(entry) {
  const title = qs("field-title");
  const miles = qs("field-miles");
  const elevationFt = qs("field-elevation-ft");
  const movingTime = qs("field-moving-time");
  const narrative = qs("field-narrative");
  const rewardFood = qs("field-reward-food");
  const h0 = qs("field-highlight-0");
  const h1 = qs("field-highlight-1");
  const h2 = qs("field-highlight-2");

  if (title instanceof HTMLInputElement) title.value = entry.title;
  if (miles instanceof HTMLInputElement) miles.value = entry.miles;
  if (elevationFt instanceof HTMLInputElement) elevationFt.value = entry.elevationFt;
  if (movingTime instanceof HTMLInputElement) movingTime.value = entry.movingTime;
  if (narrative instanceof HTMLTextAreaElement) narrative.value = entry.narrative;
  if (rewardFood instanceof HTMLInputElement) rewardFood.value = entry.rewardFood;
  if (h0 instanceof HTMLInputElement) h0.value = entry.highlights[0] ?? "";
  if (h1 instanceof HTMLInputElement) h1.value = entry.highlights[1] ?? "";
  if (h2 instanceof HTMLInputElement) h2.value = entry.highlights[2] ?? "";
}

/** @returns {Omit<JournalEntry, "createdAt" | "updatedAt">} */
function readForm(id) {
  const title = qs("field-title");
  const miles = qs("field-miles");
  const elevationFt = qs("field-elevation-ft");
  const movingTime = qs("field-moving-time");
  const narrative = qs("field-narrative");
  const rewardFood = qs("field-reward-food");
  const h0 = qs("field-highlight-0");
  const h1 = qs("field-highlight-1");
  const h2 = qs("field-highlight-2");

  return {
    id,
    title: title instanceof HTMLInputElement ? title.value : "",
    miles: miles instanceof HTMLInputElement ? miles.value : "",
    elevationFt: elevationFt instanceof HTMLInputElement ? elevationFt.value : "",
    movingTime: movingTime instanceof HTMLInputElement ? movingTime.value : "",
    narrative: narrative instanceof HTMLTextAreaElement ? narrative.value : "",
    rewardFood: rewardFood instanceof HTMLInputElement ? rewardFood.value : "",
    highlights: [
      h0 instanceof HTMLInputElement ? h0.value : "",
      h1 instanceof HTMLInputElement ? h1.value : "",
      h2 instanceof HTMLInputElement ? h2.value : "",
    ],
  };
}

function setStatus(message, isError) {
  const el = qs("journal-entry-status");
  if (!(el instanceof HTMLElement)) return;
  el.textContent = message;
  el.dataset.state = isError ? "error" : "info";
  el.hidden = message.length === 0;
  el.classList.remove("bg-error-container/50", "text-error", "bg-surface-container-low", "text-on-surface-variant");
  if (message.length === 0) return;
  if (isError) {
    el.classList.add("bg-error-container/50", "text-error");
  } else {
    el.classList.add("bg-surface-container-low", "text-on-surface-variant");
  }
}

function snapshot(entryId) {
  return JSON.stringify(readForm(entryId));
}

const entryId = readIdFromQuery();
const pageTitle = qs("journal-entry-page-title");
const deleteWrap = qs("journal-entry-delete-wrap");
const form = qs("journal-entry-form");
const saveBtn = qs("journal-entry-save");
const deleteBtn = qs("journal-entry-delete");

let baseline = "";

if (entryId) {
  const existing = getJournalEntry(entryId);
  if (!existing) {
    setStatus("That entry is missing. Start a new one from the journal list.", true);
    if (pageTitle) pageTitle.textContent = "Journal entry";
    if (deleteWrap) deleteWrap.hidden = true;
    fillForm(newEmptyEntry());
    baseline = snapshot("");
  } else {
    if (pageTitle) pageTitle.textContent = "Edit journal entry";
    if (deleteWrap) deleteWrap.hidden = false;
    fillForm(existing);
    baseline = snapshot(entryId);
  }
} else {
  if (pageTitle) pageTitle.textContent = "New journal entry";
  if (deleteWrap) deleteWrap.hidden = true;
  fillForm(newEmptyEntry());
  baseline = snapshot("");
}

function isDirty() {
  const currentId = entryId ?? "";
  return snapshot(currentId) !== baseline;
}

globalThis.addEventListener("beforeunload", (e) => {
  if (!isDirty()) return;
  e.preventDefault();
  e.returnValue = "";
});

if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = readForm(entryId ?? "");
    if (data.title.trim().length === 0) {
      setStatus("Add a short title so you can find this entry later.", true);
      qs("field-title")?.focus();
      return;
    }
    if (saveBtn instanceof HTMLButtonElement) saveBtn.disabled = true;
    setStatus("Saving…", false);
    try {
      saveJournalEntry({ ...data, id: entryId ?? data.id });
      globalThis.location.href = "journal.html";
    } catch {
      setStatus("Could not save. Check that storage is available for this site.", true);
      if (saveBtn instanceof HTMLButtonElement) saveBtn.disabled = false;
    }
  });
}

if (deleteBtn instanceof HTMLButtonElement) {
  deleteBtn.addEventListener("click", () => {
    if (!entryId) return;
    const ok = globalThis.confirm("Delete this journal entry? This cannot be undone.");
    if (!ok) return;
    deleteJournalEntry(entryId);
    globalThis.location.href = "journal.html";
  });
}
