const ribbon = document.querySelector('.nav');
const sentinel = document.querySelector('.nav-sentinel');

// IntersectionObserver rather than a scroll listener: works regardless of
// which element is doing the scrolling (the page, or an embedding frame).
new IntersectionObserver(
  ([entry]) => ribbon.classList.toggle('scrolled', !entry.isIntersecting),
  { threshold: 0 }
).observe(sentinel);
