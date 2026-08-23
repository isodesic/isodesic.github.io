/* Isodesic — media.js
   Two jobs, no libraries:
   1. click any [data-lightbox] figure to open it full screen (arrows / Esc to move and close)
   2. figures marked [data-expand] get an "Expand" button that widens them in place
   Delete this file and every image still shows, just not enlarged. */

document.documentElement.classList.add('js-media');

const figures = [...document.querySelectorAll('[data-lightbox]')];

// 2 — expand in place
document.querySelectorAll('[data-expand]').forEach((figure) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'pj-expand';
  button.textContent = 'Expand ⤢';
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const wide = figure.classList.toggle('is-wide');
    button.textContent = wide ? 'Collapse ⤡' : 'Expand ⤢';
  });
  figure.appendChild(button);
});

// 1 — lightbox
if (figures.length) {
  const box = document.createElement('div');
  box.className = 'pj-lb';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Enlarged image');
  box.hidden = true;
  box.innerHTML =
    '<div class="pj-lb-stage"></div>' +
    '<p class="pj-lb-cap"></p>' +
    '<button class="pj-lb-close" type="button" aria-label="Close">✕</button>' +
    '<button class="pj-lb-prev" type="button" aria-label="Previous image">←</button>' +
    '<button class="pj-lb-next" type="button" aria-label="Next image">→</button>';
  document.body.appendChild(box);

  const stage = box.querySelector('.pj-lb-stage');
  const caption = box.querySelector('.pj-lb-cap');
  let index = 0;
  let lastFocused = null;

  function show(i) {
    index = (i + figures.length) % figures.length;
    const figure = figures[index];
    const media = figure.querySelector('img, .ph');
    const cap = figure.querySelector('.pj-cap');
    stage.replaceChildren(media.cloneNode(true));
    caption.textContent = cap ? cap.textContent : '';
  }

  function open(i) {
    lastFocused = document.activeElement;
    show(i);
    box.hidden = false;
    requestAnimationFrame(() => box.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    box.querySelector('.pj-lb-close').focus();
  }

  function close() {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { box.hidden = true; }, 250);
    if (lastFocused) lastFocused.focus();
  }

  figures.forEach((figure, i) => {
    figure.setAttribute('tabindex', '0');
    figure.setAttribute('role', 'button');
    figure.addEventListener('click', () => open(i));
    figure.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  box.querySelector('.pj-lb-close').addEventListener('click', close);
  box.querySelector('.pj-lb-prev').addEventListener('click', () => show(index - 1));
  box.querySelector('.pj-lb-next').addEventListener('click', () => show(index + 1));
  box.addEventListener('click', (e) => { if (e.target === box || e.target === stage) close(); });

  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
}
