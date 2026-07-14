import { Stack, Typography } from "@mui/material";

export default function MetricsFooter() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography
        variant="caption"
        color="text.secondary"
      >
        Last Updated
      </Typography>

      <Typography
        variant="caption"
        fontWeight={600}
      >
        2 mins ago
      </Typography>
    </Stack>
  );
}