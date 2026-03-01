# env — Environment Variables & Secrets

> 🚨 **CRITICAL — Secrets handling:** **NEVER print, log, or expose API keys, tokens, or passwords in full.** Do not commit `.env` files to version control. When debugging, always mask values: `${API_KEY:0:4}...`. Treat all env secrets as sensitive data.

## Read and set variables

```bash
echo $HOME                           # read a variable
export MY_VAR=value                  # set for current session and subprocesses
MY_VAR=value command                 # set only for one command
unset MY_VAR                         # remove a variable
env                                  # list all environment variables
printenv MY_VAR                      # print a specific variable
```

## .env files

Standard `.env` format:

```bash
# .env
DATABASE_URL=postgres://user:pass@localhost:5432/mydb
API_KEY=sk-abc123
NODE_ENV=production
PORT=3000
```

Load `.env` in shell:

```bash
# Export all variables from .env
export $(grep -v '^#' .env | xargs)

# Or use dotenv CLI
npx dotenv -e .env -- node server.js
```

Load in Node.js:

```js
// Built-in (Node 20.6+)
node --env-file=.env server.js

// With dotenv package
import 'dotenv/config';
```

Load in Python:

```python
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('API_KEY')
```

## Best practices

```bash
# Never commit .env
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# Commit a .env.example with placeholder values
cp .env .env.example
# Then replace real values with placeholders in .env.example
```

## Multiple environments

```bash
.env                # default / local
.env.development    # development overrides
.env.production     # production overrides
.env.test           # test overrides
.env.local          # personal overrides (never commit)
```

## Check required variables in shell scripts

```bash
#!/usr/bin/env bash
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL is required}"
: "${API_KEY:?API_KEY is required}"

echo "All required env vars present"
```

## Check required variables in Node.js

```js
const required = ['DATABASE_URL', 'API_KEY', 'PORT'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required env var: ${key}`);
    process.exit(1);
  }
}
```

## Useful patterns

```bash
# Default value
DB_HOST=${DB_HOST:-localhost}

# Different values per environment
if [ "$NODE_ENV" = "production" ]; then
  DB_HOST=prod-db.example.com
else
  DB_HOST=localhost
fi

# Mask secrets in logs
echo "API_KEY=${API_KEY:0:4}..."
```
