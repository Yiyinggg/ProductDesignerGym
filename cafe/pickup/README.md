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
- The logo is an inline SVG recreation of the neon mark. The repo also ships the
  real asset at `design-system/assets/Logos/product-designer-gym-neon.png` and shared
  tokens at `design-system/tokens.css` — a follow-up could wire this prototype to
  those instead of its own copy of the tokens.
