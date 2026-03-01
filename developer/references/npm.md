# npm — Package Management

## Install

```bash
npm install                          # install all dependencies
npm install express                  # add a package
npm install -D typescript            # dev dependency
npm install -g typescript            # global
npm install lodash@4.17.21           # exact version
```

## Remove

```bash
npm uninstall express
npm uninstall -g typescript
```

## Run scripts

```bash
npm run build
npm run test
npm start
npm run dev
```

## Inspect

```bash
npm list --depth=0                   # top-level packages
npm outdated                         # check for updates
npm info lodash version              # package info
```

## Update

```bash
npm update                           # update within semver range
npm update express
npx npm-check-updates -u && npm install   # upgrade to latest
```

## Publish

```bash
npm login
npm publish
npm publish --access public          # scoped packages
npm version patch                    # 1.0.0 → 1.0.1
npm version minor                    # 1.0.0 → 1.1.0
npm version major                    # 1.0.0 → 2.0.0
```

## Workspaces

```bash
npm run build -w packages/core
npm run build --workspaces --if-present
npm install lodash -w packages/core
```

## Useful flags

```bash
--save-exact          # pin exact version
--legacy-peer-deps    # skip peer dep checks
--prefer-offline      # use cache when possible
```
