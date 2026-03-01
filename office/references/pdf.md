# PDF — Read, Merge, Split, Extract

Library: `pypdf` (pure Python, no system dependencies)

## Read & extract text

```python
from pypdf import PdfReader

reader = PdfReader('document.pdf')
print(f'Pages: {len(reader.pages)}')

# All text
for page in reader.pages:
    print(page.extract_text())

# Specific page
text = reader.pages[0].extract_text()

# Metadata
print(reader.metadata.title)
print(reader.metadata.author)
```

## Merge PDFs

```python
from pypdf import PdfWriter

writer = PdfWriter()

for path in ['intro.pdf', 'chapter1.pdf', 'chapter2.pdf', 'appendix.pdf']:
    writer.append(path)

with open('merged.pdf', 'wb') as f:
    writer.write(f)
```

## Split a PDF

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader('document.pdf')

# Extract a range of pages (e.g., pages 2–5)
writer = PdfWriter()
for page in reader.pages[1:5]:           # 0-indexed
    writer.add_page(page)

with open('excerpt.pdf', 'wb') as f:
    writer.write(f)
```

## Split into individual pages

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader('document.pdf')

for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    with open(f'page_{i + 1}.pdf', 'wb') as f:
        writer.write(f)
```

## Rotate pages

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader('document.pdf')
writer = PdfWriter()

for page in reader.pages:
    page.rotate(90)                      # 90, 180, or 270
    writer.add_page(page)

with open('rotated.pdf', 'wb') as f:
    writer.write(f)
```

## Add password protection

```python
from pypdf import PdfWriter

writer = PdfWriter(clone_from='document.pdf')
writer.encrypt('your-password')

with open('protected.pdf', 'wb') as f:
    writer.write(f)
```

## Remove password

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader('protected.pdf')
reader.decrypt('password')

writer = PdfWriter()
writer.clone_reader_document_root(reader)

with open('unlocked.pdf', 'wb') as f:
    writer.write(f)
```

## Compress a PDF

```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader('large.pdf')
writer = PdfWriter()

for page in reader.pages:
    page.compress_content_streams()
    writer.add_page(page)

with open('compressed.pdf', 'wb') as f:
    writer.write(f)
```

## Extract text from all PDFs in a folder

```python
from pypdf import PdfReader
from pathlib import Path

for pdf_path in Path('.').glob('*.pdf'):
    reader = PdfReader(pdf_path)
    text = '\n'.join(page.extract_text() for page in reader.pages)
    Path(pdf_path.stem + '.txt').write_text(text)
    print(f'Extracted: {pdf_path.name}')
```
