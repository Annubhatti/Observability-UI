// ─── Shared Recharts Theme Constants ───
import type { Theme } from '@mui/material/styles';

/** Curated chart color palette */
export const chartColors = [
  '#06b6d4', // cyan
  '#8b5cf6', // violet
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#3b82f6', // blue
  '#ec4899', // pink
  '#14b8a6', // teal
] as const;

export const statusChartColors = {
  healthy: '#10b981',
  degraded: '#f59e0b',
  critical: '#ef4444',
} as const;

export const ANIMATION_DURATION = 800;
export const ANIMATION_EASING = 'ease-in-out' as const;

export function getGridStyle(theme: Theme) {
  return {
    stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    strokeDasharray: '3 3',
  };
}

export function getAxisStyle(theme: Theme) {
  return {
    fontSize: 11,
    fontFamily: '"Inter", sans-serif',
    fill: theme.palette.text.secondary,
  };
}

export function getTooltipStyle(theme: Theme) {
  const isDark = theme.palette.mode === 'dark';
  return {
    contentStyle: {
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      borderRadius: 8,
      padding: '10px 14px',
      boxShadow: isDark
        ? '0 8px 32px rgba(0,0,0,0.5)'
        : '0 8px 32px rgba(0,0,0,0.12)',
      fontSize: 12,
      fontFamily: '"Inter", sans-serif',
    },
    labelStyle: {
      color: theme.palette.text.secondary,
      fontSize: 11,
      fontWeight: 500,
      marginBottom: 4,
    },
    itemStyle: {
      color: theme.palette.text.primary,
      fontSize: 12,
      fontWeight: 600,
      padding: '2px 0',
    },
  };
}
