import { ReactNode } from "react";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import { alpha, useTheme } from "@mui/material/styles";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
}: SectionCardProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        background: alpha(theme.palette.background.paper, 0.75),
        backdropFilter: "blur(12px)",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {action}
      </Box>

      <Divider />

      <CardContent
        sx={{
          p: 3,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}