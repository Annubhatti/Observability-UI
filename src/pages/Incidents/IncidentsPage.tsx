import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ReportProblemRounded from '@mui/icons-material/ReportProblemRounded';
import { alpha } from '@mui/material/styles';
import PageHeader from '../../components/common/PageHeader';

type IncidentStatus = 'open' | 'investigating' | 'resolved';

const STATUS_CONFIG: Record<IncidentStatus, { label: string; color: 'error' | 'warning' | 'success' }> = {
  open: { label: 'Open', color: 'error' },
  investigating: { label: 'Investigating', color: 'warning' },
  resolved: { label: 'Resolved', color: 'success' },
};

const PLACEHOLDER_ROWS: { status: IncidentStatus }[] = [
  { status: 'open' },
  { status: 'investigating' },
  { status: 'open' },
  { status: 'resolved' },
  { status: 'investigating' },
];

const TABLE_HEADERS = ['Title', 'Severity', 'Status', 'Owner', 'Created'];

export default function IncidentsPage() {
  useEffect(() => {
    document.title = 'Incidents | Observability';
  }, []);

  return (
    <Box>
      <PageHeader
        icon={<ReportProblemRounded />}
        title="Incidents"
        subtitle="Track and manage active incidents"
      />

      <Card
        sx={{
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7),
          backdropFilter: 'blur(8px)',
        }}
      >
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Active Incidents
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {TABLE_HEADERS.map((header) => (
                    <TableCell
                      key={header}
                      sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {PLACEHOLDER_ROWS.map((row, index) => {
                  const statusCfg = STATUS_CONFIG[row.status];
                  return (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td': { borderBottom: 0 } }}
                    >
                      <TableCell>
                        <Skeleton variant="text" width={180 + Math.random() * 80} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width={60} height={24} />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusCfg.label}
                          color={statusCfg.color}
                          size="small"
                          variant="filled"
                          sx={{ fontWeight: 600, minWidth: 90 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={120} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
