# Order for pickup — prototype

An order-ahead pickup flow for the PDG Cafe: browse the menu, customise an item,
choose a pickup time, pay, and track the order to "ready". Café visitors can place
an order before arriving and grab it on the go.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The responsive website (nav, hero, menu grid, customise modal, slide-in cart, confirmation overlay). Open this one. |
| `styles.css` | All styles, built from the brand tokens (colour, spacing, radius, border/focus widths) with `pdg-` component classes. |
| `app.js` | Menu data, per-item options, cart + pickup-time state, and the order flow. No framework. |
| `mobile-prototype.html` | The same flow as a single-file, phone-framed prototype (self-contained). |

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000/cafe/pickup/`.

## Notes

- Type is **DM Sans** (DM Mono for prices and the pickup code), loaded from Google Fonts.
- The menu (Flat White, Cold Brew Set, Protein Bowl, Pastry Pass) and USD prices
  match the cafe menu; edit the `MENU` and `OPTS` objects at the top of `app.js`.
- **Design system:** the site links the shared tokens at `design-system/tokens.css`
  for colours, spacing, radius and border/focus widths. `styles.css` only aliases a
  few names it spells differently (`--bg` → `--background`, `--bw` → `--border-width`,
  `--focus-ring` → `--focus-ring-width`) and adds a couple of prototype-only tokens.
- **Logo:** the hero uses the real neon-sign photo at
  `design-system/assets/Logos/product-designer-gym-neon.png`. The small nav and footer
  marks stay as an inline SVG, because the asset README says the photo must not be
  shrunk below ~160px (the wordmark stops reading).
- `mobile-prototype.html` stays self-contained (its own tokens and SVG mark) so it
  opens standalone.
