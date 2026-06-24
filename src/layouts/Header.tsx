import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { alpha, useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

// Icons
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

import { useThemeStore } from '../store/themeStore';
import { useGlobalStore, type TimeRange } from '../store/globalStore';
import { SIDEBAR_WIDTH_EXPANDED, SIDEBAR_WIDTH_COLLAPSED } from './Sidebar';
import { useSidebarStore } from '../store/sidebarStore';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/infrastructure': 'Infrastructure',
  '/services': 'Services',
  '/metrics': 'Metrics',
  '/logs': 'Logs',
  '/traces': 'Traces',
  '/alerts': 'Alerts',
  '/incidents': 'Incidents',
  '/slos': 'SLOs',
  '/deployments': 'Deployments',
};

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: '15m', label: 'Last 15m' },
  { value: '1h', label: 'Last 1h' },
  { value: '6h', label: 'Last 6h' },
  { value: '24h', label: 'Last 24h' },
  { value: '7d', label: 'Last 7d' },
  { value: '30d', label: 'Last 30d' },
];

export default function Header() {
  const theme = useTheme();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeStore();
  const { selectedTimeRange, setTimeRange } = useGlobalStore();
  const collapsed = useSidebarStore((s) => s.collapsed);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const sidebarWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  const currentTitle =
    Object.entries(routeTitles).find(([path]) => location.pathname.startsWith(path))?.[1] ??
    'Observability';

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value as TimeRange);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(12px)',
        color: theme.palette.text.primary,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: '56px !important', px: { xs: 2, md: 3 } }}>
        {/* ─── Page Title ─── */}
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.05rem', mr: 'auto' }}>
          {currentTitle}
        </Typography>

        {/* ─── Search ─── */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.text.primary, 0.04),
            border: `1px solid ${theme.palette.divider}`,
            transition: 'border-color 0.2s, background-color 0.2s',
            '&:focus-within': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
            },
            minWidth: 220,
            maxWidth: 320,
          }}
        >
          <SearchRoundedIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
          <InputBase
            placeholder="Search… ⌘K"
            sx={{
              fontSize: '0.825rem',
              flex: 1,
              '& input::placeholder': { opacity: 0.6 },
            }}
          />
        </Box>

        {/* ─── Time Range ─── */}
        <Tooltip title="Time range">
          <Select
            value={selectedTimeRange}
            onChange={handleTimeRangeChange}
            size="small"
            variant="outlined"
            IconComponent={AccessTimeRoundedIcon}
            sx={{
              fontSize: '0.8rem',
              fontWeight: 500,
              minWidth: 110,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
              '& .MuiSelect-icon': { fontSize: 16, color: 'text.secondary' },
              height: 34,
            }}
          >
            {timeRangeOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.825rem' }}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>

        {/* ─── Theme Toggle ─── */}
        <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: mode === 'dark' ? '#fbbf24' : '#6366f1',
                backgroundColor: alpha(
                  mode === 'dark' ? '#fbbf24' : '#6366f1',
                  0.1
                ),
              },
              transition: 'all 0.2s',
            }}
          >
            {mode === 'dark' ? (
              <LightModeRoundedIcon sx={{ fontSize: 20 }} />
            ) : (
              <DarkModeRoundedIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Tooltip>

        {/* ─── Notifications ─── */}
        <Tooltip title="Notifications">
          <IconButton
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                '& .MuiBadge-badge': { fontSize: '0.65rem', minWidth: 16, height: 16 },
              }}
            >
              <NotificationsNoneRoundedIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* ─── User Menu ─── */}
        <Tooltip title="Account">
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
            sx={{ p: 0, ml: 0.5 }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '0.8rem',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              A
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: theme.shadows[8],
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Admin User
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              admin@observability.io
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ gap: 1.5 }}>
            <ListItemIcon><PersonOutlineRoundedIcon fontSize="small" /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '0.84rem' }}>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ gap: 1.5 }}>
            <ListItemIcon><SettingsRoundedIcon fontSize="small" /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '0.84rem' }}>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ gap: 1.5 }}>
            <ListItemIcon><LogoutRoundedIcon fontSize="small" /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '0.84rem' }}>Sign out</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
