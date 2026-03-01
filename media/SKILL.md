---
name: media
description: Process image, video, and audio files locally. Powered by ImageMagick (images) and ffmpeg (video/audio) — convert, compress, edit, and batch process media files.
requires: bin:ffmpeg,bin:magick
tags: image,video,audio,ffmpeg,imagemagick,media,subtitles,gif
---

# Media Skill

Covers the full media stack — image, video, and audio. All operations run locally, no uploads.

## Preflight

```bash
ffmpeg -version && ffprobe -version
magick --version
```

If missing, load `references/install.md`.

## Quick reference

| Type | Task | Reference |
|---|---|---|
| **Image** | Convert, resize, crop, compress, watermark, GIF | `references/image.md` |
| **Video** | Compress, resize, trim, effects, GIF, overlay | `references/video.md` |
| **Audio** | Volume, mixing, normalization, background music | `references/audio.md` |
| **Video** | Hard/soft subtitles, burn-in, SRT | `references/subtitles.md` |
| **Video** | Format conversion, codec selection | `references/convert.md` |
| **All** | Batch processing multiple files | `references/batch.md` |
| **All** | Errors, sync issues, codec problems | `references/troubleshoot.md` |

## Core operations

### Inspect a file

```bash
# Video / audio
ffprobe -v quiet -print_format json -show_format -show_streams input.mp4

# Image
magick identify -verbose input.jpg
```

### Trim video

```bash
# Fast (no re-encode)
ffmpeg -i input.mp4 -ss 00:01:00 -to 00:02:30 -c copy output.mp4

# Frame-accurate (re-encodes)
ffmpeg -ss 00:01:00 -i input.mp4 -to 00:02:30 output.mp4
```

### Extract audio

```bash
ffmpeg -i input.mp4 -vn -acodec mp3 -q:a 2 output.mp3
```

### Resize image

```bash
magick input.jpg -resize 1200x\> output.jpg   # max 1200px wide
```

### Batch compress images

```bash
magick mogrify -quality 80 -strip *.jpg
```

### Extract frame from video

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -vframes 1 thumbnail.png
```
