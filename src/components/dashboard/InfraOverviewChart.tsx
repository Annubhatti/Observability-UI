import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import ChartCard from './ChartCard';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import { ANIMATION_DURATION } from '../../theme/chartTheme';
import type { InfraMetric } from '../../mocks/dashboardMocks';

interface Props {
  data: InfraMetric[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

function getColor(usage: number): string {
  if (usage >= 85) return '#ef4444';
  if (usage >= 70) return '#f59e0b';
  return '#10b981';
}

export default function InfraOverviewChart({ data, isLoading, error, onRetry }: Props) {
  const theme = useTheme();

  return (
    <ChartCard
      title="Infrastructure Overview"
      subtitle="CPU, Memory, and Disk utilization across hosts"
      icon={<DnsRoundedIcon />}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      height={200}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 200, flexWrap: 'wrap', gap: 2 }}>
        {data.map((metric) => {
          const color = getColor(metric.usage);
          const chartData = [{ name: metric.name, value: metric.usage, fill: color }];

          return (
            <Box key={metric.name} sx={{ textAlign: 'center', flex: '1 1 120px', maxWidth: 180 }}>
              <Box sx={{ position: 'relative', width: 140, height: 140, mx: 'auto' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="90%"
                    data={chartData}
                    startAngle={210}
                    endAngle={-30}
                    barSize={10}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                      background={{
                        fill: theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.06)'
                          : 'rgba(0,0,0,0.06)',
                      }}
                      dataKey="value"
                      cornerRadius={5}
                      animationDuration={ANIMATION_DURATION}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                {/* Center value */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1,
                      color,
                    }}
                  >
                    {metric.usage}%
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mt: -0.5,
                  color: 'text.primary',
                }}
              >
                {metric.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  display: 'block',
                }}
              >
                {metric.usage < 70 ? 'Normal' : metric.usage < 85 ? 'Elevated' : 'Critical'}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </ChartCard>
  );
}
