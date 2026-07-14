import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { LogEntry } from "../../types";

interface LogsPreviewProps {
  logs: LogEntry[];
}

const LOG_COLORS = {
  ERROR: "error",
  WARN: "warning",
  INFO: "info",
  DEBUG: "default",
} as const;

export default function LogsPreview({
  logs,
}: LogsPreviewProps) {
  const recentLogs = logs.slice(0, 3);

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={700}>
        Recent Logs
      </Typography>

      {recentLogs.map((log) => (
        <Box
          key={log.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Chip
            label={log.level}
            color={LOG_COLORS[log.level]}
            size="small"
            sx={{
              minWidth: 70,
              fontWeight: 600,
            }}
          />

          <Typography
            variant="body2"
            noWrap
            sx={{ flex: 1 }}
          >
            {log.message}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}