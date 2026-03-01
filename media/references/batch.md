# Batch Processing

## Convert all files in a folder

```bash
# Convert all .mov to .mp4
for f in *.mov; do
  ffmpeg -i "$f" -c:v libx264 -c:a aac "${f%.mov}.mp4"
done

# Convert all .avi to .mp4
for f in *.avi; do
  ffmpeg -i "$f" -c:v libx264 -c:a aac "${f%.avi}.mp4"
done
```

## Compress all videos in a folder

```bash
mkdir -p compressed
for f in *.mp4; do
  ffmpeg -i "$f" -c:v libx264 -crf 28 -preset fast "compressed/$f"
done
```

## Resize all videos

```bash
mkdir -p resized
for f in *.mp4; do
  ffmpeg -i "$f" -vf scale=1280:-2 -c:v libx264 "resized/$f"
done
```

## Extract audio from all videos

```bash
mkdir -p audio
for f in *.mp4; do
  ffmpeg -i "$f" -vn -c:a mp3 -q:a 2 "audio/${f%.mp4}.mp3"
done
```

## Batch trim (same timestamps for all files)

```bash
for f in *.mp4; do
  ffmpeg -i "$f" -ss 00:00:05 -to 00:01:00 -c copy "trimmed_$f"
done
```

## Add watermark to all videos

```bash
for f in *.mp4; do
  ffmpeg -i "$f" -i logo.png \
    -filter_complex "overlay=W-w-10:H-h-10" \
    "watermarked_$f"
done
```

## Burn subtitles for all videos (matching .srt files)

```bash
# Expects input.mp4 and input.srt to share the same base name
for f in *.mp4; do
  base="${f%.mp4}"
  if [ -f "$base.srt" ]; then
    ffmpeg -i "$f" -vf subtitles="$base.srt" "subbed_$f"
  fi
done
```

## Parallel processing

Process multiple files simultaneously using background jobs:

```bash
for f in *.mp4; do
  ffmpeg -i "$f" -c:v libx264 -crf 28 "compressed_$f" &
done
wait
echo "All done"
```

Limit parallel jobs to avoid overloading the CPU:

```bash
max_jobs=4
for f in *.mp4; do
  ffmpeg -i "$f" -c:v libx264 -crf 28 "compressed_$f" &
  while [ "$(jobs -r | wc -l)" -ge "$max_jobs" ]; do sleep 1; done
done
wait
```

## Generate thumbnails for all videos

```bash
mkdir -p thumbnails
for f in *.mp4; do
  ffmpeg -i "$f" -ss 00:00:03 -vframes 1 "thumbnails/${f%.mp4}.jpg"
done
```
