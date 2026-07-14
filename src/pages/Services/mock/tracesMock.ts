import { TracesResponse } from "../types";

export const tracesMock: TracesResponse = {
  total: 4,
  traces: [
    {
      id: "1",
      traceId: "trace-101",
      operation: "POST /payments",
      duration: 124,
      status: "Success",
      timestamp: "2026-06-30 10:30",
    },
    {
      id: "2",
      traceId: "trace-102",
      operation: "GET /customers",
      duration: 84,
      status: "Success",
      timestamp: "2026-06-30 10:29",
    },
    {
      id: "3",
      traceId: "trace-103",
      operation: "POST /refund",
      duration: 246,
      status: "Error",
      timestamp: "2026-06-30 10:27",
    },
    {
      id: "4",
      traceId: "trace-104",
      operation: "GET /orders",
      duration: 63,
      status: "Success",
      timestamp: "2026-06-30 10:25",
    },
  ],
};