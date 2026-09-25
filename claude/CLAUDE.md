# Isodesic — project notes

Freelance product design business site for **Isodesic** (solo designer, ~20 years in the
outdoor industry: ultralight backpacking tents, sleeping pads, camp furniture, luggage,
packs, and technical hardgoods beyond outdoor).

Scope so far: **landing page** (essentially complete apart from photos). Portfolio index and per-project pages are planned but
not built.

## Files

Local folder: `C:\Users\Will\Documents\GitHub\isodesic.github.io\claude` (in the GitHub repo).

| File | Role |
|---|---|
| `index.html` | **Current landing page** (was `index-v3.html`). Edit this one. |
| `styles.css` | **Current stylesheet** (was `styles-v3.css`). Section 15 = services intro, tile kickers, expert witness, `<img>` About photo. |
| `motion.js` | No libraries: scroll reveal, nav shadow, active nav link, mobile menu a11y, hero slideshow (dots, autoplay, pause, swipe) |
| `images/isodesic-logo.png` | Logo, whitespace cropped (386×200). Used at 44px tall in the nav and as the JSON-LD logo. |
| `images/isodesic_logo_400x400.png` | Original padded logo. Not used by the site; kept just in case. |
| `images/will-mcelwain-portrait.jpg` | About photo, 800×1000, web-optimized from `images/old/about_me_4x5.jpg` |
| `images/landing_heroes/` | Hero slideshow photos (2400×1000) |
| `images/old/` | Source/unused photos |
| `favicon/` | `favicon.ico` (16/32/48), 16 + 32 px PNGs, `apple-touch-icon.png` (180), Android 192/512 PNGs, `site.webmanifest`. All linked from `index.html` `<head>`. |
| `projects/tiger-wall*.html` | Tiger Wall project page drafts. **Work in progress; the user will clean these up** when project pages start. Don't touch until then. |
| `robots.txt`, `sitemap.xml`, `llms.txt` | Crawler + AI-discovery files, using `https://isodesic.com/` URLs |
| `media.js`, `support.js` | Older helper scripts, not loaded by `index.html` |
| `archive (delete)/` | Old versions (v1, v2, v3 variants, early `.dc.html` explorations). Reference only; don't edit. |

## How the user works

- Plain static HTML + CSS, hand-edited by the user. **Keep the HTML readable**: semantic
  markup, class names, section comments, all styling in the CSS file.
- Minimal JavaScript, no frameworks or libraries. Prefer CSS for motion; JS only for what
  CSS can't do. The page must still work with `motion.js` deleted.
- Small, targeted changes. Don't redesign or "improve" anything not asked for.

## Design system

- Palette (CSS custom properties at the top of the stylesheet):
  `--blue #1b9ad6`, `--blue-dark #1478a8`, `--blue-light #9bc6e9`,
  `--ink #33383d`, `--ink-soft #5a6066`, `--ink-faint #6f757b`,
  `--paper #fdfdfc`, `--paper-tint #f4f7f9`, `--rule #e9ebed`
- Type: **Figtree** (headings + body), **IBM Plex Mono** (small labels, `01 / WORK`).
- Layout: 1440px max width; each section is a `220px` label column + content column
  (`.cols`), collapsing to one column at the single breakpoint, **900px**.
- Rounded 12px cards on tinted backgrounds; alternating white / `--paper-tint` sections.
- Note: the user chose to keep the paler blue on `.sec-num`, `.step-num`, and the Industries
  band even though those fall short of WCAG AA contrast. **Don't "fix" them again.**
- Photos are grey striped `.ph` placeholders with a mono caption. Replace with
  `<img>` when real photos arrive. Never hand-draw SVG imagery.

## Sections (landing page)

Hero (crossfading slideshow in `images/landing_heroes/`; photos 2400×1000, per-photo `--focus` crop point, optional `data-credit="Name"` shown lower right with a camera icon on desktop only, hidden at ≤900px; first photo keeps `is-current`) → 01 Work (featured project + 3-card grid) → 02 Services (intro + 6 tiles, each with a 5:2 photo on top; a photo-on-the-right version was tried and rejected) →
03 Process (4 steps) → 04 Industries (chips + client names) → 05 Expert witness →
06 About (portrait + bio) → Contact (email link + availability) → footer.

## Content status

Filled from the master resume (`Will_McElwain_Master_Resume_v7.md`) on 2026-09-23:
hero, services, process, industries chips, client names, about bio, contact, footer,
all head metadata, and JSON-LD. Contact email is **will@isodesic.com**.

Real, user-supplied project card text (**keep verbatim**):
- Big Agnes Tiger Wall Tents — "The best space-to-weight ratio in an ultralight backpacking tent."
- Big Agnes Camp Chair Collection — a new line of camp chairs
- WrovenDen — a kids travel tent

Shibumi Shade Wind Assist card text was drafted by Claude; confirm or rewrite.
About bio is a draft; the user plans to write his own.
Helius is intentionally left out of the client list.
Kathmandu is left out of the client list (pre-launch; confirm before naming).

## Open to-dos

- Real photos + descriptive `alt` text on every image (biggest remaining SEO win). Service tile
  photos: 1500×600 (5:2), swap each `.ph.tile-img` for `<img class="tile-img">`.
- Remaining `[PLACEHOLDER]`s are photo alt text and `og:image:alt`; they wait on real images.
- Create `images/social-preview.jpg` (1200×630) and fill in `og:image:alt`. (Favicons done 2026-09-24.)
- **User's own to-dos:** give `favicon/apple-touch-icon.png` a white background (iOS shows
  transparency as black); make `images/isodesic-logo.png` transparent instead of white so it
  sits on the translucent nav bar; write more descriptive hero photo alt text ("Selling in
  Seattle" is correct as written).
- Build the portfolio index (`work.html`) and per-project pages
  (`projects/tiger-wall.html`, `wind-assist.html`, `camp-chairs.html`, `wrovenden.html`) —
  the landing page already links to those paths. Only Tiger Wall drafts exist so far.
- Client logos in the Industries section (names show as text in `.logo-slot` for now).
- Known limitation, accepted: the "About" nav item barely highlights on scroll because the
  page runs out of scroll height before About reaches the marker line. A viewport-coverage
  approach was tried and felt glitchy; reverted. Leave it unless asked.
