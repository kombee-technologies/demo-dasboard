import React from "react";
import {
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, useTheme, styled, Stack } from "@mui/material";

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

const LegendItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(0.5),
  "& .legend-color": {
    width: 12,
    height: 12,
    borderRadius: "50%",
    marginRight: theme.spacing(1),
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: theme.spacing(1.5),
    "& .legend-color": {
      width: 10,
      height: 10,
    },
  },
}));

// Sample Data Generator
const generateScatterData = () => {
  const categories = ["Electronics", "Fashion", "Home", "Beauty", "Sports"];
  return categories.map((category) => ({
    category,
    data: Array.from({ length: 20 }, (_, i) => ({
      x: Math.floor(Math.random() * 100) + 10,
      y: Math.floor(Math.random() * 100) + 10,
      z: Math.floor(Math.random() * 20) + 5,
    })),
  }));
};

const ScatterChartCard = () => {
  const theme = useTheme();
  const data = generateScatterData();
  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
  ];

  const CustomTooltipContent = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      x?: number;
      y?: number;
      z?: number;
      payload?: any;
    }>;
  }) => {
    if (active && payload && payload.length) {
      const { x, y, z, payload: pointPayload } = payload[0];
      return (
        <CustomTooltip>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            mb={0.5}
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            {pointPayload.category}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            <Box component="span" sx={{ color: theme.palette.text.secondary }}>
              Price:{" "}
            </Box>
            <b>${x}</b>
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            <Box component="span" sx={{ color: theme.palette.text.secondary }}>
              Rating:{" "}
            </Box>
            <b>{y}/100</b>
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            <Box component="span" sx={{ color: theme.palette.text.secondary }}>
              Sales:{" "}
            </Box>
            <b>{z}k</b>
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
            Price vs Rating correlation
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: theme.spacing(0.5, 1),
            justifyContent: { xs: "flex-start", sm: "flex-end" },
          }}
        >
          {data.map((item, index) => (
            <LegendItem key={index}>
              <Box
                className="legend-color"
                sx={{ bgcolor: colors[index % colors.length] }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                {item.category}
              </Typography>
            </LegendItem>
          ))}
        </Box>
      </ChartHeader>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: theme.breakpoints.down("sm") ? 10 : 20,
              left: theme.breakpoints.down("sm") ? -10 : 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis
              type="number"
              dataKey="x"
              name="Price"
              unit="$"
              tick={{ fontSize: theme.breakpoints.down("sm") ? 10 : 12 }}
              label={{
                value: "Price ($)",
                position: "insideBottomRight",
                offset: -10,
                fontSize: theme.breakpoints.down("sm") ? 10 : 12,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Rating"
              unit="/100"
              tick={{ fontSize: theme.breakpoints.down("sm") ? 10 : 12 }}
              width={theme.breakpoints.down("sm") ? 40 : 50}
              label={{
                value: "Rating (/100)",
                angle: -90,
                position: "insideLeft",
                fontSize: theme.breakpoints.down("sm") ? 10 : 12,
              }}
            />
            <ZAxis
              type="number"
              dataKey="z"
              range={[theme.breakpoints.down("sm") ? 40 : 60, theme.breakpoints.down("sm") ? 300 : 400]}
              name="Sales"
              unit="k"
            />
            <Tooltip
              content={<CustomTooltipContent />}
              cursor={{ strokeDasharray: "3 3" }}
            />
            {data.map((item, index) => (
              <Scatter
                key={index}
                name={item.category}
                data={item.data}
                fill={colors[index % colors.length]}
                fillOpacity={0.8}
                stroke={theme.palette.background.paper}
                strokeWidth={theme.breakpoints.down("sm") ? 0.5 : 1}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StyledChartCard>
  );
};

export default ScatterChartCard;