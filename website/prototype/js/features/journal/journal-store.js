import { newId } from "../../core/uid.js";
import { JOURNAL_STORAGE_KEY, createDraftEntry, sanitizeEntries } from "./journal-schema.js";

/** @typedef {import("./journal-schema.js").JournalEntry} JournalEntry */

function readRaw() {
  try {
    const raw = globalThis.localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sanitizeEntries(parsed);
  } catch {
    return [];
  }
}

function writeAll(entries) {
  globalThis.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
}

/** @returns {JournalEntry[]} newest first */
export function listJournalEntries() {
  return readRaw().sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
}

/** @param {string} id @returns {JournalEntry | null} */
export function getJournalEntry(id) {
  return readRaw().find((e) => e.id === id) ?? null;
}

/** @param {Omit<JournalEntry, "id" | "createdAt" | "updatedAt"> & Partial<Pick<JournalEntry, "id" | "createdAt">>} input */
export function saveJournalEntry(input) {
  const rows = readRaw();
  const now = new Date().toISOString();
  const id = input.id && input.id.length > 0 ? input.id : newId();
  const existing = rows.find((e) => e.id === id);
  const createdAt = existing?.createdAt ?? input.createdAt ?? now;
  const hl = Array.isArray(input.highlights) ? input.highlights.map((h) => String(h).trim()) : ["", "", ""];
  while (hl.length < 3) hl.push("");
  const highlights = hl.slice(0, 3);

  const next = /** @type {JournalEntry} */ ({
    id,
    title: input.title.trim(),
    createdAt,
    updatedAt: now,
    miles: String(input.miles ?? "").trim(),
    elevationFt: String(input.elevationFt ?? "").trim(),
    movingTime: String(input.movingTime ?? "").trim(),
    narrative: String(input.narrative ?? "").trim(),
    highlights,
    rewardFood: String(input.rewardFood ?? "").trim(),
  });
  const without = rows.filter((e) => e.id !== id);
  without.push(next);
  writeAll(without);
  return next;
}

/** @param {string} id */
export function deleteJournalEntry(id) {
  const rows = readRaw().filter((e) => e.id !== id);
  writeAll(rows);
}

/** @returns {JournalEntry} */
export function newEmptyEntry() {
  return createDraftEntry();
}
