export interface ServiceError {
  id: string;
  message: string;
  count: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  lastOccurred: string;
}

export interface ErrorsResponse {
  total: number;
  errors: ServiceError[];
}