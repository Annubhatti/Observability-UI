export type ServiceStatus =
  | "Healthy"
  | "Warning"
  | "Critical";

export interface ServiceHealthItem {
  name: string;
  status: ServiceStatus;
}

export type ServiceLogLevel =
  | "INFO"
  | "WARN"
  | "ERROR";

export interface ServiceLog {
  id: string;
  timestamp: string;
  level: ServiceLogLevel;
  message: string;
  endpoint: string;
}

export interface ServiceMetric {
  title: string;
  value: number;
  unit?: string;
  trend?: number;
  data?: number[];
}

export interface ServiceTrace {
  id: string;
  endpoint: string;
  duration: string;
  status: ServiceStatus;
}

export type DependencyType =
  | "service"
  | "cache"
  | "database"
  | "queue";

export interface ServiceDependency {
  id: string;
  name: string;
  type: DependencyType;
}

export type AlertSeverity =
  | "High"
  | "Medium"
  | "Low";

export interface ServiceAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  time: string;
}

export type DeploymentStatus =
  | "Success"
  | "Rollback";

export interface ServiceDeployment {
  version: string;
  deployedAt: string;
  status: DeploymentStatus;
  author: string;
}

export interface ServiceOverview {
  id: string;
  name: string;
  language: string;
  framework: string;
  environment: string;
  version: string;
  owner: string;
  status: ServiceStatus;

  availability: number;
  latency: number;
  requestsPerMinute: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  pods: number;

  lastSeen: string;
  lastDeployed?: string;

  metrics: ServiceMetric[];
  health: ServiceHealthItem[];
  logs: ServiceLog[];
  traces: ServiceTrace[];
  dependencies: ServiceDependency[];
  alerts: ServiceAlert[];
  deployments: ServiceDeployment[];
}