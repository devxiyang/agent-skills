# curl — HTTP Requests

## Basic requests

```bash
curl https://api.example.com                        # GET
curl -X POST https://api.example.com/users          # POST
curl -X PUT https://api.example.com/users/1         # PUT
curl -X DELETE https://api.example.com/users/1      # DELETE
```

## Headers & auth

```bash
# Custom header
curl -H "Authorization: Bearer TOKEN" https://api.example.com

# Multiple headers
curl -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     https://api.example.com

# Basic auth
curl -u username:password https://api.example.com

# API key in header
curl -H "X-API-Key: your-key" https://api.example.com
```

## Send data

```bash
# JSON body
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# JSON from file
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d @payload.json

# Form data
curl -X POST https://api.example.com/login \
  -d "username=alice&password=secret"

# File upload
curl -X POST https://api.example.com/upload \
  -F "file=@photo.jpg"
```

## Response handling

```bash
# Show response headers
curl -i https://api.example.com

# Show only headers
curl -I https://api.example.com

# Save response to file
curl -o output.json https://api.example.com/data

# Follow redirects
curl -L https://short.url/abc

# Silent (no progress bar)
curl -s https://api.example.com | jq .
```

## Download files

```bash
# Download with original filename
curl -O https://example.com/file.zip

# Download with custom filename
curl -o myfile.zip https://example.com/file.zip

# Resume interrupted download
curl -C - -O https://example.com/largefile.zip

# Download multiple files
curl -O https://example.com/file1.zip \
     -O https://example.com/file2.zip
```

## Debugging

```bash
# Verbose — shows request and response headers
curl -v https://api.example.com

# Timing breakdown
curl -w "\nTime: %{time_total}s\nStatus: %{http_code}\n" \
     -o /dev/null -s https://api.example.com

# Check HTTP status code only
curl -s -o /dev/null -w "%{http_code}" https://api.example.com
```

## Common patterns with jq

```bash
# GET and extract a field
curl -s https://api.example.com/user/1 | jq '.name'

# POST and capture the created ID
id=$(curl -s -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}' | jq -r '.id')
echo "Created: $id"
```
