import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { alpha } from '@mui/material/styles';
import TimelineRounded from '@mui/icons-material/TimelineRounded';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import PageHeader from '../../components/common/PageHeader';

const TABLE_HEADERS = ['Trace ID', 'Service', 'Operation', 'Duration', 'Status', 'Timestamp'];

interface PlaceholderTrace {
  traceId: string;
  service: string;
  operation: string;
  duration: string;
  status: 'OK' | 'ERROR' | 'TIMEOUT';
  timestamp: string;
}

const PLACEHOLDER_ROWS: PlaceholderTrace[] = [
  { traceId: 'abc-12f8-9e3d', service: 'api-gateway', operation: 'POST /v1/orders', duration: '243ms', status: 'OK', timestamp: '2026-06-19 15:42:01' },
  { traceId: 'def-45a1-bc72', service: 'payment-svc', operation: 'ProcessPayment', duration: '1.2s', status: 'ERROR', timestamp: '2026-06-19 15:41:58' },
  { traceId: 'gh1-78d3-ef01', service: 'user-svc', operation: 'GET /v1/users/:id', duration: '87ms', status: 'OK', timestamp: '2026-06-19 15:41:44' },
  { traceId: 'jk2-90b6-1234', service: 'inventory-svc', operation: 'CheckStock', duration: '5.1s', status: 'TIMEOUT', timestamp: '2026-06-19 15:41:30' },
  { traceId: 'lm3-23c9-5678', service: 'api-gateway', operation: 'GET /v1/products', duration: '156ms', status: 'OK', timestamp: '2026-06-19 15:41:12' },
  { traceId: 'no4-56f2-9abc', service: 'notification-svc', operation: 'SendEmail', duration: '432ms', status: 'ERROR', timestamp: '2026-06-19 15:40:55' },
];

const statusColor: Record<PlaceholderTrace['status'], 'success' | 'error' | 'warning'> = {
  OK: 'success',
  ERROR: 'error',
  TIMEOUT: 'warning',
};

export default function TracesPage() {
  useEffect(() => {
    document.title = 'Trace Explorer | Observability';
  }, []);

  return (
    <Box>
      <PageHeader
        icon={<TimelineRounded />}
        title="Trace Explorer"
        subtitle="Distributed tracing and request flow analysis"
      />

      {/* ── Filter bar ── */}
      <Card
        variant="outlined"
        sx={{
          mb: 2.5,
          bgcolor: (t) => alpha(t.palette.background.paper, 0.6),
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
            py: 1.5,
            '&:last-child': { pb: 1.5 },
          }}
        >
          <TextField
            select
            label="Service"
            size="small"
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All Services</MenuItem>
            <MenuItem value="api-gateway">api-gateway</MenuItem>
            <MenuItem value="payment-svc">payment-svc</MenuItem>
            <MenuItem value="user-svc">user-svc</MenuItem>
          </TextField>

          <TextField
            label="Operation"
            size="small"
            variant="outlined"
            placeholder="e.g. POST /v1/orders"
            sx={{ minWidth: 200 }}
          />

          <TextField
            select
            label="Duration"
            size="small"
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="fast">&lt; 100ms</MenuItem>
            <MenuItem value="medium">100ms – 1s</MenuItem>
            <MenuItem value="slow">&gt; 1s</MenuItem>
          </TextField>

          <TextField
            select
            label="Status"
            size="small"
            variant="outlined"
            defaultValue=""
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="OK">OK</MenuItem>
            <MenuItem value="ERROR">Error</MenuItem>
            <MenuItem value="TIMEOUT">Timeout</MenuItem>
          </TextField>
        </CardContent>
      </Card>

      {/* ── Traces table ── */}
      <Card variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEADERS.map((header) => (
                  <TableCell
                    key={header}
                    sx={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {PLACEHOLDER_ROWS.map((row) => (
                <TableRow
                  key={row.traceId}
                  hover
                  sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}
                >
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: 'monospace', color: 'primary.main', fontWeight: 600 }}
                    >
                      {row.traceId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="80%" animation={false} sx={{ opacity: 0.25 }} />
                    <Typography variant="body2" sx={{ mt: -2 }}>
                      {row.service}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>
                      {row.operation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {row.duration}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={statusColor[row.status]}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
                      {row.timestamp}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* ── Info bar ── */}
      <Card
        variant="outlined"
        sx={{
          mt: 2.5,
          bgcolor: (t) => alpha(t.palette.info.main, 0.06),
          borderColor: (t) => alpha(t.palette.info.main, 0.25),
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            py: 1.5,
            '&:last-child': { pb: 1.5 },
          }}
        >
          <InfoOutlined sx={{ color: 'info.main', fontSize: 22 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Click a trace to view waterfall timeline and span details
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
