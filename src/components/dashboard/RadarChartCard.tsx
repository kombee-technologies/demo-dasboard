import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, useTheme, styled } from "@mui/material";

// Styled Components
const StyledChartCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderRadius: 1.5,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.3s ease-in-out",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: theme.shadows[6],
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[50],
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 2),
  },
  [theme.breakpoints.down("xs")]: {
    padding: theme.spacing(1, 1.5),
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: "360px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    height: "320px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "260px",
  },
  [theme.breakpoints.down("xs")]: {
    height: "220px",
  },
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(1.5),
  },
}));

// Sample Data
const generateRadarData = () => {
  return [
    { subject: "Speed", current: 120, benchmark: 100 },
    { subject: "Reliability", current: 98, benchmark: 90 },
    { subject: "Comfort", current: 86, benchmark: 95 },
    { subject: "Safety", current: 99, benchmark: 92 },
    { subject: "Efficiency", current: 85, benchmark: 88 },
    { subject: "Durability", current: 65, benchmark: 75 },
  ];
};

const RadarChartCard = () => {
  const theme = useTheme();
  const data = generateRadarData();

  return (
    <StyledChartCard>
      <ChartHeader>
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            Performance Metrics
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Current product vs industry benchmark
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="primary"
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            fontWeight: 500,
          }}
        >
          Current Year
        </Typography>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius={theme.breakpoints.down("sm") ? "65%" : "80%"}
            data={data}
            margin={{
              top: 10,
              right: theme.breakpoints.down("sm") ? 10 : 20,
              left: theme.breakpoints.down("sm") ? 10 : 20,
              bottom: 10,
            }}
          >
            <PolarGrid
              stroke={theme.palette.divider}
              polarRadius={[0, 25, 50, 75, 100]}
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fontSize: theme.breakpoints.down("sm") ? 10 : 12,
                fill: theme.palette.text.primary,
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 150]}
              tick={{
                fontSize: theme.breakpoints.down("sm") ? 10 : 12,
                fill: theme.palette.text.secondary,
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: theme.spacing(theme.breakpoints.down("sm") ? 1 : 2),
                fontSize: theme.breakpoints.down("sm") ? "0.75rem" : "0.875rem",
              }}
              formatter={(value) => (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {value}
                </Typography>
              )}
            />
            <Radar
              name="Current"
              dataKey="current"
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.light}
              fillOpacity={0.3}
              strokeWidth={theme.breakpoints.down("sm") ? 1 : 2}
            />
            <Radar
              name="Benchmark"
              dataKey="benchmark"
              stroke={theme.palette.grey[500]}
              fill={theme.palette.grey[500]}
              fillOpacity={0.1}
              strokeWidth={theme.breakpoints.down("sm") ? 1 : 2}
              strokeDasharray="5 5"
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default RadarChartCard;
