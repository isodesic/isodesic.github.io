/* Isodesic — motion.js
   Three small jobs, no libraries, ~40 lines:
   1. reveal sections as they scroll into view
   2. shadow under the nav once you have scrolled
   3. highlight the nav link for the section you are looking at,
      and close the mobile menu after a link is tapped
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
    a.classList.toggle('is-active', !!current && a.getAttribute('href') === '#' + current.id);
  });
}
window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('resize', setActive);
setActive();

// close the mobile menu after tapping a link
const toggle = document.getElementById('nav-toggle');
document.querySelectorAll('.nav-menu a').forEach((a) => {
  a.addEventListener('click', () => { toggle.checked = false; });
});
