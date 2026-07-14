import { useQuery } from '@tanstack/react-query';
import type { TimeRange } from '../store/globalStore';
import {
  fetchDashboardOverview,
  fetchDashboardErrors,
  fetchDashboardServices,
} from '../api/dashboardApi';

export function useDashboardOverview(timeRange: TimeRange) {
  return useQuery({
    queryKey: ['dashboard', 'overview', timeRange],
    queryFn: () => fetchDashboardOverview(timeRange),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000, // auto-refresh every 60s
  });
}

export function useDashboardErrors(timeRange: TimeRange) {
  return useQuery({
    queryKey: ['dashboard', 'errors', timeRange],
    queryFn: () => fetchDashboardErrors(timeRange),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
}

export function useDashboardServices(timeRange: TimeRange) {
  return useQuery({
    queryKey: ['dashboard', 'services', timeRange],
    queryFn: () => fetchDashboardServices(timeRange),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
}
