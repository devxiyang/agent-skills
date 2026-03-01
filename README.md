# agent-skills

Extended skill collection for AI agents, built on [@devxiyang/agent-skill](https://github.com/devxiyang/agent.skill).

## Skills

<!-- skills-table-start -->
| Skill | Description | Requires |
|---|---|---|
| [excel](./excel/SKILL.md) | Read, write, and transform Excel files (.xlsx, .xls, .csv). Use for extracting data, updating cells, converting formats, and generating reports. | `python3` |
| [ffmpeg](./ffmpeg/SKILL.md) | Process video and audio files with ffmpeg. Use for converting formats, compressing, trimming, extracting audio, resizing, and combining media. | `ffmpeg` |
| [jq](./jq/SKILL.md) | Process and transform JSON data using jq. Use when filtering API responses, extracting fields, reshaping JSON, or querying structured data. | `jq` |
| [npm](./npm/SKILL.md) | Manage Node.js packages and run scripts with npm. Use for installing dependencies, running scripts, publishing packages, and managing package.json. | `npm` |
| [weather](./weather/SKILL.md) | Get current weather and forecasts for any location. No API key required. | `curl` |
<!-- skills-table-end -->

## Usage

### Download (no tools required)

Go to the [Releases](https://github.com/devxiyang/agent-skills/releases/latest) page, download the zip for the skill you want, and extract it into your project.

### CLI (recommended)

Install skills directly into your project:

```bash
# List available skills
npx @devxiyang/agent-skills list

# Add a skill (installs to ./skills/<name>/)
npx @devxiyang/agent-skills add jq

# Add multiple skills
npx @devxiyang/agent-skills add jq npm weather

# Install to a custom directory
npx @devxiyang/agent-skills add jq --dir ./my-skills
```

Skills are copied as folders (including any reference files) into the target directory. If a skill already exists, you will be prompted to confirm before overwriting.

### Programmatic

```ts
import { SkillDiscovery } from '@devxiyang/agent-skill';
import { skillsRoot } from '@devxiyang/agent-skills';

const discovery = new SkillDiscovery([
  { path: skillsRoot(), scope: 'system' },
]);

const skills = await discovery.list();
```

## Contributing

Each skill lives in its own top-level directory with a `SKILL.md` file. See the [skill-creator](https://github.com/devxiyang/agent.skill/tree/main/skills/skill-creator) guide for how to write one.
