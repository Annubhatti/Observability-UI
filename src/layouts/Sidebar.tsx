import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';

// Icons
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';

import { useSidebarStore } from '../store/sidebarStore';

export const SIDEBAR_WIDTH_EXPANDED = 260;
export const SIDEBAR_WIDTH_COLLAPSED = 72;

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardRoundedIcon /> },
    ],
  },
  {
    title: 'Observe',
    items: [
      { label: 'Infrastructure', path: '/infrastructure', icon: <DnsRoundedIcon /> },
      { label: 'Services', path: '/services', icon: <AccountTreeRoundedIcon /> },
      { label: 'Metrics', path: '/metrics', icon: <SpeedRoundedIcon /> },
      { label: 'Logs', path: '/logs', icon: <ArticleRoundedIcon /> },
      { label: 'Traces', path: '/traces', icon: <TimelineRoundedIcon /> },
    ],
  },
  {
    title: 'Respond',
    items: [
      { label: 'Alerts', path: '/alerts', icon: <NotificationsActiveRoundedIcon /> },
      { label: 'Incidents', path: '/incidents', icon: <ReportProblemRoundedIcon /> },
    ],
  },
  {
    title: 'Manage',
    items: [
      { label: 'SLOs', path: '/slos', icon: <VerifiedRoundedIcon /> },
      { label: 'Deployments', path: '/deployments', icon: <RocketLaunchRoundedIcon /> },
    ],
  },
];

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed, toggleSidebar } = useSidebarStore();

  const width = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/' || location.pathname.startsWith('/dashboard');
    return location.pathname.startsWith(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* ─── Brand ─── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: collapsed ? 0 : 2.5,
          py: 2.5,
          justifyContent: collapsed ? 'center' : 'flex-start',
          minHeight: 64,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <HubRoundedIcon sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        {!collapsed && (
          <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                fontSize: '0.95rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Observability
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block', mt: -0.3 }}
            >
              Platform
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ mx: 1.5 }} />

      {/* ─── Navigation ─── */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 1 }}>
        {navSections.map((section, sIdx) => (
          <Box key={sIdx} sx={{ mb: 0.5 }}>
            {section.title && !collapsed && (
              <Typography
                variant="overline"
                sx={{
                  px: 2.5,
                  pt: sIdx > 0 ? 1.5 : 1,
                  pb: 0.5,
                  display: 'block',
                  color: 'text.secondary',
                  fontSize: '0.65rem',
                }}
              >
                {section.title}
              </Typography>
            )}
            {collapsed && sIdx > 0 && <Divider sx={{ mx: 1.5, my: 0.5 }} />}
            <List disablePadding>
              {section.items.map((item) => {
                const active = isActive(item.path);
                const button = (
                  <ListItemButton
                    key={item.path}
                    selected={active}
                    onClick={() => navigate(item.path)}
                    sx={{
                      minHeight: 42,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      px: collapsed ? 1 : 1.5,
                      '& .MuiListItemIcon-root': {
                        color: active
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                        transition: 'color 0.2s',
                      },
                      '&:hover .MuiListItemIcon-root': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: 'center',
                        minWidth: collapsed ? 0 : 40,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: '0.84rem',
                          fontWeight: active ? 600 : 500,
                          color: active ? 'text.primary' : 'text.secondary',
                        }}
                      />
                    )}
                    {/* active indicator */}
                    {active && (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 3,
                          height: 20,
                          borderRadius: '0 4px 4px 0',
                          backgroundColor: theme.palette.primary.main,
                        }}
                      />
                    )}
                  </ListItemButton>
                );

                return collapsed ? (
                  <Tooltip key={item.path} title={item.label} placement="right" arrow>
                    {button}
                  </Tooltip>
                ) : (
                  button
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* ─── Collapse Toggle ─── */}
      <Divider sx={{ mx: 1.5 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
          p: 1,
        }}
      >
        <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
          <IconButton
            onClick={toggleSidebar}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            {collapsed ? <ChevronRightRoundedIcon /> : <ChevronLeftRoundedIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
