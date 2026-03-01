# Format Conversion

Convert between office formats using **LibreOffice headless** — no Microsoft Office needed.

## Preflight

```bash
libreoffice --version
# or
soffice --version
```

If missing, load `references/install.md`.

## Any office format → PDF

```bash
# Word → PDF
libreoffice --headless --convert-to pdf report.docx

# Excel → PDF
libreoffice --headless --convert-to pdf data.xlsx

# PowerPoint → PDF
libreoffice --headless --convert-to pdf deck.pptx

# Output to a specific directory
libreoffice --headless --convert-to pdf --outdir ./output/ report.docx
```

## PDF → Word

```bash
libreoffice --headless --convert-to docx document.pdf
```

Note: layout fidelity varies. Works best on text-heavy PDFs.

## Word ↔ Other formats

```bash
# docx → odt (OpenDocument)
libreoffice --headless --convert-to odt report.docx

# odt → docx
libreoffice --headless --convert-to docx report.odt

# docx → txt
libreoffice --headless --convert-to txt report.docx

# docx → html
libreoffice --headless --convert-to html report.docx
```

## Excel ↔ Other formats

```bash
# xlsx → csv
libreoffice --headless --convert-to csv data.xlsx

# xlsx → ods (OpenDocument Spreadsheet)
libreoffice --headless --convert-to ods data.xlsx

# csv → xlsx
libreoffice --headless --convert-to xlsx data.csv
```

## PowerPoint ↔ Other formats

```bash
# pptx → odp (OpenDocument Presentation)
libreoffice --headless --convert-to odp deck.pptx

# pptx → png (one image per slide)
libreoffice --headless --convert-to png deck.pptx
```

## Batch conversion

```bash
# Convert all .docx to PDF
libreoffice --headless --convert-to pdf *.docx

# Convert all files in a folder
libreoffice --headless --convert-to pdf --outdir ./pdf/ ./docs/*.docx
```

## Python subprocess wrapper

```python
import subprocess
from pathlib import Path

def convert(input_path: str, to_format: str, outdir: str = '.') -> str:
    Path(outdir).mkdir(parents=True, exist_ok=True)
    subprocess.run([
        'libreoffice', '--headless',
        '--convert-to', to_format,
        '--outdir', outdir,
        input_path,
    ], check=True)
    stem = Path(input_path).stem
    return str(Path(outdir) / f'{stem}.{to_format}')

# Usage
convert('report.docx', 'pdf', outdir='./output')
convert('data.xlsx', 'csv', outdir='./output')
```
