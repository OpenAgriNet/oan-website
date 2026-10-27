// Figma defines panel content only for Build and Implement; the other tabs have no `image` until it is designed
export const involvementOptions = [
  { key: 'build', icon: '/icons/grid-badge.svg', image: '/images/community-build-panel.png' },
  { key: 'implement', icon: '/icons/globe-badge.svg', image: '/images/community-implement-panel.png' },
  { key: 'contribute', icon: '/icons/code-badge.svg' },
  { key: 'research', icon: '/icons/search-badge.svg' },
  { key: 'partner', icon: '/icons/file-text-badge.svg' },
] as const;
