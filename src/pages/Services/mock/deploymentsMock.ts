import { DeploymentsResponse } from "../types";

export const deploymentsMock: DeploymentsResponse = {
  deployments: [
    {
      id: "deploy-1",
      version: "v2.5.0",
      environment: "Production",
      status: "Success",
      deployedBy: "John Smith",
      deployedAt: "2026-06-29 18:00",
    },
  ],
};