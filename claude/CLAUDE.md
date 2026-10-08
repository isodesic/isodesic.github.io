# Isodesic — project notes

Freelance product design business site for **Isodesic** (solo designer, ~20 years in the
outdoor industry: ultralight backpacking tents, sleeping pads, camp furniture, luggage,
packs, and technical hardgoods beyond outdoor).

Scope so far: **landing page** (essentially complete; all photos in as of 2026-10-06; 05 Expert witness
restyled and tightened 2026-10-07. Next up: alt text and the social preview image). Portfolio index and per-project pages are planned but
not built.

## Files

Local folder: `C:\Users\Will\Documents\GitHub\isodesic.github.io\claude` (in the GitHub repo).

| File | Role |
|---|---|
| `index.html` | **Current landing page** (was `index-v3.html`). Edit this one. |
| `styles.css` | **Current stylesheet** (was `styles-v3.css`). Section 15 = services intro, tile kickers, expert witness, `<img>` About photo. |
| `motion.js` | No libraries: scroll reveal, nav shadow, active nav link, mobile menu a11y, hero slideshow (dots, autoplay, pause, swipe), photo credits on other images (§6). Scroll reveal (§1) fires when an element's top passes 12% up from the bottom of the screen (`threshold: 0`; was `0.08` until 2026-10-06, which made tall blocks like the stacked Services tiles on phones wait until 8% of their full height was showing). |
| `images/logos/isodesic_logo_385x200.png` | **Current logo**, transparent background. Used at 44px tall in the nav and as the JSON-LD logo. |
| `images/logos/*.svg` | One-color (#231f20) brand logos, all 108 units tall. Used in Industries: The North Face, Big Agnes, Shibumi, Under Canvas, WrovenDen, Firefly Sauna, The Get Out. Not used yet: Kathmandu (pre-launch), Stanford, Isodesic blues/greys SVGs. `LinkedIn_logo.svg` is inlined in the nav. `isodesic-logo.png` there is the old white-background logo, unused. |
| `images/will-mcelwain-portrait.jpg` | About photo, 800×1000, web-optimized from `images/old/about_me_4x5.jpg` |
| `images/landing_heroes/` | Hero slideshow photos, all 2400×1350 WebP (`_h1350.webp`; `rc`/`rc2` = re-crops). Matching `_q98.jpg` files are high-quality masters, not used by the page. |
| `images/services/` | Services tile photos, 1500×600 WebP (`_h600.webp`). Numbered/lettered files (`3b`, `4c`, `7`…) are alternates; only the six referenced in `index.html` are live. |
| `images/old/` | Source/unused photos |
| `favicon/` | `favicon.ico` (16/32/48), 16 + 32 px PNGs, `apple-touch-icon.png` (180), Android 192/512 PNGs, `site.webmanifest`. All linked from `index.html` `<head>`. |
| `prototypes/` | Industries section mockups A–H plus comparison PNGs. F was built into the site; the folder can be deleted. |
| `projects/tiger-wall*.html` | Tiger Wall project page drafts. **Work in progress; the user will clean these up** when project pages start. Don't touch until then. |
| `robots.txt`, `sitemap.xml`, `llms.txt` | Crawler + AI-discovery files, using `https://isodesic.com/` URLs |
| `media.js`, `support.js` | Older helper scripts, not loaded by `index.html` |
| `archive (delete)/` | Old versions (v1, v2, v3 variants, early `.dc.html` explorations). Reference only; don't edit. |

## Image sizes (quick reference)

Export at these sizes (about 2× the largest on-screen size, for sharp retina screens). The page now
uses **WebP** files named `_h<height>.webp` (e.g. `_h1350`, `_h850`, `_h600`), with a `_q98.jpg` master
kept alongside some of them. Where a box crops, add `style="--focus: X% Y%"` to the `<img>` to choose what stays in frame.

| Image | Export size | Ratio | Shown on screen | Status |
|---|---|---|---|---|
| Hero slideshow (`images/landing_heroes/`) | 2400 × 1350 | 16:9 | up to 1440 × 810 desktop, full width × 570 phones (sides crop; `--focus`) | Done (7 photos, all 2400 × 1350 WebP) |
| Work: featured project (Tiger Wall) | 2400 × 1350 | 16:9 | up to ~1050 × 590 desktop; 3:2 on phones (~335 × 225, sides crop) | Done (`featured-project-Tiger-Wall_h1350.webp`) |
| Work: 3 project cards | 1280 × 850 | 3:2 | ~335 × 225 desktop and phones; up to ~860 wide on tablets | Done: Wind Assist (`_1280x850.jpg`), camp chairs (`Camp-Chairs3_h850.webp`), WrovenDen (`_h850.webp`) |
| Services tiles (6) | 1500 × 600 | 5:2 | up to ~515 × 205 | Done (tech packs is 516 × 206 on purpose; see to-dos) |
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
- **For Claude (cloud sessions): verify every file written back to this folder.** Committing a file right
  after editing it has written an *older* copy of it to the user's computer (seen 2026-10-06, several times,
  on CLAUDE.md), silently undoing recent edits, the user's included. After each commit, re-stage the file
  and diff it against the intended version; if they differ, wait ~20 s, commit again, and re-check. Always
  re-stage before editing too, so the user's latest changes are the starting point.
- **Visible copy is the source of truth.** The text people see on the page wins; everything not shown on
  the page (JSON-LD, `<meta>` descriptions, `og:` tags, `llms.txt`, `sitemap.xml`) follows it wherever
  possible: same names, same order, same claims. Small wording changes are fine; significantly different
  wording or anything that contradicts the page is not. Those files **may add** true facts the page doesn't
  show (awards, dates, software, extra specialties); put such additions after the copy-based items (at the
  bottom of the list, or in their own list) so it's clear what comes from the page. Whenever visible copy
  changes, check those files and update them to match.

## Design system

- Palette (CSS custom properties at the top of the stylesheet):
  the six logo blues, lightest to darkest: `--very-light-blue #c2dbf2`, `--light-blue #9bc6e9`,
  `--medium-blue #6bb0e1`, `--blue #1a9ad6` (main), `--dark-blue #0883c6`, `--very-dark-blue #016baf`
  (links, hovers, small blue text; replaced the old non-logo `--blue-dark #1478a8` on 2026-09-25),
  `--ink #33383d` (also the hero's fallback background), `--ink-soft #5a6066`, `--ink-faint #6f757b`,
  `--paper #fdfdfc`, `--paper-tint #f4f7f9`, `--rule #e9ebed`
- Type: **Figtree** (headings + body), **IBM Plex Mono** (small labels, `01 / WORK`).
- Nav: text links, then a LinkedIn icon (inline SVG, `--ink-soft`, `--dark-blue` on hover), then the "Get in touch" button.
  Text links and the icon fade to their hover/active blue over 0.2s (`transition: color` on
  `.nav-links a:not(.btn)`, added 2026-10-07; the user liked it), matching the button's 0.2s background fade.
  Nav labels use sentence case like the rest of the page ("Expert witness", "Get in touch"; was "Expert Witness" until 2026-10-07).
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
- Scroll reveal (`data-reveal`): each Work card (featured + 3) and each Services tile has its own
  `data-reveal` (since 2026-10-06; it used to be on the whole `.grid-3` / `.grid-2`), so on phones they fade
  in one at a time and on desktop each row fades in together. Their hover lift uses the CSS `translate`
  property (not `transform`, which the reveal owns), and styles.css §13 adds the hover transitions back for
  `.card[data-reveal]` / `.tile[data-reveal]`. This also fixed the featured Tiger Wall card not lifting on hover.
  The same §13 overrides keep the hover color fades on the Process `.step`s and the Contact `.btn-lg`
  (both have `data-reveal` on themselves).
- Note: the user chose to keep the paler blue on `.sec-num` and `.step-num`
  even though those fall short of WCAG AA contrast. **Don't "fix" them again.**
- Missing photos use grey striped `.ph` placeholders with a mono caption (none left on the landing
  page; use them on new pages until real photos arrive). Never hand-draw SVG imagery.

## Sections (landing page)

Hero (crossfading slideshow in `images/landing_heroes/`; box 16:9 at 1440 × 810 desktop / 570 tall phones (changed from 600 / 460 on 2026-09-29; to revert, set `.hero` height back to 600px and 460px in the 900px media query; 620px on phones was tried and cut off the dots on an iPhone 13 mini), photos 2400×1350, per-photo `--focus` crop point, flat 20% black scrim plus text shadows on the headline and paragraph (scrim was 25% until 2026-09-30), optional `data-credit="Name"` shown lower right with a camera icon on desktop only, hidden at ≤900px; first photo keeps `is-current`) → 01 Work (featured project + 3-card grid) → 02 Services (intro + 6 tiles in a 2-column grid, each with a 5:2 photo on top, a mono `.tile-kicker`, heading, and paragraph; a photo-on-the-right version was tried and rejected) →
03 Process (5 steps; step 01 "Scope the work" added 2026-09-30: phased proposal, fixed fee per phase) → 04 Industries (numbered categories + brand logos) → 05 Expert witness (see below) →
06 About (portrait + bio) → Contact (email link + availability) → footer.

## Content status

Filled from the master resume (`Will_McElwain_Master_Resume_v7.md`) on 2026-09-23:
hero, services, process, industries categories, client names, about bio, contact, footer,
all head metadata, and JSON-LD. Website contact email is **ideas@isodesic.com** (changed from will@, from master resume, on 2026-09-30, everywhere incl. JSON-LD and `llms.txt`).

Project card text is the user's own (rewritten 2026-09-30); **keep verbatim** unless asked:
- Big Agnes Tiger Wall Tents — "The best space-to-weight ratio in a semi-freestanding ultralight tent."
- Shibumi Wind Assist Accessory — "Patented accessory that anchors the Shibumi Shade on wind-free days."
- Big Agnes Camp Chair Collection — "A unique hubless architecture enables supremely comfortable camp chairs."
- WrovenDen Kids' Tent — "A travel crib alternative for sleep and play."

Photo credits: `data-credit="Name"` on any `<img>` shows a camera-icon credit in its lower right.
Hero: desktop only (hidden ≤900px). Work/Services and elsewhere: motion.js §6 wraps the `<img>` in
`.photo-frame` and adds `.photo-credit` (styles.css §17: smaller, white with a tight dark text shadow so it
reads on any photo incl. white product shots; shown on phones too. A dark pill background was tried and rejected). No JS = no credits; the photos still show.

About bio is a draft; the user plans to write his own.
Helius is intentionally left out of the client list.
Kathmandu is left out of the client list (pre-launch; confirm before naming).

## Services section (text and photos finalized by the user, 2026-10-06)

Intro and all six tile paragraphs are the user's own; **keep verbatim** unless asked. The intro's verb list
("research, design, spec, source, develop, and customize") mirrors the six tiles in order, so change both
together. HTML comments in the section hold wording alternatives the user is still weighing (intro ending,
Development first sentence, "tier-one" vs "proven"); leave them.

Tile order follows the project sequence (2026-10-06: Sourcing moved ahead of Development, because the
supplier is chosen before samples are made, matching Process step 04). In the 2-column grid that reads
row 1 Research | Concept, row 2 Specs | Sourcing, row 3 Development | Custom trims.

| # | Kicker | Heading (canonical name) | Photo | Was |
|---|---|---|---|---|
| 1 | STRATEGY | Research & direction | `services-research_h600.webp` | Research & strategy (renamed: no pricing/business strategy). Kicker was PRODUCT DESIGN until 2026-10-06. |
| 2 | PRODUCT DESIGN | Concept design | `services-concept-design3b_h600.webp` | — |
| 3 | PRODUCT DESIGN | Detailed specifications | `services-tech-packs_h206.webp` | Tech packs |
| 4 | PRODUCT DEVELOPMENT | Sourcing | `services-factory-sourcing3b_h600.webp` | Sourcing & costing (now supplier introductions only; no quote or BOM reviews) |
| 5 | PRODUCT DEVELOPMENT | Development to production | `services-sample-review7_h600.webp` | — |
| 6 | ENGINEERING | Custom trims & hardware | `services-custom-trims3_h600.webp` (`data-credit="Shibumi"`) | — |

Kickers are `.tile-kicker` (styles.css §15, `--very-dark-blue` mono).

Reviewed 2026-10-06 and **left as-is on purpose** (don't flag again):
- Research tile sets targets for "size, weight, cost, and features"; Process step 02 says "weight, cost, and end use".
- Hero says "nearly two decades"; Sourcing tile says "nearly twenty years".

## Expert witness section (restyled in Claude Design, tightened 2026-10-07)

Order: `.ew-lead` (what I offer; the user's wording, **keep verbatim**: "...fabric-based hardgoods such as tents,
portable furniture, backpacks, luggage, and other related consumer products") → `.ew-body`: `.ew-stats` column
(18+ years, 250+ products, 2 U.S. design patents with links) beside the "Subject matter" list (4 groups:
Portable shelters, Portable furniture, Sleep systems incl. hammocks, Packs & travel goods) → `.ew-foot`: the
latest case (`.ew-text`: federal patent case over portable camp chairs, three expert reports and a deposition)
then the "Request CV and fee schedule →" mailto link. (2026-10-08: the case sentence moved from right under the
lead to the foot at the user's request.) `.ew-foot` and its top line are capped to the `.ew-body` width
(`calc(220px + 48px + 425px)`); change both together. On phones the three stats become a row of three.
Changed 2026-10-07 from: a "Designing gear for The North Face, Big Agnes…" sentence (repeated the Industries
logos; kept in an HTML comment), the case sentence at the bottom, and a one-item "Other fabric-based hardgoods:
Hammocks" group. The big "2" patents stat was briefly replaced by a plain text line, then **brought back at
the user's request** (it looked odd without it); keep it.
Subject matter column width (user's request, 2026-10-08): capped at 425px (`.ew-body` grid `220px minmax(0, 425px)`)
so the row lines are shorter and each row wraps to two lines, ending about level with the stats column on
desktop (410–440px all do this). The items are plain text separated by " · " (2026-10-08: the user removed the
per-item `<span>`s, which kept lines breaking only between items, because they made the HTML hard to read; without
them some rows break mid-item at 1440px, e.g. "bed / frames", "kids' travel / gear". `text-wrap: pretty`/`balance`
don't fix it. **User is fine with the mid-item breaks; don't flag them again.**) If an
item is added or renamed, re-check that each row is still two lines at 1440px.
The Subject matter list overlaps 04 Industries on purpose (attorneys may jump straight here; its extra
items are search terms). JSON-LD offer "Technical expert witness for patent and product liability cases" and
both `llms.txt` lines (Services + Pages) match the visible copy as of 2026-10-07; `llms.txt` leaves out which
side retained him (see to-dos).

## Service names = project tags

The six Services tile headings (`<h3>` in 02 Services) are the **canonical service names**. Each project
page in the portfolio will list the services provided on that project as tags/pills, using these names
word for word. Current names, in page order: Research & direction · Concept design · Detailed specifications ·
Sourcing · Development to production · Custom trims & hardware. If a heading is renamed, rename the
matching tags on every project page too (and keep the names short enough to work as pills).
The same names, in the same order, are used in the JSON-LD `hasOfferCatalog` in `index.html` (each with
`"url": "https://isodesic.com/#services"`) and the Services list in `llms.txt` (one-line summaries of each
tile paragraph). Synced 2026-10-06; update both whenever a heading, the order, or a tile paragraph changes.
`llms.txt` also has an "Additional specialties" list right after Services, for things the user wants AI
tools to know that the page copy doesn't say (soft/hard goods integration, Rhino + Grasshopper pole/fabric
simulation tools, BOMs and supplier introductions in Asia, SolidWorks trims). Keep those out of the
Services bullets. The user will review `llms.txt` as a final step.
The JSON-LD business `description` and the `llms.txt` summary paraphrase the hero + Services intro, and
their category lists match 04 Industries.

## Open to-dos

- All landing-page photos are now real (no `.ph` placeholders left in `index.html`; the `.ph` CSS stays
  for future pages).
- **Alt text (user is writing these; planned as one of the last tasks):** descriptive alt text for every
  photo. Most Services photo alts are still short labels ("Research and competitive surveying",
  "Computational design", "Technical packages (specifications)", "Sample review", "Custom trim design and
  development"); describe what's in each photo instead. Also Work photos and hero slides.
  `og:image:alt` is still a `[PLACEHOLDER]`.
- **User to revisit: "for the plaintiff"** in the 05 Expert witness case sentence (kept as-is for now,
  2026-10-07). Some experts leave out which side retained them so defense firms don't see them as a
  "plaintiff's expert". The HTML comment under that sentence has a neutral version. Bring it up when the
  user returns to this section; don't change it on your own.
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
