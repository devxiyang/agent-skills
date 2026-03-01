# shell — Bash Scripting

> 🚨 **CRITICAL — MUST confirm with user before running:** `rm -rf`, `> file` (overwrites without warning), any command targeting production paths or shared systems. **Always show the full command and wait for explicit approval.**

## Files & directories

```bash
ls -lah                              # list with sizes
find . -name "*.log"                 # find by name
find . -name "*.log" -mtime -7       # modified in last 7 days
du -sh *                             # directory sizes
cp -r src/ dst/                      # copy directory
mv old.txt new.txt
rm -rf dir/                          # delete directory
mkdir -p a/b/c                       # create nested dirs
```

## Read & write files

```bash
cat file.txt                         # print file
head -n 20 file.txt                  # first 20 lines
tail -n 20 file.txt                  # last 20 lines
tail -f app.log                      # follow log in real time
wc -l file.txt                       # count lines

echo "hello" > file.txt              # overwrite
echo "hello" >> file.txt             # append
```

## Search

```bash
grep "error" app.log                 # search in file
grep -r "TODO" ./src                 # search recursively
grep -n "pattern" file.txt           # show line numbers
grep -i "error" file.txt             # case-insensitive
grep -v "debug" file.txt             # exclude matches
```

## Pipes & redirection

```bash
cat file.txt | sort | uniq           # sort and deduplicate
cat file.txt | wc -l                 # count lines
command > output.txt                 # redirect stdout
command 2> error.txt                 # redirect stderr
command &> all.txt                   # redirect both
command1 | command2                  # pipe output
```

## Variables & conditionals

```bash
name="world"
echo "Hello, $name"

if [ -f "file.txt" ]; then
  echo "exists"
fi

if [ "$var" = "value" ]; then
  echo "match"
elif [ "$var" = "other" ]; then
  echo "other"
else
  echo "no match"
fi
```

## Loops

```bash
# Loop over files
for f in *.txt; do
  echo "Processing $f"
done

# Loop over a range
for i in {1..10}; do
  echo $i
done

# While loop
while [ condition ]; do
  command
done
```

## Functions

```bash
greet() {
  local name="$1"
  echo "Hello, $name"
}

greet "Alice"
```

## Process management

```bash
command &                            # run in background
jobs                                 # list background jobs
kill %1                              # kill job 1
kill -9 <pid>                        # force kill by PID
ps aux | grep myprocess              # find a process
lsof -i :3000                        # what's using port 3000
```

## Script boilerplate

```bash
#!/usr/bin/env bash
set -euo pipefail                    # exit on error, unset vars, pipe fails

# Usage check
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <input>" >&2
  exit 1
fi

INPUT="$1"
echo "Processing $INPUT..."
```

## Cron

```bash
crontab -e                           # edit cron jobs
crontab -l                           # list cron jobs

# Format: minute hour day month weekday command
0 9 * * 1-5 /path/to/script.sh      # 9am on weekdays
*/15 * * * * /path/to/check.sh      # every 15 minutes
0 2 * * * /path/to/backup.sh        # 2am every day
```
