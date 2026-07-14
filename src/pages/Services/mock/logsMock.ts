import { LogsResponse } from "../types";

export const logsMock: LogsResponse = {
  total: 5,
  logs: [
    {
      id: "log-1",
      timestamp: "2026-06-30 10:30:15",
      level: "ERROR",
      message: "Database connection timeout.",
      source: "payment-service",
      traceId: "trace-101",
    },
    {
      id: "log-2",
      timestamp: "2026-06-30 10:29:41",
      level: "WARN",
      message: "Cache miss for customer profile.",
      source: "payment-service",
      traceId: "trace-102",
    },
    {
      id: "log-3",
      timestamp: "2026-06-30 10:28:30",
      level: "INFO",
      message: "Payment processed successfully.",
      source: "payment-service",
    },
    {
      id: "log-4",
      timestamp: "2026-06-30 10:27:12",
      level: "DEBUG",
      message: "Fetching payment configuration.",
      source: "payment-service",
    },
    {
      id: "log-5",
      timestamp: "2026-06-30 10:26:50",
      level: "INFO",
      message: "Incoming payment request.",
      source: "payment-service",
    },
  ],
};