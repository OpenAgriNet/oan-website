'use client';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MaskIcon from '@/components/common/MaskIcon';

type Props = {
  title: string;
  shareLabel: string;
  saveLabel: string;
  copyLabel: string;
  copiedLabel: string;
};

// Figma: 42px white circles with a grey border and a green icon (the Figma icons, public/icons), 20px apart
const buttonSx = {
  width: 42,
  height: 42,
  flexShrink: 0,
  display: 'grid',
  placeItems: 'center',
  p: 0,
  border: '1px solid',
  borderColor: 'card.divider',
  borderRadius: '50%',
  bgcolor: 'background.paper',
  color: 'primary.main',
  cursor: 'pointer',
  transition: 'background-color 200ms ease-out',
  '@media (hover: hover)': { '&:hover': { bgcolor: 'card.outline' } },
  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' },
} as const;

// Share, save and copy-link buttons next to the article date (Figma). Save has no action yet: what it should do is to be confirmed
export default function ArticleActions({ title, shareLabel, saveLabel, copyLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. not a secure page): nothing to show
    }
  };

  // Phones and some browsers open their own share menu; elsewhere the link is copied instead
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        // Share menu closed without sharing
      }
      return;
    }
    await copyLink();
  };

  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <Box component="button" type="button" aria-label={shareLabel} onClick={share} sx={buttonSx}>
        <MaskIcon src="/icons/share.svg" size={21} />
      </Box>
      <Box component="button" type="button" aria-label={saveLabel} sx={buttonSx}>
        <MaskIcon src="/icons/save.svg" size={21} />
      </Box>
      <Tooltip title={copiedLabel} open={copied} placement="top" arrow disableFocusListener disableHoverListener disableTouchListener>
        <Box component="button" type="button" aria-label={copyLabel} onClick={copyLink} sx={buttonSx}>
          <MaskIcon src="/icons/link.svg" size={21} />
        </Box>
      </Tooltip>
      {/* Tells screen reader users the link was copied */}
      <Box component="span" role="status" sx={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
        {copied ? copiedLabel : ''}
      </Box>
    </Box>
  );
}
