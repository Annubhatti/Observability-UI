// ─── Dashboard API Service ───
// Mock-backed functions that mimic real API calls.
// Swap the mock imports with Axios calls when the backend is ready.

import type { TimeRange } from '../store/globalStore';
import {
  generateOverviewKPIs,
  generateRequestTrend,
  generateErrorTrend,
  generateServiceHealth,
  generateTopFailingServices,
  generateInfraOverview,
  generateSparkline,
  delay,
  type KpiData,
  type RequestTrendPoint,
  type ErrorTrendPoint,
  type ServiceHealthData,
  type FailingService,
  type InfraMetric,
} from '../mocks/dashboardMocks';

export interface DashboardOverviewResponse {
  kpis: KpiData;
  sparklines: {
    requests: number[];
    errors: number[];
    latency: number[];
    traces: number[];
    logs: number[];
  };
}

export interface DashboardErrorsResponse {
  errorTrend: ErrorTrendPoint[];
  topFailingServices: FailingService[];
}

export interface DashboardServicesResponse {
  requestTrend: RequestTrendPoint[];
  serviceHealth: ServiceHealthData;
  infraOverview: InfraMetric[];
}

export async function fetchDashboardOverview(_timeRange: TimeRange): Promise<DashboardOverviewResponse> {
  await delay(300 + Math.random() * 200);
  return {
    kpis: generateOverviewKPIs(),
    sparklines: {
      requests: generateSparkline(20, 24500, 0.03),
      errors: generateSparkline(20, 42, 0.15),
      latency: generateSparkline(20, 142, 0.06),
      traces: generateSparkline(20, 1200000, 0.02),
      logs: generateSparkline(20, 48300000, 0.01),
    },
  };
}

export async function fetchDashboardErrors(timeRange: TimeRange): Promise<DashboardErrorsResponse> {
  await delay(400 + Math.random() * 300);
  return {
    errorTrend: generateErrorTrend(timeRange),
    topFailingServices: generateTopFailingServices(),
  };
}

export async function fetchDashboardServices(timeRange: TimeRange): Promise<DashboardServicesResponse> {
  await delay(350 + Math.random() * 250);
  return {
    requestTrend: generateRequestTrend(timeRange),
    serviceHealth: generateServiceHealth(),
    infraOverview: generateInfraOverview(),
  };
}
