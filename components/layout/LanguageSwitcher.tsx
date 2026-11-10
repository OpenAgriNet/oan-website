import type { ComponentProps } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';

const ChevronIcon = (props: ComponentProps<'img'>) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/icons/chevron-down.svg" alt="" width={18} height={18} {...props} />
);

export default function LanguageSwitcher() {
  const t = useTranslations('Nav');
  const tLocale = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    router.replace(pathname, { locale: event.target.value });
  };

  return (
    <Select variant="standard" disableUnderline value={locale} onChange={handleChange} IconComponent={ChevronIcon} inputProps={{ 'aria-label': t('language') }} sx={(theme) => ({ ...theme.typography.langLabel, color: 'text.muted', '& .MuiSelect-select': { py: 0, pr: '22px !important', minHeight: 0 }, '& .MuiSelect-icon': { top: 'calc(50% - 9px)', right: 0 } })}>
      {locales.map((l) => (
        <MenuItem key={l} value={l}>
          {tLocale(l)}
        </MenuItem>
      ))}
    </Select>
  );
}
