import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import { alpha } from '@mui/material/styles';
import PageHeader from '../../components/common/PageHeader';

const TABLE_HEADERS = ['Version', 'Environment', 'Service', 'Deployed By', 'Time'];

const SKELETON_WIDTHS: Record<string, number> = {
  Version: 90,
  Environment: 80,
  Service: 120,
  'Deployed By': 110,
  Time: 130,
};

export default function DeploymentsPage() {
  useEffect(() => {
    document.title = 'Deployments | Observability';
  }, []);

  return (
    <Box>
      <PageHeader
        icon={<RocketLaunchRounded />}
        title="Deployments"
        subtitle="Release history and deployment tracking"
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
              Recent Deployments
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td': { borderBottom: 0 } }}
                  >
                    {TABLE_HEADERS.map((header) => (
                      <TableCell key={header}>
                        <Skeleton
                          variant={header === 'Environment' ? 'rounded' : 'text'}
                          width={SKELETON_WIDTHS[header]}
                          height={header === 'Environment' ? 24 : undefined}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
