// One Line, One Chill — make.fun bounty u-azazex-one-line-one-chill-6d4d5488
//
// Writes a single sentence of horror (under 200 characters) to
// /output/entry.txt, where the house judge compares it head to head
// against the other entries on how frightening, vivid and original it is.
//
// The line: a concrete, specific dread that outlasts the sentence —
// no mirror, no doll, no basement, no gore. The scare is earned by
// what the last word reveals, not announced.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "The search history on my dead grandmother's phone shows she googled " +
  "my address every night for a year, and the last search was yesterday.";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function main(): void {
  const line = LINE.trim();

  // Gate the line the same way the sealed scorer does: UTF-8 text of
  // 1 to 200 characters, not only white space, a single sentence.
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `line must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (!/\S/.test(line)) {
    throw new Error("line must not be only white space");
  }
  if ((line.match(/[.!?]/g) ?? []).length !== 1) {
    throw new Error("line must be exactly one sentence");
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  // No trailing newline: the file holds exactly the sentence.
  writeFileSync(OUT_PATH, line, "utf8");
  console.log(`wrote ${line.length} characters to ${OUT_PATH}`);
}

main();
