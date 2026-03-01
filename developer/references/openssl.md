# openssl — Certificates, Encryption & Encoding

> 🚨 **CRITICAL — MUST confirm with user before running:** Any operation on private keys, production certificates, or encrypted files. **NEVER log, print, or expose key/secret material in full.** Always confirm file paths before overwriting existing keys or certificates.

## Base64

```bash
# Encode
echo -n "hello world" | openssl base64
echo -n "hello world" | base64                      # macOS/Linux shorthand

# Decode
echo "aGVsbG8gd29ybGQ=" | openssl base64 -d
echo "aGVsbG8gd29ybGQ=" | base64 --decode

# Encode a file
openssl base64 -in image.png -out image.b64

# Decode a file
openssl base64 -d -in image.b64 -out image.png
```

## Hashing

```bash
# MD5
echo -n "hello" | openssl md5
openssl md5 file.txt

# SHA256
echo -n "hello" | openssl sha256
openssl sha256 file.txt

# SHA512
openssl sha512 file.txt
```

## Generate random secrets

```bash
# 32 random bytes as hex (good for tokens/keys)
openssl rand -hex 32

# 32 random bytes as base64
openssl rand -base64 32

# 16 bytes (UUID-ish)
openssl rand -hex 16
```

## Generate keys

```bash
# RSA private key
openssl genrsa -out private.pem 4096

# Extract public key from private key
openssl rsa -in private.pem -pubout -out public.pem

# EC key (faster, smaller)
openssl ecparam -genkey -name prime256v1 -noout -out private.pem
openssl ec -in private.pem -pubout -out public.pem
```

## Self-signed certificates (local dev)

```bash
# Quick self-signed cert (localhost)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem \
  -days 365 -nodes \
  -subj "/CN=localhost"

# With SAN (required by modern browsers)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem \
  -days 365 -nodes \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
```

## Inspect certificates

```bash
# View certificate details
openssl x509 -in cert.pem -text -noout

# Check expiry date
openssl x509 -in cert.pem -noout -enddate

# Check a remote server's cert
openssl s_client -connect example.com:443 </dev/null 2>/dev/null \
  | openssl x509 -noout -text

# Check expiry of a remote cert
echo | openssl s_client -connect example.com:443 2>/dev/null \
  | openssl x509 -noout -enddate
```

## Encrypt & decrypt files

```bash
# Encrypt a file (AES-256, password-based)
openssl enc -aes-256-cbc -pbkdf2 -in secret.txt -out secret.enc

# Decrypt
openssl enc -d -aes-256-cbc -pbkdf2 -in secret.enc -out secret.txt
```

## Sign & verify

```bash
# Sign a file
openssl dgst -sha256 -sign private.pem -out file.sig file.txt

# Verify signature
openssl dgst -sha256 -verify public.pem -signature file.sig file.txt
```
