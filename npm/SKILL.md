---
name: npm
description: Manage Node.js packages and run scripts with npm. Use for installing dependencies, running scripts, publishing packages, and managing package.json.
requires: bin:npm
tags: node,npm,javascript
---

# npm Skill

## Preflight

```bash
npm --version
```

## Installing packages

```bash
# Install all dependencies
npm install

# Add a package
npm install express
npm install -D typescript        # dev dependency
npm install -g typescript        # global

# Install exact version
npm install lodash@4.17.21
```

## Removing packages

```bash
npm uninstall express
npm uninstall -g typescript
```

## Running scripts

```bash
npm run build
npm run test
npm start
npm run dev
```

## Inspecting packages

```bash
# List installed packages
npm list
npm list --depth=0              # top-level only

# Check for outdated packages
npm outdated

# View package info
npm info lodash
npm info lodash version
```

## Updating packages

```bash
# Update all to latest allowed by semver
npm update

# Update a specific package
npm update express

# Upgrade to latest (ignores semver)
npx npm-check-updates -u && npm install
```

## Publishing

```bash
# Login
npm login

# Publish
npm publish
npm publish --access public     # scoped packages

# Bump version
npm version patch               # 1.0.0 → 1.0.1
npm version minor               # 1.0.0 → 1.1.0
npm version major               # 1.0.0 → 2.0.0
```

## Workspaces

```bash
# Run command in a specific workspace
npm run build -w packages/core

# Run in all workspaces
npm run build --workspaces --if-present

# Install package into a workspace
npm install lodash -w packages/core
```

## Useful flags

```bash
--save-exact                    # pin exact version
--legacy-peer-deps              # skip peer dep checks
--prefer-offline                # use cache when possible
```
