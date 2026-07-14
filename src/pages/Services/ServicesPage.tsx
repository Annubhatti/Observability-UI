import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import { alpha, useTheme } from "@mui/material/styles";

import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";

import PageHeader from "../../components/common/PageHeader";

import { servicesMock } from "./mock/servicesMock";

const TABLE_COLUMNS = [
  "Service",
  "Language",
  "Environment",
  "Version",
  "Requests/sec",
  "Error Rate",
  "Latency",
  "Status",
  "Last Seen",
];

interface ServiceFilters {
  serviceName: string;
  environment: string;
  language: string;
}

const EMPTY_FILTERS: ServiceFilters = {
  serviceName: "",
  environment: "",
  language: "",
};

export default function ServicesPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [serviceName, setServiceName] = useState("");
  const [environment, setEnvironment] = useState("");
  const [language, setLanguage] = useState("");

  const [filters, setFilters] =
    useState<ServiceFilters>(EMPTY_FILTERS);

  useEffect(() => {
    document.title = "Services | Observability";
  }, []);

  const filteredServices = useMemo(() => {
    return servicesMock.filter((service) => {
      const matchesServiceName = service.name
        .toLowerCase()
        .includes(filters.serviceName.toLowerCase());

      const matchesEnvironment = service.environment
        .toLowerCase()
        .includes(filters.environment.toLowerCase());

      const matchesLanguage = service.language
        .toLowerCase()
        .includes(filters.language.toLowerCase());

      return (
        matchesServiceName &&
        matchesEnvironment &&
        matchesLanguage
      );
    });
  }, [filters]);

  const handleSearch = () => {
    setFilters({
      serviceName: serviceName.trim(),
      environment: environment.trim(),
      language: language.trim(),
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box>
      <PageHeader
        icon={<AccountTreeRounded />}
        title="Services"
        subtitle="Application performance monitoring and service catalog"
      />

      {/* Filter Bar */}
      <Card
        sx={{
          mb: 3,
          background: alpha(
            theme.palette.background.paper,
            0.6
          ),
          backdropFilter: "blur(8px)",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            py: 1.5,

            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          <TextField
            size="small"
            label="Service Name"
            placeholder="e.g. Payment Service"
            value={serviceName}
            onChange={(event) =>
              setServiceName(event.target.value)
            }
            onKeyDown={handleKeyDown}
            sx={{
              minWidth: 200,
              flex: 1,
            }}
          />

          <TextField
            size="small"
            label="Environment"
            placeholder="e.g. Production"
            value={environment}
            onChange={(event) =>
              setEnvironment(event.target.value)
            }
            onKeyDown={handleKeyDown}
            sx={{
              minWidth: 180,
              flex: 1,
            }}
          />

          <TextField
            size="small"
            label="Language"
            placeholder="e.g. Java, Go, Python"
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            sx={{
              minWidth: 160,
              flex: 1,
            }}
          />

          <Button
            variant="contained"
            startIcon={<SearchRounded />}
            onClick={handleSearch}
            sx={{
              height: 40,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            Search
          </Button>
        </CardContent>
      </Card>

      {/* Table Card */}
      <Card>
        <CardContent
          sx={{
            p: 0,

            "&:last-child": {
              pb: 0,
            },
          }}
        >
          {/* Header Row */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1.2fr",
              gap: 1,
              px: 2.5,
              py: 1.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
              background: alpha(
                theme.palette.primary.main,
                0.04
              ),
            }}
          >
            {TABLE_COLUMNS.map((column) => (
              <Typography
                key={column}
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  color: "text.secondary",
                }}
              >
                {column}
              </Typography>
            ))}
          </Box>

          {/* Service Rows */}
          {filteredServices.map((service) => (
            <Box
              key={service.id}
              onClick={() =>
                navigate(`/services/${service.id}`)
              }
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1.2fr",
                gap: 1,
                px: 2.5,
                py: 1.6,
                alignItems: "center",
                cursor: "pointer",
                borderBottom: `1px solid ${theme.palette.divider}`,
                transition: "0.2s",

                "&:hover": {
                  background: alpha(
                    theme.palette.primary.main,
                    0.05
                  ),
                },
              }}
            >
              <Typography fontWeight={600}>
                {service.name}
              </Typography>

              <Typography>
                {service.language}
              </Typography>

              <Typography>
                {service.environment}
              </Typography>

              <Typography>
                {service.version}
              </Typography>

              <Typography>
                {service.requests}
              </Typography>

              <Typography>
                {service.errorRate}
              </Typography>

              <Typography>
                {service.latency}
              </Typography>

              <Chip
                label={service.status}
                size="small"
                color={
                  service.status === "Healthy"
                    ? "success"
                    : service.status === "Warning"
                      ? "warning"
                      : "error"
                }
              />

              <Typography>
                {service.lastSeen}
              </Typography>
            </Box>
          ))}

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <Box
              sx={{
                py: 6,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
              >
                No services found
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
              >
                Try changing your search filters.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}