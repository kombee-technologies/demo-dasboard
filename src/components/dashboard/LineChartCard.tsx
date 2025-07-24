import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const CustomTooltip = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  maxWidth: "220px",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "180px",
    padding: theme.spacing(0.75, 1),
  },
}));

// Sample Data Generator
const generateLineData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
  return months.map((month) => ({
    name: month,
    users: Math.floor(Math.random() * 1000) + 500,
    sessions: Math.floor(Math.random() * 3000) + 1000,
    retention: Math.floor(Math.random() * 40) + 60,
  }));
};

const LineChartCard = () => {
  const theme = useTheme();
  const data = generateLineData();

  const CustomTooltipContent = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      color?: string;
      name?: string;
      value?: number;
      payload?: { name?: string };
    }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            mb={0.5}
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            {payload[0].payload?.name}
          </Typography>
          {payload.map((entry, index) => (
            <Box
              key={`tooltip-${index}`}
              sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color,
                  mr: 1,
                  borderRadius: "2px",
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                {entry.name}:{" "}
                <b>
                  {entry.name === "Retention Rate"
                    ? `${entry.value}%`
                    : entry.value?.toLocaleString()}
                </b>
              </Typography>
            </Box>
          ))}
        </CustomTooltip>
      );
    }
    return null;
  };

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
            User Analytics
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Monthly trends and metrics
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
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: theme.breakpoints.down("sm") ? 10 : 20,
              left: theme.breakpoints.down("sm") ? -10 : 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme.palette.divider}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: theme.breakpoints.down("sm") ? 10 : 12 }}
              tickMargin={10}
              // interval={theme.breakpoints.down("sm") ? 0 : ("auto" as const)}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: theme.breakpoints.down("sm") ? 10 : 12 }}
              tickFormatter={(value) => value.toLocaleString()}
              width={theme.breakpoints.down("sm") ? 40 : 50}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: theme.breakpoints.down("sm") ? 10 : 12 }}
              tickFormatter={(value) => `${value}%`}
              width={theme.breakpoints.down("sm") ? 40 : 50}
            />
            <Tooltip content={<CustomTooltipContent />} />
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
            <Line
              yAxisId="left"
              dataKey="users"
              name="Active Users"
              stroke={theme.palette.primary.main}
              strokeWidth={theme.breakpoints.down("sm") ? 1.5 : 2}
              dot={{ r: theme.breakpoints.down("sm") ? 2 : 4 }}
              activeDot={{ r: theme.breakpoints.down("sm") ? 4 : 6 }}
            />
            <Line
              yAxisId="left"
              dataKey="sessions"
              name="Sessions"
              stroke={theme.palette.secondary.main}
              strokeWidth={theme.breakpoints.down("sm") ? 1.5 : 2}
              dot={{ r: theme.breakpoints.down("sm") ? 2 : 4 }}
              activeDot={{ r: theme.breakpoints.down("sm") ? 4 : 6 }}
            />
            <Line
              yAxisId="right"
              dataKey="retention"
              name="Retention Rate"
              stroke={theme.palette.success.main}
              strokeWidth={theme.breakpoints.down("sm") ? 1.5 : 2}
              dot={{ r: theme.breakpoints.down("sm") ? 2 : 4 }}
              activeDot={{ r: theme.breakpoints.down("sm") ? 4 : 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default LineChartCard;