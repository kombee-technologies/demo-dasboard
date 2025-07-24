import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

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
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down("xs")]: {
    padding: theme.spacing(1.5),
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: "320px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    height: "280px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "240px",
  },
  [theme.breakpoints.down("xs")]: {
    height: "200px",
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
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  maxWidth: "200px",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "150px",
    padding: theme.spacing(0.75),
  },
}));

const PieChartCard = () => {
  const theme = useTheme();

  const data = [
    { name: "Desktop", value: 400, color: theme.palette.primary.main },
    { name: "Mobile", value: 300, color: theme.palette.secondary.main },
    { name: "Tablet", value: 200, color: theme.palette.error.main },
    { name: "Others", value: 100, color: theme.palette.warning.main },
  ];

  const CustomTooltipContent = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      name?: string;
      value?: number;
      [key: string]: any;
    }>;
  }) => {
    if (active && payload && payload.length) {
      const total = data.reduce((sum, entry) => sum + entry.value, 0);
      const percentage =
        payload[0].value !== undefined
          ? ((payload[0].value / total) * 100).toFixed(1)
          : "0.0";
      return (
        <CustomTooltip>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            {payload[0].name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            {payload[0].value} ({percentage}%)
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
            Traffic Sources
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Last 30 days
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
          Total: 1,000 visits
        </Typography>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={theme.breakpoints.down("sm") ? 40 : 60}
              outerRadius={theme.breakpoints.down("sm") ? 60 : 70}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default PieChartCard;
