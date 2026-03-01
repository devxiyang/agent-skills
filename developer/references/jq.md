# jq — JSON Processing

## Basic filtering

```bash
# Pretty-print JSON
cat data.json | jq .

# Extract a field
echo '{"name":"alice","age":30}' | jq '.name'

# Nested field
echo '{"user":{"email":"a@b.com"}}' | jq '.user.email'

# Array index
echo '[1,2,3]' | jq '.[0]'

# Array slice
echo '[1,2,3,4,5]' | jq '.[2:4]'
```

## Iterating arrays

```bash
curl -s "https://api.example.com/users" | jq '.[]'
curl -s "https://api.example.com/users" | jq '.[].name'
curl -s "https://api.example.com/users" | jq '.[] | .name'
```

## Selecting & filtering

```bash
jq '[.[] | select(.age > 25)]' data.json
jq '[.[] | select(.status == "active")]' data.json
jq '[.[] | select(.email != null)]' data.json
```

## Transforming

```bash
# Build a new object
jq '{id: .id, label: .name}' data.json

# Map over array
jq '[.[] | {id: .id, label: .name}]' data.json

# Append a field
jq '. + {processed: true}' data.json

# keys, values, length
jq 'keys' data.json
jq '.items | length' data.json
```

## String interpolation

```bash
jq '.[] | "User \(.name) is \(.age) years old"' data.json
```

## Combining with curl

```bash
curl -s "https://api.example.com/item/1" | jq '.data.title'
curl -s "https://api.example.com/items" | jq '[.[] | select(.active) | {id, name}]'
```

## Output flags

```bash
jq -r '.name' data.json    # raw string (no quotes)
jq -c '.' data.json        # compact (no whitespace)
jq -e '.' data.json        # exit 1 if null/false
```
