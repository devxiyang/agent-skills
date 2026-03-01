# ssh — Remote Access

> 🚨 **CRITICAL — MUST confirm with user before running:** Any command that writes to, restarts, or modifies a remote server. **Always state the target host and exact action, and wait for explicit approval.** Remote operations are difficult or impossible to undo.

## Connect

```bash
ssh user@host
ssh user@host -p 2222               # custom port
ssh -i ~/.ssh/id_rsa user@host      # specific key
ssh -v user@host                    # verbose (debug)
```

## Key management

```bash
# Generate a key pair
ssh-keygen -t ed25519 -C "your@email.com"
ssh-keygen -t rsa -b 4096 -C "your@email.com"

# Copy public key to server
ssh-copy-id user@host

# Manual copy (if ssh-copy-id not available)
cat ~/.ssh/id_ed25519.pub | ssh user@host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# List loaded keys
ssh-add -l

# Add key to agent
ssh-add ~/.ssh/id_ed25519
```

## Config file (`~/.ssh/config`)

```
# Simple alias
Host myserver
    HostName 192.168.1.100
    User alice
    Port 2222
    IdentityFile ~/.ssh/id_ed25519

# Jump host (bastion)
Host internal
    HostName 10.0.0.5
    User bob
    ProxyJump myserver
```

Then connect with just: `ssh myserver`

## File transfer

```bash
# Upload file
scp file.txt user@host:/remote/path/

# Upload directory
scp -r ./dist user@host:/var/www/

# Download file
scp user@host:/remote/file.txt ./

# rsync (faster, resumable, only transfers changes)
rsync -avz ./dist/ user@host:/var/www/
rsync -avz --delete ./dist/ user@host:/var/www/   # mirror
```

## Port forwarding

```bash
# Local forward: access remote service locally
# Access remote DB (port 5432) at localhost:5433
ssh -L 5433:localhost:5432 user@host

# Remote forward: expose local port to remote server
ssh -R 8080:localhost:3000 user@host

# Dynamic (SOCKS proxy)
ssh -D 1080 user@host
```

## Run remote commands

```bash
# Single command
ssh user@host "ls -la /var/www"

# Multiple commands
ssh user@host "cd /app && git pull && npm run build"

# Run local script on remote
ssh user@host < deploy.sh
```

## Troubleshooting

```bash
# Test connection
ssh -v user@host

# Check server key
ssh-keyscan host >> ~/.ssh/known_hosts

# Fix permissions (common cause of auth failures)
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/authorized_keys
```
