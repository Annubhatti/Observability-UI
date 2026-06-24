import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { alpha, useTheme } from '@mui/material/styles';

import PageHeader from '../../components/common/PageHeader';

// Icons
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HttpRoundedIcon from '@mui/icons-material/HttpRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded';

interface StatCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'info' | 'error' | 'warning' | 'secondary';
}

const stats: StatCard[] = [
  {
    label: 'Total Services',
    value: '128',
    trend: '+4',
    trendUp: true,
    icon: <MiscellaneousServicesRoundedIcon />,
    color: 'primary',
  },
  {
    label: 'Healthy Services',
    value: '121',
    trend: '+2',
    trendUp: true,
    icon: <CheckCircleRoundedIcon />,
    color: 'success',
  },
  {
    label: 'Requests/sec',
    value: '24.5K',
    trend: '+12%',
    trendUp: true,
    icon: <HttpRoundedIcon />,
    color: 'info',
  },
  {
    label: 'Error Rate',
    value: '0.23%',
    trend: '-0.05%',
    trendUp: true,
    icon: <ErrorOutlineRoundedIcon />,
    color: 'error',
  },
  {
    label: 'Avg Latency',
    value: '142ms',
    trend: '+8ms',
    trendUp: false,
    icon: <TimerRoundedIcon />,
    color: 'warning',
  },
  {
    label: 'Trace Volume',
    value: '1.2M',
    trend: '+18%',
    trendUp: true,
    icon: <RouteRoundedIcon />,
    color: 'secondary',
  },
  {
    label: 'Log Volume',
    value: '48.3M',
    trend: '-2%',
    trendUp: false,
    icon: <DescriptionRoundedIcon />,
    color: 'primary',
  },
];

interface ChartPlaceholder {
  title: string;
  icon: React.ReactNode;
}

const chartRow1: ChartPlaceholder[] = [
  { title: 'Request Trend', icon: <ShowChartRoundedIcon /> },
  { title: 'Error Trend', icon: <TrendingUpRoundedIcon /> },
  { title: 'Service Health', icon: <DonutSmallRoundedIcon /> },
];

const chartRow2: ChartPlaceholder[] = [
  { title: 'Top Failing Services', icon: <BarChartRoundedIcon /> },
  { title: 'Infrastructure Overview', icon: <DonutSmallRoundedIcon /> },
];

export default function DashboardPage() {
  const theme = useTheme();

  useEffect(() => {
    document.title = 'Dashboard | Observability';
  }, []);

  return (
    <Box>
      <PageHeader
        icon={<DashboardRoundedIcon />}
        title="Dashboard"
        subtitle="Real-time overview of your entire stack"
      />

      {/* ─── Stat Cards ─── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat) => {
          const palette = theme.palette[stat.color];
          return (
            <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 4, lg: 12 / 7 }}>
              <Card
                variant="outlined"
                sx={{
                  borderColor: alpha(palette.main, 0.3),
                  background: alpha(palette.main, 0.04),
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    borderColor: alpha(palette.main, 0.6),
                    boxShadow: `0 0 0 1px ${alpha(palette.main, 0.15)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: alpha(palette.main, 0.12),
                        color: palette.main,
                        '& .MuiSvgIcon-root': { fontSize: 20 },
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.3,
                        color: stat.trendUp
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                      }}
                    >
                      {stat.trendUp ? (
                        <TrendingUpRoundedIcon sx={{ fontSize: 16 }} />
                      ) : (
                        <TrendingDownRoundedIcon sx={{ fontSize: 16 }} />
                      )}
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {stat.trend}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mt: 0.25, display: 'block' }}
                  >
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* ─── Chart Placeholders – Row 1 ─── */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {chartRow1.map((chart) => (
          <Grid key={chart.title} size={{ xs: 12, md: 4 }}>
            <Card
              variant="outlined"
              sx={{
                borderColor: alpha(theme.palette.divider, 0.6),
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      color: 'text.secondary',
                      '& .MuiSvgIcon-root': { fontSize: 18 },
                    }}
                  >
                    {chart.icon}
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {chart.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 260,
                    borderRadius: 1.5,
                    backgroundColor: alpha(theme.palette.text.primary, 0.03),
                    border: `1px dashed ${alpha(theme.palette.text.primary, 0.12)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.disabled', fontStyle: 'italic' }}
                  >
                    Chart Placeholder
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ─── Chart Placeholders – Row 2 ─── */}
      <Grid container spacing={2}>
        {chartRow2.map((chart) => (
          <Grid key={chart.title} size={{ xs: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{
                borderColor: alpha(theme.palette.divider, 0.6),
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      color: 'text.secondary',
                      '& .MuiSvgIcon-root': { fontSize: 18 },
                    }}
                  >
                    {chart.icon}
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {chart.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 260,
                    borderRadius: 1.5,
                    backgroundColor: alpha(theme.palette.text.primary, 0.03),
                    border: `1px dashed ${alpha(theme.palette.text.primary, 0.12)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.disabled', fontStyle: 'italic' }}
                  >
                    Chart Placeholder
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
