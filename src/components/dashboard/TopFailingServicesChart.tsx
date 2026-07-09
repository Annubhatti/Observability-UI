import { useTheme } from '@mui/material/styles';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import ChartCard from './ChartCard';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import { getGridStyle, getAxisStyle, getTooltipStyle, ANIMATION_DURATION } from '../../theme/chartTheme';
import type { FailingService } from '../../mocks/dashboardMocks';

interface Props {
  data: FailingService[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

function getBarColor(errorRate: number): string {
  if (errorRate > 3) return '#ef4444';
  if (errorRate > 1) return '#f59e0b';
  return '#3b82f6';
}

export default function TopFailingServicesChart({ data, isLoading, error, onRetry }: Props) {
  const theme = useTheme();
  const gridStyle = getGridStyle(theme);
  const axisStyle = getAxisStyle(theme);
  const tooltipStyle = getTooltipStyle(theme);

  // Sort by errorCount desc
  const sorted = [...data].sort((a, b) => b.errorCount - a.errorCount);

  return (
    <ChartCard
      title="Top Failing Services"
      subtitle="Services with highest error counts"
      icon={<BarChartRoundedIcon />}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      height={260}
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 24, bottom: 0, left: 8 }}>
          <CartesianGrid {...gridStyle} horizontal={false} />
          <XAxis
            type="number"
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="service"
            tick={{ ...axisStyle, fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={110}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(v: number, _name: string, props: { payload?: FailingService }) => {
              const entry = props.payload;
              if (!entry) return [String(v), 'Errors'];
              return [
                `${v.toLocaleString()} errors (${entry.errorRate}% rate, ${entry.requestsPerSec.toLocaleString()} rps)`,
                '',
              ];
            }}
          />
          <Bar
            dataKey="errorCount"
            radius={[0, 4, 4, 0]}
            animationDuration={ANIMATION_DURATION}
            barSize={18}
          >
            {sorted.map((entry, idx) => (
              <Cell key={idx} fill={getBarColor(entry.errorRate)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
