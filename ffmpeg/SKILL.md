---
name: ffmpeg
description: Process video and audio files with ffmpeg. Use for converting formats, compressing, trimming, extracting audio, resizing, and combining media.
requires: bin:ffmpeg
tags: video,audio,ffmpeg,media
---

# ffmpeg Skill

## Preflight

```bash
ffmpeg -version
```

If missing, load `references/install.md` for installation instructions.

## Convert format

```bash
# Video format conversion
ffmpeg -i input.mp4 output.mkv
ffmpeg -i input.mov output.mp4

# Audio format conversion
ffmpeg -i input.mp3 output.aac
ffmpeg -i input.wav output.mp3
```

## Compress video

```bash
# Compress with H.264 (lower crf = higher quality, 18–28 is typical)
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 output.mp4

# Compress with H.265 (better compression than H.264)
ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4

# Target a specific file size (2-pass encoding)
ffmpeg -i input.mp4 -b:v 1M output.mp4
```

## Trim

```bash
# Trim from 00:01:00 for 30 seconds
ffmpeg -i input.mp4 -ss 00:01:00 -t 30 -c copy output.mp4

# Trim between two timestamps
ffmpeg -i input.mp4 -ss 00:01:00 -to 00:02:30 -c copy output.mp4
```

## Extract audio

```bash
# Extract audio as mp3
ffmpeg -i input.mp4 -vn -acodec mp3 output.mp3

# Extract audio as aac
ffmpeg -i input.mp4 -vn -acodec aac output.aac

# Extract audio without re-encoding
ffmpeg -i input.mp4 -vn -acodec copy output.aac
```

## Resize video

```bash
# Resize to specific width, keep aspect ratio
ffmpeg -i input.mp4 -vf scale=1280:-1 output.mp4

# Resize to 1080p
ffmpeg -i input.mp4 -vf scale=1920:1080 output.mp4

# Scale to half size
ffmpeg -i input.mp4 -vf scale=iw/2:ih/2 output.mp4
```

## Extract frames

```bash
# Extract one frame per second
ffmpeg -i input.mp4 -vf fps=1 frame_%04d.png

# Extract a single frame at a timestamp
ffmpeg -i input.mp4 -ss 00:00:05 -vframes 1 thumbnail.png
```

## Combine / concatenate

```bash
# Concatenate files of the same format
printf "file 'part1.mp4'\nfile 'part2.mp4'\n" > list.txt
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4

# Stack two videos side by side
ffmpeg -i left.mp4 -i right.mp4 -filter_complex hstack output.mp4

# Stack two videos vertically
ffmpeg -i top.mp4 -i bottom.mp4 -filter_complex vstack output.mp4
```

## Remove audio

```bash
ffmpeg -i input.mp4 -an output.mp4
```

## Speed up / slow down

```bash
# 2x speed (video + audio)
ffmpeg -i input.mp4 -vf setpts=0.5*PTS -af atempo=2.0 output.mp4

# 0.5x speed (video + audio)
ffmpeg -i input.mp4 -vf setpts=2.0*PTS -af atempo=0.5 output.mp4
```

## Inspect file

```bash
ffprobe -v quiet -print_format json -show_format -show_streams input.mp4
```
