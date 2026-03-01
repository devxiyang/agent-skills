---
name: media
description: Process video and audio files using ffmpeg. Convert formats, compress, trim, edit, add subtitles, mix audio, and batch process media files.
requires: bin:ffmpeg
tags: video,audio,ffmpeg,media,subtitles,gif
---

# Media Skill

Powered by **ffmpeg**. All operations run locally — no uploads, no cloud.

## Preflight

```bash
ffmpeg -version
ffprobe -version
```

If missing, load `references/install.md`.

## Quick reference

| Task | Reference |
|---|---|
| Compress, resize, trim, effects, GIF | `references/video.md` |
| Volume, mixing, normalization, background music | `references/audio.md` |
| Hard/soft subtitles, burn-in, SRT | `references/subtitles.md` |
| Format conversion, codec selection | `references/convert.md` |
| Batch processing multiple files | `references/batch.md` |
| Errors, sync issues, codec problems | `references/troubleshoot.md` |

## Core operations

### Inspect a file

Always inspect before processing — know your input.

```bash
ffprobe -v quiet -print_format json -show_format -show_streams input.mp4
```

### Trim

```bash
# Fast trim (no re-encode) — slight keyframe offset possible
ffmpeg -i input.mp4 -ss 00:01:00 -to 00:02:30 -c copy output.mp4

# Precise trim (re-encodes) — frame-accurate
ffmpeg -ss 00:01:00 -i input.mp4 -to 00:02:30 output.mp4
```

### Extract audio

```bash
ffmpeg -i input.mp4 -vn -acodec copy output.aac
ffmpeg -i input.mp4 -vn -acodec mp3 -q:a 2 output.mp3
```

### Remove audio

```bash
ffmpeg -i input.mp4 -an -c:v copy output.mp4
```

### Concatenate

```bash
printf "file 'part1.mp4'\nfile 'part2.mp4'\n" > list.txt
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```

### Extract a frame

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -vframes 1 thumbnail.png
```

### Speed up / slow down

```bash
# 2× speed
ffmpeg -i input.mp4 -vf setpts=0.5*PTS -af atempo=2.0 output.mp4

# 0.5× speed
ffmpeg -i input.mp4 -vf setpts=2.0*PTS -af atempo=0.5 output.mp4
```
