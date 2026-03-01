#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx !== -1) fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return fm;
}

function formatRequires(requires) {
  if (!requires || requires === '—') return '—';
  return requires.split(',').map(r => `\`${r.trim().replace('bin:', '')}\``).join(', ');
}

const skills = readdirSync(root)
  .filter(name => {
    const dir = path.join(root, name);
    return statSync(dir).isDirectory() && existsSync(path.join(dir, 'SKILL.md'));
  })
  .map(name => {
    const content = readFileSync(path.join(root, name, 'SKILL.md'), 'utf-8');
    const fm = parseFrontmatter(content);
    return { name, description: fm.description ?? '', requires: fm.requires ?? '—' };
  });

const table = [
  '| Skill | Description | Requires |',
  '|---|---|---|',
  ...skills.map(s => `| [${s.name}](./${s.name}/SKILL.md) | ${s.description} | ${formatRequires(s.requires)} |`),
].join('\n');

const readmePath = path.join(root, 'README.md');
const readme = readFileSync(readmePath, 'utf-8');
const updated = readme.replace(
  /<!-- skills-table-start -->[\s\S]*?<!-- skills-table-end -->/,
  `<!-- skills-table-start -->\n${table}\n<!-- skills-table-end -->`,
);

if (updated === readme) {
  console.log('README.md unchanged');
} else {
  writeFileSync(readmePath, updated);
  console.log('README.md updated');
}
