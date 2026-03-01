# Text Processing — grep, sed, awk

## grep — Search

```bash
grep "error" app.log                 # search in file
grep -r "TODO" ./src                 # recursive search
grep -n "pattern" file.txt           # show line numbers
grep -i "error" file.txt             # case-insensitive
grep -v "debug" file.txt             # exclude matches
grep -c "error" file.txt             # count matches
grep -l "error" *.log                # list matching files only
grep -A 3 "error" file.txt           # 3 lines after match
grep -B 3 "error" file.txt           # 3 lines before match
grep -C 3 "error" file.txt           # 3 lines before and after

# Regex
grep -E "error|warn" file.txt        # match either
grep -E "^[0-9]+" file.txt           # lines starting with numbers
grep -oE "[0-9]+\.[0-9]+" file.txt   # extract numbers only
```

## sed — Stream Edit

```bash
# Replace first match per line
sed 's/foo/bar/' file.txt

# Replace all matches (global)
sed 's/foo/bar/g' file.txt

# Edit file in place
sed -i 's/foo/bar/g' file.txt

# macOS in-place (requires empty string after -i)
sed -i '' 's/foo/bar/g' file.txt

# Delete lines matching a pattern
sed '/^#/d' file.txt                 # delete comment lines
sed '/^$/d' file.txt                 # delete empty lines

# Print specific line
sed -n '5p' file.txt                 # line 5
sed -n '5,10p' file.txt              # lines 5–10

# Insert line before/after match
sed '/pattern/i\new line before' file.txt
sed '/pattern/a\new line after' file.txt
```

## awk — Field Processing

```bash
# Print a column (space-delimited)
awk '{print $1}' file.txt            # first column
awk '{print $1, $3}' file.txt        # first and third

# CSV / custom delimiter
awk -F',' '{print $2}' data.csv
awk -F':' '{print $1}' /etc/passwd   # extract usernames

# Filter rows
awk '$3 > 100' data.txt              # rows where column 3 > 100
awk '/error/ {print $0}' app.log     # rows matching pattern

# Sum a column
awk '{sum += $2} END {print sum}' data.txt

# Count lines matching pattern
awk '/error/ {count++} END {print count}' app.log

# Print with formatting
awk '{printf "%-20s %s\n", $1, $2}' data.txt
```

## Common combinations

```bash
# Find and count unique errors
grep "ERROR" app.log | awk '{print $4}' | sort | uniq -c | sort -rn

# Extract emails from a file
grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' file.txt

# Replace a value in a JSON-like log line
grep "userId" app.log | sed 's/"userId":[0-9]*/REDACTED/g'

# Sum file sizes
ls -la | awk '{sum += $5} END {print sum " bytes"}'

# Remove duplicate lines (preserve order)
awk '!seen[$0]++' file.txt

# Print lines between two patterns
sed -n '/START/,/END/p' file.txt
```
