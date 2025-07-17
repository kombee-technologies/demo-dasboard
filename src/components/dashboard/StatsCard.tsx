import React from "react";
import { Grid, Box, Typography, useTheme, styled } from "@mui/material";
import {
  AttachMoney as RevenueIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
} from "@mui/icons-material";

const StyledDashboardCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  height: "100%",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
  backgroundColor: theme.palette.background.paper,
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 60,
  height: 60,
  borderRadius: "50%",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
  color: theme.palette.primary.main,
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    width: 50,
    height: 50,
  },
}));

const StatsCard = () => {
  const theme = useTheme();

  // Mock Data
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
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statsData.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <StyledDashboardCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                height: "100%",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mt: 1,
                    mb: 0.5,
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", sm: "1.75rem" },
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: stat.change.startsWith("+")
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  {stat.change} from last month
                </Typography>
              </Box>
              <IconContainer>{stat.icon}</IconContainer>
            </Box>
          </StyledDashboardCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCard;
