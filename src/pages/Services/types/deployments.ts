export interface Deployment {
  id: string;
  version: string;
  environment: string;
  status: "Success" | "Failed" | "Running";
  deployedBy: string;
  deployedAt: string;
}

export interface DeploymentsResponse {
  deployments: Deployment[];
}