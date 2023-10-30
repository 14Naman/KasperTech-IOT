import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  Home,
  LocalPolice,
  Login,
  ReportProblem,
  ReviewsOutlined,
  Logout,
} from "@mui/icons-material";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import AddDevice from "./pages/AddDevice";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";

const drawerWidth = 240;

function ResponsiveDrawerAdmin(props) {
  const { windoww } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [islogin, setislogin] = useState(true);
  const [userdata, setuserdata] = useState();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [loginOpen, setLoginOpen] = React.useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLogin = () => {
    // Handle login logic here
    setLoginOpen(false);
  };
  const handlelogout = () => {
    // window.open("http://localhost:8000/admin/logout","_self");
    window.location.href = "http://localhost:8000/admin/logout";
    // const response= fetch("http://localhost:8000/admin/logout",{
    //   method: "GET",
    //   headers : {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //    },
    // })
  };
  // useEffect(() => {
  //   async function fetchdata() {
  //     const response = await fetch("/check1", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });
  //     const resp = await response.json();
  //     // console.log(resp.status);
  //     setislogin(resp.status);
  //     console.log(resp.data);
  //     setuserdata(resp.data);
  //     setIsLoading(false);
  //   }

  //   fetchdata();

  //   // console.log(islogin);
  // }, [location]);
  const navigate = useNavigate();
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => navigate("/admin/new-user")}>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Register Users</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => navigate("/admin")}>
          <ListItemButton>
            <ListItemIcon>
              <ReportProblem />
            </ListItemIcon>
            <ListItemText>Add Devices</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => navigate("/admin/users")}>
          <ListItemButton>
            <ListItemIcon>
              <ReviewsOutlined />
            </ListItemIcon>
            <ListItemText>Users</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => navigate("/login")}>
          <ListItemButton>
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    windoww !== undefined ? () => window().document.body : undefined;
  // if (isLoading) {
  //   // Render a loading indicator or placeholder component
  //   // return <div>Loading...</div>;
  //   return (
  //     <>
  //       <CircularProgress color="success" />
  //       <span>Loading...</span>
  //     </>
  //   );
  // }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ width: "95%", fontWeight: "bold", letterSpacing: "2px" }}
          >
            KasperTech
          </Typography>
          {/* <div className="imglogo" style={{ width: "5%" }}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "100%", height: "100%", marginRight: "0px" }}
            />
          </div> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {islogin ? (
          <Routes>
            <Route exact path="/new-user" element={<AddUser />}></Route>
            <Route path="/" element={<AddDevice />}></Route>

            <Route path="/users" element={<Users/>}></Route>
          </Routes>
        ) : (
          <Navigate to="/login" />
        )}
      </Box>
    </Box>
  );
}

ResponsiveDrawerAdmin.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default ResponsiveDrawerAdmin;
