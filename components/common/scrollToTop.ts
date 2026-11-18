import type { MouseEvent } from 'react';

// A link to the page already open would do nothing, so it scrolls back to the top instead (footer links, banner buttons)
export function scrollToTop(event: MouseEvent) {
  event.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}
