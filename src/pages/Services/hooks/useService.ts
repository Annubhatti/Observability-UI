import { useMemo } from "react";

import { serviceOverviewMock } from "../mock/serviceOverviewMock";
import { metricsMock } from "../mock/metricsMock";
import { logsMock } from "../mock/logsMock";
import { tracesMock } from "../mock/tracesMock";
import { dependenciesMock } from "../mock/dependenciesMock";
import { deploymentsMock } from "../mock/deploymentsMock";
import { errorsMock } from "../mock/errorsMock";

export default function useService(serviceId: string) {
  console.log("Current Service:", serviceId);

  return useMemo(
    () => ({
      overview: serviceOverviewMock,
      metrics: metricsMock,
      logs: logsMock,
      traces: tracesMock,
      dependencies: dependenciesMock,
      deployments: deploymentsMock,
      errors: errorsMock,
      loading: false,
      error: null,
    }),
    [serviceId]
  );
}