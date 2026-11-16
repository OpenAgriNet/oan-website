'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocale, useTranslations } from 'next-intl';
import { blogCategories, type BlogCategory } from '@/content/blogs/categories';
import type { BlogSummary } from '@/lib/blogTypes';
import BlogCard from './BlogCard';

type Props = { blogs: BlogSummary[]; mode: 'featured' | 'all' };

// Filtering is client-side state over blogs already in the static HTML: no fetches, so the CSP is unaffected
export default function BlogsSection({ blogs, mode }: Props) {
  const t = useTranslations('Blogs');
  const locale = useLocale();
  const [category, setCategory] = useState<BlogCategory | 'all'>('all');
  const [location, setLocation] = useState('all');

  const locations = useMemo(() => [...new Set(blogs.map((b) => b.location).filter((l): l is string => !!l))].sort(), [blogs]);
  const visible = blogs.filter((b) => (category === 'all' || b.category === category) && (location === 'all' || b.location === location));
  const formatDate = (iso: string) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(iso));
  const showFilters = mode === 'all';
  const chip = (active: boolean) => ({
    px: '14px', py: '6px', borderRadius: '22px', border: '1px solid', borderColor: 'primary.main', cursor: 'pointer', font: 'inherit', fontSize: 14,
    bgcolor: active ? 'primary.main' : 'transparent', color: active ? 'primary.contrastText' : 'primary.main',
  });

  return (
    <Box component="section" aria-labelledby={`blogs-${mode}`} sx={{ maxWidth: 1293, mx: 'auto', px: { xs: '20px', sm: 4, lg: 0 }, py: { xs: 4, lg: 6 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography id={`blogs-${mode}`} variant="headline" component="h2" sx={{ color: 'text.heading', fontSize: { xs: 20, sm: 28 } }}>
        {t(`${mode}.title`)}
      </Typography>
      {showFilters && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          {(['all', ...blogCategories] as const).map((c) => (
            <Box key={c} component="button" type="button" aria-pressed={category === c} onClick={() => setCategory(c)} sx={chip(category === c)}>
              {t(`categories.${c}`)}
            </Box>
          ))}
          {locations.length > 0 && (
            <Box component="select" aria-label={t('locationFilter')} value={location} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value)} sx={{ ml: 'auto', p: '6px 10px', font: 'inherit', fontSize: 14, borderRadius: '8px' }}>
              <option value="all">{t('categories.all')}</option>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </Box>
          )}
        </Box>
      )}
      {visible.length === 0 ? (
        <Typography sx={{ color: 'text.heading' }}>{t('empty')}</Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: '30px', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' } }}>
          {visible.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} featured={mode === 'featured'} categoryLabel={t(`categories.${blog.category}`)} dateLabel={formatDate(blog.date)} linkLabel={t('readMore')} imageAlt={blog.title} />
          ))}
        </Box>
      )}
    </Box>
  );
}
