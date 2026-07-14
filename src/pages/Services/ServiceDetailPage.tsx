import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";

import PageHeader from "../../components/common/PageHeader";

import SummaryCards from "./components/overview/SummaryCards";
import HealthSummary from "./components/overview/HealthSummary";
import MetricsOverview from "./components/overview/MetricsOverview";
import LogsPreview from "./components/overview/LogsPreview";

import MetricsTab from "./components/tabs/MetricsTab";
import LogsTab from "./components/tabs/LogsTab";
import TracesTab from "./components/tabs/TracesTab";
import DependenciesTab from "./components/tabs/DependenciesTab";
import DeploymentsTab from "./components/tabs/DeploymentsTab";
import ErrorsTab from "./components/tabs/ErrorsTab";

import { serviceOverviewMock } from "./mock/serviceOverviewMock";

const TABS = [
  "Overview",
  "Metrics",
  "Logs",
  "Traces",
  "Dependencies",
  "Deployments",
  "Errors",
] as const;

export default function ServiceDetailPage() {
  const theme = useTheme();

  const { serviceName } = useParams<{
    serviceName: string;
  }>();

  const [activeTab, setActiveTab] = useState(0);

  const service = serviceOverviewMock;

  const displayName = serviceName ?? service.name;

  useEffect(() => {
    document.title = `${displayName} | Services | Observability`;
  }, [displayName]);

  return (
    <Box>
      <PageHeader
        icon={<AccountTreeRounded />}
        title={displayName}
        subtitle="Service performance, health and observability"
      />

      {/* Tabs */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 4,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              minWidth: 120,
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
      </Box>

      {/* Overview */}
      {activeTab === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <SummaryCards service={service} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 4 }}>
              <HealthSummary service={service} />
            </Grid>

            <Grid size={{ xs: 12, lg: 8 }}>
              <MetricsOverview service={service} />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <LogsPreview service={service} />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <Card
                sx={{
                  minHeight: 340,
                  background: alpha(
                    theme.palette.background.paper,
                    0.65
                  ),
                  backdropFilter: "blur(10px)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Recent Traces
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    Coming in next step...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Card
                sx={{
                  minHeight: 340,
                  background: alpha(
                    theme.palette.background.paper,
                    0.65
                  ),
                  backdropFilter: "blur(10px)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Dependencies
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    Coming in next step...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <Card
                sx={{
                  minHeight: 340,
                  background: alpha(
                    theme.palette.background.paper,
                    0.65
                  ),
                  backdropFilter: "blur(10px)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Infrastructure
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    Coming in next step...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Metrics */}
      {activeTab === 1 && <MetricsTab />}

      {/* Logs */}
      {activeTab === 2 && <LogsTab />}

      {/* Traces */}
      {activeTab === 3 && <TracesTab />}

      {/* Dependencies */}
      {activeTab === 4 && <DependenciesTab />}

      {/* Deployments */}
      {activeTab === 5 && <DeploymentsTab />}

      {/* Errors */}
      {activeTab === 6 && <ErrorsTab />}
    </Box>
  );
}