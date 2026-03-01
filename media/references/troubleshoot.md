# Troubleshooting

## Audio/video out of sync

**Symptom:** Audio and video drift over time or are offset from the start.

```bash
# Check stream timestamps
ffprobe -v quiet -print_format json -show_streams input.mp4 | grep -E "start_time|codec"

# Fix by re-encoding (resets timestamps)
ffmpeg -i input.mp4 -c:v libx264 -c:a aac output.mp4

# Manually offset audio (delay by 500ms)
ffmpeg -i input.mp4 -af adelay=500|500 -c:v copy output.mp4

# Advance audio by 500ms (delay video)
ffmpeg -i input.mp4 -itsoffset 0.5 -i input.mp4 -map 1:v -map 0:a -c:v copy output.mp4
```

## "Invalid data found when processing input"

**Cause:** Corrupted file, wrong extension, or unsupported codec.

```bash
# Check what's actually in the file
ffprobe input.mp4

# Try forcing the input format
ffmpeg -f mp4 -i input.mp4 output.mp4

# Attempt repair
ffmpeg -i input.mp4 -c copy -avoid_negative_ts make_zero repaired.mp4
```

## Output video has no audio

**Cause:** Source has no audio, wrong stream mapping, or incompatible codec.

```bash
# Check if source has audio
ffprobe -v quiet -show_streams input.mp4 | grep codec_type

# Explicitly map both streams
ffmpeg -i input.mp4 -map 0:v:0 -map 0:a:0 -c copy output.mp4
```

## "Encoder not found" / codec not available

**Cause:** ffmpeg build doesn't include that encoder.

```bash
# Check available encoders
ffmpeg -encoders | grep 265

# macOS: use VideoToolbox hardware encoder as alternative
ffmpeg -i input.mp4 -c:v hevc_videotoolbox output.mp4
```

On macOS, install a full build: `brew install ffmpeg`

## Output file is too large

```bash
# Check current bitrate
ffprobe -v quiet -show_format input.mp4 | grep bit_rate

# Compress more aggressively (raise crf)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow output.mp4

# Cap bitrate explicitly
ffmpeg -i input.mp4 -c:v libx264 -b:v 1M -maxrate 1M -bufsize 2M output.mp4
```

## Trim is not frame-accurate

**Cause:** `-c copy` trims on keyframes only.

```bash
# Re-encode for precise trim (slower but accurate)
ffmpeg -ss 00:01:00 -i input.mp4 -to 00:02:30 -c:v libx264 -c:a aac output.mp4
```

Note: put `-ss` **before** `-i` for fast seek + re-encode.

## Green / corrupted frames

**Cause:** Missing keyframes, corrupted GOP, or hardware decoder issue.

```bash
# Force software decode
ffmpeg -hwaccel none -i input.mp4 -c:v libx264 output.mp4

# Add keyframes more frequently
ffmpeg -i input.mp4 -c:v libx264 -g 30 -keyint_min 30 output.mp4
```

## Progress is very slow

```bash
# Use faster preset (lower quality but much faster)
ffmpeg -i input.mp4 -c:v libx264 -preset ultrafast output.mp4

# Use hardware acceleration (macOS)
ffmpeg -i input.mp4 -c:v h264_videotoolbox output.mp4

# Use hardware acceleration (NVIDIA)
ffmpeg -i input.mp4 -c:v h264_nvenc output.mp4
```

## "height not divisible by 2" error

```bash
# Use -2 instead of -1 in scale filter
ffmpeg -i input.mp4 -vf scale=1280:-2 output.mp4
```

## Check ffmpeg capabilities

```bash
ffmpeg -formats        # supported formats
ffmpeg -codecs         # all codecs
ffmpeg -encoders       # available encoders
ffmpeg -decoders       # available decoders
ffmpeg -filters        # all filters
```
