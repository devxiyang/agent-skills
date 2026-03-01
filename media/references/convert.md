# Format Conversion

## Codec quick-pick guide

| Goal | Video codec | Audio codec | Container |
|---|---|---|---|
| Maximum compatibility | `libx264` | `aac` | `.mp4` |
| Smaller file, modern devices | `libx265` | `aac` | `.mp4` |
| Web streaming | `libx264` | `aac` | `.mp4` |
| High quality archiving | `libx264` | `flac` | `.mkv` |
| Edit-friendly (fast seek) | `copy` | `copy` | `.mkv` |
| iOS / iMessage | `libx264` | `aac` | `.mp4` |
| Twitter / social | `libx264` | `aac` | `.mp4` |

## Common conversions

```bash
# MOV → MP4 (iPhone footage)
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4

# MKV → MP4 (re-mux only, no re-encode if codecs compatible)
ffmpeg -i input.mkv -c copy output.mp4

# AVI → MP4
ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4

# WebM → MP4
ffmpeg -i input.webm -c:v libx264 -c:a aac output.mp4

# MP4 → WebM (for web)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -c:a libopus output.webm
```

## Audio conversion

```bash
# WAV → MP3
ffmpeg -i input.wav -c:a mp3 -q:a 2 output.mp3

# FLAC → AAC
ffmpeg -i input.flac -c:a aac -b:a 256k output.m4a

# MP3 → WAV (uncompressed)
ffmpeg -i input.mp3 output.wav

# Any → FLAC (lossless)
ffmpeg -i input.mp3 output.flac
```

## `-c copy` vs re-encoding

| | `-c copy` | Re-encode |
|---|---|---|
| Speed | Instant | Slow |
| Quality loss | None | Slight |
| Use when | Container change only | Codec change needed |
| Trim accuracy | Keyframe-only | Frame-accurate |

```bash
# Re-mux (container change, no quality loss, instant)
ffmpeg -i input.mkv -c copy output.mp4

# Re-encode (codec change, slight quality loss)
ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4
```

## Check if re-encoding is needed

```bash
ffprobe -v quiet -show_streams -select_streams v:0 input.mkv | grep codec_name
```

If the video codec is already `h264` and you're converting to `.mp4`, use `-c copy`.

## Resolution presets

```bash
# 4K
ffmpeg -i input.mp4 -vf scale=3840:2160 -c:v libx264 -crf 18 output.mp4

# 1080p
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 output.mp4

# 720p
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 output.mp4

# 480p (mobile)
ffmpeg -i input.mp4 -vf scale=854:480 -c:v libx264 -crf 28 output.mp4
```
