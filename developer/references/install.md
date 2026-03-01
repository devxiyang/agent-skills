# Installing Developer Tools

## git

### macOS
```bash
brew install git
```
Or install Xcode Command Line Tools: `xcode-select --install`

### Windows
Download from https://git-scm.com/download/win

### Linux
```bash
sudo apt install git        # Debian/Ubuntu
sudo dnf install git        # Fedora
sudo pacman -S git          # Arch
```

---

## Node.js & npm

Use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install latest LTS
nvm install --lts
nvm use --lts
```

Or download directly from https://nodejs.org

---

## jq

### macOS
```bash
brew install jq
```

### Windows
```powershell
winget install jqlang.jq
```

### Linux
```bash
sudo apt install jq         # Debian/Ubuntu
sudo dnf install jq         # Fedora
sudo pacman -S jq           # Arch
```

---

## Docker

### macOS / Windows
Download Docker Desktop: https://www.docker.com/products/docker-desktop

### Linux
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # run without sudo
```
