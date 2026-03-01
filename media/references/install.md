# Installing ffmpeg

## macOS

```bash
brew install ffmpeg
```

## Windows

If winget is available:

```powershell
winget install Gyan.FFmpeg
```

Or download a build from https://ffmpeg.org/download.html, extract it, and add the `bin/` folder to PATH.

If Chocolatey is available:

```powershell
choco install ffmpeg
```

## Linux

```bash
# Debian/Ubuntu
sudo apt install ffmpeg

# Fedora
sudo dnf install ffmpeg

# Arch
sudo pacman -S ffmpeg
```
