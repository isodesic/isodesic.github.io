/* ==========================================================================
   Isodesic — motion.js
   Small extras, no libraries. Delete this file and every page still works:
   nothing fades in, the hero shows its first photo, and video thumbnails
   simply link to YouTube.
   Sections:  1 scroll fade-in   2 nav shadow   3 active nav link
              4 phone menu       5 hero slideshow and credit
              6 photo credits    7 project videos   8 footer year
   ========================================================================== */

document.documentElement.classList.add('reveal-ready');

// 1 — scroll fade-in: each [data-reveal] element rises into place once its top
//     passes a line 12% up from the bottom of the screen. threshold 0 (rather
//     than a share of the element) so tall blocks start as early as short ones.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    revealObserver.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

// 2 — nav shadow once the page has scrolled
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 3 — active nav link: the last section whose top has passed a line just below
//     the nav. Only links to sections on this page take part; "Get in touch" is
//     left out, so at the bottom of the page About stays lit.
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.btn)')];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

function setActive() {
  const line = window.scrollY + 140;
  let current = null;
  sections.forEach((s) => {
    if (s.getBoundingClientRect().top + window.scrollY <= line) current = s;
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    current = sections[sections.length - 1];   // at the very bottom, keep the last one lit
  }
  navLinks.forEach((a) => {
    const on = !!current && a.getAttribute('href') === '#' + current.id;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
}
if (sections.length) {
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();
}

// 4 — phone menu: CSS opens and closes it (the checkbox). This closes it after
//     a link or the email icon is tapped, makes the burger work from the
//     keyboard, and tells screen readers whether the menu is open.
const toggle = document.getElementById('nav-toggle');
const burger = document.querySelector('.nav-burger');

function syncBurger() {
  burger.setAttribute('aria-expanded', String(toggle.checked));
  burger.setAttribute('aria-label', toggle.checked ? 'Close menu' : 'Open menu');
}
toggle.addEventListener('change', syncBurger);
burger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggle.checked = !toggle.checked;
    syncBurger();
  }
});
document.querySelectorAll('.nav-links a, .nav-email').forEach((a) => {
  a.addEventListener('click', () => { toggle.checked = false; syncBurger(); });
});
syncBurger();

// 5 — hero: crossfades to the next photo every SLIDE_SECONDS. Dots jump to a
//     photo, the button pauses, and a sideways swipe works on phones. It stops
//     on hover and while the tab is hidden, and keeps playing (with its slow
//     crossfade) for visitors whose system is set to reduce motion.
//     A photo with data-credit="Name" shows the name in the lower right
//     (desktop only). A hero with a single photo just shows its credit.
const SLIDE_SECONDS = 6;
const hero = document.querySelector('.hero');
const slides = [...document.querySelectorAll('.hero-slide')];

// photo credit: one element, refilled whenever the photo changes
const credit = document.createElement('div');
credit.className = 'hero-credit';
if (hero) hero.append(credit);
let creditTimer = null;
function showCredit(slide) {
  const text = slide.dataset.credit || '';
  credit.classList.remove('is-shown');   // fade the old one out, then swap in the new one
  clearTimeout(creditTimer);
  creditTimer = setTimeout(() => {
    credit.textContent = text;
    if (text) credit.prepend(Object.assign(document.createElement('span'),
      { className: 'sr-only', textContent: 'Photo: ' }));   // screen readers hear "Photo: Name"
    credit.classList.toggle('is-shown', text !== '');
  }, 400);
}
if (slides.length === 1) showCredit(slides[0]);

if (slides.length > 1) {
  let current = 0;
  let timer = null;
  let paused = false;

  // Loading: the later photos download one at a time, in order, once the first
  // has loaded, so they don't slow down the first photo or the rest of the page.
  // Until then styles.css hides them and their loading="lazy" keeps them from
  // downloading. A photo picked early with a dot or a swipe loads right away.
  function release(img) {
    img.loading = 'eager';
    img.classList.add('is-queued');
  }
  function whenLoaded(img, fn) {
    if (img.complete) return fn();
    img.addEventListener('load', fn, { once: true });
    img.addEventListener('error', fn, { once: true });
  }
  function loadFrom(k) {
    if (k >= slides.length) return;
    release(slides[k]);
    whenLoaded(slides[k], () => loadFrom(k + 1));
  }
  release(slides[0]);   // so the first photo can fade out once it's no longer current
  whenLoaded(slides[0], () => loadFrom(1));

  const bar = document.createElement('div');
  bar.className = 'hero-dots';
  const dots = slides.map((s, n) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-dot';
    dot.setAttribute('aria-label', `Show photo ${n + 1} of ${slides.length}`);
    dot.addEventListener('click', () => { show(n); play(); });
    bar.append(dot);
    return dot;
  });
  const pause = document.createElement('button');
  pause.type = 'button';
  pause.className = 'hero-pause';
  pause.addEventListener('click', () => { paused = !paused; play(); });
  bar.append(pause);
  hero.append(bar);

  function show(n) {
    current = (n + slides.length) % slides.length;
    release(slides[current]);
    slides.forEach((s, k) => s.classList.toggle('is-current', k === current));
    dots.forEach((d, k) => d.setAttribute('aria-current', String(k === current)));
    showCredit(slides[current]);
  }
  function play() {
    clearInterval(timer);
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    if (!paused) timer = setInterval(() => {
      const next = slides[(current + 1) % slides.length];
      if (next.complete) show(current + 1);   // still loading: wait for the next tick
    }, SLIDE_SECONDS * 1000);
  }

  hero.addEventListener('mouseenter', () => clearInterval(timer));
  hero.addEventListener('mouseleave', play);
  document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(timer) : play()));

  let startX = 0, startY = 0;
  hero.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { show(current + (dx < 0 ? 1 : -1)); play(); }
  }, { passive: true });

  show(0);
  play();
}

// 6 — photo credits on other photos (anywhere but the hero): an
//     <img data-credit="Name"> gets the same camera-icon credit in its lower
//     right. CSS can't read data-credit from an <img>, so the photo is wrapped
//     in a <span class="photo-frame"> and the credit added beside it.
document.querySelectorAll('img[data-credit]:not(.hero-slide)').forEach((img) => {
  const frame = document.createElement('span');
  frame.className = 'photo-frame';
  img.replaceWith(frame);
  const label = document.createElement('span');
  label.className = 'photo-credit';
  label.append(Object.assign(document.createElement('span'),
    { className: 'sr-only', textContent: 'Photo: ' }), img.dataset.credit);
  frame.append(img, label);
});

// 7 — project videos: each <a class="pj-yt" data-yt="ID"> is a YouTube
//     thumbnail that links to the video. Clicking it swaps in the player and
//     starts it, so no YouTube player loads until someone wants to watch.
//     youtube-nocookie.com is YouTube's privacy-enhanced player.
document.querySelectorAll('a.pj-yt[data-yt]').forEach((link) => {
  const id = link.dataset.yt;
  const img = link.querySelector('img');

  // Some videos have no large (maxresdefault) thumbnail: YouTube sends a small
  // grey placeholder (120px wide) or an error, so switch to the standard one.
  if (img) {
    const fallback = () => { if (!img.src.includes('/hqdefault')) img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; };
    const check = () => { if (img.naturalWidth > 0 && img.naturalWidth <= 120) fallback(); };
    img.addEventListener('error', fallback);
    img.addEventListener('load', check);
    check();   // in case it has already loaded
  }

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const player = document.createElement('iframe');
    player.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    player.title = img ? img.alt.replace(/^Play video:\s*/, '') : 'YouTube video';
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    player.allowFullscreen = true;
    link.replaceWith(player);
    player.focus();
  });
});

// A video that isn't on YouTube: <a class="pj-mp4" href="video.mp4"> with its
// thumbnail inside works the same way, swapping in the browser's own player.
document.querySelectorAll('a.pj-mp4').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const img = link.querySelector('img');
    const player = document.createElement('video');
    player.src = link.href;
    if (img) {
      player.poster = img.src;
      player.setAttribute('aria-label', img.alt.replace(/^Play video:\s*/, ''));
    }
    player.controls = true;
    player.playsInline = true;   // iPhone: play in the page, not straight to full screen
    link.replaceWith(player);
    player.focus();
    player.play().catch(() => {});   // if the browser won't autoplay, the play button is there
  });
});

// 8 — footer year: the © year in the footer (<span class="footer-year">) is
//     typed in the HTML as a fallback; this keeps it current every January.
document.querySelectorAll('.footer-year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
