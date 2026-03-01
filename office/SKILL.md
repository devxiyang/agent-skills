---
name: office
description: Create, read, and transform office documents — Excel spreadsheets, Word documents, PowerPoint presentations, and PDFs. Powered by Python.
requires: bin:python3
tags: office,excel,word,ppt,pdf,docx,xlsx,python
---

# Office Skill

Covers the full office document stack using Python libraries. No Microsoft Office required.

## Preflight

```bash
python3 -c "import openpyxl, pandas, docx, pptx, pypdf; print('ok')"
```

If missing, load `references/install.md`.

## Tools & references

| Format | Purpose | Reference |
|---|---|---|
| Excel (.xlsx) | Read, write, filter, transform spreadsheets | `references/excel.md` |
| Word (.docx) | Create, read, modify documents | `references/word.md` |
| PowerPoint (.pptx) | Create, read, modify presentations | `references/ppt.md` |
| PDF | Merge, split, extract text, compress | `references/pdf.md` |
| Convert | Convert between formats via LibreOffice | `references/convert.md` |

## Common workflows

### Excel → PDF report

```python
# Generate Excel report, then convert to PDF
# Step 1: create Excel (see references/excel.md)
# Step 2: convert to PDF (see references/convert.md)
```

### Word template → filled document

```python
from docx import Document

doc = Document('template.docx')
for para in doc.paragraphs:
    if '{{name}}' in para.text:
        para.text = para.text.replace('{{name}}', 'Alice')
doc.save('filled.docx')
```

### Merge multiple PDFs

```python
from pypdf import PdfWriter

writer = PdfWriter()
for path in ['report.pdf', 'appendix.pdf']:
    writer.append(path)
with open('final.pdf', 'wb') as f:
    writer.write(f)
```
