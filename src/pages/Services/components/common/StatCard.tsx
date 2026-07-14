import { ReactNode } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRounded from "@mui/icons-material/TrendingDownRounded";

import { alpha, useTheme } from "@mui/material/styles";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: ReactNode;
  color?: string;
  trend?: number;
}

export default function StatCard({
  title,
  value,
  unit,
  subtitle,
  icon,
  trend,
  color,
}: StatCardProps) {
  const theme = useTheme();

  const cardColor = color ?? theme.palette.primary.main;

  const isPositive = trend === undefined ? true : trend >= 0;

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 12px 32px ${alpha(cardColor, 0.18)}`,
        },
      }}
    >
      {/* Top Gradient */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${cardColor}, ${alpha(
            cardColor,
            0.3
          )})`,
        }}
      />

      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mt: 1,
              }}
            >
              {value}

              {unit && (
                <Typography
                  component="span"
                  sx={{
                    ml: .5,
                    fontSize: 18,
                    color: "text.secondary",
                  }}
                >
                  {unit}
                </Typography>
              )}
            </Typography>

            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2,
              background: alpha(cardColor, .12),
              color: cardColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>

        {trend !== undefined && (
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            gap={.5}
          >
            {isPositive ? (
              <TrendingUpRounded
                sx={{
                  color: theme.palette.success.main,
                  fontSize: 18,
                }}
              />
            ) : (
              <TrendingDownRounded
                sx={{
                  color: theme.palette.error.main,
                  fontSize: 18,
                }}
              />
            )}

            <Typography
              variant="body2"
              sx={{
                color: isPositive
                  ? theme.palette.success.main
                  : theme.palette.error.main,

                fontWeight: 600,
              }}
            >
              {Math.abs(trend)}%
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              vs last hour
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}