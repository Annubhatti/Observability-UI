import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import { alpha, useTheme } from '@mui/material/styles';

import PageHeader from '../../components/common/PageHeader';

import DnsRoundedIcon from '@mui/icons-material/DnsRounded';

/* ─── Column definitions per tab ─── */
interface ColumnDef {
  label: string;
  width: string;
}

const hostsColumns: ColumnDef[] = [
  { label: 'Hostname', width: '22%' },
  { label: 'Status', width: '10%' },
  { label: 'CPU %', width: '12%' },
  { label: 'Memory %', width: '12%' },
  { label: 'Disk I/O', width: '12%' },
  { label: 'Network', width: '12%' },
  { label: 'OS', width: '10%' },
  { label: 'Uptime', width: '10%' },
];

const containersColumns: ColumnDef[] = [
  { label: 'Container', width: '20%' },
  { label: 'Image', width: '20%' },
  { label: 'Status', width: '10%' },
  { label: 'CPU', width: '10%' },
  { label: 'Memory', width: '10%' },
  { label: 'Network I/O', width: '12%' },
  { label: 'Restarts', width: '8%' },
  { label: 'Created', width: '10%' },
];

const kubernetesColumns: ColumnDef[] = [
  { label: 'Pod', width: '20%' },
  { label: 'Namespace', width: '14%' },
  { label: 'Status', width: '10%' },
  { label: 'Node', width: '14%' },
  { label: 'CPU Request', width: '10%' },
  { label: 'Memory Request', width: '10%' },
  { label: 'Restarts', width: '8%' },
  { label: 'Age', width: '8%' },
];

const tabData: { label: string; columns: ColumnDef[] }[] = [
  { label: 'Hosts', columns: hostsColumns },
  { label: 'Containers', columns: containersColumns },
  { label: 'Kubernetes', columns: kubernetesColumns },
];

/* ─── Placeholder status chips per tab ─── */
const statusVariants: { label: string; color: 'success' | 'warning' | 'error' }[][] = [
  // Hosts
  [
    { label: 'Running', color: 'success' },
    { label: 'Running', color: 'success' },
    { label: 'Warning', color: 'warning' },
    { label: 'Running', color: 'success' },
    { label: 'Critical', color: 'error' },
  ],
  // Containers
  [
    { label: 'Running', color: 'success' },
    { label: 'Running', color: 'success' },
    { label: 'Stopped', color: 'error' },
    { label: 'Running', color: 'success' },
    { label: 'Restarting', color: 'warning' },
  ],
  // Kubernetes
  [
    { label: 'Running', color: 'success' },
    { label: 'Pending', color: 'warning' },
    { label: 'Running', color: 'success' },
    { label: 'Running', color: 'success' },
    { label: 'CrashLoop', color: 'error' },
  ],
];

const SKELETON_ROWS = 5;

export default function InfrastructurePage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    document.title = 'Infrastructure | Observability';
  }, []);

  const columns = tabData[activeTab].columns;
  const statuses = statusVariants[activeTab];
  const statusColIndex = columns.findIndex((c) => c.label === 'Status');

  return (
    <Box>
      <PageHeader
        icon={<DnsRoundedIcon />}
        title="Infrastructure"
        subtitle="Monitor hosts, containers, and Kubernetes clusters"
      />

      {/* ─── Tabs ─── */}
      <Tabs
        value={activeTab}
        onChange={(_e, v: number) => setActiveTab(v)}
        sx={{
          mb: 2.5,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            minHeight: 42,
          },
        }}
      >
        {tabData.map((t) => (
          <Tab key={t.label} label={t.label} />
        ))}
      </Tabs>

      {/* ─── Table Card ─── */}
      <Card
        variant="outlined"
        sx={{
          borderColor: alpha(theme.palette.divider, 0.6),
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          {/* Header row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2.5,
              py: 1.5,
              backgroundColor: alpha(theme.palette.text.primary, 0.04),
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            {columns.map((col) => (
              <Typography
                key={col.label}
                variant="caption"
                sx={{
                  width: col.width,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                }}
              >
                {col.label}
              </Typography>
            ))}
          </Box>

          {/* Skeleton data rows */}
          {Array.from({ length: SKELETON_ROWS }).map((_, rowIdx) => (
            <Box
              key={rowIdx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2.5,
                py: 1.5,
                borderBottom:
                  rowIdx < SKELETON_ROWS - 1
                    ? `1px solid ${alpha(theme.palette.divider, 0.5)}`
                    : 'none',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.action.hover, 0.4),
                },
              }}
            >
              {columns.map((col, colIdx) => (
                <Box key={col.label} sx={{ width: col.width, pr: 1 }}>
                  {colIdx === statusColIndex ? (
                    <Chip
                      label={statuses[rowIdx].label}
                      color={statuses[rowIdx].color}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 600, fontSize: '0.72rem' }}
                    />
                  ) : (
                    <Skeleton
                      variant="text"
                      width={`${55 + ((rowIdx * 7 + colIdx * 13) % 30)}%`}
                      sx={{ fontSize: '0.85rem' }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
