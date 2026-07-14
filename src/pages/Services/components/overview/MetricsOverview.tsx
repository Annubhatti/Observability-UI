import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

import MetricWidget from "../common/MetricWidget";
import SectionCard from "../common/SectionCard";

import { ServiceOverview } from "../../types";

interface Props {
  service: ServiceOverview;
}

export default function MetricsOverview({
  service,
}: Props) {
  const theme = useTheme();

  return (
    <SectionCard
      title="Performance Metrics"
      subtitle="Live service metrics overview"
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MetricWidget
            title="Request Rate"
            value={service.requestsPerMinute}
            trend={8}
            color={theme.palette.primary.main}
            chartData={[1800, 2000, 1950, 2100, 2200, 2320, 2450]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <MetricWidget
            title="Latency"
            value={service.latency}
            unit="ms"
            trend={-5}
            color={theme.palette.secondary.main}
            chartData={[180, 160, 145, 150, 138, 130, 124]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <MetricWidget
            title="CPU Usage"
            value={service.cpuUsage}
            unit="%"
            trend={2}
            color={theme.palette.info.main}
            chartData={[28, 32, 30, 35, 38, 41, 43]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <MetricWidget
            title="Error Rate"
            value={service.errorRate}
            unit="%"
            trend={-3}
            color={theme.palette.warning.main}
            chartData={[0.45, 0.4, 0.36, 0.31, 0.29, 0.24, 0.21]}
          />
        </Grid>
      </Grid>
    </SectionCard>
  );
}