import Chip from "@mui/material/Chip";
import { alpha, useTheme } from "@mui/material/styles";

import { ServiceStatus } from "../../types";

interface StatusChipProps {
  status: ServiceStatus;
  size?: "small" | "medium";
}

const STATUS_CONFIG = {
  Healthy: {
    color: "#22c55e",
    background: "#22c55e",
    label: "Healthy",
  },

  Warning: {
    color: "#f59e0b",
    background: "#f59e0b",
    label: "Warning",
  },

  Critical: {
    color: "#ef4444",
    background: "#ef4444",
    label: "Critical",
  },
};

export default function StatusChip({
  status,
  size = "small",
}: StatusChipProps) {
  const theme = useTheme();

  const config = STATUS_CONFIG[status];

  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        fontWeight: 600,
        borderRadius: "8px",

        color: config.color,

        backgroundColor: alpha(config.background, 0.12),

        border: `1px solid ${alpha(config.background, 0.25)}`,

        ".MuiChip-label": {
          px: 1.5,
        },
      }}
    />
  );
}