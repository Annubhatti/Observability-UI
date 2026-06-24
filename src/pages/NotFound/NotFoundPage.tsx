import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeRounded from '@mui/icons-material/HomeRounded';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    document.title = '404 — Page Not Found';
  }, []);

  const gradientColors =
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #f44336 0%, #ff9800 40%, #ffeb3b 70%, #4caf50 100%)'
      : 'linear-gradient(135deg, #e53935 0%, #fb8c00 40%, #f9a825 70%, #43a047 100%)';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background blobs */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.error.main, 0.08)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Large 404 with gradient text */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '8rem', md: '12rem' },
          fontWeight: 900,
          lineHeight: 1,
          mb: 2,
          background: gradientColors,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: -4,
          userSelect: 'none',
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 1.5 }}
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          maxWidth: 440,
          mb: 4,
          lineHeight: 1.7,
        }}
      >
        The page you're looking for doesn't exist or has been moved.
        Check the URL or head back to the dashboard.
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<HomeRounded />}
        onClick={() => navigate('/dashboard')}
        sx={{
          px: 4,
          py: 1.2,
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1rem',
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
          '&:hover': {
            boxShadow: `0 6px 28px ${alpha(theme.palette.primary.main, 0.45)}`,
          },
        }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
}
