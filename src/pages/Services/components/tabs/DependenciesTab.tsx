import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";

import NavigationCard from "../common/NavigationCard";

export default function DependenciesTab() {
  const stats = [
    {
      label: "Total Dependencies",
      value: 2,
    },
    {
      label: "Healthy",
      value: 2,
    },
    {
      label: "Unhealthy",
      value: 0,
    },
    {
      label: "Avg Latency",
      value: "6.5 ms",
    },
  ];

  return (
    <NavigationCard
      title="Dependencies"
      description="Upstream and downstream service dependencies."
      icon={
        <AccountTreeRoundedIcon
          color="primary"
          fontSize="large"
        />
      }
      stats={stats}
      buttonText="View Dependency Graph"
      navigateTo="/infrastructure"
    />
  );
}