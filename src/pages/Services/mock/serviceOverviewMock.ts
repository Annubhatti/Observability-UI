import { ServiceOverview } from "../types";

export const serviceOverviewMock: ServiceOverview = {
  id: "svc-001",

  name: "Order Service",

  language: "Java",

  framework: "Spring Boot",

  version: "v2.4.1",

  environment: "Production",

  owner: "Platform Team",

  status: "Healthy",

  availability: 99.98,

  latency: 124,

  requestsPerMinute: 2450,

  errorRate: 0.21,

  cpuUsage: 43,

  memoryUsage: 3.2,

  pods: 5,

  lastSeen: "2 minutes ago",

  metrics: [
    {
      title: "Availability",
      value: 99.98,
      unit: "%",
      trend: 0.2,
    },
    {
      title: "Latency",
      value: 124,
      unit: "ms",
      trend: -8,
    },
    {
      title: "Requests/min",
      value: 2450,
      trend: 7,
    },
    {
      title: "Error Rate",
      value: 0.21,
      unit: "%",
      trend: -2,
    },
    {
      title: "CPU",
      value: 43,
      unit: "%",
      trend: 4,
    },
    {
      title: "Memory",
      value: 3.2,
      unit: "GB",
      trend: 1,
    },
  ],

  health: [
    {
      name: "Service",
      status: "Healthy",
    },
    {
      name: "Logs",
      status: "Healthy",
    },
    {
      name: "Metrics",
      status: "Healthy",
    },
    {
      name: "Traces",
      status: "Healthy",
    },
    {
      name: "Redis",
      status: "Healthy",
    },
    {
      name: "Database",
      status: "Healthy",
    },
  ],

  logs: [
  {
    id: "1",
    timestamp: "14:45:21",
    level: "INFO",
    endpoint: "POST /orders",
    message: "Order created successfully",
  },
  {
    id: "2",
    timestamp: "14:45:10",
    level: "WARN",
    endpoint: "GET /orders",
    message: "Redis response time exceeded threshold",
  },
  {
    id: "3",
    timestamp: "14:44:58",
    level: "ERROR",
    endpoint: "POST /checkout",
    message: "Database connection timeout",
  },
  {
    id: "4",
    timestamp: "14:44:41",
    level: "INFO",
    endpoint: "GET /inventory",
    message: "Inventory fetched successfully",
  },
  {
    id: "5",
    timestamp: "14:44:28",
    level: "WARN",
    endpoint: "POST /payment",
    message: "Slow external payment gateway response",
  },
],

  traces: [
    {
      id: "1",
      endpoint: "POST /orders",
      duration: "145 ms",
      status: "Healthy",
    },
    {
      id: "2",
      endpoint: "POST /checkout",
      duration: "845 ms",
      status: "Warning",
    },
    {
      id: "3",
      endpoint: "POST /payment",
      duration: "1.42 s",
      status: "Critical",
    },
  ],

  dependencies: [
    {
      id: "1",
      name: "User Service",
      type: "service",
    },
    {
      id: "2",
      name: "Redis",
      type: "cache",
    },
    {
      id: "3",
      name: "PostgreSQL",
      type: "database",
    },
    {
      id: "4",
      name: "Kafka",
      type: "queue",
    },
  ],

  alerts: [
    {
      id: "1",
      title: "High Latency",
      severity: "High",
      time: "5 min ago",
    },
    {
      id: "2",
      title: "Memory Usage > 80%",
      severity: "Medium",
      time: "20 min ago",
    },
  ],

  deployments: [
    {
      version: "v2.4.1",
      deployedAt: "26 Jun 2026",
      status: "Success",
      author: "DevOps",
    },
    {
      version: "v2.4.0",
      deployedAt: "24 Jun 2026",
      status: "Rollback",
      author: "DevOps",
    },
  ],
};