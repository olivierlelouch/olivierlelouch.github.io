const ribbon = document.querySelector('.nav');
const sentinel = document.querySelector('.nav-sentinel');

// IntersectionObserver rather than a scroll listener: works regardless of
// which element is doing the scrolling (the page, or an embedding frame).
new IntersectionObserver(
  ([entry]) => ribbon.classList.toggle('scrolled', !entry.isIntersecting),
  { threshold: 0 }
).observe(sentinel);

// Opening a page without an anchor starts at its top. On the live site the
// browser does this already, but inside an embedding frame (the preview) the
// outer page does the scrolling and keeps its old position, so a link clicked
// low on one page used to land low on the next.
if (!location.hash) {
  window.scrollTo(0, 0);
  sentinel.scrollIntoView({ block: 'start' });
}

// CV page: the side menu marks the section being read. The observer watches a
// band near the top of the window (below the menu bar) rather than listening
// for scroll events, so it also works inside the preview frame.
const toc = document.querySelector('.cv-toc');
if (toc) {
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  const inBand = new Set();
  let atEnd = false;
  let lockUntil = 0;
  const mark = (i) => links.forEach((a, j) => {
    a.classList.toggle('active', j === i);
    if (j === i) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
  const update = () => {
    if (Date.now() < lockUntil) return;
    // once the end of the page is on screen, the last section is the current one
    if (atEnd) return mark(sections.length - 1);
    // the lowest section in the band is the one whose heading was just reached
    const i = sections.findLastIndex((s) => inBand.has(s));
    if (i !== -1) mark(i);
  };
  const bandObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? inBand.add(e.target) : inBand.delete(e.target)));
    update();
  }, { rootMargin: '-100px 0px -60% 0px' });
  sections.forEach((s) => bandObserver.observe(s));
  const end = document.querySelector('.cv-end');
  if (end) {
    new IntersectionObserver(([e]) => { atEnd = e.isIntersecting; update(); }).observe(end);
  }
  // a click marks its section at once, without flickering through the ones
  // the glide passes on the way
  links.forEach((a, i) => a.addEventListener('click', () => {
    mark(i);
    lockUntil = Date.now() + 1000;
  }));
  mark(Math.max(0, links.findIndex((a) => a.getAttribute('href') === location.hash)));
}
