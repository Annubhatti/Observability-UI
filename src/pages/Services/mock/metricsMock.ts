import { MetricsResponse } from "../types";

export const metricsMock: MetricsResponse = {
  metrics: [
    {
      id: "metric-1",
      name: "request_rate",
      displayName: "Request Rate",
      unit: "req/min",
      latestValue: 2450,

      trend: 8.5,
      datapoints: [
        { timestamp: "09:00", value: 2180 },
        { timestamp: "09:15", value: 2235 },
        { timestamp: "09:30", value: 2310 },
        { timestamp: "09:45", value: 2390 },
        { timestamp: "10:00", value: 2450 },
      ],
    },
    {
      id: "metric-2",
      name: "latency",
      displayName: "Latency",
      unit: "ms",
      latestValue: 124,
      datapoints: [
        { timestamp: "09:00", value: 118 },
        { timestamp: "09:15", value: 122 },
        { timestamp: "09:30", value: 120 },
        { timestamp: "09:45", value: 126 },
        { timestamp: "10:00", value: 124 },
      ],
    },
    {
      id: "metric-3",
      name: "cpu_usage",
      displayName: "CPU Usage",
      unit: "%",
      latestValue: 43,
      datapoints: [
        { timestamp: "09:00", value: 38 },
        { timestamp: "09:15", value: 39 },
        { timestamp: "09:30", value: 41 },
        { timestamp: "09:45", value: 42 },
        { timestamp: "10:00", value: 43 },
      ],
    },
    {
      id: "metric-4",
      name: "error_rate",
      displayName: "Error Rate",
      unit: "%",
      latestValue: 0.21,
      datapoints: [
        { timestamp: "09:00", value: 0.18 },
        { timestamp: "09:15", value: 0.19 },
        { timestamp: "09:30", value: 0.22 },
        { timestamp: "09:45", value: 0.20 },
        { timestamp: "10:00", value: 0.21 },
      ],
    },
  ],
};