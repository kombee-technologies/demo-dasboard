import React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Divider,
  CssBaseline,
  Paper,
  alpha,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
  People as EmployeesIcon,
  Event as AttendanceIcon,
  AttachMoney as PayrollIcon,
  Work as RecruitmentIcon,
  CalendarToday as LeaveIcon,
} from "@mui/icons-material";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import LogoDark from "../images/svg/logo-dark.svg";
import LogoLight from "../images/svg/logo-light.svg";

interface LayoutProps {
  children?: React.ReactNode;
}

const drawerWidth = 280;

// Enhanced theme with better typography and color palette
const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
        contrastText: mode === "light" ? "#fafafa" : "#121212",
      },
      background: {
        default: mode === "light" ? "#fafafa" : "#2c1444",
        paper: mode === "light" ? "#fafafa" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#1a2027" : "#e0e0e0",
        secondary: mode === "light" ? "#64748b" : "#b0bec5",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 600,
        letterSpacing: 0.2,
      },
      body1: {
        fontWeight: 400,
        letterSpacing: 0.3,
      },
    },
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            transition: "all 0.2s ease-in-out",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: "4px 8px",
            transition: "all 0.2s ease-in-out",
          },
        },
      },
    },
  });

// Styled Components with enhanced styling
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0, 3, 3, 3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.standard,
  }),
  marginLeft: `-${drawerWidth}px`,
  background: theme.palette.background.paper,
  minHeight: "100vh",
  ...(open && {
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: alpha(theme.palette.background.paper, 1),
  color: theme.palette.text.primary,
  backdropFilter: "blur(12px)",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  borderBottom: `3px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: theme.transitions.create(["width", "margin", "transform"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transform: "translateX(0)",
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  color: theme.palette.primary.contrastText,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    background: theme.palette.background.paper,
    borderRight: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    transition: theme.transitions.create(["transform", "width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    transform: "translateX(0)",
    "&.MuiDrawer-paperAnchorDockedLeft[hidden]": {
      transform: `translateX(-${drawerWidth}px)`,
    },
  },
}));

const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.secondary,
  width: "95%",
  borderRadius: theme.shape.borderRadius,
  "&.active": {
    background: "#bf08fb",
    color: theme.palette.primary.contrastText,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.contrastText,
    },
    "& .MuiListItemText-primary": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  "&:hover": {
    background: theme.palette.mode === "light" ? "#f0cdee" : "#770aa5",
    transform: "translateX(2px)",
  },
}));

const ContentContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 12,
  boxShadow: theme.shadows[3],
  background: theme.palette.background.paper,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[5],
  },
}));

const UserProfileButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  background: alpha(theme.palette.primary.main, 0.05),
  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.15),
    transform: "scale(1.05)",
  },
}));

const ThemeToggleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2),
  background: alpha(theme.palette.background.paper, 0.1),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1),
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.15),
    transform: "scale(1.05)",
  },
}));

const Layout: React.FC<LayoutProps> = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationCount] = React.useState(3);
  const theme = getTheme(mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(!isMobile);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const getPageTitle = () => {
    const currentRoute = navItems.find(
      (item) => item.path === location.pathname
    );
    return currentRoute ? currentRoute.text : "Dashboard";
  };

  const navItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Employees", path: "/employees", icon: <EmployeesIcon /> },
    { text: "Attendance", path: "/attendance", icon: <AttendanceIcon /> },
    { text: "Payroll", path: "/payroll", icon: <PayrollIcon /> },
    { text: "Recruitment", path: "/recruitment", icon: <RecruitmentIcon /> },
    { text: "Leave Management", path: "/leave", icon: <LeaveIcon /> },
    { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
  ];

  const drawerContent = (
    <>
      <DrawerHeader>
        <img
          src={mode === "dark" ? LogoLight : LogoDark}
          alt="HRMS Logo"
          style={{ height: "30px", marginLeft: theme.spacing(3) }}
        />
        <Tooltip title={open ? "Close Drawer" : "Open Drawer"}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: theme.palette.text.primary }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Tooltip>
      </DrawerHeader>
      <Divider />
      <List sx={{ pt: 1.5, px: 1.5 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <NavLinkStyled to={item.path}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 45 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </NavLinkStyled>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: "flex", background: theme.palette.background.default }}
      >
        <CssBaseline />
        {/* Header */}
        <AppBarStyled position="fixed" open={open}>
          <Toolbar sx={{ minHeight: "72px" }}>
            {!open && (
              <Tooltip title="Open Drawer">
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    mr: 2,
                    color: theme.palette.text.primary,
                    "&:hover": {
                      background: alpha(theme.palette.primary.main, 0.1),
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 600, flexGrow: 1, letterSpacing: 0.2 }}
            >
              {getPageTitle()}
            </Typography>

            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                sx={{
                  mr: 1,
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.1),
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <ThemeToggleContainer>
              <Tooltip
                title={
                  mode === "light"
                    ? "Switch to Dark Mode"
                    : "Switch to Light Mode"
                }
              >
                <ThemeToggleButton onClick={handleThemeToggle}>
                  {mode === "light" ? <SunIcon /> : <MoonIcon />}
                </ThemeToggleButton>
              </Tooltip>
            </ThemeToggleContainer>

            <Tooltip title="User Profile">
              <UserProfileButton
                size="small"
                onClick={handleProfileMenuOpen}
                aria-controls={anchorEl ? "account-menu" : undefined}
                aria-haspopup="true"
              >
                <AccountCircleIcon />
              </UserProfileButton>
            </Tooltip>
          </Toolbar>
        </AppBarStyled>

        {/* Navigation Drawer */}
        <DrawerStyled
          variant={isMobile ? "temporary" : "persistent"}
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerContent}
        </DrawerStyled>

        {/* Main Content */}
        <Main open={open}>
          <DrawerHeader />
          <Box
            sx={{
              minHeight: "calc(100vh - 120px)",
            }}
          >
            <ContentContainer elevation={0}>
              <Outlet />
            </ContentContainer>
          </Box>
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
