/**
 * Apply docs/site-copy-review.md EN/SL values into src/i18n/ui.ts.
 * Run: node scripts/sync-site-copy-from-review.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const uiPath = path.join(root, 'src/i18n/ui.ts');
const mdPath = path.join(root, 'docs/site-copy-review.md');

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

function parseReviewMd(content) {
  const endIdx = content.indexOf('## Syncing back');
  const body = endIdx >= 0 ? content.slice(0, endIdx) : content;
  const en = new Map();
  const sl = new Map();
  const keys = [];
  const keyRe = /^### `([^`]+)`\s*$/gm;
  let km;
  while ((km = keyRe.exec(body)) !== null) {
    const key = km[1];
    const start = km.index + km[0].length;
    const nextRe = /^### `/gm;
    nextRe.lastIndex = start;
    const nextKm = nextRe.exec(body);
    const end = nextKm ? nextKm.index : body.length;
    const block = body.slice(start, end);
    const enM = block.match(/\*\*English\*\*\s*\n([\s\S]*?)(?=\n\*\*Slovenian\*\*)/);
    const slM = block.match(
      /\*\*Slovenian\*\*\s*\n([\s\S]*?)(?=\n\n---|\n### |\n## |$)/
    );
    if (!enM || !slM) {
      throw new Error(`Missing **English** / **Slovenian** for key ${key}`);
    }
    keys.push(key);
    en.set(key, enM[1].replace(/\r\n/g, '\n').trimEnd());
    sl.set(key, slM[1].replace(/\r\n/g, '\n').trimEnd());
  }
  return { en, sl, keys };
}

/** Prefer single quotes; use double when the string contains an apostrophe. */
function tsStringLiteral(s) {
  if (s.includes("'")) {
    const escaped = s
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
    return `"${escaped}"`;
  }
  const escaped = s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
  return `'${escaped}'`;
}

function formatEntry(key, value, indent) {
  const lit = tsStringLiteral(value);
  const keyLine = `${indent}'${key.replace(/'/g, "\\'")}':`;
  if (lit.length <= 92 && !value.includes('\n')) {
    return `${keyLine} ${lit},`;
  }
  return `${keyLine}\n${indent}  ${lit},`;
}

function replaceLocaleBlock(tsText, label, uiKeys, valueMap) {
  const lines = tsText.split(/\r?\n/);
  const start = findBlock(lines, label);
  const { entries: oldEntries, endIdx } = parseEntries(lines, start);
  if (oldEntries.length !== uiKeys.length) {
    throw new Error(`${label}: entry count mismatch`);
  }
  for (let i = 0; i < uiKeys.length; i++) {
    if (oldEntries[i][0] !== uiKeys[i]) {
      throw new Error(`${label}: key order mismatch at ${i}: ${oldEntries[i][0]} vs ${uiKeys[i]}`);
    }
  }

  const indent = '    ';
  const newLines = [];
  let i = start;
  while (i < endIdx) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || !trimmed) {
      newLines.push(line);
      i++;
      continue;
    }
    const m = line.match(/^(\s*)'((?:\\.|[^'\\])*)':\s*(.*)$/);
    if (!m) {
      newLines.push(line);
      i++;
      continue;
    }
    const key = m[2].replace(/\\(.)/g, (_, x) => x);
    let rest = m[3].trim();
    if (rest === '' || rest === ',') {
      i += 2;
    } else {
      i += 1;
    }
    const val = valueMap.get(key);
    if (val === undefined) {
      throw new Error(`No markdown value for key ${key}`);
    }
    newLines.push(formatEntry(key, val, indent));
  }
  return [...lines.slice(0, start), ...newLines, ...lines.slice(endIdx)].join('\n');
}

function main() {
  const md = fs.readFileSync(mdPath, 'utf8');
  const { en: enMap, sl: slMap, keys: mdKeys } = parseReviewMd(md);

  let tsText = fs.readFileSync(uiPath, 'utf8');
  const lines = tsText.split(/\r?\n/);
  const enStart = findBlock(lines, 'en');
  const enParsed = parseEntries(lines, enStart);
  const uiKeys = enParsed.entries.map((e) => e[0]);

  if (mdKeys.length !== uiKeys.length) {
    throw new Error(`Key count: markdown ${mdKeys.length} vs ui.ts ${uiKeys.length}`);
  }
  for (let i = 0; i < uiKeys.length; i++) {
    if (mdKeys[i] !== uiKeys[i]) {
      throw new Error(`Key mismatch at ${i}: md=${mdKeys[i]} ui=${uiKeys[i]}`);
    }
  }

  tsText = replaceLocaleBlock(tsText, 'en', uiKeys, enMap);
  tsText = replaceLocaleBlock(tsText, 'sl', uiKeys, slMap);

  fs.writeFileSync(uiPath, tsText, 'utf8');
  console.log(`Updated ${uiPath} from ${mdPath} (${uiKeys.length} keys)`);
}

main();
