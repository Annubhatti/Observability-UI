import { useMemo } from "react";

import { servicesMock } from "../mock/servicesMock";

export default function useServices() {
  const services = useMemo(() => servicesMock, []);

  return {
    services,
    loading: false,
    error: null,
  };
}