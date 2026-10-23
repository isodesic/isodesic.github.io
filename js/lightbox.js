/* ==========================================================================
   Isodesic — lightbox.js
   PhotoSwipe lightbox for the project pages' photo stream (.pj-stream), with
   the edited dynamic caption plugin: a caption bar under each photo, taken
   from its <figcaption> (or its alt text), plus its data-credit if it has one.

   Markup: each photo is a link to the full-size file,
     <a class="pj-zoom" href="photo.webp" target="_blank" rel="noopener"><img src="photo.webp" alt="…"></a>
   The arrows step through every photo in the stream, in page order.

   PhotoSwipe and the plugin load from the files next to this one in js/.
   Browsers block that when a page is opened straight from disk (file://), so
   to try the lightbox locally, preview the site through a local web server.
   Delete this file and the page still works: photos open in a new tab.
   ========================================================================== */

const PSWP = './photoswipe.esm.min.js';
const PSWPLB = './photoswipe-lightbox.esm.min.js';

// the edited caption plugin: caption bar as wide as the photo, on phones too
const CAPTION_PLUGIN = './photoswipe-dynamic-caption-plugin.esm_1.2.7-edited.js';

Promise.all([
  import(PSWPLB),
  import(CAPTION_PLUGIN)
]).then(([{ default: PhotoSwipeLightbox }, { default: PhotoSwipeDynamicCaption }]) => {

  const lightbox = new PhotoSwipeLightbox({
    gallery: '.pj-stream',
    children: 'a.pj-zoom',
    pswpModule: () => import(PSWP),
    showHideAnimationType: 'fade',
    bgOpacity: 0.92,
    paddingFn: () => ({ top: 30, bottom: 70, left: 0, right: 0 })   // room for the caption
  });

  // PhotoSwipe needs each photo's real size. The photo on the page is the same
  // file, so read the size from it; the HTML doesn't need data-pswp-width/height.
  lightbox.addFilter('domItemData', (itemData, element, linkEl) => {
    const img = linkEl.querySelector('img');
    if (img && img.naturalWidth) {
      itemData.width = img.naturalWidth;
      itemData.height = img.naturalHeight;
    } else if (!itemData.width) {
      itemData.width = 1600;   // not loaded yet: a 3:2 guess, corrected below
      itemData.height = 1067;
    }
    return itemData;
  });

  // Photos further down the page may not have loaded yet (loading="lazy"), so
  // their size was a guess. Once the lightbox has loaded one, keep its real
  // size on the link and redraw that slide.
  lightbox.on('loadComplete', ({ content, isError }) => {
    const img = content.element;
    const link = content.data.element;
    if (isError || !img || !link || !img.naturalWidth) return;
    if (content.data.width === img.naturalWidth && content.data.height === img.naturalHeight) return;
    link.dataset.pswpWidth = img.naturalWidth;
    link.dataset.pswpHeight = img.naturalHeight;
    lightbox.pswp.refreshSlideContent(content.index);
  });

  new PhotoSwipeDynamicCaption(lightbox, {
    type: 'below',
    mobileLayoutBreakpoint: 700,
    mobileCaptionOverlapRatio: 1,
    captionContent: (slide) => {
      const link = slide.data.element;
      const figure = link && link.closest('figure');
      const caption = figure && figure.querySelector('figcaption');
      const img = link && link.querySelector('img');
      const text = caption ? caption.innerHTML : (img ? img.alt : '');
      const credit = img && img.dataset.credit;
      if (!credit) return text;
      const span = document.createElement('span');   // built as elements, so the name is shown as plain text
      span.className = 'pswp-credit';
      span.append(Object.assign(document.createElement('span'),
        { className: 'sr-only', textContent: 'Photo: ' }), credit);
      return text + ' ' + span.outerHTML;
    }
  });

  lightbox.init();

}).catch((err) => console.warn('Lightbox not loaded; photos open in a new tab instead.', err));
