import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
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
  useMediaQuery,
  Menu,
  MenuItem,
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
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { NavLink, useLocation, Outlet } from "react-router-dom";

import AttendanceTrackerModal from "./AttendanceTrackerModal";

import LogoDark from "../images/svg/logo-dark.svg";
import LogoLight from "../images/svg/logo-light.svg";

interface LayoutProps {
  children?: React.ReactNode;
}

const drawerWidth = 280;

// Enhanced theme with responsive typography
const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
        contrastText: mode === "light" ? "#ffffff" : "#121212",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
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
        fontSize: "1.25rem",
        "@media (max-width: 600px)": {
          fontSize: "1rem",
        },
      },
      body1: {
        fontWeight: 400,
        letterSpacing: 0.3,
        fontSize: "1rem",
        "@media (max-width: 600px)": {
          fontSize: "0.875rem",
        },
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
            padding: "2px 4px",
            "@media (max-width: 600px)": {
              margin: "2px 4px",
              padding: "1px 2px",
            },
          },
        },
      },
    },
  });

// Styled Components with responsive adjustments
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.standard,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
  background: theme.palette.background.paper,
  minHeight: "100vh",
  width: "100%",
  "@media (max-width: 960px)": {
    padding: theme.spacing(2),
    marginLeft: 0,
  },
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: alpha(theme.palette.background.paper, 0.95),
  color: theme.palette.text.primary,
  boxShadow: "0 0px 0px rgba(0,0,0,0.1)",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
  "@media (max-width: 960px)": {
    width: "100%",
    marginLeft: 0,
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  background: theme.palette.background.paper,
  "@media (max-width: 600px)": {
    padding: theme.spacing(0, 1),
  },
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
    "@media (max-width: 960px)": {
      width: "80vw",
      maxWidth: drawerWidth,
    },
    "@media (max-width: 600px)": {
      width: "70vw",
      maxWidth: 240,
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
    "&:hover": {
      background: "#9c06c9",
      transform: "translateX(2px)",
    },
  },
  "&:hover": {
    background: theme.palette.mode === "light" ? "#f0cdee" : "#770aa5",
    transform: "translateX(2px)",
  },
}));

const ContentContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
  "@media (max-width: 600px)": {
    padding: theme.spacing(2),
    borderRadius: 8,
  },
}));

const UserProfileButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  background: alpha(theme.palette.primary.main, 0.05),
  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.15),
    transform: "scale(1.05)",
  },
  "@media (max-width: 600px)": {
    padding: theme.spacing(0.5),
  },
}));

const ThemeToggleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  padding: theme.spacing(0.5),
  "@media (max-width: 600px)": {
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(0.3),
  },
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.15),
    transform: "scale(1.05)",
  },
  "@media (max-width: 600px)": {
    padding: theme.spacing(0.5),
  },
}));

const Layout: React.FC<LayoutProps> = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationCount] = React.useState<number>(3);
  const theme = getTheme(mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState<boolean>(!isMobile);
  const location = useLocation();
  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("User logged out");
    handleMenuClose();
  };

  const handleProfile = () => {
    console.log("Navigate to profile");
    handleMenuClose();
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
          style={{
            height: isSmallScreen ? "24px" : "30px",
            marginLeft: theme.spacing(2),
          }}
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
      <List sx={{ pt: 1, px: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <NavLinkStyled to={item.path}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: isSmallScreen ? 36 : 45 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: isSmallScreen ? "0.875rem" : "1rem",
                  }}
                />
              </ListItemButton>
            </NavLinkStyled>
          </ListItem>
        ))}
      </List>
    </>
  );

  const handleCheckIn = () => {
    console.log("Check-in recorded at:", new Date().toLocaleString());
  };

  const handleCheckOut = () => {
    console.log("Check-out recorded at:", new Date().toLocaleString());
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          background: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        {/* Header */}
        <AppBarStyled position="fixed" open={open}>
          <Toolbar sx={{ minHeight: isSmallScreen ? "56px" : "72px" }}>
            {!open && (
              <Tooltip title="Open Drawer">
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    mr: 1,
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
              sx={{
                fontWeight: 600,
                flexGrow: 1,
                letterSpacing: 0.2,
                fontSize: isSmallScreen ? "1rem" : "1.25rem",
              }}
            >
              {getPageTitle()}
            </Typography>

            <AttendanceTrackerModal
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
            />

            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                sx={{
                  mr: 0.5,
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
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              id="account-menu"
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={isMenuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 0.5,
                  width: 220, 
                  borderRadius: 8, 
                  transition: "all 0.3s ease-in-out", 
                  "& .MuiMenuItem-root": {
                    padding: theme.spacing(1.5, 2), 
                    borderRadius: 6,
                    margin: theme.spacing(0.5, 1), 
                    transition:
                      "background-color 0.2s ease-in-out, transform 0.2s ease-in-out",
                    "&:hover": {
                      background:
                        theme.palette.mode === "light" ? "#f0cdee" : "#770aa5",
                      transform: "translateX(2px)", 
                    },
                  },
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: -5,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    transition: "all 0.3s ease-in-out", 
                  },
                },
              }}
            >
              <MenuItem
                disabled
                sx={{
                  justifyContent: "center",
                  padding: theme.spacing(1.5, 2),
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  John Doe
                </Typography>
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
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
          <ContentContainer elevation={0}>
            <Outlet />
          </ContentContainer>
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
