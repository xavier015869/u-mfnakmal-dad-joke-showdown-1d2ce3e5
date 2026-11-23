// Dad Joke Showdown — one dad joke, at most 200 characters.
// The program writes the joke to /output/entry.txt, where make.fun's gate
// scorer checks it is UTF-8 text of 1 to 200 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Craft notes, written against the published judge brief:
// - The judge is a father of three who picks the bigger groan, weighing
//   first whether a dad would actually tell it at the table, then whether
//   the pun lands cleanly on the first read, then freshness, tightness,
//   and how naturally it reads aloud, with the punchline at the end.
// - Setup: a dad so organised he files his jokes away like paperwork.
//   That is peak dad behaviour, and it sets up a spreadsheet word.
// - The turn: "data" becomes "dad-a" — the spreadsheet is literally full
//   of dad. It is understood instantly, with nobody explaining it.
// - The closer earns the groan: in a spreadsheet, a column full of dad-a
//   can only be a column of groaners, so the last word is the punch.
// - Revision: the first draft explained itself ("because every column
//   in it is..."). Tightened to two short spoken sentences and let the
//   dash deliver the turn, so the punchline arrives at the very end and
//   a father can say the whole thing in one breath at the table.
const JOKE =
  "I keep all my dad jokes in a spreadsheet. It's full of dad-a — every column is a groaner.";

// The gate counts characters, so count Unicode code points, not bytes.
const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 200 || JOKE.trim().length === 0) {
  throw new Error(`entry.txt would fail the gate: ${codePoints} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
console.log(JOKE);
console.log(`characters: ${codePoints}`);
