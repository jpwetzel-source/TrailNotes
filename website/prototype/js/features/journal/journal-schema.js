/** @typedef {{ id: string, title: string, createdAt: string, updatedAt: string, miles: string, elevationFt: string, movingTime: string, narrative: string, highlights: string[], rewardFood: string }} JournalEntry */

export const JOURNAL_STORAGE_KEY = "trailnotes_prototype_journal_v1";

/** @returns {JournalEntry} */
export function createDraftEntry() {
  const now = new Date().toISOString();
  return {
    id: "",
    title: "",
    createdAt: now,
    updatedAt: now,
    miles: "",
    elevationFt: "",
    movingTime: "",
    narrative: "",
    highlights: ["", "", ""],
    rewardFood: "",
  };
}

/** @param {unknown} value @returns {value is JournalEntry} */
export function isJournalEntry(value) {
  if (!value || typeof value !== "object") return false;
  const o = /** @type {Record<string, unknown>} */ (value);
  return (
    typeof o.id === "string" &&
    typeof o.title === "string" &&
    typeof o.createdAt === "string" &&
    typeof o.updatedAt === "string" &&
    Array.isArray(o.highlights) &&
    o.highlights.length === 3 &&
    o.highlights.every((h) => typeof h === "string")
  );
}

/** @param {unknown[]} rows @returns {JournalEntry[]} */
export function sanitizeEntries(rows) {
  const out = [];
  for (const row of rows) {
    if (!isJournalEntry(row)) continue;
    out.push({
      ...row,
      miles: typeof row.miles === "string" ? row.miles : "",
      elevationFt: typeof row.elevationFt === "string" ? row.elevationFt : "",
      movingTime: typeof row.movingTime === "string" ? row.movingTime : "",
      narrative: typeof row.narrative === "string" ? row.narrative : "",
      rewardFood: typeof row.rewardFood === "string" ? row.rewardFood : "",
      highlights: [row.highlights[0], row.highlights[1], row.highlights[2]],
    });
  }
  return out;
}
