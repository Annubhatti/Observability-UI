// ─── Dashboard Mock Data Generators ───
// Produces realistic observability data with jitter for live-feeling charts

import type { TimeRange } from '../store/globalStore';

// ─── Types ───

export interface KpiData {
  totalServices: number;
  healthyServices: number;
  degradedServices: number;
  criticalServices: number;
  requestsPerSec: number;
  errorRate: number;
  avgLatencyMs: number;
  traceVolume: number;
  logVolume: number;
  trends: {
    totalServices: TrendDelta;
    requestsPerSec: TrendDelta;
    errorRate: TrendDelta;
    avgLatencyMs: TrendDelta;
    traceVolume: TrendDelta;
    logVolume: TrendDelta;
  };
}

export interface TrendDelta {
  value: number;
  unit: 'absolute' | 'percent' | 'ms';
  direction: 'up' | 'down';
}

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
}

export interface RequestTrendPoint {
  timestamp: string;
  requestsPerSec: number;
}

export interface ErrorTrendPoint {
  timestamp: string;
  count: number;
  rate: number;
}

export interface ServiceHealthData {
  healthy: number;
  degraded: number;
  critical: number;
}

export interface FailingService {
  service: string;
  errorCount: number;
  errorRate: number;
  requestsPerSec: number;
}

export interface InfraMetric {
  name: string;
  usage: number;
  total: number;
  unit: string;
}

// ─── Helpers ───

function jitter(base: number, pct: number): number {
  return base + base * pct * (Math.random() - 0.5) * 2;
}

function getPointCount(timeRange: TimeRange): number {
  const map: Record<TimeRange, number> = {
    '15m': 30,
    '1h': 60,
    '6h': 72,
    '24h': 96,
    '7d': 84,
    '30d': 90,
  };
  return map[timeRange];
}

function getIntervalMs(timeRange: TimeRange): number {
  const map: Record<TimeRange, number> = {
    '15m': 30 * 1000,
    '1h': 60 * 1000,
    '6h': 5 * 60 * 1000,
    '24h': 15 * 60 * 1000,
    '7d': 2 * 60 * 60 * 1000,
    '30d': 8 * 60 * 60 * 1000,
  };
  return map[timeRange];
}

function formatTimestamp(date: Date, timeRange: TimeRange): string {
  if (timeRange === '7d' || timeRange === '30d') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Generators ───

export function generateRequestTrend(timeRange: TimeRange): RequestTrendPoint[] {
  const points = getPointCount(timeRange);
  const interval = getIntervalMs(timeRange);
  const now = Date.now();
  const data: RequestTrendPoint[] = [];

  for (let i = 0; i < points; i++) {
    const t = new Date(now - (points - i) * interval);
    const hourOfDay = t.getHours();
    // Simulate daily traffic pattern: peak at 10-14, dip at 2-6
    const dailyCurve = 0.6 + 0.4 * Math.sin(((hourOfDay - 6) / 24) * Math.PI * 2);
    const base = 24500 * dailyCurve;
    data.push({
      timestamp: formatTimestamp(t, timeRange),
      requestsPerSec: Math.round(jitter(base, 0.08)),
    });
  }
  return data;
}

export function generateErrorTrend(timeRange: TimeRange): ErrorTrendPoint[] {
  const points = getPointCount(timeRange);
  const interval = getIntervalMs(timeRange);
  const now = Date.now();
  const data: ErrorTrendPoint[] = [];

  for (let i = 0; i < points; i++) {
    const t = new Date(now - (points - i) * interval);
    const spikeChance = Math.random();
    const baseCount = spikeChance > 0.92 ? jitter(180, 0.3) : jitter(42, 0.25);
    const count = Math.max(0, Math.round(baseCount));
    const rps = jitter(24500, 0.05);
    data.push({
      timestamp: formatTimestamp(t, timeRange),
      count,
      rate: parseFloat(((count / rps) * 100).toFixed(3)),
    });
  }
  return data;
}

export function generateOverviewKPIs(): KpiData {
  return {
    totalServices: 128,
    healthyServices: Math.round(jitter(121, 0.02)),
    degradedServices: Math.round(jitter(5, 0.3)),
    criticalServices: Math.round(jitter(2, 0.4)),
    requestsPerSec: Math.round(jitter(24500, 0.05)),
    errorRate: parseFloat(jitter(0.23, 0.15).toFixed(2)),
    avgLatencyMs: Math.round(jitter(142, 0.08)),
    traceVolume: Math.round(jitter(1200000, 0.04)),
    logVolume: Math.round(jitter(48300000, 0.03)),
    trends: {
      totalServices: { value: 4, unit: 'absolute', direction: 'up' },
      requestsPerSec: { value: parseFloat(jitter(12, 0.2).toFixed(1)), unit: 'percent', direction: 'up' },
      errorRate: { value: parseFloat(jitter(0.05, 0.3).toFixed(2)), unit: 'percent', direction: 'down' },
      avgLatencyMs: { value: Math.round(jitter(8, 0.3)), unit: 'ms', direction: 'up' },
      traceVolume: { value: parseFloat(jitter(18, 0.15).toFixed(1)), unit: 'percent', direction: 'up' },
      logVolume: { value: parseFloat(jitter(2, 0.4).toFixed(1)), unit: 'percent', direction: 'down' },
    },
  };
}

export function generateServiceHealth(): ServiceHealthData {
  return {
    healthy: Math.round(jitter(121, 0.02)),
    degraded: Math.round(jitter(5, 0.3)),
    critical: Math.round(jitter(2, 0.4)),
  };
}

export function generateTopFailingServices(): FailingService[] {
  const services = [
    { service: 'payment-service', base: 218 },
    { service: 'auth-gateway', base: 156 },
    { service: 'order-processor', base: 98 },
    { service: 'notification-svc', base: 74 },
    { service: 'inventory-api', base: 45 },
    { service: 'search-engine', base: 32 },
  ];

  return services.map((s) => {
    const errorCount = Math.round(jitter(s.base, 0.15));
    const rps = Math.round(jitter(1200 + s.base * 4, 0.1));
    return {
      service: s.service,
      errorCount,
      errorRate: parseFloat(((errorCount / rps) * 100).toFixed(2)),
      requestsPerSec: rps,
    };
  });
}

export function generateInfraOverview(): InfraMetric[] {
  return [
    { name: 'CPU', usage: parseFloat(jitter(42.5, 0.1).toFixed(1)), total: 100, unit: '%' },
    { name: 'Memory', usage: parseFloat(jitter(68.2, 0.06).toFixed(1)), total: 100, unit: '%' },
    { name: 'Disk', usage: parseFloat(jitter(54.8, 0.05).toFixed(1)), total: 100, unit: '%' },
  ];
}

/** Generate sparkline data (tiny array for mini charts inside KPI cards) */
export function generateSparkline(points = 20, base = 100, variance = 0.15): number[] {
  const data: number[] = [];
  let current = base;
  for (let i = 0; i < points; i++) {
    current = current + current * variance * (Math.random() - 0.48);
    data.push(Math.round(current * 100) / 100);
  }
  return data;
}
