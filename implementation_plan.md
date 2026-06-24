# Observability-UI — Application Shell

Build the complete application shell: project scaffolding, enterprise layout, theming, routing, state management, API client, and placeholder pages for all observability modules.

## Proposed Changes

### 1. Project Scaffolding

#### [NEW] Vite + React 19 + TypeScript project

Initialize with `npx create-vite` using the `react-ts` template, then install all dependencies:

| Category | Packages |
|---|---|
| **UI** | `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled` |
| **Routing** | `react-router` (v7, includes `react-router-dom`) |
| **State** | `zustand` |
| **Data Fetching** | `@tanstack/react-query`, `@tanstack/react-query-devtools` |
| **HTTP** | `axios` |

---

### 2. Theme System

#### [NEW] `src/theme/theme.ts`
- MUI `createTheme` with two palettes: **dark** (default) and **light**
- Dark palette: deep navy backgrounds (`#0a0e1a`, `#111827`), cyan/teal accents (`#06b6d4`, `#22d3ee`), vibrant status colors
- Light palette: clean whites/grays, blue accents, proper contrast
- Custom typography using **Inter** from Google Fonts
- Component overrides for Paper, Card, AppBar, Drawer, Table for a polished enterprise feel
- Shared border-radius tokens (`8px` cards, `12px` modals)

#### [NEW] `src/theme/ThemeProvider.tsx`
- Wraps MUI `ThemeProvider` + `CssBaseline`
- Reads mode from Zustand store (`useThemeStore`)
- Memoizes theme creation

---

### 3. Layout Components

#### [NEW] `src/layouts/AppLayout.tsx`
- Master layout: renders `<Sidebar>`, `<Header>`, and `<Outlet />` for nested routes
- Manages sidebar collapsed state (also persisted in Zustand)
- Uses MUI `Box` with CSS Grid for the 3-region layout

#### [NEW] `src/layouts/Sidebar.tsx`
- Collapsible left sidebar (expanded: `260px`, collapsed: `72px`, animated transition)
- Navigation sections matching the spec: **Dashboard, Infrastructure, Services, Applications (submenu for Metrics, Logs, Traces), Alerts, Incidents, SLOs, Deployments**
- Active route highlighting via `useLocation`
- App logo/brand at top, collapse toggle at bottom
- Smooth width transition with `transition: width 0.3s ease`

#### [NEW] `src/layouts/Header.tsx`
- Fixed top header bar
- Left: breadcrumb or page title
- Right: global search input, dark/light theme toggle (`IconButton` with sun/moon icon), notification bell with badge, user avatar menu
- Responsive — collapses search on small screens

---

### 4. Route Configuration

#### [NEW] `src/router/routes.tsx`
- React Router v7 `createBrowserRouter` with all routes nested under `AppLayout`:

| Route | Page Component | Sidebar Section |
|---|---|---|
| `/` | Redirect → `/dashboard` | — |
| `/dashboard` | `DashboardPage` | Dashboard |
| `/infrastructure` | `InfrastructurePage` | Infrastructure |
| `/services` | `ServicesPage` | Services |
| `/services/:serviceName` | `ServiceDetailPage` | Services |
| `/metrics` | `MetricsPage` | Metrics |
| `/logs` | `LogsPage` | Logs |
| `/traces` | `TracesPage` | Traces |
| `/alerts` | `AlertsPage` | Alerts |
| `/incidents` | `IncidentsPage` | Incidents |
| `/slos` | `SLOsPage` | SLOs |
| `/deployments` | `DeploymentsPage` | Deployments |
| `*` | `NotFoundPage` | — |

#### [NEW] `src/router/index.ts`
- Exports the router instance

---

### 5. Global State (Zustand)

#### [NEW] `src/store/themeStore.ts`
- `mode: 'dark' | 'light'` — persisted to localStorage
- `toggleTheme()` action

#### [NEW] `src/store/sidebarStore.ts`
- `collapsed: boolean` — persisted to localStorage
- `toggleSidebar()` action

#### [NEW] `src/store/globalStore.ts`
- `selectedTimeRange: string` (default `'1h'`)
- `selectedEnvironment: string` (default `'production'`)
- Actions to update each

---

### 6. API Client

#### [NEW] `src/api/client.ts`
- Axios instance with `baseURL: '/api'`, default headers, timeout
- Request interceptor: attach auth token placeholder
- Response interceptor: handle 401 → redirect to login, generic error toast

#### [NEW] `src/api/queryClient.ts`
- TanStack Query `QueryClient` with sensible defaults (staleTime: 30s, retry: 1, refetchOnWindowFocus: false)

---

### 7. Shared Components

#### [NEW] `src/components/common/LoadingState.tsx`
- Full-area centered MUI `CircularProgress` with optional label
- Skeleton variant for table/card loading

#### [NEW] `src/components/common/ErrorState.tsx`
- Error illustration, message, and "Retry" button
- Accepts `onRetry` callback, optional `title`/`message`

#### [NEW] `src/components/common/PageHeader.tsx`
- Reusable page title bar: title, subtitle, optional action buttons slot

#### [NEW] `src/components/common/EmptyState.tsx`
- Icon + message + optional CTA button for empty data scenarios

---

### 8. Placeholder Pages

Each page will be a real component with:
- `PageHeader` with the module name and icon
- A brief description card explaining what will be built
- Placeholder cards/sections hinting at the final layout (e.g., empty chart areas, table skeletons)
- Proper route-level `document.title` via `useEffect`

Files created under `src/pages/`:

| File | Route |
|---|---|
| `Dashboard/DashboardPage.tsx` | `/dashboard` |
| `Infrastructure/InfrastructurePage.tsx` | `/infrastructure` |
| `Services/ServicesPage.tsx` | `/services` |
| `Services/ServiceDetailPage.tsx` | `/services/:serviceName` |
| `Metrics/MetricsPage.tsx` | `/metrics` |
| `Logs/LogsPage.tsx` | `/logs` |
| `Traces/TracesPage.tsx` | `/traces` |
| `Alerts/AlertsPage.tsx` | `/alerts` |
| `Incidents/IncidentsPage.tsx` | `/incidents` |
| `SLOs/SLOsPage.tsx` | `/slos` |
| `Deployments/DeploymentsPage.tsx` | `/deployments` |
| `NotFound/NotFoundPage.tsx` | `*` |

---

### 9. App Entry Points

#### [MODIFY] `src/App.tsx`
- Wrap with `ThemeProvider`, `QueryClientProvider`, `RouterProvider`

#### [MODIFY] `src/main.tsx`
- Render `<App />`

#### [MODIFY] `index.html`
- Add Inter font from Google Fonts, update title & meta

---

## Verification Plan

### Automated
```bash
npm run build   # TypeScript compilation + Vite production build — must pass with zero errors
```

### Manual
- `npm run dev` → verify the app loads with dark theme by default
- Sidebar renders all nav items; clicking each navigates to the correct placeholder page
- Theme toggle switches between dark and light mode seamlessly
- Sidebar collapses/expands with smooth animation
- All placeholder pages render with proper page titles
- 404 page renders for unknown routes
- No console errors
