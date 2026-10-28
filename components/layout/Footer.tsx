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

// Row-major slot in the mobile two-column grid
const mobileOrder = { buildingBlocks: 0, community: 1, aboutUs: 2, events: 3, resources: 4 };

export default function Footer() {
  const t = useTranslations('Nav');
  const tFooter = useTranslations('Footer');
  const pathname = usePathname();
  const legal = [tFooter('privacy'), tFooter('terms'), tFooter('contact')];

  return (
    <Box component="footer" sx={{ bgcolor: 'footer.background', color: 'footer.text', py: 4, pb: { xs: '30px', sm: 4 } }}>
      <SiteContainer
        sx={{ px: { xs: '20px', sm: 4, md: 5, lg: 10 }, display: 'flex', flexDirection: 'column', gap: '29px' }}
      >
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
          <Box
            component="nav"
            sx={{
              // Figma mobile: two columns (Building Blocks / About Us / Resources | Community / Events), 52px row pitch
              display: { xs: 'grid', sm: 'flex' },
              gridTemplateColumns: '153px 1fr',
              flexWrap: 'wrap',
              columnGap: { sm: 4 },
              rowGap: { xs: '32px', sm: 1.5 },
            }}
          >
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
                    order: { xs: mobileOrder[key], sm: 0 },
                    fontSize: { xs: 12, sm: 14 },
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
            gap: { xs: '12px', sm: 1 },
          }}
        >
          <Typography variant="footnote">{tFooter('copyright', { year: new Date().getFullYear() })}</Typography>
          <Typography variant="footnote">{legal.join(tFooter('separator'))}</Typography>
        </Box>
      </SiteContainer>
    </Box>
  );
}
