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
| `motion.js` | No libraries: scroll reveal, nav shadow, active nav link, mobile menu a11y, hero slideshow (dots, autoplay, pause, swipe), photo credits on other images (§6) |
| `images/logos/isodesic_logo_385x200.png` | **Current logo**, transparent background. Used at 44px tall in the nav and as the JSON-LD logo. |
| `images/logos/*.svg` | One-color (#231f20) brand logos, all 108 units tall. Used in Industries: The North Face, Big Agnes, Shibumi, Under Canvas, WrovenDen, Firefly Sauna, The Get Out. Not used yet: Kathmandu (pre-launch), Stanford, Isodesic blues/greys SVGs. `LinkedIn_logo.svg` is inlined in the nav. `isodesic-logo.png` there is the old white-background logo, unused. |
| `images/will-mcelwain-portrait.jpg` | About photo, 800×1000, web-optimized from `images/old/about_me_4x5.jpg` |
| `images/landing_heroes/` | Hero slideshow photos (current files 2400×1000; new spec 2400×1350) |
| `images/old/` | Source/unused photos |
| `favicon/` | `favicon.ico` (16/32/48), 16 + 32 px PNGs, `apple-touch-icon.png` (180), Android 192/512 PNGs, `site.webmanifest`. All linked from `index.html` `<head>`. |
| `prototypes/` | Industries section mockups A–H plus comparison PNGs. F was built into the site; the folder can be deleted. |
| `projects/tiger-wall*.html` | Tiger Wall project page drafts. **Work in progress; the user will clean these up** when project pages start. Don't touch until then. |
| `robots.txt`, `sitemap.xml`, `llms.txt` | Crawler + AI-discovery files, using `https://isodesic.com/` URLs |
| `media.js`, `support.js` | Older helper scripts, not loaded by `index.html` |
| `archive (delete)/` | Old versions (v1, v2, v3 variants, early `.dc.html` explorations). Reference only; don't edit. |

## Image sizes (quick reference)

Export JPGs at these sizes (about 2× the largest on-screen size, for sharp retina screens).
Where a box crops, add `style="--focus: X% Y%"` to the `<img>` to choose what stays in frame.

| Image | Export size | Ratio | Shown on screen | Status |
|---|---|---|---|---|
| Hero slideshow (`images/landing_heroes/`) | 2400 × 1350 | 16:9 | up to 1440 × 810 desktop, full width × 570 phones (sides crop; `--focus`) | **Re-export** (7 photos are still 2400 × 1000; update `width`/`height` in the HTML too) |
| Work: featured project (Tiger Wall) | 2400 × 1350 | 16:9 | up to ~1050 × 590 desktop; 3:2 on phones (~335 × 225, sides crop) | Test photo in (`featured-project-Tiger-Wall-b.jpg`) |
| Work: 3 project cards | 1280 × 850 (`_1280x850` in file name) | 3:2 | ~335 × 225 desktop and phones; up to ~860 wide on tablets | Wind Assist, WrovenDen in; camp chairs is a stand-in `(garbage)` |
| Services tiles (6) | 1500 × 600 | 5:2 | up to ~515 × 205 | **Needed** |
| About portrait | 800 × 1000 | 4:5 | 380 wide desktop, max 360 phones | Done |
| Social preview (`images/social-preview.jpg`) | 1200 × 630 | ~1.91:1 | link previews (LinkedIn, iMessage, etc.) | **Needed** |
| Nav logo (`isodesic_logo_385x200.png`) | 385 × 200 | — | 44px tall | Done |
| Brand logos (`images/logos/*.svg`) | SVG, 108 units tall, one color #231f20 | — | height set per logo with `--h` | Done |
| Favicons (`favicon/`) | 16, 32, 48 (.ico), 180, 192, 512 | 1:1 | browser tabs, home screens | Done (apple-touch-icon needs white bg) |
| Project pages (`projects/*.html`) | TBD | — | — | Not designed yet |

Work photos use `.work-img` (fixed `aspect-ratio`, set 2026-09-25; previously fixed 480px / 200px heights).
Featured is 16:9 on desktop and 3:2 on phones (≤900px) so all four match; `.grid-3 .work-img` overrides the cards to 3:2 (changed from 16:9 on 2026-09-26 after testing real photos).
1280 × 850 is a hair wider than exact 3:2 (1275 × 850); the box trims ~1px per side, not visible.

## How the user works

- Plain static HTML + CSS, hand-edited by the user. **Keep the HTML readable**: semantic
  markup, class names, section comments, all styling in the CSS file.
- Minimal JavaScript, no frameworks or libraries. Prefer CSS for motion; JS only for what
  CSS can't do. The page must still work with `motion.js` deleted.
- Small, targeted changes. Don't redesign or "improve" anything not asked for.

## Design system

- Palette (CSS custom properties at the top of the stylesheet):
  the six logo blues, lightest to darkest: `--very-light-blue #c2dbf2`, `--light-blue #9bc6e9`,
  `--medium-blue #6bb0e1`, `--blue #1a9ad6` (main), `--dark-blue #0883c6`, `--very-dark-blue #016baf`
  (links, hovers, small blue text; replaced the old non-logo `--blue-dark #1478a8` on 2026-09-25),
  `--ink #33383d` (also the hero's fallback background), `--ink-soft #5a6066`, `--ink-faint #6f757b`,
  `--paper #fdfdfc`, `--paper-tint #f4f7f9`, `--rule #e9ebed`
- Type: **Figtree** (headings + body), **IBM Plex Mono** (small labels, `01 / WORK`).
- Nav: text links, then a LinkedIn icon (inline SVG, `--ink-soft`, `--dark-blue` on hover), then the "Get in touch" button.
- Buttons (`.btn`: "Get in touch" + contact email): `--dark-blue` background, white text; hover fades to
  `--blue` (same as nav link hover), text stays white, no lift/movement (user disliked the old hover animation).
- Industries (option F, chosen 2026-09-25 from prototypes A–H): `.sec-dark` band with `--dark-blue`
  background and white text. **User's deliberate choice** despite 4.1:1 contrast (fails AA for normal
  text); don't switch it back. The `04 / INDUSTRIES` label and 01–10 numbers are `--very-light-blue`
  (2.9:1); user is considering a paler blue for them (#e0edf8, halfway to white = 3.5:1). Not changed yet. Products are a numbered `.ind-list` (01–10, two columns of 5, one column on phones).
  Brand logos sit on white 12px cards (`.ind-logos`), 4 across, 3 on phones, shown 63% black (≈ #5e5e5e).
  Each `<img>` has an inline `--h` height tuned by eye; CSS scales it ×1.3 (desktop) / ×0.85 (phones).
  User also liked prototype A's small blue triangle bullets and may reuse them elsewhere.
- Layout: 1440px max width; each section is a `220px` label column + content column
  (`.cols`), collapsing to one column at the single breakpoint, **900px**.
- Rounded 12px cards on tinted backgrounds; alternating white / `--paper-tint` sections.
- Note: the user chose to keep the paler blue on `.sec-num` and `.step-num`
  even though those fall short of WCAG AA contrast. **Don't "fix" them again.**
- Photos are grey striped `.ph` placeholders with a mono caption. Replace with
  `<img>` when real photos arrive. Never hand-draw SVG imagery.

## Sections (landing page)

Hero (crossfading slideshow in `images/landing_heroes/`; box 16:9 at 1440 × 810 desktop / 570 tall phones (changed from 600 / 460 on 2026-09-29; to revert, set `.hero` height back to 600px and 460px in the 900px media query; 620px on phones was tried and cut off the dots on an iPhone 13 mini), photos 2400×1350, per-photo `--focus` crop point, flat 20% black scrim plus text shadows on the headline and paragraph (scrim was 25% until 2026-09-30), optional `data-credit="Name"` shown lower right with a camera icon on desktop only, hidden at ≤900px; first photo keeps `is-current`) → 01 Work (featured project + 3-card grid) → 02 Services (intro + 6 tiles, each with a 5:2 photo on top; a photo-on-the-right version was tried and rejected) →
03 Process (5 steps; step 01 "Scope the work" added 2026-09-30: phased proposal, fixed fee per phase) → 04 Industries (numbered categories + brand logos) → 05 Expert witness →
06 About (portrait + bio) → Contact (email link + availability) → footer.

## Content status

Filled from the master resume (`Will_McElwain_Master_Resume_v7.md`) on 2026-09-23:
hero, services, process, industries categories, client names, about bio, contact, footer,
all head metadata, and JSON-LD. Contact email is **ideas@isodesic.com** (changed from will@ on 2026-09-30, everywhere incl. JSON-LD and `llms.txt`).

Project card text is the user's own (rewritten 2026-09-30); **keep verbatim** unless asked:
- Big Agnes Tiger Wall Tents — "The best space-to-weight ratio in a semi-freestanding ultralight tent."
- Shibumi Wind Assist Accessory — "Patented accessory that anchors the Shibumi Shade on wind-free days."
- Big Agnes Camp Chair Collection — "A unique hubless architecture enabled supremely comfortable camp chairs."
- WrovenDen Kids' Tent — "A travel crib alternative for sleep and play."

Photo credits: `data-credit="Name"` on any `<img>` shows a camera-icon credit in its lower right.
Hero: desktop only (hidden ≤900px). Work/Services and elsewhere: motion.js §6 wraps the `<img>` in
`.photo-frame` and adds `.photo-credit` (styles.css §17: smaller, white with a tight dark text shadow so it
reads on any photo incl. white product shots; shown on phones too. A dark pill background was tried and rejected). No JS = no credits; the photos still show.

About bio is a draft; the user plans to write his own.
Helius is intentionally left out of the client list.
Kathmandu is left out of the client list (pre-launch; confirm before naming).

## Service names = project tags

The six Services tile headings (`<h3>` in 02 Services) are the **canonical service names**. Each project
page in the portfolio will list the services provided on that project as tags/pills, using these names
word for word. Current names: Research & strategy · Concept design · Tech packs · Development to production ·
Sourcing & costing · Custom trims & hardware. If a heading is renamed, rename the matching tags on every
project page too (and keep the names short enough to work as pills).

## Open to-dos

- Real photos + descriptive `alt` text on every image (biggest remaining SEO win). Service tile
  photos: 1500×600 (5:2), swap each `.ph.tile-img` for `<img class="tile-img">`.
- **Alt text (user is writing these):** descriptive alt text for every photo. The Services photo alts are
  short labels that repeat the tile headings ("Sample review", "Computational design"); describe what's in
  each photo instead. Also Work photos and hero slides. `og:image:alt` is still a `[PLACEHOLDER]`.
- `images/services/services-tech-packs_h206.webp` is 516 × 206 **on purpose** (blurry for confidentiality). Don't flag it.
- Create `images/social-preview.jpg` (1200×630) and fill in `og:image:alt`. (Favicons done 2026-09-24.)
- **User's own to-dos:** give `favicon/apple-touch-icon.png` a white background (iOS shows
  transparency as black); write more descriptive hero photo alt text ("Selling in
  Seattle" is correct as written).
- Build the portfolio index (`work.html`) and per-project pages
  (`projects/tiger-wall.html`, `wind-assist.html`, `camp-chairs.html`, `wrovenden.html`) —
  the landing page already links to those paths. Only Tiger Wall drafts exist so far.
- Active nav link (motion.js §3): the "Get in touch" button is excluded, so it never changes color;
  at the very bottom of the page the last text link (About) is lit. Fixed 2026-09-25 (About used to
  never highlight, and the button text turned blue at the bottom).
