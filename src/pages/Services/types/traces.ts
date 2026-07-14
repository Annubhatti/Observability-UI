export interface Trace {
  id: string;
  traceId: string;
  operation: string;
  duration: number;
  status: "Success" | "Error";
  timestamp: string;
}

export interface TracesResponse {
  total: number;
  traces: Trace[];
}