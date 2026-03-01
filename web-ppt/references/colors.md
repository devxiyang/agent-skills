# Colors

## The three-color rule

Every slide only needs three roles:

| Role | Variable | Purpose |
|---|---|---|
| Background | `--bg` | Dominant — 60% of the slide |
| Text | `--text` | Readable on background |
| Accent | `--accent` | One highlight color — 10% max |

Add `--muted` for secondary text (captions, labels). That's all you need.

## Dark vs light background

**Dark background** — use when:
- Technical or product presentations
- Projected in a dim room or on screen share
- You want a modern, focused feel

**Light background** — use when:
- Business or executive audience
- Printed or viewed in a bright room
- Formal, document-like tone

## Ready-to-use themes

### Dark (default)
```css
--bg: #0f172a; --surface: #1e293b;
--accent: #38bdf8; --text: #f1f5f9; --muted: #94a3b8;
```

### Light / Corporate
```css
--bg: #ffffff; --surface: #f8fafc;
--accent: #2563eb; --text: #0f172a; --muted: #64748b;
```

### Warm Dark / Creative
```css
--bg: #1c1917; --surface: #292524;
--accent: #f97316; --text: #fafaf9; --muted: #a8a29e;
```

### Forest / Calm
```css
--bg: #0d1f18; --surface: #132d22;
--accent: #4ade80; --text: #f0fdf4; --muted: #86efac;
```

### Purple / Premium
```css
--bg: #0f0a1e; --surface: #1a1333;
--accent: #a78bfa; --text: #f5f3ff; --muted: #c4b5fd;
```

## Contrast rules

- Body text on background: **minimum 4.5:1** contrast ratio
- Large text (>24px bold): **minimum 3:1**
- Never use accent color as body text — it's for highlights only

## Color mistakes to avoid

- **More than 3 colors on one slide** — chaotic, no focal point
- **Accent on accent** — e.g. colored text on a colored background
- **Low-contrast gray on gray** — common with muted text on dark surfaces
- **Rainbow bullet points** — each bullet a different color signals nothing

## Emphasis with color

Use `<strong>` (styled as accent color) to highlight the one number or phrase that matters most per slide. One strong per bullet maximum.
