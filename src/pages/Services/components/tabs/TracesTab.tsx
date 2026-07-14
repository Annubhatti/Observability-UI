import { useParams } from "react-router-dom";

import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";

import NavigationCard from "../common/NavigationCard";
import TracesPreview from "./TracesPreview";

import useService from "../../hooks/useService";

export default function TracesTab() {
  const { serviceName = "" } = useParams();

  const { traces } = useService(serviceName);

  const failedTraces = traces.traces.filter(
    (trace) => trace.status === "Error"
  ).length;

  const totalDuration = traces.traces.reduce(
    (total, trace) => total + trace.duration,
    0
  );

  const averageDuration = traces.traces.length
    ? Math.round(
        totalDuration / traces.traces.length
      )
    : 0;

  const latestTrace = traces.traces[0];

  const stats = [
    {
      label: "Total Traces",
      value: traces.total,
    },
    {
      label: "Failed Traces",
      value: failedTraces,
    },
    {
      label: "Avg Duration",
      value: `${averageDuration} ms`,
    },
    {
      label: "Latest Status",
      value: latestTrace?.status ?? "N/A",
    },
  ];

  return (
    <NavigationCard
      title="Traces"
      description="Distributed trace activity and request performance."
      icon={
        <TimelineRoundedIcon
          color="primary"
          fontSize="large"
        />
      }
      stats={stats}
      buttonText="View Full Trace Explorer"
      navigateTo="/traces"
    >
      <TracesPreview traces={traces.traces} />
    </NavigationCard>
  );
}