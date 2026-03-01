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

## References

| Format | Purpose | Reference |
|---|---|---|
| Excel (.xlsx) | Tables, pivot, charts, conditional formatting, validation | `references/excel.md` |
| Word (.docx) | Create, read, style, fill templates | `references/word.md` |
| PowerPoint (.pptx) | Create slides, charts, tables, batch generate | `references/ppt.md` |
| PDF | Merge, split, extract text, protect, compress | `references/pdf.md` |
| Convert | Convert between formats via LibreOffice | `references/convert.md` |

## Ready-to-run scripts

| Script | What it does | Usage |
|---|---|---|
| `scripts/excel_report.py` | CSV → styled Excel report with chart and summary | `python3 excel_report.py data.csv` |
| `scripts/excel_pivot.py` | Excel/CSV → pivot table with formatting | `python3 excel_pivot.py data.xlsx --index Region --values Revenue` |
| `scripts/pdf_merge.py` | Merge multiple PDFs with optional page ranges | `python3 pdf_merge.py a.pdf b.pdf c.pdf` |
| `scripts/word_fill.py` | Fill Word template with JSON or key=value pairs | `python3 word_fill.py template.docx data.json` |

## Assets

| File | Content |
|---|---|
| `assets/excel_themes.json` | Color themes and chart palette for Excel styling |

## Common workflows

### Generate a report from CSV data

```bash
python3 scripts/excel_report.py sales.csv --title "Q3 Sales Report"
# → sales.xlsx with styled table, summary sheet, and bar chart
```

### Build a pivot table

```bash
python3 scripts/excel_pivot.py sales.xlsx \
  --index Region --columns Product --values Revenue --agg sum
# → sales_pivot.xlsx with formatted pivot + source sheet
```

### Batch fill Word contracts from JSON

```bash
python3 scripts/word_fill.py contract_template.docx client_data.json \
  --output contract_alice.docx
```

### Merge PDFs with selected pages

```bash
python3 scripts/pdf_merge.py cover.pdf report.pdf appendix.pdf \
  --pages all "1-5" "2,4" \
  --output final.pdf
```
