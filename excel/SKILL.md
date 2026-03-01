---
name: excel
description: Read, write, and transform Excel files (.xlsx, .xls, .csv). Use for extracting data, updating cells, converting formats, and generating reports.
requires: bin:python3
tags: excel,xlsx,csv,python,data
---

# Excel Skill

## Preflight

```bash
python3 -c "import openpyxl, pandas; print('ok')"
```

If missing, load `references/install.md` for installation instructions.

## Read data

```python
import openpyxl

wb = openpyxl.load_workbook('data.xlsx')
ws = wb.active

# Read all rows
for row in ws.iter_rows(values_only=True):
    print(row)

# Read a specific cell
print(ws['B2'].value)

# Read a range
for row in ws['A1':'C10']:
    print([cell.value for cell in row])
```

## Write data

```python
import openpyxl

wb = openpyxl.load_workbook('data.xlsx')
ws = wb.active

# Write a single cell
ws['A1'] = 'Hello'
ws.cell(row=2, column=3, value=42)

# Append a row
ws.append(['Alice', 30, 'Engineer'])

wb.save('data.xlsx')
```

## Create a new workbook

```python
import openpyxl

wb = openpyxl.Workbook()
ws = wb.active
ws.title = 'Sheet1'

ws.append(['Name', 'Age', 'Role'])
ws.append(['Alice', 30, 'Engineer'])
ws.append(['Bob', 25, 'Designer'])

wb.save('output.xlsx')
```

## Read with pandas

```python
import pandas as pd

# Read first sheet
df = pd.read_excel('data.xlsx')

# Read a specific sheet
df = pd.read_excel('data.xlsx', sheet_name='Sales')

# Read specific columns
df = pd.read_excel('data.xlsx', usecols=['Name', 'Amount'])

print(df.head())
print(df.describe())
```

## Filter and transform with pandas

```python
import pandas as pd

df = pd.read_excel('data.xlsx')

# Filter rows
active = df[df['Status'] == 'active']

# Add a column
df['Total'] = df['Price'] * df['Quantity']

# Sort
df = df.sort_values('Amount', ascending=False)

# Group and aggregate
summary = df.groupby('Category')['Amount'].sum().reset_index()
```

## Convert Excel to CSV

```python
import pandas as pd

df = pd.read_excel('data.xlsx', sheet_name='Sheet1')
df.to_csv('output.csv', index=False)
```

## Convert CSV to Excel

```python
import pandas as pd

df = pd.read_csv('data.csv')
df.to_excel('output.xlsx', index=False)
```

## Write pandas DataFrame to Excel

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

## List sheet names

```python
import openpyxl

wb = openpyxl.load_workbook('data.xlsx')
print(wb.sheetnames)
```
