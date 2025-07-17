import React from "react";
import { Grid, Box } from "@mui/material";
import StatsCard from "./StatsCard";
import PieChartCard from "./PieChartCard";
import BarChartCard from "./BarChartCard";
import LineChartCard from "./LineChartCard";
import AreaChartCard from "./AreaChartCard";
import RadarChartCard from "./RadarChartCard";
import ScatterChartCard from "./ScatterChartCard";

const Dashboard = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid size={{ xs: 12 }}>
          <StatsCard />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{ mt: { xs: 2, sm: 3 } }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <PieChartCard />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <BarChartCard />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{ mt: { xs: 2, sm: 3 } }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <LineChartCard />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <AreaChartCard />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{ mt: { xs: 2, sm: 3 } }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <RadarChartCard />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <ScatterChartCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
