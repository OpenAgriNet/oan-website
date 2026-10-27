export const navItems = [
  { href: '/building-blocks', key: 'buildingBlocks' },
  { href: '/about-us', key: 'aboutUs' },
  { href: '/community', key: 'community' },
  { href: '/resources', key: 'resources' },
  { href: '/events', key: 'events' },
] as const;

export const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);
