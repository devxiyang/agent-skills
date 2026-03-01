#!/usr/bin/env python3
"""
Merge multiple PDF files into one.

Usage:
    python3 pdf_merge.py a.pdf b.pdf c.pdf
    python3 pdf_merge.py a.pdf b.pdf --output merged.pdf
    python3 pdf_merge.py *.pdf --output combined.pdf
    python3 pdf_merge.py a.pdf b.pdf --pages "1-3" "all"   # page ranges per file
"""

import argparse
import sys
from pathlib import Path

try:
    from pypdf import PdfWriter, PdfReader
except ImportError:
    print('Missing dependency. Run: pip install pypdf')
    sys.exit(1)


def parse_page_range(spec: str, total: int) -> list[int]:
    """Parse page range spec like '1-3', '2', 'all' → list of 0-indexed page numbers."""
    spec = spec.strip().lower()
    if spec == 'all':
        return list(range(total))
    pages = []
    for part in spec.split(','):
        part = part.strip()
        if '-' in part:
            start, end = part.split('-', 1)
            pages.extend(range(int(start) - 1, int(end)))
        else:
            pages.append(int(part) - 1)
    return [p for p in pages if 0 <= p < total]


def main() -> None:
    parser = argparse.ArgumentParser(description='Merge PDF files')
    parser.add_argument('inputs', nargs='+', help='Input PDF files (in order)')
    parser.add_argument('--output', '-o', default='merged.pdf', help='Output PDF (default: merged.pdf)')
    parser.add_argument('--pages', nargs='*',
                        help='Page ranges per file, e.g. "1-3" "all" "2,4" (default: all pages)')
    args = parser.parse_args()

    inputs = [Path(p) for p in args.inputs]
    for p in inputs:
        if not p.exists():
            print(f'Error: {p} not found')
            sys.exit(1)

    writer = PdfWriter()
    total_pages = 0

    for i, path in enumerate(inputs):
        reader = PdfReader(str(path))
        n = len(reader.pages)

        if args.pages and i < len(args.pages):
            page_nums = parse_page_range(args.pages[i], n)
        else:
            page_nums = list(range(n))

        for p in page_nums:
            writer.add_page(reader.pages[p])

        total_pages += len(page_nums)
        print(f'  + {path.name} ({len(page_nums)}/{n} pages)')

    out = Path(args.output)
    with open(out, 'wb') as f:
        writer.write(f)

    print(f'Saved → {out} ({total_pages} pages total)')


if __name__ == '__main__':
    main()
