import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export interface NavigationCardProps {
  title: string;
  description: string;
  icon: ReactNode;

  stats: {
    label: string;
    value: string | number;
  }[];

  navigateTo: string;
  buttonText?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export default function NavigationCard({
  title,
  description,
  icon,
  stats,
  navigateTo,
  buttonText,
  children,
  footer,
}: NavigationCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={3}
        >
          <Box flex={1}>
            <Typography variant="h6" fontWeight={700}>
              {title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              {description}
            </Typography>
          </Box>

          <Box ml={2}>{icon}</Box>
        </Stack>

        {/* Stats */}
        <Stack spacing={2}>
          {stats.map((item) => (
            <Stack
              key={item.label}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {item.label}
              </Typography>

              <Typography variant="body2" fontWeight={700}>
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Preview */}
        {children && (
          <>
            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                flex: 1,
                minHeight: 100,
              }}
            >
              {children}
            </Box>
          </>
        )}

        {/* Footer */}
        {footer && (
          <>
            <Divider sx={{ my: 3 }} />

            <Box>{footer}</Box>
          </>
        )}

        {/* Navigation */}
        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{ mt: 3 }}
          onClick={() => navigate(navigateTo)}
        >
          {buttonText ?? `View ${title}`}
        </Button>
      </CardContent>
    </Card>
  );
}