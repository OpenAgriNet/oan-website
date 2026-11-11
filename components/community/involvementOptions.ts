// Figma defines panel content only for Build and Implement; the other tabs reuse those images with placeholder copy until they are designed
export const involvementOptions = [
  { key: 'build', icon: '/icons/grid-badge.svg', image: '/images/community-build-panel.png' },
  { key: 'implement', icon: '/icons/globe-badge.svg', image: '/images/community-implement-panel.png' },
  { key: 'contribute', icon: '/icons/code-badge.svg', image: '/images/community-build-panel.png' },
  { key: 'research', icon: '/icons/search-badge.svg', image: '/images/community-implement-panel.png' },
  { key: 'partner', icon: '/icons/file-text-badge.svg', image: '/images/community-build-panel.png' },
] as const;
