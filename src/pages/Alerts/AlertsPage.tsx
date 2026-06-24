import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { alpha } from '@mui/material/styles';
import NotificationsActiveRounded from '@mui/icons-material/NotificationsActiveRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import PageHeader from '../../components/common/PageHeader';

const TABLE_HEADERS = ['Name', 'Severity', 'Status', 'Created', 'Last Triggered'];

type Severity = 'critical' | 'warning' | 'info';
type AlertStatus = 'active' | 'muted';

interface PlaceholderAlert {
  name: string;
  severity: Severity;
  status: AlertStatus;
  created: string;
  lastTriggered: string;
}

const PLACEHOLDER_ROWS: PlaceholderAlert[] = [
  { name: 'High CPU Usage — production', severity: 'critical', status: 'active', created: '2026-05-10', lastTriggered: '2 minutes ago' },
  { name: 'Error Rate > 5%', severity: 'warning', status: 'active', created: '2026-04-22', lastTriggered: '18 minutes ago' },
  { name: 'Disk Space Below 20%', severity: 'critical', status: 'muted', created: '2026-03-15', lastTriggered: '3 hours ago' },
  { name: 'Latency P99 > 500ms', severity: 'warning', status: 'active', created: '2026-06-01', lastTriggered: '45 minutes ago' },
  { name: 'Deployment Notification', severity: 'info', status: 'muted', created: '2026-06-12', lastTriggered: '2 days ago' },
];

const SEVERITY_COLORS: Record<Severity, { bg: string; label: string }> = {
  critical: { bg: 'error.main', label: 'Critical' },
  warning: { bg: 'warning.main', label: 'Warning' },
  info: { bg: 'info.main', label: 'Info' },
};

const STATUS_COLORS: Record<AlertStatus, { bg: string; label: string }> = {
  active: { bg: 'success.main', label: 'Active' },
  muted: { bg: 'text.disabled', label: 'Muted' },
};

export default function AlertsPage() {
  useEffect(() => {
    document.title = 'Alerts | Observability';
  }, []);

  return (
    <Box>
      <PageHeader
        icon={<NotificationsActiveRounded />}
        title="Alerts"
        subtitle="Configure and manage alert rules"
        actions={
          <Button
            variant="contained"
            startIcon={<AddRounded />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Create Alert
          </Button>
        }
      />

      {/* ── Alert rules table ── */}
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
                  key={row.name}
                  hover
                  sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {row.name}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={SEVERITY_COLORS[row.severity].label}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        color: SEVERITY_COLORS[row.severity].bg,
                        bgcolor: (t) =>
                          alpha(
                            t.palette[row.severity === 'critical' ? 'error' : row.severity === 'warning' ? 'warning' : 'info'].main,
                            0.12,
                          ),
                        borderColor: (t) =>
                          alpha(
                            t.palette[row.severity === 'critical' ? 'error' : row.severity === 'warning' ? 'warning' : 'info'].main,
                            0.35,
                          ),
                        border: '1px solid',
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={STATUS_COLORS[row.status].label}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        color: row.status === 'active' ? 'success.main' : 'text.secondary',
                        bgcolor: (t) =>
                          alpha(
                            row.status === 'active'
                              ? t.palette.success.main
                              : t.palette.action.disabled,
                            0.12,
                          ),
                        borderColor: (t) =>
                          alpha(
                            row.status === 'active'
                              ? t.palette.success.main
                              : t.palette.action.disabled,
                            0.35,
                          ),
                        border: '1px solid',
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {row.created}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {row.lastTriggered}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
