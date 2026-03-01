#!/usr/bin/env node
import { createInterface } from 'node:readline';
import { existsSync, mkdirSync, cpSync, readdirSync, statSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseDescription(skillDir: string): string {
  const skillFile = path.join(skillDir, 'SKILL.md');
  const content = readFileSync(skillFile, 'utf-8');
  const match = content.match(/^description:\s*(.+)$/m);
  return match ? match[1].trim() : '';
}

function getAvailableSkills(): Array<{ name: string; description: string }> {
  return readdirSync(pkgRoot)
    .filter(name => {
      const dir = path.join(pkgRoot, name);
      return statSync(dir).isDirectory() && existsSync(path.join(dir, 'SKILL.md'));
    })
    .map(name => ({ name, description: parseDescription(path.join(pkgRoot, name)) }));
}

async function confirm(message: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(`${message} (y/N) `, answer => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

async function addSkill(name: string, targetDir: string): Promise<void> {
  const srcPath = path.join(pkgRoot, name);
  if (!existsSync(srcPath) || !existsSync(path.join(srcPath, 'SKILL.md'))) {
    console.error(`✗ Skill "${name}" not found. Run "list" to see available skills.`);
    return;
  }

  const destPath = path.join(targetDir, name);
  if (existsSync(destPath)) {
    console.warn(`⚠  "${name}" already exists at ${destPath}`);
    const ok = await confirm('Overwrite?');
    if (!ok) {
      console.log(`Skipped ${name}.`);
      return;
    }
  }

  mkdirSync(targetDir, { recursive: true });
  cpSync(srcPath, destPath, { recursive: true });
  console.log(`✓ ${name} → ${destPath}`);
}

function listSkills(): void {
  const skills = getAvailableSkills();
  console.log('Available skills:\n');
  for (const { name, description } of skills) {
    console.log(`  ${name.padEnd(12)} ${description}`);
  }
}

function printUsage(): void {
  console.log('Usage:');
  console.log('  agent-skills add <skill...> [--dir <path>]');
  console.log('  agent-skills list');
  console.log('');
  console.log('Default dir: ./skills');
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'list') {
    listSkills();
    return;
  }

  if (command === 'add') {
    const dirIndex = args.indexOf('--dir');
    const targetDir = dirIndex !== -1 ? args[dirIndex + 1] : './skills';
    const skillNames = args
      .slice(1)
      .filter((a, i) => !a.startsWith('--') && i !== dirIndex);

    if (skillNames.length === 0) {
      console.error('Error: specify at least one skill name.');
      printUsage();
      process.exit(1);
    }

    for (const name of skillNames) {
      await addSkill(name, targetDir);
    }
    return;
  }

  printUsage();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
