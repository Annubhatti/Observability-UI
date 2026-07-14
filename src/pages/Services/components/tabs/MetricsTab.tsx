import { useParams } from "react-router-dom";

import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

import NavigationCard from "../common/NavigationCard";
import MiniAreaChart from "../common/MiniAreaChart";

import MetricsFooter from "./MetricsFooter";

import useService from "../../hooks/useService";

export default function MetricsTab() {
  const { serviceName = "" } = useParams();

  const { metrics } = useService(serviceName);

  const stats = metrics.metrics.map((metric) => ({
    label: metric.displayName,
    value: `${metric.latestValue} ${metric.unit}`,
  }));

  //const previewMetric = metrics.metrics.at(0);
const previewMetric = metrics.metrics[0];

  return (
    <NavigationCard
      title="Metrics"
      description="Real-time service performance metrics."
      icon={
        <BarChartRoundedIcon
          color="primary"
          fontSize="large"
        />
      }
      stats={stats}
      buttonText="View Full Metrics Dashboard"
      navigateTo="/metrics"
      footer={<MetricsFooter />}
    >
      {previewMetric && (
        <MiniAreaChart
          data={previewMetric.datapoints.map(
            (point) => point.value
          )}
        />
      )}
    </NavigationCard>
  );
}