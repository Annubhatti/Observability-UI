import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts';

// ─── Lazy-loaded pages ───
import { lazy, Suspense, type ComponentType } from 'react';
import { LoadingState } from '../components/common';

function lazyPage(importFn: () => Promise<{ default: ComponentType }>) {
  const Component = lazy(importFn);
  return (
    <Suspense fallback={<LoadingState label="Loading page…" />}>
      <Component />
    </Suspense>
  );
}

const DashboardPage = () => lazyPage(() => import('../pages/Dashboard/DashboardPage'));
const InfrastructurePage = () => lazyPage(() => import('../pages/Infrastructure/InfrastructurePage'));
const ServicesPage = () => lazyPage(() => import('../pages/Services/ServicesPage'));
const ServiceDetailPage = () => lazyPage(() => import('../pages/Services/ServiceDetailPage'));
const MetricsPage = () => lazyPage(() => import('../pages/Metrics/MetricsPage'));
const LogsPage = () => lazyPage(() => import('../pages/Logs/LogsPage'));
const TracesPage = () => lazyPage(() => import('../pages/Traces/TracesPage'));
const AlertsPage = () => lazyPage(() => import('../pages/Alerts/AlertsPage'));
const IncidentsPage = () => lazyPage(() => import('../pages/Incidents/IncidentsPage'));
const SLOsPage = () => lazyPage(() => import('../pages/SLOs/SLOsPage'));
const DeploymentsPage = () => lazyPage(() => import('../pages/Deployments/DeploymentsPage'));
const NotFoundPage = () => lazyPage(() => import('../pages/NotFound/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: DashboardPage() },
      { path: 'infrastructure', element: InfrastructurePage() },
      { path: 'services', element: ServicesPage() },
      { path: 'services/:serviceName', element: ServiceDetailPage() },
      { path: 'metrics', element: MetricsPage() },
      { path: 'logs', element: LogsPage() },
      { path: 'traces', element: TracesPage() },
      { path: 'alerts', element: AlertsPage() },
      { path: 'incidents', element: IncidentsPage() },
      { path: 'slos', element: SLOsPage() },
      { path: 'deployments', element: DeploymentsPage() },
      { path: '*', element: NotFoundPage() },
    ],
  },
]);
