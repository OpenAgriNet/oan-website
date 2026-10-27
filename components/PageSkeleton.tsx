import Typography from '@mui/material/Typography';
import { getTranslations } from 'next-intl/server';
import SiteContainer from '@/components/layout/SiteContainer';

type Props = {
  titleKey: 'home' | 'buildingBlocks' | 'aboutUs' | 'community' | 'resources' | 'events';
};

export default async function PageSkeleton({ titleKey }: Props) {
  const t = await getTranslations('Pages');

  return (
    <SiteContainer sx={{ py: 8 }}>
      <Typography variant="h4" component="h1">
        {t(titleKey)}
      </Typography>
    </SiteContainer>
  );
}
