# Audio Processing

## Adjust volume

```bash
# Double the volume
ffmpeg -i input.mp4 -af volume=2.0 output.mp4

# Half the volume
ffmpeg -i input.mp4 -af volume=0.5 output.mp4

# By decibels (+6dB louder)
ffmpeg -i input.mp4 -af volume=6dB output.mp4
```

## Normalize (loudness)

```bash
# EBU R128 loudness normalization (recommended for speech/podcast)
ffmpeg -i input.mp4 -af loudnorm output.mp4

# Two-pass for more accurate result
# Pass 1: analyze
ffmpeg -i input.mp4 -af loudnorm=print_format=json -f null -

# Pass 2: apply with measured values
ffmpeg -i input.mp4 \
  -af loudnorm=measured_I=-23:measured_LRA=7:measured_tp=-2 \
  output.mp4
```

## Mix background music

```bash
# Mix voice (input 0) with music (input 1), music at 20% volume
ffmpeg -i voice.mp4 -i music.mp3 \
  -filter_complex "[1:a]volume=0.2[bg];[0:a][bg]amix=inputs=2:duration=first" \
  -c:v copy output.mp4
```

`duration=first` — output stops when the first input ends (the video).

## Replace audio track

```bash
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -map 0:v:0 -map 1:a:0 -shortest output.mp4
```

## Delay audio (fix sync)

```bash
# Delay audio by 0.5 seconds
ffmpeg -i input.mp4 -af adelay=500|500 output.mp4

# Advance audio by 0.5 seconds (delay video instead)
ffmpeg -i input.mp4 -itsoffset 0.5 -i input.mp4 -map 1:v -map 0:a -c:v copy output.mp4
```

## Fade in / fade out

```bash
# Audio fade in (first 3 seconds) + fade out (last 3 seconds of a 60s clip)
ffmpeg -i input.mp4 -af "afade=t=in:st=0:d=3,afade=t=out:st=57:d=3" output.mp4
```

## Extract and convert audio only

```bash
# Best quality copy
ffmpeg -i input.mp4 -vn -acodec copy output.aac

# Convert to MP3 (variable bitrate, high quality)
ffmpeg -i input.mp4 -vn -acodec mp3 -q:a 2 output.mp3

# Convert to WAV (uncompressed)
ffmpeg -i input.mp4 -vn output.wav
```

## Denoise (basic)

```bash
# High-pass filter to remove low rumble
ffmpeg -i input.mp4 -af highpass=f=200 output.mp4

# Low-pass filter to remove high-frequency hiss
ffmpeg -i input.mp4 -af lowpass=f=3000 output.mp4

# Both combined
ffmpeg -i input.mp4 -af "highpass=f=200,lowpass=f=3000" output.mp4
```

For advanced noise removal, use `arnndn` (AI-based):
```bash
ffmpeg -i input.mp4 -af arnndn=m=bd.rnnn output.mp4
```
