import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { alpha, useTheme } from '@mui/material/styles';
import { ErrorState } from '../common';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  height?: number;
  children: ReactNode;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export default function ChartCard({
  title,
  subtitle,
  icon,
  actions,
  height = 280,
  children,
  isLoading = false,
  error = null,
  onRetry,
}: ChartCardProps) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: alpha(theme.palette.divider, 0.5),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ p: 2.5, pb: 0, '&:last-child': { pb: 2 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon && (
              <Box sx={{ color: 'text.secondary', display: 'flex', '& .MuiSvgIcon-root': { fontSize: 18 } }}>
                {icon}
              </Box>
            )}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
          {actions && <Box sx={{ display: 'flex', gap: 0.5 }}>{actions}</Box>}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minHeight: height }}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              height={height}
              sx={{ borderRadius: 1.5, opacity: 0.5 }}
            />
          ) : error ? (
            <ErrorState
              title="Failed to load chart"
              message={error.message}
              onRetry={onRetry}
            />
          ) : (
            children
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
