import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AttachMoney as RevenueIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
  BarChart as ChartIcon,
} from "@mui/icons-material";

// Styled Components
const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 2,
  boxShadow: theme.shadows[2],
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 2,
  height: "100%",
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
}));

const DashboardTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

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

const recentOrders = [
  {
    id: 1,
    customer: "John Doe",
    date: "2023-05-01",
    amount: "$120",
    status: "Completed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2023-05-02",
    amount: "$85",
    status: "Processing",
  },
  {
    id: 3,
    customer: "Robert Johnson",
    date: "2023-05-03",
    amount: "$220",
    status: "Completed",
  },
  {
    id: 4,
    customer: "Emily Davis",
    date: "2023-05-04",
    amount: "$54",
    status: "Pending",
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Mock chart component (in a real app you would use something like Chart.js)
  const renderMockChart = () => (
    <Box sx={{ textAlign: "center" }}>
      <ChartIcon
        sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 2 }}
      />
      <Typography variant="h6" color="textSecondary">
        Sales Overview Chart
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        (Chart visualization would appear here)
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <DashboardTitle variant="h4">Dashboard Overview</DashboardTitle>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <DashboardCard
              sx={{
                borderLeft: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: stat.change.startsWith("+")
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                    }}
                  >
                    {stat.change} from last month
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </DashboardCard>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <ChartContainer>{renderMockChart()}</ChartContainer>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ChartContainer>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ width: "100%" }}>
              {[1, 2, 3, 4].map((item) => (
                <Box
                  key={item}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: theme.palette.grey[100],
                    borderRadius: theme.shape.borderRadius,
                  }}
                >
                  <Typography variant="body2">
                    Activity log item #{item}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    2 hours ago
                  </Typography>
                </Box>
              ))}
            </Box>
          </ChartContainer>
        </Grid>
      </Grid>

      {/* Recent Orders Table */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Recent Orders
        </Typography>
        <Box
          sx={{
            overflowX: "auto",
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "600px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: theme.palette.grey[100] }}>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>
                  Order ID
                </th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>
                  Customer
                </th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>
                  Date
                </th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>
                  Amount
                </th>
                <th style={{ padding: "12px 16px", textAlign: "left" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  style={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                >
                  <td style={{ padding: "12px 16px" }}>{order.id}</td>
                  <td style={{ padding: "12px 16px" }}>{order.customer}</td>
                  <td style={{ padding: "12px 16px" }}>{order.date}</td>
                  <td style={{ padding: "12px 16px" }}>{order.amount}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <Box
                      component="span"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backgroundColor:
                          order.status === "Completed"
                            ? theme.palette.success.light
                            : order.status === "Processing"
                            ? theme.palette.warning.light
                            : theme.palette.grey[200],
                        color:
                          order.status === "Completed"
                            ? theme.palette.success.dark
                            : order.status === "Processing"
                            ? theme.palette.warning.dark
                            : theme.palette.text.secondary,
                      }}
                    >
                      {order.status}
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
