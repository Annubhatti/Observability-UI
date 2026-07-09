import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';

import { PageHeader } from '../../components/common';
import {
  KpiCard,
  RequestTrendChart,
  ErrorTrendChart,
  ServiceHealthChart,
  TopFailingServicesChart,
  InfraOverviewChart,
} from '../../components/dashboard';

// Icons for KPI cards
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HttpRoundedIcon from '@mui/icons-material/HttpRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';

import { useGlobalStore } from '../../store';
import {
  useDashboardOverview,
  useDashboardErrors,
  useDashboardServices,
} from '../../hooks/useDashboardData';

// ─── Helpers ───

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatTrend(delta: { value: number; unit: string; direction: string }): string {
  const sign = delta.direction === 'up' ? '+' : '-';
  const suffix = delta.unit === 'percent' ? '%' : delta.unit === 'ms' ? 'ms' : '';
  return `${sign}${delta.value}${suffix}`;
}

// ─── Component ───

export default function DashboardPage() {
  const theme = useTheme();
  const timeRange = useGlobalStore((s) => s.selectedTimeRange);

  const overview = useDashboardOverview(timeRange);
  const errors = useDashboardErrors(timeRange);
  const services = useDashboardServices(timeRange);

  const kpis = overview.data?.kpis;
  const sparklines = overview.data?.sparklines;
  const isKpiLoading = overview.isLoading;

  useEffect(() => {
    document.title = 'Dashboard | Observability';
  }, []);

  const anyFetching = overview.isFetching || errors.isFetching || services.isFetching;

  return (
    <Box>
      {/* ─── Page Header ─── */}
      <PageHeader
        icon={<DashboardRoundedIcon />}
        title="Dashboard"
        subtitle="Real-time overview of your entire stack"
        actions={
          anyFetching ? (
            <Chip
              icon={<AutorenewRoundedIcon sx={{ animation: 'spin 1s linear infinite', '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } } }} />}
              label="Refreshing…"
              size="small"
              variant="outlined"
              sx={{ fontWeight: 500, fontSize: '0.75rem' }}
            />
          ) : undefined
        }
      />

      {/* ─── KPI Stat Cards ─── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 12 / 7 }}>
          <KpiCard
            label="Total Services"
            value={kpis ? String(kpis.totalServices) : '—'}
            trend={kpis ? formatTrend(kpis.trends.totalServices) : ''}
            trendUp={true}
            icon={<MiscellaneousServicesRoundedIcon />}
            color="primary"
            isLoading={isKpiLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 12 / 7 }}>
          <KpiCard
            label="Healthy Services"
            value={kpis ? String(kpis.healthyServices) : '—'}
            trend={kpis ? `+${kpis.healthyServices - (kpis.totalServices - kpis.healthyServices)}` : ''}
            trendUp={true}
            icon={<CheckCircleRoundedIcon />}
            color="success"
            isLoading={isKpiLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 12 / 7 }}>
          <KpiCard
            label="Requests/sec"
            value={kpis ? formatNumber(kpis.requestsPerSec) : '—'}
            trend={kpis ? formatTrend(kpis.trends.requestsPerSec) : ''}
            trendUp={true}
            icon={<HttpRoundedIcon />}
            color="info"
            sparklineData={sparklines?.requests}
            isLoading={isKpiLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 12 / 7 }}>
          <KpiCard
            label="Error Rate"
            value={kpis ? `${kpis.errorRate}%` : '—'}
            trend={kpis ? formatTrend(kpis.trends.errorRate) : ''}
            trendUp={kpis?.trends.errorRate.direction === 'down'}
            icon={<ErrorOutlineRoundedIcon />}
            color="error"
            sparklineData={sparklines?.errors}
            isLoading={isKpiLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 12 / 7 }}>
          <KpiCard
            label="Avg Latency"
            value={kpis ? `${kpis.avgLatencyMs}ms` : '—'}
            trend={kpis ? formatTrend(kpis.trends.avgLatencyMs) : ''}
            trendUp={false}
            icon={<TimerRoundedIcon />}
            color="warning"
            sparklineData={sparklines?.latency}
            isLoading={isKpiLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 12 / 7 }}>
          <KpiCard
            label="Trace Volume"
            value={kpis ? formatNumber(kpis.traceVolume) : '—'}
            trend={kpis ? formatTrend(kpis.trends.traceVolume) : ''}
            trendUp={true}
            icon={<RouteRoundedIcon />}
            color="secondary"
            sparklineData={sparklines?.traces}
            isLoading={isKpiLoading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 12 / 7 }}>
          <KpiCard
            label="Log Volume"
            value={kpis ? formatNumber(kpis.logVolume) : '—'}
            trend={kpis ? formatTrend(kpis.trends.logVolume) : ''}
            trendUp={false}
            icon={<ArticleRoundedIcon />}
            color="primary"
            sparklineData={sparklines?.logs}
            isLoading={isKpiLoading}
          />
        </Grid>
      </Grid>

      {/* ─── Row 2: Request Trend + Service Health ─── */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RequestTrendChart
            data={services.data?.requestTrend ?? []}
            isLoading={services.isLoading}
            error={services.error as Error | null}
            onRetry={() => services.refetch()}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ServiceHealthChart
            data={services.data?.serviceHealth ?? { healthy: 0, degraded: 0, critical: 0 }}
            isLoading={services.isLoading}
            error={services.error as Error | null}
            onRetry={() => services.refetch()}
          />
        </Grid>
      </Grid>

      {/* ─── Row 3: Error Trend + Top Failing Services ─── */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ErrorTrendChart
            data={errors.data?.errorTrend ?? []}
            isLoading={errors.isLoading}
            error={errors.error as Error | null}
            onRetry={() => errors.refetch()}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TopFailingServicesChart
            data={errors.data?.topFailingServices ?? []}
            isLoading={errors.isLoading}
            error={errors.error as Error | null}
            onRetry={() => errors.refetch()}
          />
        </Grid>
      </Grid>

      {/* ─── Row 4: Infrastructure Overview ─── */}
      <Grid container spacing={2}>
        <Grid size={12}>
          <InfraOverviewChart
            data={services.data?.infraOverview ?? []}
            isLoading={services.isLoading}
            error={services.error as Error | null}
            onRetry={() => services.refetch()}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
