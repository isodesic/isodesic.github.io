/* Isodesic — motion.js
   A few small jobs, no libraries:
   1. reveal sections as they scroll into view
   2. shadow under the nav once you have scrolled
   3. highlight the nav link for the section you are looking at,
      and close the mobile menu after a link is tapped
   4. mobile menu accessibility
   5. hero slideshow: dots, autoplay, pause, swipe, photo credits
   Delete this file and the page still works — CSS handles the rest. */

document.documentElement.classList.add('reveal-ready');

// 1 — reveal on scroll
const reveals = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    revealObserver.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
reveals.forEach((el) => revealObserver.observe(el));

// 2 — nav shadow
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 3 — active nav link: the last section whose top has passed the marker line
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

function setActive() {
  const line = window.scrollY + 140; // just below the sticky nav
  let current = null;
  sections.forEach((s) => {
    if (s.getBoundingClientRect().top + window.scrollY <= line) current = s;
  });
  // at the very bottom, keep the last section lit
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
    current = sections[sections.length - 1];
  }
  navLinks.forEach((a) => {
    const on = !!current && a.getAttribute('href') === '#' + current.id;
    a.classList.toggle('is-active', on);
    if (on) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
  });
}
window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('resize', setActive);
setActive();

// 4 — mobile menu: close after tapping a link, and keep the burger
//     keyboard-operable and correctly announced to screen readers
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
syncBurger();

document.querySelectorAll('.nav-menu a').forEach((a) => {
  a.addEventListener('click', () => { toggle.checked = false; syncBurger(); });
});

// 5 — hero slideshow: crossfade to the next photo every few seconds.
//     Dots jump to a photo, the button pauses, and a sideways swipe works on
//     phones. It stops on hover, while the tab is hidden, and never starts on
//     its own if the visitor's system is set to reduce motion.
//     A photo with data-credit="..." shows that text in the lower right.
const SLIDE_SECONDS = 6;
const hero = document.querySelector('.hero');
const slides = [...document.querySelectorAll('.hero-slide')];

// photo credit: one element, refilled whenever the photo changes
const credit = document.createElement('div');
credit.className = 'hero-credit';
hero.append(credit);
let creditTimer = null;
function showCredit(slide) {
  const text = slide.dataset.credit || '';
  credit.classList.remove('is-shown');                 // fade the old one out…
  clearTimeout(creditTimer);
  creditTimer = setTimeout(() => {                     // …then swap in the new one
    credit.textContent = text;
    credit.classList.toggle('is-shown', text !== '');
  }, 400);
}
if (slides.length === 1) showCredit(slides[0]);

if (slides.length > 1) {
  let current = 0;
  let timer = null;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    slides.forEach((s, k) => s.classList.toggle('is-current', k === current));
    dots.forEach((d, k) => d.setAttribute('aria-current', String(k === current)));
    showCredit(slides[current]);
  }
  function play() {
    clearInterval(timer);
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    if (!paused) timer = setInterval(() => show(current + 1), SLIDE_SECONDS * 1000);
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
