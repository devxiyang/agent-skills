# Subtitles

## Hard subtitles (burn into video)

Hard subtitles are permanently baked into the video. They show on all players.

```bash
# From .srt file
ffmpeg -i input.mp4 -vf subtitles=subtitles.srt output.mp4

# With custom font and size
ffmpeg -i input.mp4 \
  -vf "subtitles=subtitles.srt:force_style='FontSize=24,FontName=Arial,PrimaryColour=&Hffffff'" \
  output.mp4

# From .ass file (supports rich styling)
ffmpeg -i input.mp4 -vf ass=subtitles.ass output.mp4
```

## Soft subtitles (embedded, selectable)

Soft subtitles are embedded as a separate track — viewers can toggle them on/off.

```bash
# Embed SRT into MP4
ffmpeg -i input.mp4 -i subtitles.srt \
  -c copy -c:s mov_text \
  output.mp4

# Embed into MKV (supports more subtitle formats)
ffmpeg -i input.mp4 -i subtitles.srt \
  -c copy -c:s srt \
  output.mkv
```

## Extract subtitles from a file

```bash
# Extract subtitle track 0 to SRT
ffmpeg -i input.mkv -map 0:s:0 output.srt

# Check available subtitle tracks first
ffprobe -v quiet -print_format json -show_streams input.mkv | grep codec_type
```

## Convert subtitle formats

```bash
# SRT → ASS
ffmpeg -i input.srt output.ass

# ASS → SRT
ffmpeg -i input.ass output.srt

# VTT → SRT
ffmpeg -i input.vtt output.srt
```

## Generate a simple SRT file

SRT format for reference:

```
1
00:00:01,000 --> 00:00:04,000
This is the first subtitle line.

2
00:00:05,000 --> 00:00:08,500
This is the second subtitle,
spanning two lines.
```

## Position and style (ASS format)

For precise control, use `.ass` format:

```
[Script Info]
ScriptType: v4.00+

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, Bold, Italic, Alignment, MarginV
Style: Default,Arial,28,&H00FFFFFF,0,0,2,20

[Events]
Format: Start, End, Style, Text
Dialogue: 0:00:01.00,0:00:04.00,Default,First subtitle line
Dialogue: 0:00:05.00,0:00:08.50,Default,Second subtitle line
```

`Alignment`: 1=bottom-left, 2=bottom-center, 7=top-left, 8=top-center
