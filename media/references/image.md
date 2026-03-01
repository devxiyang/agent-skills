# Image Processing

Powered by **ImageMagick** (`magick` / `convert` CLI).

## Preflight

```bash
magick --version
# or on older installs:
convert --version
```

If missing, load `references/install.md`.

---

## Format conversion

```bash
# Convert between formats
magick input.png output.jpg
magick input.jpg output.webp
magick input.bmp output.png

# Batch convert all PNG to JPG
magick mogrify -format jpg *.png
```

---

## Resize

```bash
# Set width, auto height (keeps aspect ratio)
magick input.jpg -resize 800x output.jpg

# Set height, auto width
magick input.jpg -resize x600 output.jpg

# Exact size (may distort)
magick input.jpg -resize 800x600! output.jpg

# Resize only if larger than target
magick input.jpg -resize 1920x1080\> output.jpg

# Percentage
magick input.jpg -resize 50% output.jpg

# Batch resize all JPGs to max 1200px wide
magick mogrify -resize 1200x\> *.jpg
```

---

## Crop

```bash
# crop WxH+X+Y (width × height, offset from top-left)
magick input.jpg -crop 800x600+100+50 output.jpg

# Center crop to square
magick input.jpg -gravity Center -crop 800x800+0+0 +repage output.jpg

# Remove whitespace border (trim)
magick input.jpg -trim +repage output.jpg
```

---

## Compress & optimize

```bash
# JPEG quality (1–100, default 92)
magick input.jpg -quality 80 output.jpg

# PNG compression (0–9)
magick input.png -compress zip -quality 9 output.png

# WebP (modern format, great compression)
magick input.jpg -quality 85 output.webp

# Strip metadata (EXIF, GPS, etc.) — reduces file size
magick input.jpg -strip output.jpg

# Batch optimize all JPEGs
magick mogrify -quality 80 -strip *.jpg
```

---

## Rotate & flip

```bash
magick input.jpg -rotate 90 output.jpg      # 90° clockwise
magick input.jpg -rotate -90 output.jpg     # 90° counter-clockwise
magick input.jpg -rotate 180 output.jpg     # 180°
magick input.jpg -flop output.jpg           # horizontal flip
magick input.jpg -flip output.jpg           # vertical flip

# Auto-rotate based on EXIF orientation
magick input.jpg -auto-orient output.jpg
```

---

## Adjust image

```bash
# Brightness / contrast (-100 to +100)
magick input.jpg -brightness-contrast 10x15 output.jpg

# Saturation
magick input.jpg -modulate 100,130,100 output.jpg   # 130% saturation

# Sharpen
magick input.jpg -sharpen 0x1.5 output.jpg

# Blur
magick input.jpg -blur 0x3 output.jpg

# Grayscale
magick input.jpg -colorspace Gray output.jpg

# Invert
magick input.jpg -negate output.jpg
```

---

## Watermark & text overlay

```bash
# Text watermark bottom-right
magick input.jpg \
  -gravity SouthEast \
  -fill 'rgba(255,255,255,0.6)' \
  -font Arial -pointsize 36 \
  -annotate +20+20 '© 2025 MyBrand' \
  output.jpg

# Image watermark (with transparency)
magick input.jpg logo.png \
  -gravity SouthEast \
  -geometry +20+20 \
  -composite output.jpg

# Batch watermark
magick mogrify -gravity SouthEast \
  -fill 'rgba(255,255,255,0.5)' \
  -font Arial -pointsize 24 \
  -annotate +10+10 '© MyBrand' \
  *.jpg
```

---

## Thumbnail generation

```bash
# Fast thumbnail (crops to exact size)
magick input.jpg -thumbnail 300x300^ \
  -gravity Center -extent 300x300 thumbnail.jpg

# Thumbnail strip metadata
magick input.jpg -thumbnail 200x200^ \
  -gravity Center -extent 200x200 \
  -strip thumbnail.jpg

# Batch thumbnails from all JPGs
mkdir -p thumbs
for f in *.jpg; do
  magick "$f" -thumbnail 300x300^ \
    -gravity Center -extent 300x300 \
    -strip "thumbs/$f"
done
```

---

## Combine images

```bash
# Stack horizontally
magick +append a.jpg b.jpg c.jpg combined.jpg

# Stack vertically
magick -append a.jpg b.jpg c.jpg combined.jpg

# Create a 2×2 grid
magick montage a.jpg b.jpg c.jpg d.jpg \
  -geometry +2+2 -tile 2x2 grid.jpg
```

---

## Create images from scratch

```bash
# Solid color background
magick -size 1920x1080 xc:#0f172a background.png

# Gradient
magick -size 800x400 gradient:#2563EB-#7C3AED gradient.png

# Add text to a blank canvas
magick -size 800x200 xc:white \
  -font Arial -pointsize 48 \
  -fill '#0f172a' -gravity Center \
  -annotate 0 'Hello World' \
  text.png
```

---

## GIF

```bash
# Images → animated GIF
magick -delay 50 -loop 0 frame*.png animation.gif

# Control frame delay (100 = 1 second per frame)
magick -delay 100 -loop 0 *.jpg slideshow.gif

# Optimize GIF size
magick animation.gif -layers optimize output.gif
```

---

## Inspect image info

```bash
magick identify input.jpg                    # basic info
magick identify -verbose input.jpg          # full metadata
magick identify -format "%wx%h %b\n" *.jpg  # size + filesize for all
```
