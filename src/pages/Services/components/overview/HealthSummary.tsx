import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

import { alpha, useTheme } from "@mui/material/styles";

import SectionCard from "../common/SectionCard";
import StatusChip from "../common/StatusChip";

import { ServiceOverview } from "../../types";

interface Props {
  service: ServiceOverview;
}

export default function HealthSummary({
  service,
}: Props) {
  const theme = useTheme();

  return (
    <SectionCard
      title="Overall Health"
      subtitle="Current health status of the service"
    >
      <Stack spacing={2}>
        {service.health.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              p: 1.5,

              borderRadius: 2,

              transition: ".2s",

              "&:hover": {
                bgcolor: alpha(
                  theme.palette.primary.main,
                  .04
                ),
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1.5}
            >
              <CheckCircleRounded
                sx={{
                  color: theme.palette.success.main,
                  fontSize: 20,
                }}
              />

              <Typography
                fontWeight={600}
              >
                {item.name}
              </Typography>
            </Box>

            <StatusChip
              status={item.status}
            />
          </Box>
        ))}
      </Stack>
    </SectionCard>
  );
}