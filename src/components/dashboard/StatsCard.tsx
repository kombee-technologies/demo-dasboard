import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import {
  AttachMoney as RevenueIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Define the props interface for ChangeIndicator
interface ChangeIndicatorProps {
  change: string;
}

const StyledDashboardCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
  borderRadius: 1.5,
  boxShadow: theme.shadows[3],
  borderLeft: `6px solid #9c06c9`,
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.3s ease-in-out",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 56,
  height: 56,
  borderRadius: "12px",
  backgroundColor: "#9c06c9",
  color: theme.palette.primary.contrastText,
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    width: 48,
    height: 48,
  },
  [theme.breakpoints.down("xs")]: {
    width: 40,
    height: 40,
  },
}));

const ChangeIndicator = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "change",
})<ChangeIndicatorProps>(({ theme, change }) => ({
  fontWeight: 500,
  fontSize: "0.875rem",
  color: change.startsWith("+")
    ? theme.palette.success.main
    : theme.palette.error.main,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

const StatsCard = () => {

  const statsData = [
    {
      title: "Total Revenue",
      value: "$24,345",
      icon: <RevenueIcon fontSize="large" />,
      change: "+12%",
    },
    {
      title: "Total Orders",
      value: "1,234",
      icon: <OrdersIcon fontSize="large" />,
      change: "+7%",
    },
    {
      title: "Active Users",
      value: "845",
      icon: <UsersIcon fontSize="large" />,
      change: "+3%",
    },
  ];

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3, md: 4 }}
      sx={{ mb: { xs: 2, md: 4 } }}
    >
      {statsData.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <StyledDashboardCard>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "row" },
                alignItems: "center",
                gap: { xs: 1.5, sm: 2 },
                flexGrow: 1,
              }}
            >
              <IconContainer>{stat.icon}</IconContainer>
              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mt: { xs: 0.5, sm: 1 },
                    mb: 0.5,
                    fontWeight: 700,
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  }}
                >
                  {stat.value}
                </Typography>
                <ChangeIndicator change={stat.change}>
                  {stat.change} from last month
                </ChangeIndicator>
              </Box>
            </Box>
          </StyledDashboardCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCard;
