import {
  Box,
  Typography,
} from "@mui/material";

import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRounded from "@mui/icons-material/TrendingDownRounded";

import { alpha, useTheme } from "@mui/material/styles";

import MiniAreaChart from "./MiniAreaChart";

interface MetricWidgetProps {
  title: string;
  value: string | number;
  unit?: string;
  trend: number;
  color: string;
  chartData: number[];
}

export default function MetricWidget({
  title,
  value,
  unit,
  trend,
  color,
  chartData,
}: MetricWidgetProps) {
  const theme = useTheme();

  const positive = trend >= 0;

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, .15)}`,
        background: alpha(theme.palette.background.paper, .35),
        transition: ".25s",

        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: alpha(color, .4),
        },
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        fontWeight={600}
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        fontWeight={700}
        mt={1}
      >
        {value}
        {unit && (
          <Typography
            component="span"
            sx={{
              fontSize: 18,
              ml: .5,
            }}
          >
            {unit}
          </Typography>
        )}
      </Typography>

      <Box mt={2}>
        <MiniAreaChart
          data={chartData}
          color={color}
        />
      </Box>

      <Box
        mt={1}
        display="flex"
        alignItems="center"
        gap={.5}
      >
        {positive ? (
          <TrendingUpRounded
            sx={{
              color: theme.palette.success.main,
              fontSize: 18,
            }}
          />
        ) : (
          <TrendingDownRounded
            sx={{
              color: theme.palette.error.main,
              fontSize: 18,
            }}
          />
        )}

        <Typography
          variant="body2"
          fontWeight={700}
          color={
            positive
              ? "success.main"
              : "error.main"
          }
        >
          {Math.abs(trend)}%
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          last hour
        </Typography>
      </Box>
    </Box>
  );
}