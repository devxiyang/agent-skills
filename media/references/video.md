# Video Processing

## Compress

```bash
# H.264 — best compatibility (crf 18–28, lower = better quality)
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 -preset slow output.mp4

# H.265 — smaller files, slower encode
ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4

# Target bitrate
ffmpeg -i input.mp4 -b:v 2M output.mp4
```

`-preset` options: `ultrafast` `fast` `medium` `slow` `veryslow` — slower = smaller file, same quality.

## Resize

```bash
# Set width, auto height (keeps aspect ratio)
ffmpeg -i input.mp4 -vf scale=1280:-2 output.mp4

# Set height, auto width
ffmpeg -i input.mp4 -vf scale=-2:720 output.mp4

# Exact resolution
ffmpeg -i input.mp4 -vf scale=1920:1080 output.mp4

# Half size
ffmpeg -i input.mp4 -vf scale=iw/2:ih/2 output.mp4
```

Use `-2` instead of `-1` to ensure dimensions are divisible by 2 (required by most codecs).

## Crop

```bash
# crop=width:height:x:y (x,y = top-left corner of crop area)
ffmpeg -i input.mp4 -vf crop=1280:720:0:0 output.mp4

# Center crop to 1:1
ffmpeg -i input.mp4 -vf crop=ih:ih output.mp4
```

## Rotate

```bash
# 90° clockwise
ffmpeg -i input.mp4 -vf transpose=1 output.mp4

# 90° counter-clockwise
ffmpeg -i input.mp4 -vf transpose=2 output.mp4

# 180°
ffmpeg -i input.mp4 -vf transpose=1,transpose=1 output.mp4
```

## Watermark (image overlay)

```bash
# Bottom-right corner, 10px margin
ffmpeg -i input.mp4 -i logo.png \
  -filter_complex "overlay=W-w-10:H-h-10" \
  output.mp4

# With transparency (logo already has alpha)
ffmpeg -i input.mp4 -i logo.png \
  -filter_complex "overlay=W-w-10:H-h-10:format=auto" \
  output.mp4
```

## Text overlay

```bash
# Text in bottom-left, white with shadow
ffmpeg -i input.mp4 \
  -vf "drawtext=text='Your Text':fontsize=36:fontcolor=white:x=20:y=H-th-20:shadowx=2:shadowy=2" \
  output.mp4

# Timestamp overlay
ffmpeg -i input.mp4 \
  -vf "drawtext=text='%{pts\:hms}':fontsize=24:fontcolor=white:x=10:y=10" \
  output.mp4
```

## GIF

```bash
# Generate palette for better quality
ffmpeg -i input.mp4 -vf "fps=15,scale=640:-1:flags=lanczos,palettegen" palette.png

# Create GIF using palette
ffmpeg -i input.mp4 -i palette.png \
  -filter_complex "fps=15,scale=640:-1:flags=lanczos[x];[x][1:v]paletteuse" \
  output.gif
```

Always use the two-step palette method — direct conversion produces poor quality.

## Stack videos

```bash
# Side by side
ffmpeg -i left.mp4 -i right.mp4 -filter_complex hstack output.mp4

# Top and bottom
ffmpeg -i top.mp4 -i bottom.mp4 -filter_complex vstack output.mp4

# 2×2 grid
ffmpeg -i a.mp4 -i b.mp4 -i c.mp4 -i d.mp4 \
  -filter_complex "[0:v][1:v]hstack[top];[2:v][3:v]hstack[bottom];[top][bottom]vstack" \
  output.mp4
```

## Stabilize shaky video

```bash
# Step 1: analyze
ffmpeg -i input.mp4 -vf vidstabdetect=shakiness=10:accuracy=15 -f null -

# Step 2: apply stabilization
ffmpeg -i input.mp4 -vf vidstabtransform=smoothing=30 output.mp4
```

Requires `vidstab` plugin (`brew install ffmpeg` includes it on macOS).

## Extract frames

```bash
# All frames
ffmpeg -i input.mp4 frames/frame_%04d.png

# 1 frame per second
ffmpeg -i input.mp4 -vf fps=1 frames/frame_%04d.png

# Specific timestamp
ffmpeg -i input.mp4 -ss 00:00:10 -vframes 1 thumbnail.png
```
