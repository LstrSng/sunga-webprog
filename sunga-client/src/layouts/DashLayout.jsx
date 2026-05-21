import { useState } from "react";
import { useAuth } from '../contexts/AuthContext';
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { secondaryDashboardButtonSx } from "../utils/dashboardButtonStyles";

const drawerWidth = 240;

const dashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/report",
    icon: AssessmentIcon,
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
    roles: ["admin"],
  },
  {
    label: "Articles",
    title: "Articles",
    to: "/dashboard/article",
    icon: ArticleIcon,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const getDisplayName = (auth) => {
  const firstName = auth?.firstName?.trim();
  if (firstName) return firstName;

  const emailName = auth?.email?.split("@")[0];
  return emailName || "User";
};

const getAuthRole = (auth) => (auth?.role || auth?.type || '').toLowerCase();

const isActiveNavItem = (pathname, to) => {
  if (to === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/dashboard/";
  }

  return pathname === to || pathname.startsWith(`${to}/`);
};

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { auth, logout } = useAuth();
  const location = useLocation();
  const displayName = getDisplayName(auth);
  const authRole = getAuthRole(auth);
  const visibleNavItems = dashboardNavItems.filter(
    (item) => !item.roles || item.roles.includes(authRole)
  );
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/signin");
  };

  return (
    <>
      <Box sx={{ display: "flex", width: "100%", maxWidth: "100vw", minHeight: "100vh", overflowX: "hidden", bgcolor: "#f4f4f5" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          elevation={0}
          sx={{
            bgcolor: "rgba(24, 24, 27, 0.94)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 2 }}
            >
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 'auto',
                fontWeight: 700,
                letterSpacing: 0,
                textAlign: 'left',
                fontSize: { xs: 16, sm: 20 },
              }}
            >
              Welcome, {displayName}
            </Typography>
            {/* Search */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              sx={secondaryDashboardButtonSx}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {visibleNavItems.map(({ label, to, icon }) => {
              const isActive = isActiveNavItem(location.pathname, to);

              return (
                <ListItem key={to} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    component={Link}
                    to={to}
                    selected={isActive}
                    sx={{
                      minHeight: 48,
                      mx: 1,
                      my: 0.5,
                      borderRadius: 2,
                      px: 2.5,
                      justifyContent: open ? "initial" : "center",
                      "&.Mui-selected": {
                        backgroundColor: "rgba(245, 158, 11, 0.16)",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "rgba(245, 158, 11, 0.22)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: isActive ? "#b45309" : "inherit",
                      }}
                    >
                      <Box component={icon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            width: 0,
            maxWidth: "100%",
            p: { xs: 2, sm: 3 },
            overflowX: "hidden",
            bgcolor: "#f4f4f5",
          }}
        >
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashLayout;
