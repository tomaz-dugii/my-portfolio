/**
 * One-off / maintenance: read src/i18n/ui.ts and write docs/site-copy-review.md
 * Run: node scripts/build-site-copy-review.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const uiPath = path.join(root, 'src/i18n/ui.ts');

function parseStringLine(line) {
  const t = line.trim();
  if (!t) return { rest: null, done: true };
  const q = t[0];
  if (q !== "'" && q !== '"') return { error: 'expected string' };
  let i = 1;
  let out = '';
  while (i < t.length) {
    const c = t[i];
    if (c === '\\') {
      const n = t[i + 1];
      if (n === 'n') {
        out += '\n';
        i += 2;
        continue;
      }
      if (n === 'r') {
        out += '\r';
        i += 2;
        continue;
      }
      if (n === 't') {
        out += '\t';
        i += 2;
        continue;
      }
      if (n) {
        out += n;
        i += 2;
        continue;
      }
    }
    if (c === q) {
      return { value: out, rest: t.slice(i + 1) };
    }
    out += c;
    i++;
  }
  return { error: 'unterminated string' };
}

function parseEntries(lines, startIdx) {
  const entries = [];
  let i = startIdx;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed === '},' || /^\}\s*as const/.test(trimmed)) {
      break;
    }
    if (trimmed.startsWith('//') || !trimmed) {
      i++;
      continue;
    }
    const m = line.match(/^(\s*)'((?:\\.|[^'\\])*)':\s*(.*)$/);
    if (!m) {
      i++;
      continue;
    }
    const key = m[2].replace(/\\(.)/g, (_, x) => x);
    let rest = m[3].trim();

    if (rest === '' || rest === ',') {
      i++;
      if (i >= lines.length) break;
      const valLine = lines[i];
      rest = valLine.trim();
    }

    const parsed = parseStringLine(rest);
    if (parsed.error) {
      throw new Error(`parse error at key ${key}: ${parsed.error} line: ${rest.slice(0, 80)}`);
    }
    if (parsed.value === undefined) {
      i++;
      continue;
    }
    const trailing = (parsed.rest || '').trim();
    if (trailing && trailing !== ',') {
      throw new Error(`trailing after string for ${key}: ${trailing}`);
    }
    entries.push([key, parsed.value]);
    i++;
  }
  return { entries, endIdx: i };
}

function findBlock(lines, label) {
  const startLine = lines.findIndex((l) => l.match(new RegExp(`^\\s*${label}:\\s*\\{\\s*`)));
  if (startLine < 0) throw new Error(`Block ${label} not found`);
  return startLine + 1;
}

function main() {
  const text = fs.readFileSync(uiPath, 'utf8');
  const lines = text.split(/\r?\n/);
  const enStart = findBlock(lines, 'en');
  const slStart = findBlock(lines, 'sl');
  const en = parseEntries(lines, enStart);
  const sl = parseEntries(lines, slStart);
  if (en.entries.length !== sl.entries.length) {
    throw new Error(`Mismatched count: en ${en.entries.length} vs sl ${sl.entries.length}`);
  }
  for (let k = 0; k < en.entries.length; k++) {
    if (en.entries[k][0] !== sl.entries[k][0]) {
      throw new Error(
        `Key mismatch at ${k}: ${en.entries[k][0]} vs ${sl.entries[k][0]}`
      );
    }
  }

  const sectionTitle = (name) => `\n## ${name}\n\n`;
  const entryBlock = (key, enVal, slVal) => {
    return (
      `### \`${key}\`\n\n` +
      `**English**  \n` +
      `${enVal}\n\n` +
      `**Slovenian**  \n` +
      `${slVal}\n\n` +
      `---\n\n`
    );
  };

  const keys = en.entries.map((e) => e[0]);
  const bySection = (pred) => en.entries.map((e, i) => [e[0], e[1], sl.entries[i][1]]).filter((x) => pred(x[0]));

  let out = '';
  out += `# Site copy (review file)\n\n`;
  out += `This file is the **bilingual copy review** source for the portfolio site. `;
  out += `Strings are defined in [src/i18n/ui.ts](../src/i18n/ui.ts). `;
  out += `Edit **only** the text under *English* and *Slovenian* here; keep keys and section headers unchanged. `;
  out += `After your edits, run the sync step (see *Syncing back to* \`ui.ts\` below) to apply changes to the code.\n\n`;
  out += `---\n\n`;

  out += sectionTitle('Navigation');
  for (const [k, ev, sv] of bySection((key) => key.startsWith('nav.'))) {
    out += entryBlock(k, ev, sv);
  }
  out += sectionTitle('Hero');
  for (const [k, ev, sv] of bySection((key) => key.startsWith('hero.'))) {
    out += entryBlock(k, ev, sv);
  }
  out += sectionTitle('CTA');
  for (const [k, ev, sv] of bySection((key) => key.startsWith('cta.'))) {
    out += entryBlock(k, ev, sv);
  }
  out += sectionTitle('Experience');
  for (const [k, ev, sv] of bySection((key) => key.startsWith('experience.'))) {
    out += entryBlock(k, ev, sv);
  }
  out += sectionTitle('Portfolio');
  for (const [k, ev, sv] of bySection((key) => key.startsWith('portfolio.'))) {
    out += entryBlock(k, ev, sv);
  }
  out += sectionTitle('Travel');
  for (const [k, ev, sv] of bySection((key) => key.startsWith('travel.'))) {
    out += entryBlock(k, ev, sv);
  }

  // Verify we emitted every key once (key headings only, before sync section)
  const emitted = (out.match(/### `[^`]+`/g) || []).length;
  if (emitted !== keys.length) {
    throw new Error(`Emitted ${emitted} blocks but expected ${keys.length} keys`);
  }

  out += `## Syncing back to \`ui.ts\`\n\n`;
  out += `### Format this file must keep\n\n`;
  out +=
    '1. **Block shape:** follow the same pattern as the blocks in this file: a level-3 heading with the key in backticks, then **English** and **Slovenian** lines, each of those two labels ending with two spaces so the value starts on the line below.\n';
  out += `2. **Do not** rename or remove keys, do not change heading levels, and do not merge or split blocks.\n`;
  out += `3. **Allowed edits:** only the value text under **English** and **Slovenian** (including newlines and punctuation).\n\n`;
  out += `### Applying updates from this file\n\n`;
  out += `1. Match by **exact** key: the backtick name in each \`###\` line must match \`ui.ts\` (e.g. \`nav.home\`).\n`;
  out += `2. Update only the \`en\` and \`sl\` string values in \`ui.ts\` for keys that you changed in the markdown. Leave unrelated keys in \`ui.ts\` as they are.\n`;
  out += `3. Preserve the existing \`ui.ts\` structure: \`as const\`, same key order, and section comments (e.g. \`// Navigation\`)—only replace string literals as needed.\n`;
  out += `4. When writing TypeScript, escape the string correctly (single-quoted with \`\\'\` for apostrophes, or use double-quoted string literals for copy that contains apostrophes). Mirror the style used for each key in \`ui.ts\` today.\n`;
  out += `5. After changes, run the project format/lint and a quick build: \`npm run build\`.\n\n`;
  out += `### Regenerating this file from \`ui.ts\`\n\n`;
  out += `If \`ui.ts\` is updated directly and this review file should be refreshed, run from the project root:\n\n`;
  out += '```\n';
  out += 'node scripts/build-site-copy-review.mjs\n';
  out += '```\n\n';
  out += `That script rewrites \`docs/site-copy-review.md\` from the current \`en\` / \`sl\` object entries (same key order and section grouping).\n`;

  const docsDir = path.join(root, 'docs');
  fs.mkdirSync(docsDir, { recursive: true });
  const outPath = path.join(docsDir, 'site-copy-review.md');
  fs.writeFileSync(outPath, out, 'utf8');
  console.log(`Wrote ${outPath}`);
}

main();
