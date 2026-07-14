import { ErrorsResponse } from "../types";

export const errorsMock: ErrorsResponse = {
  total: 3,
  errors: [
    {
      id: "err-1",
      message: "Database Timeout",
      count: 15,
      severity: "Critical",
      lastOccurred: "2 mins ago",
    },
    {
      id: "err-2",
      message: "Redis Connection Failed",
      count: 6,
      severity: "High",
      lastOccurred: "8 mins ago",
    },
    {
      id: "err-3",
      message: "JWT Token Expired",
      count: 24,
      severity: "Medium",
      lastOccurred: "15 mins ago",
    },
  ],
};