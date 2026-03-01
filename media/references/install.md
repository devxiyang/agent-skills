# Installing Media Tools

## ffmpeg

### macOS
```bash
brew install ffmpeg
```

### Windows
```powershell
winget install Gyan.FFmpeg
```
Or download from https://ffmpeg.org/download.html, extract, add `bin/` to PATH.

### Linux
```bash
sudo apt install ffmpeg        # Debian/Ubuntu
sudo dnf install ffmpeg        # Fedora
sudo pacman -S ffmpeg          # Arch
```

---

## ImageMagick

### macOS
```bash
brew install imagemagick
```

### Windows
```powershell
winget install ImageMagick.ImageMagick
```
Or download installer from https://imagemagick.org/script/download.php

### Linux
```bash
sudo apt install imagemagick        # Debian/Ubuntu
sudo dnf install imagemagick        # Fedora
sudo pacman -S imagemagick          # Arch
```

Verify: `magick --version`

> Note: on older ImageMagick installs (v6), use `convert` instead of `magick`.
