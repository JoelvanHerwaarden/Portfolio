# StructureIQ — Civil Engineering SaaS Website

## Project Structure

```
civilsaas/
├── index.html          ← Main single-page website (all sections)
├── css/
│   └── style.css       ← Full design system + all component styles
├── js/
│   └── main.js         ← Scroll effects, nav, form, animations
└── pages/              ← (optional) expand into multi-page later
    ├── products.html
    ├── projects.html
    └── contact.html
```

## Sections included
1. **Navigation** — sticky, blurs on scroll, highlights active section, mobile hamburger
2. **Hero** — headline, CTA buttons, stats, live dashboard mock card
3. **About** — bio, credentials, highlights with icons
4. **Products** — 4 tool cards (Load Analyzer, Section Designer, Project Tracker, Site Inspector)
5. **Projects** — dark-themed showcase with a featured project + 2 standard cards
6. **Contact** — info panel + working contact form
7. **Footer** — links, brand, legal

## How to run
Just open `index.html` in any browser — no build step needed.

## To expand to multiple pages
- Copy `index.html` → `pages/products.html`
- Keep the `<nav>` and `<footer>` consistent
- Update `href` links in nav to point to the page files

## Design decisions
- **Fonts**: Fraunces (display serif for headlines) + DM Sans (body)
- **Color**: Green (#16a34a) as brand primary, sky blue and amber as accents
- **Layout**: CSS Grid throughout, fully responsive
- **Animations**: IntersectionObserver fade-up on scroll, CSS-only
- **Form**: JS intercepts submit, shows success state, resets

## Customisation
Replace in `css/style.css`:
- `--c-green` → your brand color
- Google Fonts import → your font choice

Replace in `index.html`:
- "StructureIQ" → your company name
- Project/product names and descriptions
- Contact email and location
