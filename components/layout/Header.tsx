'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import SiteContainer from './SiteContainer';
import { isActive, navItems } from './navItems';

const linkSx = {
  color: 'text.primary',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  '&:hover, &[aria-current="page"]': { color: 'primary.main' },
};

export default function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.header', color: 'text.primary' }}>
      <SiteContainer
        sx={{ minHeight: { xs: 72, md: 90 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Logo />
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
          <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navItems.map(({ href, key }) => (
              <Typography
                key={key}
                variant="navLink"
                component={Link}
                href={href}
                aria-current={isActive(pathname, href) ? 'page' : undefined}
                sx={linkSx}
              >
                {t(key)}
              </Typography>
            ))}
          </Box>
          <LanguageSwitcher />
        </Box>
        <IconButton
          aria-label={t('openMenu')}
          onClick={() => setOpen(true)}
          sx={{ display: { md: 'none' }, color: 'text.primary', mr: -1 }}
        >
          <MenuIcon />
        </IconButton>
      </SiteContainer>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: { md: 'none' } }}
        slotProps={{ paper: { sx: { width: 'min(320px, 85vw)', bgcolor: 'background.header' } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, minHeight: 72 }}>
          <LanguageSwitcher />
          <IconButton aria-label={t('closeMenu')} onClick={() => setOpen(false)} sx={{ mr: -1 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List component="nav">
          {navItems.map(({ href, key }) => (
            <ListItemButton
              key={key}
              component={Link}
              href={href}
              selected={isActive(pathname, href)}
              aria-current={isActive(pathname, href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
              sx={{ px: 3, py: 1.5, ...linkSx }}
            >
              <Typography variant="navLink" sx={{ fontSize: 16 }}>
                {t(key)}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
