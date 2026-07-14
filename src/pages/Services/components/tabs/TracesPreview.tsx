import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { Trace } from "../../types";

interface TracesPreviewProps {
  traces: Trace[];
}

export default function TracesPreview({
  traces,
}: TracesPreviewProps) {
  const recentTraces = traces.slice(0, 3);

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={700}>
        Recent Traces
      </Typography>

      {recentTraces.map((trace) => (
        <Box
          key={trace.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Chip
            label={trace.status}
            color={
              trace.status === "Error"
                ? "error"
                : "success"
            }
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
            {trace.operation}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={600}
          >
            {trace.duration} ms
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}