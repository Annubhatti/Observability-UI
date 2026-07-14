export type LogLevel =
  | "INFO"
  | "WARN"
  | "ERROR"
  | "DEBUG";

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  source: string;
  traceId?: string;
}

export interface LogsResponse {
  total: number;
  logs: LogEntry[];
}