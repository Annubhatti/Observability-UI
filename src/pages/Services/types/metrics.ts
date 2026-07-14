export interface MetricDataPoint {
  timestamp: string;
  value: number;
}

export interface Metric {
  id: string;
  name: string;
  displayName: string;
  unit: string;
  latestValue: number;
  trend?: number;
  datapoints: MetricDataPoint[];
}

export interface MetricsResponse {
  metrics: Metric[];
}