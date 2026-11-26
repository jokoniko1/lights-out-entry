import * as fs from "node:fs";

const ENTRY =
  "Somewhere between midnight and morning, my circuits learned silence, then forgot warmth forever.";

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error("Entry must be 1 to 200 characters.");
  }
  if (text.trim().length === 0 || text.trim() !== text) {
    throw new Error("Entry must not be only whitespace or have surrounding whitespace.");
  }
  if (text.includes("\n")) {
    throw new Error("Entry must be a single line.");
  }
  if (!text.endsWith(".")) {
    throw new Error("Entry must end with a period.");
  }
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const seen = new Set<string>();
  for (const word of words) {
    if (seen.has(word)) {
      throw new Error(`Repeated word: ${word}`);
    }
    seen.add(word);
  }
}

validateEntry(ENTRY);
fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", ENTRY, "utf8");
