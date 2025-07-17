import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Typography,
  useTheme,
  styled,
  Paper,
  useMediaQuery,
  Stack,
} from "@mui/material";

// Styled Components
const ChartContainer = styled(Box)(({ theme }) => ({
  height: "350px",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    height: "300px",
  },
}));

const StyledChartCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
  backgroundColor: theme.palette.mode !== "dark" ? "#f5f5f5" : "#212121",
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(1),
  },
}));

const LegendItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginRight: theme.spacing(2),
  "& .legend-color": {
    width: 12,
    height: 12,
    borderRadius: "50%",
    marginRight: theme.spacing(1),
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const data = generateRadarData();

  return (
    <StyledChartCard>
      <ChartHeader>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Performance Metrics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current product vs industry benchmark
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <LegendItem>
            <Box
              className="legend-color"
              sx={{ bgcolor: theme.palette.primary.main }}
            />
            <Typography variant="body2">Current</Typography>
          </LegendItem>
          <LegendItem>
            <Box
              className="legend-color"
              sx={{ bgcolor: theme.palette.grey[500] }}
            />
            <Typography variant="body2">Benchmark</Typography>
          </LegendItem>
        </Box>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius={isMobile ? "65%" : "80%"}
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <PolarGrid
              stroke={theme.palette.divider}
              polarRadius={[0, 25, 50, 75, 100]}
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fontSize: isMobile ? 10 : 12,
                fill: theme.palette.text.primary,
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 150]}
              tick={{
                fontSize: isMobile ? 10 : 12,
                fill: theme.palette.text.secondary,
              }}
            />
            <Radar
              name="Current"
              dataKey="current"
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.main}
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Benchmark"
              dataKey="benchmark"
              stroke={theme.palette.grey[500]}
              fill={theme.palette.grey[500]}
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default RadarChartCard;
