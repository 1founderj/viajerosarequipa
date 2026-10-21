import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const locales = Object.fromEntries(
  ['es', 'en', 'fr'].map((language) => [
    language,
    JSON.parse(fs.readFileSync(path.join(root, 'src', 'locales', `${language}.json`), 'utf8')),
  ])
);

function collectStrings(value, prefix = '', result = new Map()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, `${prefix}[${index}]`, result));
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      collectStrings(item, prefix ? `${prefix}.${key}` : key, result);
    }
  } else if (typeof value === 'string') {
    result.set(prefix, value);
  }
  return result;
}

const strings = Object.fromEntries(
  Object.entries(locales).map(([language, data]) => [language, collectStrings(data)])
);
const allKeys = new Set(Object.values(strings).flatMap((entries) => [...entries.keys()]));
let failures = 0;

for (const language of Object.keys(locales)) {
  const missing = [...allKeys].filter((key) => !strings[language].has(key));
  const extra = [...strings[language].keys()].filter((key) => !strings.es.has(key));

  if (missing.length) {
    failures += 1;
    console.error(`${language}: missing keys:\n  ${missing.join('\n  ')}`);
  }
  if (extra.length) {
    failures += 1;
    console.error(`${language}: extra keys compared with es:\n  ${extra.join('\n  ')}`);
  }
}

function sortedTokens(value, pattern) {
  return [...value.matchAll(pattern)].map((match) => match[1]).sort();
}

for (const key of allKeys) {
  const values = Object.fromEntries(
    Object.entries(strings)
      .filter(([, entries]) => entries.has(key))
      .map(([language, entries]) => [language, entries.get(key)])
  );
  if (Object.keys(values).length !== Object.keys(locales).length) continue;

  const variables = Object.fromEntries(
    Object.entries(values).map(([language, value]) => [
      language,
      sortedTokens(value, /\{\{\s*([^{}]+?)\s*\}\}/g),
    ])
  );
  const tags = Object.fromEntries(
    Object.entries(values).map(([language, value]) => [
      language,
      sortedTokens(value, /<\/?([A-Za-z][\w:-]*)\b[^>]*>/g),
    ])
  );

  if (new Set(Object.values(variables).map(JSON.stringify)).size > 1) {
    failures += 1;
    console.error(`Placeholder mismatch at ${key}: ${JSON.stringify(variables)}`);
  }
  if (new Set(Object.values(tags).map(JSON.stringify)).size > 1) {
    failures += 1;
    console.error(`HTML tag mismatch at ${key}: ${JSON.stringify(tags)}`);
  }
}

if (failures) {
  console.error(`i18n check failed with ${failures} issue(s).`);
  process.exitCode = 1;
} else {
  console.log(`i18n check passed: ${allKeys.size} matching string keys in es, en, and fr.`);
}
