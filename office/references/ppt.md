# PowerPoint — Presentations (.pptx)

Library: `python-pptx`

## Read a presentation

```python
from pptx import Presentation

prs = Presentation('deck.pptx')

for i, slide in enumerate(prs.slides):
    print(f'Slide {i + 1}:')
    for shape in slide.shapes:
        if shape.has_text_frame:
            print(shape.text_frame.text)
```

## Create a presentation

```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

prs = Presentation()

# Slide size: 16:9
prs.slide_width = Inches(13.33)
prs.slide_height = Inches(7.5)
```

## Add a title slide

```python
from pptx import Presentation
from pptx.util import Inches, Pt

prs = Presentation()
layout = prs.slide_layouts[0]           # Title Slide layout
slide = prs.slides.add_slide(layout)

slide.shapes.title.text = 'Presentation Title'
slide.placeholders[1].text = 'Subtitle · Author · Date'

prs.save('output.pptx')
```

## Add a content slide

```python
layout = prs.slide_layouts[1]           # Title and Content layout
slide = prs.slides.add_slide(layout)

slide.shapes.title.text = 'Key Points'
body = slide.placeholders[1].text_frame
body.text = 'First bullet point'
body.add_paragraph().text = 'Second bullet point'
body.add_paragraph().text = 'Third bullet point'
```

## Add a text box

```python
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

txBox = slide.shapes.add_textbox(Inches(1), Inches(2), Inches(6), Inches(1))
tf = txBox.text_frame
tf.text = 'Custom text box'

# Style the run
run = tf.paragraphs[0].runs[0]
run.font.size = Pt(24)
run.font.bold = True
run.font.color.rgb = RGBColor(0x38, 0xBD, 0xF8)
```

## Add an image

```python
slide.shapes.add_picture(
    'chart.png',
    left=Inches(1), top=Inches(2),
    width=Inches(8)
)
```

## Add a table

```python
from pptx.util import Inches

rows, cols = 4, 3
table = slide.shapes.add_table(
    rows, cols,
    left=Inches(1), top=Inches(2),
    width=Inches(8), height=Inches(3)
).table

# Headers
table.cell(0, 0).text = 'Name'
table.cell(0, 1).text = 'Q1'
table.cell(0, 2).text = 'Q2'

# Data
data = [('Alice', '120', '145'), ('Bob', '98', '110'), ('Carol', '134', '160')]
for r, (name, q1, q2) in enumerate(data, start=1):
    table.cell(r, 0).text = name
    table.cell(r, 1).text = q1
    table.cell(r, 2).text = q2
```

## Set background color

```python
from pptx.dml.color import RGBColor
from pptx.oxml.ns import qn
from lxml import etree

def set_slide_background(slide, hex_color):
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = RGBColor.from_string(hex_color)

set_slide_background(slide, '0F172A')   # dark navy
```

## Batch: generate slides from data

```python
from pptx import Presentation
from pptx.util import Inches

data = [
    {'title': 'Q1 Results', 'value': '+28%', 'note': 'Best quarter ever'},
    {'title': 'Q2 Outlook', 'value': '+15%', 'note': 'Conservative estimate'},
]

prs = Presentation()
for item in data:
    slide = prs.slides.add_slide(prs.slide_layouts[1])
    slide.shapes.title.text = item['title']
    slide.placeholders[1].text = f"{item['value']}\n{item['note']}"

prs.save('report.pptx')
```
