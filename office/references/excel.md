# Excel — Spreadsheets (.xlsx)

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
```

## Write data

```python
import openpyxl

wb = openpyxl.load_workbook('data.xlsx')
ws = wb.active

ws['A1'] = 'Hello'
ws.cell(row=2, column=3, value=42)
ws.append(['Alice', 30, 'Engineer'])

wb.save('data.xlsx')
```

## Create a new workbook

```python
import openpyxl

wb = openpyxl.Workbook()
ws = wb.active
ws.title = 'Report'

ws.append(['Name', 'Age', 'Role'])
ws.append(['Alice', 30, 'Engineer'])

# Style a cell
from openpyxl.styles import Font, PatternFill
ws['A1'].font = Font(bold=True)
ws['A1'].fill = PatternFill('solid', fgColor='DDEBF7')

wb.save('output.xlsx')
```

## Read & transform with pandas

```python
import pandas as pd

df = pd.read_excel('data.xlsx')
df = pd.read_excel('data.xlsx', sheet_name='Sales')
df = pd.read_excel('data.xlsx', usecols=['Name', 'Amount'])

# Filter
active = df[df['Status'] == 'active']

# Add column
df['Total'] = df['Price'] * df['Quantity']

# Sort
df = df.sort_values('Amount', ascending=False)

# Group and sum
summary = df.groupby('Category')['Amount'].sum().reset_index()
```

## Write DataFrame to Excel

```python
import pandas as pd

df = pd.DataFrame({'Name': ['Alice', 'Bob'], 'Score': [95, 87]})

# Single sheet
df.to_excel('output.xlsx', index=False)

# Multiple sheets
with pd.ExcelWriter('output.xlsx') as writer:
    df.to_excel(writer, sheet_name='Scores', index=False)
    summary.to_excel(writer, sheet_name='Summary', index=False)
```

## CSV ↔ Excel

```python
import pandas as pd

# Excel → CSV
pd.read_excel('data.xlsx').to_csv('output.csv', index=False)

# CSV → Excel
pd.read_csv('data.csv').to_excel('output.xlsx', index=False)
```
