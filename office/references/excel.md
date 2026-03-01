# Excel — Spreadsheets (.xlsx)

Libraries: `openpyxl` (read/write/style), `pandas` (data transformation)

---

## Read data

```python
import openpyxl

wb = openpyxl.load_workbook('data.xlsx')
ws = wb.active

# All rows
for row in ws.iter_rows(values_only=True):
    print(row)

# Specific cell
print(ws['B2'].value)

# Range
for row in ws['A1':'C10']:
    print([cell.value for cell in row])

# Sheet names
print(wb.sheetnames)

# Read a specific sheet
ws = wb['Sales']
```

---

## Write & style cells

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = Workbook()
ws = wb.active

# Write
ws['A1'] = 'Revenue'
ws.cell(row=2, column=1, value=12500)

# Bold + font size
ws['A1'].font = Font(bold=True, size=14, color='FFFFFF')

# Background color
ws['A1'].fill = PatternFill('solid', fgColor='2563EB')

# Alignment
ws['A1'].alignment = Alignment(horizontal='center', vertical='center')

# Border
thin = Side(style='thin')
ws['A1'].border = Border(left=thin, right=thin, top=thin, bottom=thin)

# Column width & row height
ws.column_dimensions['A'].width = 20
ws.row_dimensions[1].height = 30

wb.save('output.xlsx')
```

---

## Tables (ListObject)

```python
from openpyxl import Workbook
from openpyxl.worksheet.table import Table, TableStyleInfo

wb = Workbook()
ws = wb.active

# Add headers + data
ws.append(['Name', 'Region', 'Q1', 'Q2', 'Q3', 'Q4'])
ws.append(['Alice', 'North', 120, 135, 150, 160])
ws.append(['Bob',   'South', 98,  110, 105, 120])
ws.append(['Carol', 'East',  145, 160, 170, 185])

# Create a Table
table = Table(displayName='SalesData', ref='A1:F4')
table.tableStyleInfo = TableStyleInfo(
    name='TableStyleMedium9',
    showFirstColumn=False,
    showLastColumn=False,
    showRowStripes=True,
)
ws.add_table(table)

wb.save('output.xlsx')
```

---

## Pivot tables with pandas

openpyxl does not support native pivot tables. Use pandas instead and write the result as a formatted table.

```python
import pandas as pd

df = pd.read_excel('sales.xlsx')

# Simple pivot: sum of Revenue by Region and Product
pivot = df.pivot_table(
    values='Revenue',
    index='Region',
    columns='Product',
    aggfunc='sum',
    fill_value=0,
    margins=True,           # adds totals row/column
    margins_name='Total',
)

# Save pivot to Excel with formatting
with pd.ExcelWriter('pivot_report.xlsx', engine='openpyxl') as writer:
    pivot.to_excel(writer, sheet_name='Pivot')

    ws = writer.sheets['Pivot']
    from openpyxl.styles import Font, PatternFill
    for cell in ws[1]:
        cell.font = Font(bold=True)
        cell.fill = PatternFill('solid', fgColor='DDEBF7')
```

---

## Charts

```python
from openpyxl import Workbook
from openpyxl.chart import BarChart, LineChart, PieChart, Reference

wb = Workbook()
ws = wb.active

# Data
ws.append(['Month', 'Revenue', 'Cost'])
for row in [('Jan',120,80),('Feb',135,85),('Mar',150,90),
            ('Apr',160,95),('May',175,100),('Jun',190,105)]:
    ws.append(row)

# Bar chart
chart = BarChart()
chart.type = 'col'
chart.title = 'Monthly Revenue vs Cost'
chart.y_axis.title = 'Amount'
chart.x_axis.title = 'Month'
chart.style = 10

data = Reference(ws, min_col=2, max_col=3, min_row=1, max_row=7)
cats = Reference(ws, min_col=1, min_row=2, max_row=7)
chart.add_data(data, titles_from_data=True)
chart.set_categories(cats)
chart.width = 20
chart.height = 12

ws.add_chart(chart, 'E2')
wb.save('chart.xlsx')
```

```python
# Line chart
from openpyxl.chart import LineChart, Reference

chart = LineChart()
chart.title = 'Revenue Trend'
chart.style = 10
chart.y_axis.title = 'Revenue'
chart.smooth = True

data = Reference(ws, min_col=2, min_row=1, max_row=7)
chart.add_data(data, titles_from_data=True)
chart.set_categories(Reference(ws, min_col=1, min_row=2, max_row=7))
ws.add_chart(chart, 'E20')
```

```python
# Pie chart
from openpyxl.chart import PieChart, Reference

chart = PieChart()
labels = Reference(ws, min_col=1, min_row=2, max_row=7)
data = Reference(ws, min_col=2, min_row=1, max_row=7)
chart.add_data(data, titles_from_data=True)
chart.dataLabels = openpyxl.chart.label.DataLabelList()
chart.dataLabels.showPercent = True
chart.set_categories(labels)
chart.title = 'Revenue by Month'
ws.add_chart(chart, 'E36')
```

---

## Conditional formatting

```python
from openpyxl import Workbook
from openpyxl.formatting.rule import (
    ColorScaleRule, DataBarRule, IconSetRule,
    CellIsRule, FormulaRule
)
from openpyxl.styles import PatternFill, Font

wb = Workbook()
ws = wb.active

# Color scale (green → yellow → red)
ws.conditional_formatting.add('B2:B20',
    ColorScaleRule(
        start_type='min', start_color='63BE7B',
        mid_type='percentile', mid_value=50, mid_color='FFEB84',
        end_type='max', end_color='F8696B',
    )
)

# Data bar
ws.conditional_formatting.add('C2:C20',
    DataBarRule(start_type='min', end_type='max', color='2196F3')
)

# Highlight cells > 100
red_fill = PatternFill(start_color='FFC7CE', end_color='FFC7CE', fill_type='solid')
ws.conditional_formatting.add('D2:D20',
    CellIsRule(operator='greaterThan', formula=['100'], fill=red_fill)
)

# Formula rule: highlight entire row if column A is "Overdue"
ws.conditional_formatting.add('A2:E20',
    FormulaRule(formula=['$A2="Overdue"'], fill=red_fill)
)

wb.save('conditional.xlsx')
```

---

## Data validation

```python
from openpyxl import Workbook
from openpyxl.worksheet.datavalidation import DataValidation

wb = Workbook()
ws = wb.active

# Dropdown list
dv = DataValidation(
    type='list',
    formula1='"North,South,East,West"',
    allow_blank=True,
    showDropDown=False,
)
dv.error = 'Please select a valid region'
dv.errorTitle = 'Invalid Input'
dv.prompt = 'Select a region'
ws.add_data_validation(dv)
dv.add('B2:B100')

# Number range validation
dv2 = DataValidation(type='whole', operator='between', formula1=0, formula2=100)
dv2.error = 'Enter a value between 0 and 100'
ws.add_data_validation(dv2)
dv2.add('C2:C100')

# Date validation
dv3 = DataValidation(type='date', operator='greaterThanOrEqual', formula1='2024-01-01')
ws.add_data_validation(dv3)
dv3.add('D2:D100')

wb.save('validated.xlsx')
```

---

## Formulas

```python
ws['E2'] = '=SUM(B2:D2)'
ws['E3'] = '=AVERAGE(B3:D3)'
ws['F2'] = '=IF(E2>100,"High","Low")'
ws['G2'] = '=VLOOKUP(A2,Sheet2!$A:$B,2,FALSE)'
ws['H2'] = '=COUNTIF(B:B,">100")'
ws['I2'] = '=SUMIF(A:A,"North",B:B)'
```

---

## Freeze panes & filters

```python
# Freeze top row
ws.freeze_panes = 'A2'

# Freeze first column + top row
ws.freeze_panes = 'B2'

# Auto-filter on header row
ws.auto_filter.ref = ws.dimensions
```

---

## Merge cells

```python
ws.merge_cells('A1:D1')
ws['A1'] = 'Quarterly Report'
ws['A1'].alignment = Alignment(horizontal='center')
```

---

## pandas: filter, transform, aggregate

```python
import pandas as pd

df = pd.read_excel('sales.xlsx')

# Filter
df_north = df[df['Region'] == 'North']

# New column
df['Total'] = df['Q1'] + df['Q2'] + df['Q3'] + df['Q4']

# Sort
df = df.sort_values('Total', ascending=False)

# Group & aggregate
summary = df.groupby('Region').agg(
    Total=('Total', 'sum'),
    Count=('Name', 'count'),
    Avg=('Total', 'mean'),
).round(2).reset_index()

# Write multiple sheets
with pd.ExcelWriter('report.xlsx', engine='openpyxl') as writer:
    df.to_excel(writer, sheet_name='Data', index=False)
    summary.to_excel(writer, sheet_name='Summary', index=False)
```
