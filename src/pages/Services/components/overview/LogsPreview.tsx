import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import FiberManualRecordRounded from "@mui/icons-material/FiberManualRecordRounded";

import { alpha, useTheme } from "@mui/material/styles";

import SectionCard from "../common/SectionCard";

import { ServiceOverview } from "../../types";

interface Props {
  service: ServiceOverview;
}

const LEVEL_COLORS = {
  INFO: "#3b82f6",
  WARN: "#f59e0b",
  ERROR: "#ef4444",
};

export default function LogsPreview({
  service,
}: Props) {
  const theme = useTheme();

  return (
    <SectionCard
      title="Latest Logs"
      subtitle="Recent application events"
    >
      <Stack divider={<Divider />} spacing={0}>
        {service.logs.map((log) => (
          <Box
            key={log.id}
            sx={{
              py: 2,
              transition: ".2s",

              "&:hover": {
                background: alpha(
                  theme.palette.primary.main,
                  .04
                ),
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={1}
              >
                <FiberManualRecordRounded
                  sx={{
                    color: LEVEL_COLORS[log.level],
                    fontSize: 12,
                  }}
                />

                <Typography
                  fontWeight={700}
                >
                  {log.level}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  {log.endpoint}
                </Typography>
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {log.timestamp}
              </Typography>
            </Box>

            <Typography
              mt={1}
              variant="body2"
              color="text.secondary"
            >
              {log.message}
            </Typography>
          </Box>
        ))}
      </Stack>
    </SectionCard>
  );
}