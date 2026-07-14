import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { alpha, useTheme } from '@mui/material/styles';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface KpiCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: ReactNode;
  color: 'primary' | 'success' | 'info' | 'error' | 'warning' | 'secondary';
  sparklineData?: number[];
  isLoading?: boolean;
}

export default function KpiCard({
  label,
  value,
  trend,
  trendUp,
  icon,
  color,
  sparklineData,
  isLoading = false,
}: KpiCardProps) {
  const theme = useTheme();
  const palette = theme.palette[color];

  if (isLoading) {
    return (
      <Card
        variant="outlined"
        sx={{
          borderColor: alpha(palette.main, 0.2),
          background: alpha(palette.main, 0.02),
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Skeleton variant="circular" width={36} height={36} />
            <Skeleton variant="text" width={40} />
          </Box>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" />
        </CardContent>
      </Card>
    );
  }

  // Prepare sparkline chart data
  const chartData = sparklineData?.map((v, i) => ({ idx: i, v }));

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: alpha(palette.main, 0.3),
        background: alpha(palette.main, 0.04),
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          borderColor: alpha(palette.main, 0.6),
          boxShadow: `0 4px 20px ${alpha(palette.main, 0.12)}`,
          transform: 'translateY(-1px)',
        },
      }}
    >
      {/* Sparkline background */}
      {chartData && chartData.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.main} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={palette.main} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={palette.main}
                strokeWidth={1.5}
                fill={`url(#spark-${color})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}

      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
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
            {icon}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.3,
              color: trendUp ? theme.palette.success.main : theme.palette.error.main,
            }}
          >
            {trendUp ? (
              <TrendingUpRoundedIcon sx={{ fontSize: 16 }} />
            ) : (
              <TrendingDownRoundedIcon sx={{ fontSize: 16 }} />
            )}
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {trend}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.25, display: 'block' }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}
