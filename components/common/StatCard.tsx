import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  value: string;
  label: string;
};

export default function StatCard({ value, label }: Props) {
  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        minHeight: 86,
        pt: '16px',
        pb: '15px',
        px: 2,
        textAlign: 'center',
        bgcolor: 'statCard.background',
        border: 1,
        borderColor: 'statCard.border',
        borderRadius: '12px',
      }}
    >
      <Typography variant="statValue" sx={{ color: 'primary.main' }}>
        {value}
      </Typography>
      <Typography variant="statLabel" sx={{ color: 'text.heading' }}>
        {label}
      </Typography>
    </Box>
  );
}
