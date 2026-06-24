import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid2';
import { alpha, useTheme } from '@mui/material/styles';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import SpeedRounded from '@mui/icons-material/SpeedRounded';
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import TimerRounded from '@mui/icons-material/TimerRounded';
import PageHeader from '../../components/common/PageHeader';

const TABS = ['Overview', 'Metrics', 'Logs', 'Traces', 'Dependencies', 'Deployments', 'Errors'] as const;

const TAB_DESCRIPTIONS: Record<string, string> = {
  Metrics: 'Real-time and historical metrics for this service will be displayed here.',
  Logs: 'Aggregated log streams for this service will appear here.',
  Traces: 'Distributed traces originating from or passing through this service will be shown here.',
  Dependencies: 'Upstream and downstream service dependency map will be visualized here.',
  Deployments: 'Deployment history and rollout status for this service will be listed here.',
  Errors: 'Error tracking and exception groups for this service will be displayed here.',
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.3)})`,
        }}
      />
      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 2,
              background: alpha(color, 0.12),
              color,
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function ServiceDetailPage() {
  const theme = useTheme();
  const { serviceName } = useParams<{ serviceName: string }>();
  const [activeTab, setActiveTab] = useState(0);

  const displayName = serviceName ?? 'Unknown Service';

  useEffect(() => {
    document.title = `${displayName} | Services | Observability`;
  }, [displayName]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <PageHeader
        icon={<AccountTreeRounded />}
        title={displayName}
        subtitle="Service performance and health details"
      />

      {/* ── Tabs ── */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 100,
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
      </Box>

      {/* ── Tab Panels ── */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Service Health"
              value="Healthy"
              subtitle="All checks passing"
              icon={<FavoriteRounded />}
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Throughput"
              value="1,247 req/s"
              subtitle="↑ 12% from last hour"
              icon={<SpeedRounded />}
              color={theme.palette.info.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Error Rate"
              value="0.12%"
              subtitle="3 errors in last 5 min"
              icon={<ErrorOutlineRounded />}
              color={theme.palette.warning.main}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Latency (p99)"
              value="142 ms"
              subtitle="↓ 8% from last hour"
              icon={<TimerRounded />}
              color={theme.palette.secondary.main}
            />
          </Grid>
        </Grid>
      )}

      {activeTab !== 0 && (
        <Card
          sx={{
            minHeight: 320,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(8px)',
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}
            >
              {TABS[activeTab]}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled', maxWidth: 400 }}>
              {TAB_DESCRIPTIONS[TABS[activeTab]] ?? 'Content coming soon.'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
