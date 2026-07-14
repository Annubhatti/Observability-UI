import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

interface MiniAreaChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export default function MiniAreaChart({
  data,
  color = "#1976d2",
  height = 70,
}: MiniAreaChartProps) {
  const chartData = data.map((value, index) => ({
    index,
    value,
  }));

  // Prevent Recharts from crashing on empty data
  if (!data.length) {
    return null;
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={height}
    >
      <AreaChart data={chartData}>
        <Tooltip
          cursor={false}
          contentStyle={{
            borderRadius: 8,
            border: "none",
            fontSize: 12,
          }}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.15}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
          isAnimationActive
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}