// Figma defines panel content only for Build and Implement; the other tabs reuse those images with placeholder copy until they are designed
// `contact` picks where each tab's button goes: the Discord community or an email to the OAN team
export const involvementOptions = [
  { key: 'build', icon: '/icons/grid-badge.svg', image: '/images/community-build-panel.png', contact: 'discord' },
  { key: 'implement', icon: '/icons/globe-badge.svg', image: '/images/community-implement-panel.png', contact: 'email' },
  { key: 'contribute', icon: '/icons/code-badge.svg', image: '/images/community-build-panel.png', contact: 'discord' },
  { key: 'research', icon: '/icons/search-badge.svg', image: '/images/community-implement-panel.png', contact: 'email' },
  { key: 'partner', icon: '/icons/file-text-badge.svg', image: '/images/community-build-panel.png', contact: 'email' },
] as const;
