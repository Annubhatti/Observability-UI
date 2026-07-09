import { useTheme } from '@mui/material/styles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartCard from './ChartCard';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import { getGridStyle, getAxisStyle, getTooltipStyle, ANIMATION_DURATION, chartColors } from '../../theme/chartTheme';
import type { RequestTrendPoint } from '../../mocks/dashboardMocks';

interface Props {
  data: RequestTrendPoint[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export default function RequestTrendChart({ data, isLoading, error, onRetry }: Props) {
  const theme = useTheme();
  const gridStyle = getGridStyle(theme);
  const axisStyle = getAxisStyle(theme);
  const tooltipStyle = getTooltipStyle(theme);
  const color = chartColors[0]!;

  return (
    <ChartCard
      title="Request Trend"
      subtitle="Requests per second over time"
      icon={<ShowChartRoundedIcon />}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      height={260}
    >
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridStyle} vertical={false} />
          <XAxis
            dataKey="timestamp"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v)}
            width={50}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(v: number) => [`${v.toLocaleString()} req/s`, 'Requests']}
          />
          <Area
            type="monotone"
            dataKey="requestsPerSec"
            stroke={color}
            strokeWidth={2}
            fill="url(#reqGrad)"
            animationDuration={ANIMATION_DURATION}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, fill: theme.palette.background.paper }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
