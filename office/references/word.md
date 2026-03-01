# Word — Documents (.docx)

Library: `python-docx`

## Read a document

```python
from docx import Document

doc = Document('report.docx')

# Read all paragraphs
for para in doc.paragraphs:
    print(para.text)

# Read a specific style
headings = [p for p in doc.paragraphs if p.style.name.startswith('Heading')]

# Read tables
for table in doc.tables:
    for row in table.rows:
        print([cell.text for cell in row.cells])
```

## Create a document

```python
from docx import Document
from docx.shared import Pt, RGBColor

doc = Document()

# Title
doc.add_heading('Report Title', level=0)

# Headings
doc.add_heading('Section 1', level=1)
doc.add_heading('Subsection 1.1', level=2)

# Paragraph
doc.add_paragraph('This is a regular paragraph.')

# Paragraph with inline formatting
para = doc.add_paragraph()
run = para.add_run('Bold text ')
run.bold = True
run = para.add_run('and italic text.')
run.italic = True

# Bullet list
doc.add_paragraph('First item', style='List Bullet')
doc.add_paragraph('Second item', style='List Bullet')

# Numbered list
doc.add_paragraph('Step one', style='List Number')
doc.add_paragraph('Step two', style='List Number')

doc.save('output.docx')
```

## Add a table

```python
from docx import Document

doc = Document()
table = doc.add_table(rows=1, cols=3)
table.style = 'Table Grid'

# Header row
header = table.rows[0].cells
header[0].text = 'Name'
header[1].text = 'Age'
header[2].text = 'Role'

# Data rows
data = [('Alice', '30', 'Engineer'), ('Bob', '25', 'Designer')]
for name, age, role in data:
    row = table.add_row().cells
    row[0].text = name
    row[1].text = age
    row[2].text = role

doc.save('output.docx')
```

## Add image

```python
from docx import Document
from docx.shared import Inches

doc = Document()
doc.add_picture('chart.png', width=Inches(5))
doc.save('output.docx')
```

## Fill a template (find & replace)

```python
from docx import Document

def replace_text(doc, placeholder, value):
    for para in doc.paragraphs:
        if placeholder in para.text:
            for run in para.runs:
                run.text = run.text.replace(placeholder, value)
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                replace_text(cell, placeholder, value)

doc = Document('template.docx')
replace_text(doc, '{{name}}', 'Alice')
replace_text(doc, '{{date}}', '2025-01-01')
doc.save('filled.docx')
```

## Page setup

```python
from docx import Document
from docx.shared import Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()

# Page margins
section = doc.sections[0]
section.top_margin = Cm(2)
section.bottom_margin = Cm(2)
section.left_margin = Cm(2.5)
section.right_margin = Cm(2.5)

# Paragraph alignment
para = doc.add_paragraph('Centered text')
para.alignment = WD_ALIGN_PARAGRAPH.CENTER

doc.save('output.docx')
```
