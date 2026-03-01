---
name: web-ppt
description: Create presentation slides as a single self-contained HTML file with no dependencies. Pure HTML, CSS, and minimal JavaScript — keyboard navigation, smooth transitions, multiple layouts, and easy theming.
requires: —
tags: presentation,html,css,slides,ppt
---

# Web PPT Skill

Produce a **single `.html` file** that opens in any browser. No build tools, no CDN, no external fonts — everything inline.

## Core principles

- One file, zero dependencies. Images go in as `<img>` tags or base64 data URIs.
- 16:9 ratio (1280 × 720 logical units) scaled to fill any screen.
- CSS custom properties for theme colors — change two variables to re-skin the whole deck.
- Keyboard: `→` / `Space` = next, `←` = previous, `F` = fullscreen.
- Click anywhere on a slide = next slide.
- Slide counter always visible in the bottom-right corner.

## Slide layouts

| Class | Purpose |
|---|---|
| `layout-cover` | Title slide — large title + subtitle |
| `layout-title` | Section divider — bold title, optional label above |
| `layout-content` | Heading + bullet list |
| `layout-two-col` | Heading + two equal columns |
| `layout-quote` | Full-screen pull quote with attribution |
| `layout-code` | Heading + code block |
| `layout-blank` | No chrome — full creative control |

## References

Before generating a deck, load the relevant guides:

- `references/typography.md` — font sizes, line height, character limits
- `references/colors.md` — themes, contrast rules, color roles
- `references/visual-hierarchy.md` — layout, whitespace, guiding the eye
- `references/common-mistakes.md` — what to avoid and how to fix it
- `references/templates.md` — slide-by-slide structures for common scenarios

## Complete boilerplate

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Presentation</title>
<style>
/* ── Theme ── */
:root {
  --bg:      #0f172a;
  --surface: #1e293b;
  --accent:  #38bdf8;
  --text:    #f1f5f9;
  --muted:   #94a3b8;
  --code-bg: #0d1117;
}

/* ── Reset & base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 100%; height: 100%; background: #000; overflow: hidden; }

/* ── Stage: scales 1280×720 to fit any screen ── */
.stage {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.deck {
  width: 1280px; height: 720px;
  position: relative; overflow: hidden;
  transform-origin: center center;
  background: var(--bg); color: var(--text);
  font-family: system-ui, -apple-system, sans-serif;
}

/* ── Slides ── */
.slide {
  position: absolute; inset: 0;
  padding: 64px 80px;
  display: none; flex-direction: column; justify-content: center;
  opacity: 0; transition: opacity .3s ease;
}
.slide.active { display: flex; opacity: 1; }

/* ── Counter ── */
.counter {
  position: absolute; bottom: 24px; right: 36px;
  font-size: 14px; color: var(--muted); letter-spacing: .05em;
  pointer-events: none;
}

/* ── Typography ── */
h1 { font-size: 64px; font-weight: 700; line-height: 1.1; letter-spacing: -.02em; }
h2 { font-size: 44px; font-weight: 700; line-height: 1.2; letter-spacing: -.01em; }
h3 { font-size: 28px; font-weight: 600; color: var(--muted); margin-bottom: 32px; }
p, li { font-size: 26px; line-height: 1.6; color: var(--text); }
ul { list-style: none; display: flex; flex-direction: column; gap: 20px; }
ul li::before { content: '→ '; color: var(--accent); font-weight: 700; }
strong { color: var(--accent); font-weight: 700; }

/* ── Layouts ── */

/* Cover */
.layout-cover { align-items: flex-start; justify-content: flex-end; padding-bottom: 96px; }
.layout-cover h1 { max-width: 900px; }
.layout-cover .subtitle { font-size: 26px; color: var(--muted); margin-top: 20px; }
.layout-cover .label {
  font-size: 14px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 24px;
}

/* Title / section divider */
.layout-title { align-items: center; text-align: center; gap: 16px; }
.layout-title .label {
  font-size: 14px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
  color: var(--accent);
}

/* Content */
.layout-content { justify-content: flex-start; padding-top: 80px; gap: 40px; }
.layout-content h2 { border-left: 4px solid var(--accent); padding-left: 20px; }

/* Two-column */
.layout-two-col { justify-content: flex-start; padding-top: 80px; }
.layout-two-col h2 { border-left: 4px solid var(--accent); padding-left: 20px; margin-bottom: 40px; }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }

/* Quote */
.layout-quote { align-items: center; text-align: center; gap: 32px; }
.layout-quote blockquote {
  font-size: 40px; font-weight: 600; line-height: 1.35;
  max-width: 900px; color: var(--text);
  quotes: '\201C' '\201D';
}
.layout-quote blockquote::before {
  content: open-quote; color: var(--accent);
  font-size: 80px; line-height: 0; vertical-align: -.4em; margin-right: 8px;
}
.layout-quote cite { font-size: 20px; color: var(--muted); font-style: normal; }

/* Code */
.layout-code { justify-content: flex-start; padding-top: 80px; gap: 32px; }
.layout-code h2 { border-left: 4px solid var(--accent); padding-left: 20px; }
pre {
  background: var(--code-bg); border: 1px solid #30363d;
  border-radius: 8px; padding: 28px 32px; overflow: auto;
}
code { font-family: 'Cascadia Code', 'Fira Code', monospace; font-size: 20px; line-height: 1.7; color: #e6edf3; }

/* Accent bar at top */
.slide::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, var(--accent), transparent);
}
.layout-cover::before { display: none; }
</style>
</head>
<body>

<div class="stage">
<div class="deck" id="deck">

  <!-- SLIDE 1: Cover -->
  <div class="slide layout-cover active">
    <span class="label">Your Label Here</span>
    <h1>Your Presentation<br><strong>Title Here</strong></h1>
    <p class="subtitle">Subtitle or author · Date</p>
  </div>

  <!-- SLIDE 2: Section title -->
  <div class="slide layout-title">
    <span class="label">Section 01</span>
    <h1>Section Title</h1>
  </div>

  <!-- SLIDE 3: Content with bullets -->
  <div class="slide layout-content">
    <h2>Key Points</h2>
    <ul>
      <li>First important point goes here</li>
      <li>Second point with <strong>emphasis</strong></li>
      <li>Third point — keep each one concise</li>
      <li>One idea per bullet, max 4–5 bullets</li>
    </ul>
  </div>

  <!-- SLIDE 4: Two columns -->
  <div class="slide layout-two-col">
    <h2>Compare & Contrast</h2>
    <div class="cols">
      <div>
        <h3>Option A</h3>
        <ul>
          <li>Faster to ship</li>
          <li>Lower cost</li>
        </ul>
      </div>
      <div>
        <h3>Option B</h3>
        <ul>
          <li>More scalable</li>
          <li>Better long-term</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 5: Quote -->
  <div class="slide layout-quote">
    <blockquote>The best slide is the one that makes your point without you having to explain it.</blockquote>
    <cite>— Someone wise</cite>
  </div>

  <!-- SLIDE 6: Code -->
  <div class="slide layout-code">
    <h2>Code Example</h2>
    <pre><code>function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World')); // Hello, World!</code></pre>
  </div>

  <div class="counter">1 / 6</div>

</div><!-- .deck -->
</div><!-- .stage -->

<script>
(function () {
  const deck = document.getElementById('deck');
  const slides = deck.querySelectorAll('.slide');
  const counter = deck.querySelector('.counter');
  let cur = 0;

  function scale() {
    const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    deck.style.transform = `scale(${s})`;
  }
  scale();
  window.addEventListener('resize', scale);

  function go(n) {
    slides[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    counter.textContent = `${cur + 1} / ${slides.length}`;
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(cur + 1); }
    if (e.key === 'ArrowLeft')                   { e.preventDefault(); go(cur - 1); }
    if (e.key === 'f' || e.key === 'F')          { document.fullscreenElement ? document.exitFullscreen() : deck.requestFullscreen(); }
  });

  deck.addEventListener('click', () => go(cur + 1));
})();
</script>
</body>
</html>
```

## Adding images

```html
<!-- Base64 (truly self-contained) -->
<div class="slide layout-blank">
  <img src="data:image/png;base64,..." style="width:100%;height:100%;object-fit:cover;">
</div>

<!-- Local file (same folder) -->
<img src="chart.png" style="max-width:100%; max-height:500px;">
```
