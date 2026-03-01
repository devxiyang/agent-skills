# Installing Office Dependencies

## Python libraries

```bash
pip install openpyxl pandas python-docx python-pptx pypdf
```

## LibreOffice (for format conversion)

### macOS
```bash
brew install --cask libreoffice
```

### Windows
Download from https://www.libreoffice.org/download/

### Linux
```bash
sudo apt install libreoffice        # Debian/Ubuntu
sudo dnf install libreoffice        # Fedora
sudo pacman -S libreoffice-fresh    # Arch
```

Verify: `libreoffice --version`
