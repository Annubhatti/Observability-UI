import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Skeleton from '@mui/material/Skeleton';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import ArticleRounded from '@mui/icons-material/ArticleRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import FiberManualRecordRounded from '@mui/icons-material/FiberManualRecordRounded';
import FilterListRounded from '@mui/icons-material/FilterListRounded';
import RefreshRounded from '@mui/icons-material/RefreshRounded';
import PageHeader from '../../components/common/PageHeader';

type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

const LEVEL_COLORS: Record<LogLevel, 'error' | 'warning' | 'info' | 'default'> = {
  ERROR: 'error',
  WARN: 'warning',
  INFO: 'info',
  DEBUG: 'default',
};

const FILTER_FIELDS = [
  { label: 'Service', options: ['api-gateway', 'auth-service', 'payment-svc', 'user-svc', 'All'] },
  { label: 'Container', options: ['web-01', 'worker-02', 'cron-03', 'All'] },
  { label: 'Severity', options: ['ERROR', 'WARN', 'INFO', 'DEBUG', 'All'] },
  { label: 'Host', options: ['prod-us-east-1a', 'prod-us-west-2b', 'staging-eu-1', 'All'] },
  { label: 'Environment', options: ['production', 'staging', 'development', 'All'] },
] as const;

interface SkeletonLogRow {
  timestamp: string;
  service: string;
  level: LogLevel;
  message: string;
  opacity: number;
}

const SKELETON_ROWS: SkeletonLogRow[] = [
  { timestamp: '2026-06-19T16:21:44.892Z', service: 'api-gateway', level: 'ERROR', message: 'Connection refused to upstream service payment-svc:8443 after 3 retries', opacity: 1.0 },
  { timestamp: '2026-06-19T16:21:44.210Z', service: 'auth-service', level: 'WARN', message: 'JWT token expiration within 5 minutes for user_id=a8f2c901', opacity: 0.95 },
  { timestamp: '2026-06-19T16:21:43.774Z', service: 'payment-svc', level: 'INFO', message: 'Payment processed successfully txn_id=TXN-90281 amount=149.99 currency=USD', opacity: 0.9 },
  { timestamp: '2026-06-19T16:21:43.118Z', service: 'user-svc', level: 'DEBUG', message: 'Cache hit for user profile lookup key=usr:profile:a8f2c901 ttl=284s', opacity: 0.85 },
  { timestamp: '2026-06-19T16:21:42.556Z', service: 'api-gateway', level: 'INFO', message: 'GET /api/v2/metrics 200 OK latency=42ms bytes=1847', opacity: 0.8 },
  { timestamp: '2026-06-19T16:21:41.993Z', service: 'auth-service', level: 'ERROR', message: 'Rate limit exceeded for IP 203.0.113.42 — 429 Too Many Requests', opacity: 0.72 },
  { timestamp: '2026-06-19T16:21:41.402Z', service: 'payment-svc', level: 'WARN', message: 'Stripe webhook signature verification retry attempt 2/3', opacity: 0.65 },
  { timestamp: '2026-06-19T16:21:40.887Z', service: 'user-svc', level: 'INFO', message: 'User session created session_id=sess_7k2m9x duration=3600s', opacity: 0.55 },
];

export default function LogsPage() {
  const [liveTail, setLiveTail] = useState(false);

  useEffect(() => {
    document.title = 'Log Explorer | Observability';
  }, []);

  return (
    <Box>
      <PageHeader
        icon={<ArticleRounded />}
        title="Log Explorer"
        subtitle="Search, filter, and analyze logs in real-time"
        actions={
          <Tooltip title="Refresh">
            <IconButton
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                color: 'primary.main',
              })}
            >
              <RefreshRounded />
            </IconButton>
          </Tooltip>
        }
      />

      {/* ── Filter Bar ── */}
      <Card
        variant="outlined"
        sx={(theme) => ({
          mb: 2,
          bgcolor: alpha(theme.palette.background.paper, 0.6),
          borderColor: alpha(theme.palette.divider, 0.4),
        })}
      >
        <CardContent sx={{ pb: '12px !important', pt: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <FilterListRounded sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              Filters
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {FILTER_FIELDS.map(({ label, options }) => (
              <FormControl key={label} size="small" variant="outlined" sx={{ minWidth: 140 }}>
                <InputLabel sx={{ fontSize: 13 }}>{label}</InputLabel>
                <Select
                  label={label}
                  defaultValue="All"
                  sx={{ fontSize: 13, '& .MuiSelect-select': { py: 0.8 } }}
                >
                  {options.map((opt) => (
                    <MenuItem key={opt} value={opt} sx={{ fontSize: 13 }}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* ── Search Bar ── */}
      <Card
        variant="outlined"
        sx={(theme) => ({
          mb: 2.5,
          bgcolor: alpha(theme.palette.background.paper, 0.6),
          borderColor: alpha(theme.palette.divider, 0.4),
        })}
      >
        <CardContent sx={{ pb: '12px !important', pt: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder='Search logs… e.g. level:error service:api-gateway "connection refused"'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ fontSize: 20, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: { fontSize: 13, fontFamily: '"JetBrains Mono", "Fira Code", monospace' },
              }}
            />
            <Divider orientation="vertical" flexItem />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={liveTail}
                  onChange={(_, v) => setLiveTail(v)}
                  color="success"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FiberManualRecordRounded
                    sx={{
                      fontSize: 10,
                      color: liveTail ? 'success.main' : 'text.disabled',
                      animation: liveTail ? 'pulse 1.5s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0.3 },
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                    Live Tail
                  </Typography>
                </Box>
              }
              sx={{ ml: 0, mr: 0 }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* ── Log Table ── */}
      <Card
        variant="outlined"
        sx={(theme) => ({
          borderColor: alpha(theme.palette.divider, 0.4),
          bgcolor: alpha(theme.palette.background.paper, 0.6),
          overflow: 'hidden',
        })}
      >
        {/* Table Header */}
        <Box
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: '200px 130px 90px 1fr',
            gap: 2,
            px: 2.5,
            py: 1.5,
            bgcolor: alpha(theme.palette.action.hover, 0.4),
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
          })}
        >
          {['Timestamp', 'Service', 'Level', 'Message'].map((header) => (
            <Typography
              key={header}
              variant="caption"
              sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary' }}
            >
              {header}
            </Typography>
          ))}
        </Box>

        {/* Log Rows */}
        {SKELETON_ROWS.map((row, idx) => (
          <Box
            key={idx}
            sx={(theme) => ({
              display: 'grid',
              gridTemplateColumns: '200px 130px 90px 1fr',
              gap: 2,
              px: 2.5,
              py: 1.2,
              opacity: row.opacity,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
              transition: 'background-color 0.15s',
              '&:hover': {
                bgcolor: alpha(theme.palette.action.hover, 0.3),
              },
              ...(row.level === 'ERROR' && {
                bgcolor: alpha(theme.palette.error.main, 0.04),
                borderLeft: `3px solid ${theme.palette.error.main}`,
                pl: 2.1,
              }),
            })}
          >
            {/* Timestamp */}
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontSize: 12,
                color: 'text.secondary',
                whiteSpace: 'nowrap',
              }}
            >
              {row.timestamp.replace('T', ' ').replace('Z', '')}
            </Typography>

            {/* Service */}
            <Typography
              variant="body2"
              sx={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {row.service}
            </Typography>

            {/* Level */}
            <Chip
              label={row.level}
              size="small"
              color={LEVEL_COLORS[row.level]}
              variant={row.level === 'DEBUG' ? 'outlined' : 'filled'}
              sx={{
                fontSize: 11,
                fontWeight: 700,
                height: 22,
                minWidth: 60,
                letterSpacing: 0.3,
              }}
            />

            {/* Message */}
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontSize: 12,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {row.message}
            </Typography>
          </Box>
        ))}

        {/* Skeleton loading indicator at bottom */}
        <Box sx={{ px: 2.5, py: 1.5 }}>
          <Skeleton variant="text" width="100%" height={20} sx={{ opacity: 0.3 }} />
        </Box>
      </Card>
    </Box>
  );
}
