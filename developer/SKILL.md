---
name: developer
description: Developer toolkit — git, shell, npm, jq, and docker. Common operations for version control, scripting, package management, JSON processing, and containers.
requires: bin:git,bin:npm,bin:jq,bin:docker
tags: developer,git,shell,npm,jq,docker,cli
---

# Dev Skill

A unified skill for everyday developer workflows. Load the relevant reference for the tool you need.

## Tools & references

| Tool | Purpose | Reference |
|---|---|---|
| git | Version control — commits, branches, remotes, history | `references/git.md` |
| shell | Bash scripting — files, loops, pipes, cron | `references/shell.md` |
| npm | Node packages — install, run, publish, workspaces | `references/npm.md` |
| jq | JSON processing — filter, transform, query | `references/jq.md` |
| docker | Containers — build, run, compose, debug | `references/docker.md` |

## Preflight

Check which tools are available before proceeding:

```bash
git --version
node --version && npm --version
jq --version
docker --version
```

If any tool is missing, load `references/install.md`.

## Common cross-tool workflows

### Set up a new project

```bash
mkdir my-project && cd my-project
git init
npm init -y
echo "node_modules/" > .gitignore
git add . && git commit -m "chore: init project"
```

### Inspect a JSON API response and process it

```bash
curl -s https://api.example.com/data \
  | jq '[.[] | select(.active) | {id, name}]'
```

### Run, build, and ship with Docker

```bash
npm run build
docker build -t my-app .
docker run -p 3000:3000 my-app
```

### Check git status before committing

```bash
git status
git diff
npm test
git add -p && git commit -m "feat: ..."
```
