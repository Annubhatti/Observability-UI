import { useTheme } from '@mui/material/styles';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import ChartCard from './ChartCard';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { getGridStyle, getAxisStyle, getTooltipStyle, ANIMATION_DURATION } from '../../theme/chartTheme';
import type { ErrorTrendPoint } from '../../mocks/dashboardMocks';

interface Props {
  data: ErrorTrendPoint[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export default function ErrorTrendChart({ data, isLoading, error, onRetry }: Props) {
  const theme = useTheme();
  const gridStyle = getGridStyle(theme);
  const axisStyle = getAxisStyle(theme);
  const tooltipStyle = getTooltipStyle(theme);
  const errorColor = '#ef4444';
  const rateColor = '#f59e0b';

  return (
    <ChartCard
      title="Error Trend"
      subtitle="Error count and error rate over time"
      icon={<TrendingUpRoundedIcon />}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      height={260}
    >
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id="errGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={errorColor} stopOpacity={0.2} />
              <stop offset="95%" stopColor={errorColor} stopOpacity={0} />
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
            yAxisId="count"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <YAxis
            yAxisId="rate"
            orientation="right"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${v}%`}
            width={45}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(v: number, name: string) => {
              if (name === 'rate') return [`${v}%`, 'Error Rate'];
              return [v.toLocaleString(), 'Error Count'];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, fontFamily: '"Inter", sans-serif', paddingTop: 8 }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            yAxisId="count"
            type="monotone"
            dataKey="count"
            stroke={errorColor}
            strokeWidth={2}
            fill="url(#errGrad)"
            animationDuration={ANIMATION_DURATION}
            dot={false}
            name="Errors"
            activeDot={{ r: 4, strokeWidth: 2, fill: theme.palette.background.paper }}
          />
          <Line
            yAxisId="rate"
            type="monotone"
            dataKey="rate"
            stroke={rateColor}
            strokeWidth={2}
            strokeDasharray="5 3"
            animationDuration={ANIMATION_DURATION}
            dot={false}
            name="Rate %"
            activeDot={{ r: 4, strokeWidth: 2, fill: theme.palette.background.paper }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
