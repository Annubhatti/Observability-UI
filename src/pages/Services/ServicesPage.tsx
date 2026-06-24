import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import { alpha, useTheme } from '@mui/material/styles';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import PageHeader from '../../components/common/PageHeader';

const TABLE_COLUMNS = [
  'Service',
  'Language',
  'Environment',
  'Version',
  'Requests/sec',
  'Error Rate',
  'Latency',
  'Status',
  'Last Seen',
];

export default function ServicesPage() {
  const theme = useTheme();

  useEffect(() => {
    document.title = 'Services | Observability';
  }, []);

  return (
    <Box>
      <PageHeader
        icon={<AccountTreeRounded />}
        title="Services"
        subtitle="Application performance monitoring and service catalog"
      />

      {/* ── Filter Bar ── */}
      <Card
        sx={{
          mb: 3,
          background: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(8px)',
        }}
      >
        <CardContent sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <TextField
            size="small"
            label="Service Name"
            placeholder="e.g. api-gateway"
            sx={{ minWidth: 200, flex: 1 }}
          />
          <TextField
            size="small"
            label="Environment"
            placeholder="e.g. production"
            sx={{ minWidth: 180, flex: 1 }}
          />
          <TextField
            size="small"
            label="Language"
            placeholder="e.g. Go, Python"
            sx={{ minWidth: 160, flex: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<SearchRounded />}
            sx={{ height: 40, textTransform: 'none', fontWeight: 600, px: 3 }}
          >
            Search
          </Button>
        </CardContent>
      </Card>

      {/* ── Table Card ── */}
      <Card>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          {/* Header Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1.2fr',
              gap: 1,
              px: 2.5,
              py: 1.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
              background: alpha(theme.palette.primary.main, 0.04),
            }}
          >
            {TABLE_COLUMNS.map((col) => (
              <Typography
                key={col}
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  color: 'text.secondary',
                }}
              >
                {col}
              </Typography>
            ))}
          </Box>

          {/* Skeleton Rows */}
          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <Box
              key={rowIdx}
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1.2fr',
                gap: 1,
                px: 2.5,
                py: 1.5,
                alignItems: 'center',
                borderBottom: rowIdx < 5 ? `1px solid ${theme.palette.divider}` : 'none',
                opacity: 1 - rowIdx * 0.1,
                '&:hover': {
                  background: alpha(theme.palette.action.hover, 0.04),
                },
              }}
            >
              {TABLE_COLUMNS.map((col, colIdx) => {
                if (col === 'Status') {
                  return (
                    <Chip
                      key={colIdx}
                      size="small"
                      label={
                        <Skeleton
                          variant="text"
                          width={40}
                          sx={{ bgcolor: 'transparent' }}
                        />
                      }
                      sx={{
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                        fontWeight: 600,
                        width: 72,
                        height: 24,
                      }}
                    />
                  );
                }
                return (
                  <Skeleton
                    key={colIdx}
                    variant="text"
                    width={col === 'Service' ? '80%' : '60%'}
                    sx={{ borderRadius: 0.5 }}
                  />
                );
              })}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
