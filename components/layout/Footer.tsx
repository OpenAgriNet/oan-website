'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Logo from './Logo';
import SiteContainer from './SiteContainer';
import { isActive, navItems } from './navItems';

export default function Footer() {
  const t = useTranslations('Nav');
  const tFooter = useTranslations('Footer');
  const pathname = usePathname();
  const legal = [tFooter('privacy'), tFooter('terms'), tFooter('contact')];

  return (
    <Box component="footer" sx={{ bgcolor: 'footer.background', color: 'footer.text', py: 4 }}>
      <SiteContainer sx={{ display: 'flex', flexDirection: 'column', gap: '29px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Logo variant="white" />
          <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 4, rowGap: 1.5 }}>
            {navItems.map(({ href, key }) => {
              const active = isActive(pathname, href);
              return (
                <Typography
                  key={key}
                  variant="navLink"
                  component={Link}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    color: 'inherit',
                    fontWeight: active ? 700 : undefined,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {t(key)}
                </Typography>
              );
            })}
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'footer.divider' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="footnote">{tFooter('copyright', { year: new Date().getFullYear() })}</Typography>
          <Typography variant="footnote">{legal.join(tFooter('separator'))}</Typography>
        </Box>
      </SiteContainer>
    </Box>
  );
}
