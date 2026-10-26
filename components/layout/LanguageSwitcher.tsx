'use client';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import { useTransition, type ComponentProps } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { setLocale } from '@/i18n/actions';
import { locales } from '@/i18n/config';

const ChevronIcon = (props: ComponentProps<'img'>) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/icons/chevron-down.svg" alt="" width={18} height={18} {...props} />
);

export default function LanguageSwitcher() {
  const t = useTranslations('Nav');
  const tLocale = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changeLocale = (e: SelectChangeEvent) =>
    startTransition(async () => {
      await setLocale(e.target.value);
      router.refresh();
    });

  return (
    <Select
      variant="standard"
      disableUnderline
      value={locale}
      disabled={isPending}
      onChange={changeLocale}
      IconComponent={ChevronIcon}
      inputProps={{ 'aria-label': t('language') }}
      sx={(theme) => ({
        ...theme.typography.langLabel,
        color: 'text.muted',
        '& .MuiSelect-select': { py: 0, pr: '22px !important', minHeight: 0 },
        '& .MuiSelect-icon': { top: 'calc(50% - 9px)', right: 0 },
      })}
    >
      {locales.map((l) => (
        <MenuItem key={l} value={l}>
          {tLocale(l)}
        </MenuItem>
      ))}
    </Select>
  );
}
