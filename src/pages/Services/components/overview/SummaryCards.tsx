import Grid from "@mui/material/Grid2";

import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import SpeedRounded from "@mui/icons-material/SpeedRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import TimerRounded from "@mui/icons-material/TimerRounded";
import MemoryRounded from "@mui/icons-material/MemoryRounded";
import StorageRounded from "@mui/icons-material/StorageRounded";

import { useTheme } from "@mui/material/styles";

import StatCard from "../common/StatCard";
import { ServiceOverview } from "../../types";

interface SummaryCardsProps {
  service: ServiceOverview;
}

export default function SummaryCards({
  service,
}: SummaryCardsProps) {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
        <StatCard
          title="Availability"
          value={service.availability}
          unit="%"
          subtitle="Overall uptime"
          trend={0.2}
          color={theme.palette.success.main}
          icon={<FavoriteRounded />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
        <StatCard
          title="Latency"
          value={service.latency}
          unit="ms"
          subtitle="Average response"
          trend={-8}
          color={theme.palette.secondary.main}
          icon={<TimerRounded />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
        <StatCard
          title="Request Rate"
          value={service.requestsPerMinute}
          subtitle="Requests / minute"
          trend={7}
          color={theme.palette.info.main}
          icon={<SpeedRounded />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
        <StatCard
          title="Error Rate"
          value={service.errorRate}
          unit="%"
          subtitle="Last 30 min"
          trend={-2}
          color={theme.palette.warning.main}
          icon={<ErrorOutlineRounded />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
        <StatCard
          title="CPU Usage"
          value={service.cpuUsage}
          unit="%"
          subtitle="Current utilization"
          trend={3}
          color={theme.palette.primary.main}
          icon={<MemoryRounded />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}>
        <StatCard
          title="Memory"
          value={service.memoryUsage}
          unit="GB"
          subtitle={`${service.pods} Running Pods`}
          trend={1}
          color="#06b6d4"
          icon={<StorageRounded />}
        />
      </Grid>
    </Grid>
  );
}