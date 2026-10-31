# Earnings Trades & Implied Moves

A static site (no build step) showing this week's earnings reporters, their option-implied moves, historical average moves, consensus, a position-sizing calculator, and an AEHR deep dive.

To update it each week, edit `data.json`. The page renders from that file. Hosted on GitHub Pages from `main` /.

Not investment advice. Implied moves estimate how big a move might be, not which direction.

## How to publish a note

Either:
1. Send the note to the Earnings bot and it will add it, or
2. Edit `notes.json` directly on GitHub: https://github.com/traderkr/earnings-trades/edit/main/notes.json and commit to `main`. The site updates within a minute or two.

Notes are shown newest first. Format (a JSON array; add new objects at the top):

```json
[
  {
    "date": "2026-11-02",
    "title": "AEHR into the print",
    "ticker": "AEHR",
    "body": "First paragraph.\n\n- bullet one\n- **bold** point\n\nLink: [EarningsMoves](https://earningsmoves.com/t/AEHR/)"
  }
]
```

- `date`: `YYYY-MM-DD`. `ticker` is optional (`""` or omit it).
- `body`: plain text. A blank line (`\n\n`) starts a new paragraph, lines starting with `- ` become bullets, `**bold**` is bold, and `[text](url)` is a link. HTML is escaped and shown as plain text.
- Permalinks: `notes.html#note-<date>-<title-slug>`, e.g. `notes.html#note-2026-10-31-about-these-notes`.
