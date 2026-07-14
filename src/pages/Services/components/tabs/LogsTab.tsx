import { useParams } from "react-router-dom";

import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

import NavigationCard from "../common/NavigationCard";
import LogsPreview from "./LogsPreview";

import useService from "../../hooks/useService";

export default function LogsTab() {
  const { serviceName = "" } = useParams();

  const { logs } = useService(serviceName);

  const errorCount = logs.logs.filter(
    (log) => log.level === "ERROR"
  ).length;

  const warningCount = logs.logs.filter(
    (log) => log.level === "WARN"
  ).length;

  //const latestLog = logs.logs.at(0);
  const latestLog = logs.logs[0];

  const stats = [
    {
      label: "Total Logs",
      value: logs.total,
    },
    {
      label: "Errors",
      value: errorCount,
    },
    {
      label: "Warnings",
      value: warningCount,
    },
    {
      label: "Latest Log",
      value: latestLog?.level ?? "N/A",
    },
  ];

  return (
    <NavigationCard
      title="Logs"
      description="Recent service logs and severity summary."
      icon={
        <ArticleRoundedIcon
          color="primary"
          fontSize="large"
        />
      }
      stats={stats}
      buttonText="View Full Log Explorer"
      navigateTo="/logs"
    >
      <LogsPreview logs={logs.logs} />
    </NavigationCard>
  );
}