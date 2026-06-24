import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import SpeedRounded from '@mui/icons-material/SpeedRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import StackedLineChartRounded from '@mui/icons-material/StackedLineChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import SpeedOutlined from '@mui/icons-material/SpeedOutlined';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import AutoFixHighRounded from '@mui/icons-material/AutoFixHighRounded';
import PageHeader from '../../components/common/PageHeader';

const TIME_RANGES = ['15m', '1h', '6h', '24h', '7d', '30d'] as const;

const CHART_TYPES = [
  { label: 'Line', icon: <ShowChartRounded fontSize="small" /> },
  { label: 'Area', icon: <StackedLineChartRounded fontSize="small" /> },
  { label: 'Bar', icon: <BarChartRounded fontSize="small" /> },
  { label: 'Gauge', icon: <SpeedOutlined fontSize="small" /> },
  { label: 'Table', icon: <TableChartRounded fontSize="small" /> },
] as const;

export default function MetricsPage() {
  const [selectedRange, setSelectedRange] = useState<string>('1h');
  const [selectedChart, setSelectedChart] = useState<string>('Line');

  useEffect(() => {
    document.title = 'Metrics Explorer | Observability';
  }, []);

  return (
    <Box>
      <PageHeader
        icon={<SpeedRounded />}
        title="Metrics Explorer"
        subtitle="Query and visualize metrics with PromQL"
        actions={
          <Tooltip title="Run query">
            <IconButton
              color="primary"
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
              })}
            >
              <PlayArrowRounded />
            </IconButton>
          </Tooltip>
        }
      />

      {/* ── Query Editor ── */}
      <Card
        variant="outlined"
        sx={(theme) => ({
          mb: 2.5,
          bgcolor: alpha(theme.palette.background.paper, 0.6),
          borderColor: alpha(theme.palette.divider, 0.4),
        })}
      >
        <CardContent sx={{ pb: '16px !important' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}
          >
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              PromQL Query
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="Copy query">
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <ContentCopyRounded fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="AI Assist">
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <AutoFixHighRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={(theme) => ({
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontSize: 14,
              lineHeight: 1.7,
              height: 100,
              px: 2.5,
              py: 2,
              borderRadius: 1.5,
              bgcolor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.black, 0.5)
                  : alpha(theme.palette.grey[900], 0.9),
              color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[100],
              border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
              display: 'flex',
              alignItems: 'flex-start',
              cursor: 'text',
              overflow: 'hidden',
              '&::before': {
                content: '"1\\A2\\A3"',
                whiteSpace: 'pre',
                color: alpha(theme.palette.grey[500], 0.5),
                mr: 2,
                fontSize: 12,
                lineHeight: 1.7,
                userSelect: 'none',
              },
            })}
          >
            <Box component="span" sx={{ color: '#ce9178' }}>
              rate
            </Box>
            <Box component="span" sx={{ color: '#dcdcaa' }}>
              (
            </Box>
            <Box component="span" sx={{ color: '#9cdcfe' }}>
              http_requests_total
            </Box>
            <Box component="span" sx={{ color: '#dcdcaa' }}>
              [
            </Box>
            <Box component="span" sx={{ color: '#b5cea8' }}>
              5m
            </Box>
            <Box component="span" sx={{ color: '#dcdcaa' }}>
              ])
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ── Time Range Chips & Chart Type Buttons ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2.5,
        }}
      >
        {/* Time Range */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          {TIME_RANGES.map((range) => (
            <Chip
              key={range}
              label={range}
              size="small"
              variant={selectedRange === range ? 'filled' : 'outlined'}
              color={selectedRange === range ? 'primary' : 'default'}
              onClick={() => setSelectedRange(range)}
              sx={{
                fontWeight: 600,
                minWidth: 48,
                ...(selectedRange === range && {
                  boxShadow: (theme) => `0 0 0 1px ${alpha(theme.palette.primary.main, 0.3)}`,
                }),
              }}
            />
          ))}
        </Box>

        {/* Chart Type */}
        <ButtonGroup size="small" variant="outlined">
          {CHART_TYPES.map(({ label, icon }) => (
            <Button
              key={label}
              startIcon={icon}
              variant={selectedChart === label ? 'contained' : 'outlined'}
              onClick={() => setSelectedChart(label)}
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12, px: 1.5 }}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* ── Chart Placeholder ── */}
      <Card
        variant="outlined"
        sx={(theme) => ({
          borderColor: alpha(theme.palette.divider, 0.4),
          bgcolor: alpha(theme.palette.background.paper, 0.6),
        })}
      >
        <CardContent sx={{ pb: '16px !important' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              http_requests_total — rate [5m]
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Last updated: just now
            </Typography>
          </Box>

          {/* Fake chart area */}
          <Box
            sx={(theme) => ({
              height: 360,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.action.hover, 0.3),
              border: `1px dashed ${alpha(theme.palette.divider, 0.4)}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              position: 'relative',
              overflow: 'hidden',
            })}
          >
            {/* Decorative skeleton lines to mimic a chart */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: 0.5,
              }}
            >
              {[65, 40, 80, 55, 72, 30, 90, 48, 60, 75].map((w, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={`${w}%`}
                  height={6}
                  sx={{ borderRadius: 1, opacity: 0.4 + (i % 3) * 0.15 }}
                />
              ))}
            </Box>

            <ShowChartRounded sx={{ fontSize: 48, color: 'text.disabled' }} />
            <Typography variant="body2" sx={{ color: 'text.disabled', fontWeight: 500 }}>
              Chart visualization will appear here
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
