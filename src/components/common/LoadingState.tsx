import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { alpha, useTheme } from '@mui/material/styles';

interface LoadingStateProps {
  label?: string;
  variant?: 'spinner' | 'skeleton-table' | 'skeleton-cards';
  rows?: number;
}

export default function LoadingState({
  label = 'Loading…',
  variant = 'spinner',
  rows = 5,
}: LoadingStateProps) {
  const theme = useTheme();

  if (variant === 'skeleton-table') {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={40} sx={{ mb: 2, borderRadius: 1 }} />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={48}
            sx={{
              mb: 1,
              borderRadius: 1,
              opacity: 1 - i * 0.12,
            }}
          />
        ))}
      </Box>
    );
  }

  if (variant === 'skeleton-cards') {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2.5, p: 3 }}>
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={160}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 320,
        gap: 2.5,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)}, transparent)`,
          }}
        />
        <CircularProgress
          size={40}
          thickness={3}
          sx={{
            color: theme.palette.primary.main,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', fontWeight: 500 }}
      >
        {label}
      </Typography>
    </Box>
  );
}
