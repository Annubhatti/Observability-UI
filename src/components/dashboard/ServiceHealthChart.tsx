import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded';
import { statusChartColors, getTooltipStyle, ANIMATION_DURATION } from '../../theme/chartTheme';
import type { ServiceHealthData } from '../../mocks/dashboardMocks';

interface Props {
  data: ServiceHealthData;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

const COLORS = [statusChartColors.healthy, statusChartColors.degraded, statusChartColors.critical];

export default function ServiceHealthChart({ data, isLoading, error, onRetry }: Props) {
  const theme = useTheme();
  const tooltipStyle = getTooltipStyle(theme);

  const total = data.healthy + data.degraded + data.critical;
  const pieData = [
    { name: 'Healthy', value: data.healthy },
    { name: 'Degraded', value: data.degraded },
    { name: 'Critical', value: data.critical },
  ];

  return (
    <ChartCard
      title="Service Health"
      subtitle="Current service status distribution"
      icon={<DonutSmallRoundedIcon />}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      height={260}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', height: 260 }}>
        {/* Donut */}
        <Box sx={{ flex: 1, height: '100%', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="82%"
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
                animationDuration={ANIMATION_DURATION}
              >
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip
                {...tooltipStyle}
                formatter={(v: number, name: string) => [`${v} services`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1 }}>
              {total}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Total
            </Typography>
          </Box>
        </Box>

        {/* Legend */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pr: 1, minWidth: 100 }}>
          {pieData.map((entry, idx) => (
            <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: COLORS[idx],
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {entry.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem' }}>
                  {entry.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </ChartCard>
  );
}
