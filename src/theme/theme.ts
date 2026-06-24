import { createTheme, type ThemeOptions, alpha } from '@mui/material/styles';

const sharedTypography: ThemeOptions['typography'] = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: { fontWeight: 800, fontSize: '2.25rem', lineHeight: 1.2, letterSpacing: '-0.02em' },
  h2: { fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3, letterSpacing: '-0.01em' },
  h3: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.3 },
  h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
  h5: { fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.4 },
  h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 },
  subtitle1: { fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.5 },
  subtitle2: { fontWeight: 500, fontSize: '0.85rem', lineHeight: 1.5 },
  body1: { fontSize: '0.9rem', lineHeight: 1.6 },
  body2: { fontSize: '0.825rem', lineHeight: 1.6 },
  caption: { fontSize: '0.75rem', lineHeight: 1.5, letterSpacing: '0.02em' },
  overline: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' },
  button: { fontWeight: 600, fontSize: '0.825rem', letterSpacing: '0.02em', textTransform: 'none' },
};

const sharedShape = { borderRadius: 10 };

const sharedComponents = (mode: 'dark' | 'light'): ThemeOptions['components'] => {
  const isDark = mode === 'dark';
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: isDark
            ? 'rgba(255,255,255,0.15) transparent'
            : 'rgba(0,0,0,0.15) transparent',
          '&::-webkit-scrollbar': { width: 6, height: 6 },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 3,
            background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
          },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        contained: {
          background: isDark
            ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
            : 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
          '&:hover': {
            background: isDark
              ? 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)'
              : 'linear-gradient(135deg, #0369a1 0%, #1d4ed8 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
          backgroundImage: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
          boxShadow: 'none',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}`,
          padding: '12px 16px',
          fontSize: '0.825rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500, fontSize: '0.75rem' },
        filled: {
          border: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.75rem',
          borderRadius: 6,
          padding: '6px 12px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          padding: '8px 12px',
          '&.Mui-selected': {
            backgroundColor: isDark
              ? alpha('#06b6d4', 0.12)
              : alpha('#0284c7', 0.1),
            '&:hover': {
              backgroundColor: isDark
                ? alpha('#06b6d4', 0.18)
                : alpha('#0284c7', 0.15),
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: { minWidth: 40 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.825rem',
          textTransform: 'none',
          minHeight: 44,
        },
      },
    },
  };
};

// ─── Status / semantic colors shared across both themes ───
const statusColors = {
  healthy: '#10b981',
  warning: '#f59e0b',
  critical: '#ef4444',
  info: '#3b82f6',
};

// ─── DARK THEME ───
const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2', contrastText: '#ffffff' },
  secondary: { main: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed' },
  error: { main: statusColors.critical, light: '#f87171', dark: '#dc2626' },
  warning: { main: statusColors.warning, light: '#fbbf24', dark: '#d97706' },
  success: { main: statusColors.healthy, light: '#34d399', dark: '#059669' },
  info: { main: statusColors.info, light: '#60a5fa', dark: '#2563eb' },
  background: {
    default: '#0a0e1a',
    paper: '#111827',
  },
  text: {
    primary: '#f1f5f9',
    secondary: '#94a3b8',
  },
  divider: 'rgba(255, 255, 255, 0.06)',
  action: {
    hover: 'rgba(255, 255, 255, 0.04)',
    selected: 'rgba(6, 182, 212, 0.12)',
    focus: 'rgba(6, 182, 212, 0.12)',
  },
};

// ─── LIGHT THEME ───
const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: { main: '#0284c7', light: '#38bdf8', dark: '#0369a1', contrastText: '#ffffff' },
  secondary: { main: '#7c3aed', light: '#a78bfa', dark: '#6d28d9' },
  error: { main: statusColors.critical, light: '#f87171', dark: '#dc2626' },
  warning: { main: statusColors.warning, light: '#fbbf24', dark: '#d97706' },
  success: { main: statusColors.healthy, light: '#34d399', dark: '#059669' },
  info: { main: statusColors.info, light: '#60a5fa', dark: '#2563eb' },
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
  },
  text: {
    primary: '#0f172a',
    secondary: '#475569',
  },
  divider: 'rgba(0, 0, 0, 0.08)',
  action: {
    hover: 'rgba(0, 0, 0, 0.03)',
    selected: 'rgba(2, 132, 199, 0.08)',
    focus: 'rgba(2, 132, 199, 0.12)',
  },
};

export const createAppTheme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,
    typography: sharedTypography,
    shape: sharedShape,
    components: sharedComponents(mode),
  });

export { statusColors };
