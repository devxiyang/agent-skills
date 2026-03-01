# Visual Hierarchy

## The Z-pattern

Eyes enter top-left, scan right, drop down, scan left-to-right again. Place the most important element top-left or top-center. Place the call-to-action or key number where the eye lands last — bottom-right.

## Size is the strongest signal

The biggest element on the slide gets read first. If the title is 44px and a number is 80px, the number is the message. Use this deliberately:

```html
<!-- Lead with the metric, explain with the title -->
<div class="slide layout-content">
  <h2>User growth this quarter</h2>
  <p style="font-size:96px; font-weight:700; color:var(--accent);">+47%</p>
  <p style="color:var(--muted);">vs 12% same period last year</p>
</div>
```

## Whitespace is not wasted space

Padding of 64–80px on all sides is the default. Don't shrink it to fit more content — remove content instead. A slide with breathing room looks intentional. A crowded slide looks unfinished.

**Rule:** if you feel the urge to reduce font size to fit content, split the slide.

## Visual weight

| Heavy | Light |
|---|---|
| Bold, large text | Regular, small text |
| Bright accent color | Muted / gray |
| Filled shapes | Outlines |
| Left-aligned | Center or right-aligned |

Place heavy elements first in reading order (top-left). Use light elements for supporting detail.

## Alignment

- **Left-align** body content — easiest to read, most professional
- **Center-align** only for cover and title slides
- **Never mix** left and center alignment on the same slide

All text in a column should share one left edge. Ragged edges read as careless.

## Guiding the eye with the accent bar

The default template includes a 4px accent gradient at the top of each slide. It does three things: frames the content, establishes brand color, and signals "this is a new slide." Don't remove it unless using `layout-cover` or `layout-blank`.

## When to use a full-screen visual

Use `layout-blank` when an image, chart, or diagram can make the point alone. Add a single line of text as an overlay if needed. Full-screen visuals are more memorable than any bullet list.

```html
<div class="slide layout-blank" style="padding:0; position:relative;">
  <img src="chart.png" style="width:100%; height:100%; object-fit:cover;">
  <p style="position:absolute; bottom:48px; left:80px; font-size:28px; font-weight:700;">
    Revenue doubled in 6 months.
  </p>
</div>
```
