# python — Scripting & Tooling

## Run scripts

```bash
python3 script.py
python3 script.py arg1 arg2         # with arguments
python3 -c "print('hello')"         # one-liner
python3 -m http.server 8000         # quick static file server
python3 -m json.tool data.json      # pretty-print JSON
```

## Virtual environments

```bash
python3 -m venv .venv               # create virtualenv
source .venv/bin/activate           # activate (mac/linux)
.venv\Scripts\activate              # activate (windows)
deactivate                          # exit virtualenv

pip install requests                # install package
pip install -r requirements.txt     # install from file
pip freeze > requirements.txt       # export dependencies
pip list                            # list installed packages
```

## File operations

```python
# Read a file
with open('file.txt') as f:
    content = f.read()

# Read lines
with open('file.txt') as f:
    lines = f.readlines()

# Write a file
with open('output.txt', 'w') as f:
    f.write('hello\n')

# Append
with open('log.txt', 'a') as f:
    f.write('new line\n')
```

## JSON

```python
import json

# Parse JSON string
data = json.loads('{"name": "Alice"}')

# Read JSON file
with open('data.json') as f:
    data = json.load(f)

# Write JSON file
with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)

# Serialize to string
json.dumps(data, indent=2)
```

## CSV

```python
import csv

# Read CSV
with open('data.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['name'], row['age'])

# Write CSV
with open('output.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['name', 'age'])
    writer.writeheader()
    writer.writerow({'name': 'Alice', 'age': 30})
```

## HTTP requests

```python
import urllib.request
import json

# GET (stdlib only, no dependencies)
with urllib.request.urlopen('https://api.example.com/data') as r:
    data = json.loads(r.read())

# With requests library
import requests

r = requests.get('https://api.example.com/users')
data = r.json()

r = requests.post('https://api.example.com/users',
    json={'name': 'Alice'},
    headers={'Authorization': 'Bearer TOKEN'})
```

## Path & filesystem

```python
from pathlib import Path

p = Path('.')
list(p.glob('**/*.py'))             # find all .py files
p.mkdir(parents=True, exist_ok=True)

file = Path('data.json')
file.exists()
file.read_text()
file.write_text('content')
file.rename('new_name.json')
```

## Run shell commands

```python
import subprocess

# Run and capture output
result = subprocess.run(['ls', '-la'], capture_output=True, text=True)
print(result.stdout)

# Run shell command
result = subprocess.run('echo hello | tr a-z A-Z',
    shell=True, capture_output=True, text=True)

# Check exit code
if result.returncode != 0:
    print('Error:', result.stderr)
```

## Script template

```python
#!/usr/bin/env python3
import sys
import argparse

def main():
    parser = argparse.ArgumentParser(description='My script')
    parser.add_argument('input', help='input file')
    parser.add_argument('--output', '-o', default='output.json')
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    # your logic here

if __name__ == '__main__':
    main()
```
