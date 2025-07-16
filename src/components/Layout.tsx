import React from "react";
import { styled } from "@mui/material/styles";
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
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

interface LayoutProps {
  children?: React.ReactNode;
}

const drawerWidth = 240;

// Styled Components with enhanced backgrounds
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  background: theme.palette.grey[50], 
  minHeight: "100vh",
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background:
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#ffffff",
  color: theme.palette.text.primary,
  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  background:
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : "#f8f9fa", 
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    background:
      theme.palette.mode === "dark"
        ? theme.palette.background.paper
        : "#ffffff", 
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.secondary,
  width: "100%",
  "&.active": {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    color: theme.palette.primary.main,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiListItemText-primary": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  "&:hover": {
    background: theme.palette.action.hover,
  },
}));

const ContentContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 2,
  boxShadow: theme.shadows[2],
  background: theme.palette.background.paper,
  marginBottom: theme.spacing(4),
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(!isMobile);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const getPageTitle = () => {
    const currentRoute = navItems.find(
      (item) => item.path === location.pathname
    );
    return currentRoute ? currentRoute.text : "Dashboard";
  };

  const navItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
  ];

  const drawerContent = (
    <>
      <DrawerHeader>
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2, fontWeight: 600 }}>
          Acme Inc
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <NavLinkStyled to={item.path} end>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </NavLinkStyled>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex", background: theme.palette.grey[50] }}>
      <CssBaseline />
      {/* Header */}
      <AppBarStyled position="fixed" open={open}>
        <Toolbar sx={{ minHeight: "64px" }}>
          {!open && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 600 }}
          >
            {getPageTitle()}
          </Typography>
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
            p: 3,
            minHeight: "calc(100vh - 120px)",
          }}
        >
          <ContentContainer elevation={0}>{children}</ContentContainer>
        </Box>
      </Main>
    </Box>
  );
};

export default Layout;
