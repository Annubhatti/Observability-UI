import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid2';
import VerifiedRounded from '@mui/icons-material/VerifiedRounded';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import SpeedRounded from '@mui/icons-material/SpeedRounded';
import DataUsageRounded from '@mui/icons-material/DataUsageRounded';
import { alpha, useTheme } from '@mui/material/styles';
import PageHeader from '../../components/common/PageHeader';

interface SLOCardProps {
  title: string;
  value: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

function SLOCard({ title, value, description, progress, icon, gradientFrom, gradientTo }: SLOCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(gradientFrom, 0.15)} 0%, ${alpha(gradientTo, 0.08)} 100%)`,
        border: 1,
        borderColor: alpha(gradientFrom, 0.25),
        height: '100%',
      }}
    >
      {/* Decorative background circle */}
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(gradientFrom, 0.12)} 0%, transparent 70%)`,
        }}
      />

      <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Box sx={{ color: gradientFrom, display: 'flex' }}>{icon}</Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            {/* Background ring */}
            <CircularProgress
              variant="determinate"
              value={100}
              size={140}
              thickness={4}
              sx={{
                color: alpha(theme.palette.text.disabled, 0.15),
              }}
            />
            {/* Value ring */}
            <CircularProgress
              variant="determinate"
              value={progress}
              size={140}
              thickness={4}
              sx={{
                color: gradientFrom,
                position: 'absolute',
                left: 0,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: gradientFrom, lineHeight: 1.1 }}
              >
                {value}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'center', lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

const SLO_CARDS: SLOCardProps[] = [
  {
    title: 'Availability',
    value: '99.95%',
    description: 'Current uptime across all monitored services. Target: 99.9% over a 30-day rolling window.',
    progress: 99.95,
    icon: <CheckCircleOutlineRounded />,
    gradientFrom: '#4caf50',
    gradientTo: '#81c784',
  },
  {
    title: 'Latency',
    value: '<200ms',
    description: 'P99 latency for API responses. Target: p99 latency must remain below 200ms.',
    progress: 85,
    icon: <SpeedRounded />,
    gradientFrom: '#2196f3',
    gradientTo: '#64b5f6',
  },
  {
    title: 'Error Budget',
    value: '72%',
    description: '72% of the monthly error budget remaining. 28% consumed with 18 days left in the period.',
    progress: 72,
    icon: <DataUsageRounded />,
    gradientFrom: '#ff9800',
    gradientTo: '#ffb74d',
  },
];

export default function SLOsPage() {
  useEffect(() => {
    document.title = 'SLOs | Observability';
  }, []);

  return (
    <Box>
      <PageHeader
        icon={<VerifiedRounded />}
        title="SLOs"
        subtitle="Service Level Objectives and error budget tracking"
      />

      <Grid container spacing={3}>
        {SLO_CARDS.map((card) => (
          <Grid key={card.title} size={{ xs: 12, md: 4 }}>
            <SLOCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
