# Typography

## Font size scale

| Role        | Size  | Usage                          |
|-------------|-------|--------------------------------|
| Hero        | 72px  | Cover title only               |
| Heading     | 44px  | Slide title                    |
| Subheading  | 28px  | Section label, column header   |
| Body        | 24px  | Bullets, paragraphs            |
| Caption     | 16px  | Source, footnote, slide counter|

Never use more than 3 sizes on a single slide.

## Line height

| Content type | Line height |
|---|---|
| Headline | 1.1 |
| Body text | 1.6 |
| Code | 1.7 |

Tight headlines look confident. Loose body text is easier to scan.

## Character limits per slide

| Element | Max |
|---|---|
| Title | 8 words |
| Single bullet | 12 words |
| Bullets per slide | 5 |
| Body paragraph | 40 words |

If you're over the limit, split the slide. A slide that needs scrolling has already failed.

## Font weight

- Use **700** for titles and emphasis only
- Use **400** for body text
- Avoid 3+ weights on one slide — it looks noisy

## Letter spacing

- Titles: `-0.02em` (tighter, more authority)
- Labels / ALL CAPS tags: `+0.12em` (wider, more readable)
- Body: `0` (default)

## Font stack (no external dependencies)

```css
/* Modern system stack */
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace for code */
font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
```

System fonts load instantly and look native on every OS.
