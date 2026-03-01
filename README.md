# agent-skills

Extended skill collection for AI agents, built on [@devxiyang/agent-skill](https://github.com/devxiyang/agent.skill).

## Skills

<!-- skills-table-start -->
| Skill | Description | Requires |
|---|---|---|
| [developer](./developer/SKILL.md) | Developer toolkit — git, shell, curl, npm, jq, docker, python, ssh, make, and more. Common operations for version control, scripting, HTTP, package management, JSON processing, and containers. | `git`, `npm`, `jq`, `docker`, `curl`, `python3` |
| [media](./media/SKILL.md) | Process image, video, and audio files locally. Powered by ImageMagick (images) and ffmpeg (video/audio) — convert, compress, edit, and batch process media files. | `ffmpeg`, `magick` |
| [office](./office/SKILL.md) | Create, read, and transform office documents — Excel spreadsheets, Word documents, PowerPoint presentations, and PDFs. Powered by Python. | `python3` |
| [web-ppt](./web-ppt/SKILL.md) | Create presentation slides as a single self-contained HTML file with no dependencies. Pure HTML, CSS, and minimal JavaScript — keyboard navigation, smooth transitions, multiple layouts, and easy theming. | — |
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
