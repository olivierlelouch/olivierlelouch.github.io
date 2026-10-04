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
