import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Returns the absolute path to the agent-skills root directory, which contains
 * all skill subfolders directly (flat layout).
 *
 * Pass the result to SkillDiscovery from @devxiyang/agent-skill:
 *
 * ```ts
 * import { SkillDiscovery } from '@devxiyang/agent-skill';
 * import { skillsRoot } from '@devxiyang/agent-skills';
 *
 * new SkillDiscovery([
 *   { path: skillsRoot(), scope: 'system' },
 * ])
 * ```
 */
export function skillsRoot(): string {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(dir, '..');
}
