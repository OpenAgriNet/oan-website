import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ActionButton from '@/components/common/ActionButton';
import SectionEyebrow from '@/components/common/SectionEyebrow';
import SiteContainer from '@/components/layout/SiteContainer';

const members = [
  { key: 'ravi', image: '/images/about-us/team-01.png' },
  { key: 'meeraOne', image: '/images/about-us/team-02.png' },
  { key: 'meeraTwo', image: '/images/about-us/team-03.png' },
  { key: 'meenu', image: '/images/about-us/team-04.png' },
  { key: 'karthika', image: '/images/about-us/team-05.png' },
] as const;

export default async function AboutTeamSection() {
  const t = await getTranslations('AboutUs.team');

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: 'background.default', overflow: 'hidden', minHeight: { lg: 549 } }}>
      <Box
        aria-hidden
        sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 26,
          background: 'linear-gradient(90deg, #FDFDFE 0%, #F9FDFE 50%, #F5FEFD 100%)',
        }}
      />
      <Box aria-hidden sx={{ position: 'absolute', top: { lg: '25px' }, right: 0, bottom: 0, left: 0 }}>
        <Image
          src="/images/about-us/team-bg.png"
          alt=""
          fill
          sizes="(min-width: 1440px) 1440px, 100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </Box>
      <SiteContainer
        sx={{
          position: 'relative',
          px: { xs: '20px', sm: 4, md: 5, lg: 10 },
          pt: { xs: '26px', sm: 5, lg: '54px' },
          pb: { xs: '32px', sm: 5, lg: '58px' },
          pl: { lg: '82px' },
          pr: { lg: '99px' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '24px', sm: 4, lg: '41px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'flex-start' },
            gap: { xs: '16px', sm: 2 },
          }}
        >
          <Box
            sx={{
              maxWidth: 873,
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },
              textAlign: { xs: 'center', sm: 'left' },
              gap: '16px',
            }}
          >
            {/* Figma mobile: 12px eyebrow in a 30px box */}
            <Box sx={{ '& .MuiTypography-root': { fontSize: { xs: 12, sm: 14 } }, '& > div': { height: { xs: 30, sm: 33 } } }}>
              <SectionEyebrow align={{ xs: 'center', sm: 'left' }}>{t('eyebrow')}</SectionEyebrow>
            </Box>
            <Typography
              variant="headline"
              component="h2"
              sx={{ color: 'text.heading', fontWeight: 800,
                fontSize: { xs: 20, sm: 26, md: 28 },
                lineHeight: { md: '34px' },
                letterSpacing: { xs: '0.4px', sm: '0.56px' },
              }}
            >
              {t.rich('title', {
                accent: (chunks) => (
                  <Box component="span" sx={{ color: 'secondary.main' }}>
                    {chunks}
                  </Box>
                ),
              })}
            </Typography>
            <Typography
              variant="blockBody"
              sx={{ color: 'text.heading', fontSize: { xs: 12, sm: 14 }, lineHeight: { xs: '17px', sm: '20px' }, maxWidth: 818 }}
            >
              {t.rich('description', { br: () => <br /> })}
            </Typography>
          </Box>
          <ActionButton
            href="#"
            tone="secondary"
            sx={{ px: '22px', fontWeight: 700, lineHeight: '20px', flexShrink: 0, width: { xs: '100%', sm: 'auto' }, minHeight: { xs: 42, sm: 52 }, fontSize: { xs: 12, sm: 14 } }}
          >
            {t('cta')}
          </ActionButton>
        </Box>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: '30px', sm: 2, md: 3, lg: '30px' },
          }}
        >
          {members.map(({ key, image }) => (
            <Box
              component="li"
              key={key}
              sx={{
                width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 16px)', lg: 'calc(20% - 24px)' },
                                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 2,
                minHeight: { lg: 217 },
                boxSizing: 'border-box',
                justifyContent: 'center',
                border: '1px solid',
                borderColor: 'card.border',
                borderRadius: '12px 0',
                bgcolor: 'background.paper',
                boxShadow: '0 4px 24px var(--mui-palette-card-shadow)',
                textAlign: 'center',
              }}
            >
              <Image
                src={image}
                alt={t(`members.${key}.name`)}
                width={130}
                height={130}
                style={{ borderRadius: '50%', objectFit: 'cover', width: 130, height: 130 }}
              />
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <Typography variant="cardTitle" component="h3" sx={{ color: 'text.heading' }}>
                  {t(`members.${key}.name`)}
                </Typography>
                <Typography variant="cardBody" sx={{ color: 'text.heading' }}>
                  {t(`members.${key}.role`)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </SiteContainer>
    </Box>
  );
}
