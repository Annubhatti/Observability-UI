import { DependenciesResponse } from "../types";

export const dependenciesMock: DependenciesResponse = {
  nodes: [
    {
      id: "payment",
      label: "Payment Service",
      type: "service",
    },
    {
      id: "redis",
      label: "Redis",
      type: "cache",
    },
    {
      id: "postgres",
      label: "PostgreSQL",
      type: "database",
    },
    {
      id: "kafka",
      label: "Kafka",
      type: "queue",
    },
  ],

  edges: [
    {
      id: "edge-1",
      source: "payment",
      target: "redis",
    },
    {
      id: "edge-2",
      source: "payment",
      target: "postgres",
    },
    {
      id: "edge-3",
      source: "payment",
      target: "kafka",
    },
  ],
};