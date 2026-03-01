---
name: developer
description: Developer toolkit — git, shell, curl, npm, jq, docker, python, ssh, make, and more. Common operations for version control, scripting, HTTP, package management, JSON processing, and containers.
requires: bin:git,bin:npm,bin:jq,bin:docker,bin:curl,bin:python3
tags: developer,git,shell,npm,jq,docker,curl,python,ssh,make,cli
---

# Developer Skill

A unified skill for everyday developer workflows. Load the relevant reference for the tool you need.

## 🚨 CRITICAL — Confirm before executing

**IMPORTANT: Some operations are irreversible or expose sensitive data. You MUST pause and explicitly confirm with the user before running any of the following:**

- `git push --force` / `git reset --hard` / `git branch -D` — destructive git ops
- `docker system prune -a` / `docker volume prune` — data loss
- `rm -rf` — permanent file deletion
- Any command that writes to production servers or databases
- Commands involving secrets, API keys, tokens, or credentials
- `ssh` commands that modify remote server state
- `sed -i` / `awk` rewrites on files that haven't been backed up
- `openssl` operations on private keys or production certificates

**When in doubt, show the command and ask before running it.**

---

## Tools & references

| Tool | Purpose | Reference |
|---|---|---|
| git | Version control — commits, branches, remotes, history | `references/git.md` |
| shell | Bash scripting — files, loops, pipes, cron | `references/shell.md` |
| curl | HTTP requests — GET/POST, auth, download, debug | `references/curl.md` |
| npm | Node packages — install, run, publish, workspaces | `references/npm.md` |
| jq | JSON processing — filter, transform, query | `references/jq.md` |
| docker | Containers — build, run, compose, debug | `references/docker.md` |
| python | Scripting — files, HTTP, CSV, JSON, subprocess | `references/python.md` |
| ssh | Remote access — connect, keys, SCP, port forward | `references/ssh.md` |
| env | Environment variables — .env files, secrets | `references/env.md` |
| make | Build automation — Makefile targets and patterns | `references/make.md` |
| text | Text processing — grep, sed, awk | `references/text.md` |
| openssl | Crypto — certs, hashing, base64, random secrets | `references/openssl.md` |

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

### Fetch an API and process the response

```bash
curl -s https://api.example.com/data \
  | jq '[.[] | select(.active) | {id, name}]'
```

### Build and ship with Docker

```bash
npm run build
docker build -t my-app .
docker run -p 3000:3000 my-app
```

### Deploy to a remote server

```bash
# ⚠ Confirm target server and path with user before running
rsync -avz ./dist/ user@host:/var/www/
ssh user@host "systemctl restart my-app"
```
