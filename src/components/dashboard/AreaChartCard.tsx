import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[5],
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
const generateAreaData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  return months.map((month) => ({
    name: month,
    productA: Math.floor(Math.random() * 5000) + 1000,
    productB: Math.floor(Math.random() * 4000) + 500,
    productC: Math.floor(Math.random() * 3000) + 200,
  }));
};

const AreaChartCard = () => {
  const theme = useTheme();
  const data = generateAreaData();

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
                {entry.name}: <b>${(entry.value ?? 0).toLocaleString()}</b>
              </Typography>
            </Box>
          ))}
          <Typography
            variant="caption"
            color="text.secondary"
            mt={1}
            display="block"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
          >
            Total:{" "}
            <b>
              $
              {payload
                .reduce((sum, entry) => sum + (entry.value ?? 0), 0)
                .toLocaleString()}
            </b>
          </Typography>
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
            Product Performance
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Monthly sales distribution
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
          Year 2023
        </Typography>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: theme.breakpoints.down("sm") ? 10 : 20,
              left: theme.breakpoints.down("sm") ? -10 : 0,
              bottom: 10,
            }}
            stackOffset="expand" // For normalized area chart
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
              tick={{ fontSize: theme.breakpoints.down("sm") ? 10 : 12 }}
              tickFormatter={(value) => `${Math.round(value * 100)}%`}
              domain={[0, 1]}
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
            <Area
              type="monotone"
              dataKey="productA"
              name="Product A"
              stackId="1"
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.light}
              fillOpacity={0.8}
              strokeWidth={theme.breakpoints.down("sm") ? 1 : 2}
            />
            <Area
              type="monotone"
              dataKey="productB"
              name="Product B"
              stackId="1"
              stroke={theme.palette.secondary.main}
              fill={theme.palette.secondary.light}
              fillOpacity={0.8}
              strokeWidth={theme.breakpoints.down("sm") ? 1 : 2}
            />
            <Area
              type="monotone"
              dataKey="productC"
              name="Product C"
              stackId="1"
              stroke={theme.palette.success.main}
              fill={theme.palette.success.light}
              fillOpacity={0.8}
              strokeWidth={theme.breakpoints.down("sm") ? 1 : 2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default AreaChartCard;
